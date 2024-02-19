import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { z } from "zod";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

import { API_HOST } from "../constants";

import { zRes as getBaseRes } from "../../src/routes/admin/keyword-group/[id].keyword/get";
import {
  zRes as postBaseRes,
  zJson as postBaseJson,
} from "../../src/routes/admin/keyword-group/[id].keyword/post";
import { zRes as deleteDetailRes } from "../../src/routes/admin/keyword-group/[id].keyword.[keyword_Id]/delete";
import { zRes as putDetailRes } from "../../src/routes/admin/keyword-group/[id].keyword.[keyword_Id]/put";
import { Ky } from "@/src/libs/kysely";

import { KeywordGroup } from "kysely-schema/src/schemes/keyword-groups";
import { zE2E } from "../utils/e2e";

const keywordGroups: KeywordGroup[] = [];

beforeAll(async () => {
  // add keyword_groups
  while (keywordGroups.length < 2) {
    try {
      const keywordGroup = await Ky.insertInto("keyword_groups")
        .values({
          name: faker.person.jobArea(),
          is_enabled: 1,
        })
        .returningAll()
        .executeTakeFirst();
      if (keywordGroup == null) continue;
      keywordGroups.push(keywordGroup);
    } catch (err) {}
  }
});

afterAll(async () => {
  // remove keyword_groups
  for (const kg of keywordGroups) {
    await Ky.deleteFrom("keyword_groups").where("id", "=", kg.id).execute();
  }
});

const request = supertest(API_HOST + "/admin/keyword-group");

describe("CRUD /admin/keyword", () => {
  const keywords: { [id in number]: z.infer<typeof postBaseRes> } = {};

  test("POST create new keywords of keyword_groups", async () => {
    for (const kg of keywordGroups) {
      keywords[kg.id] = [];
      while (keywords[kg.id].length < 3) {
        // 삽입
        const { parsed } = zE2E(
          await request
            .post(`/${kg.id}/keyword`)
            .send(postBaseJson.parse({ name: faker.person.jobTitle(), is_enabled: true }))
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
        )(postBaseRes);

        keywords[kg.id] = parsed;
      }
    }
  });

  test("GET keywords of keyword_groups", async () => {
    for (const group of keywordGroups) {
      const { parsed } = zE2E(
        await request.get(`/${group.id}/keyword`).expect("Content-Type", /json/).expect(200)
      )(getBaseRes);

      expect(parsed.length).toBe(3);
    }
  });

  test("PUT change name", async () => {
    const target_kg = keywordGroups[0];
    const other_kg = keywordGroups[1];

    const k = keywords[target_kg.id][0];

    const newName = "수정완료";

    // change name of a keyword
    {
      const { parsed } = zE2E(
        await request
          .put(`/${target_kg.id}/keyword/${k.id}`)
          .send({ name: newName })
          .expect("Content-Type", /json/)
          .expect(200)
      )(putDetailRes);

      expect(parsed.filter((e) => e.name !== newName)).toEqual(
        keywords[target_kg.id].filter((e) => e.id !== k.id)
      );
      keywords[target_kg.id] = parsed;
    }
    // get another keyword_group's keywords
    {
      const { parsed } = zE2E(
        await request.get(`/${other_kg.id}/keyword`).expect("Content-Type", /json/).expect(200)
      )(getBaseRes);

      expect(parsed).toEqual(keywords[other_kg.id]);
      keywords[other_kg.id] = parsed;
    }
  });

  test("PUT change is_enabled", async () => {
    const target_kg = keywordGroups[1];
    const other_kg = keywordGroups[0];

    const k = keywords[target_kg.id][2];

    const newIsEnabled = false;

    // change name of a keyword
    {
      const { parsed } = zE2E(
        await request
          .put(`/${target_kg.id}/keyword/${k.id}`)
          .send({ is_enabled: newIsEnabled })
          .expect("Content-Type", /json/)
          .expect(200)
      )(putDetailRes);

      expect(parsed.filter((e) => e.is_enabled !== newIsEnabled)).toEqual(
        keywords[target_kg.id].filter((e) => e.id !== k.id)
      );
      keywords[target_kg.id] = parsed;
    }
    // get another keyword_group's keywords
    {
      const { parsed } = zE2E(
        await request.get(`/${other_kg.id}/keyword`).expect("Content-Type", /json/).expect(200)
      )(getBaseRes);

      expect(parsed).toEqual(keywords[other_kg.id]);
      keywords[other_kg.id] = parsed;
    }
  });

  test("DELETE keywords", async () => {
    for (const kg of keywordGroups) {
      for (const k of keywords[kg.id]) {
        const { parsed } = zE2E(
          await request
            .delete(`/${kg.id}/keyword/${k.id}`)
            .expect("Content-Type", /json/)
            .expect(200)
        )(deleteDetailRes);

        expect(parsed.every((e) => e.id !== k.id)).toBe(true);
      }
    }
  });
});
