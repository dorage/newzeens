import { afterAll, beforeAll, describe, expect, test } from "vitest";

import supertest from "supertest";

import { API_HOST } from "../constants";

import { faker } from "@faker-js/faker";
import { z } from "zod";
import { zRes as deleteDetailRes } from "../../src/routes/admin/keyword-group/[id]/delete";
import { zRes as putDetailRes } from "../../src/routes/admin/keyword-group/[id]/put";
import { zRes as getBaseRes } from "../../src/routes/admin/keyword-group/base/get";
import { zRes as postBaseRes } from "../../src/routes/admin/keyword-group/base/post";
import { zE2E } from "../utils/e2e";

beforeAll(async () => {});

afterAll(async () => {});

const request = supertest(API_HOST + "/admin/keyword-group");

describe("CRUD /admin/keyword-group", () => {
  let keywordGroups: z.infer<typeof getBaseRes> = [];

  test("POST create new keywordGroups", async () => {
    while (keywordGroups.length < 3) {
      // 삽입
      const { parsed } = zE2E(
        await request
          .post("")
          .send({ name: faker.person.jobArea(), is_enabled: true })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
      )(postBaseRes);

      keywordGroups = parsed;
    }
    console.log(keywordGroups);
  });

  test("GET retrieve keyword_groups", async () => {
    const { parsed } = zE2E(await request.get(``).expect("Content-Type", /json/).expect(200))(
      getBaseRes
    );

    expect(parsed).toEqual(keywordGroups);
  });

  test("PUT change name", async () => {
    const target = 1;
    const newName = "수정완료";

    // change name of a keyword_group
    const { parsed } = zE2E(
      await request
        .put(`/${keywordGroups[target].id}`)
        .send({ name: newName })
        .expect("Content-Type", /json/)
        .expect(200)
    )(putDetailRes);

    // expect(parsed.filter((e) => e.name === newName)).toEqual(
    //   keywordGroups.filter((_, i) => i === target)
    // );
    expect(parsed.filter((e) => e.name !== newName)).toEqual(
      keywordGroups.filter((_, i) => i !== target)
    );
    keywordGroups = parsed;
  });

  test("PUT change is_enabled", async () => {
    const target = 2;
    const newIsEnabled = false;

    // change name of a keyword_group
    {
      const { parsed } = zE2E(
        await request
          .put(`/${keywordGroups[target].id}`)
          .send({ is_enabled: newIsEnabled })
          .expect("Content-Type", /json/)
          .expect(200)
      )(putDetailRes);

      expect(parsed.filter((e) => !e.is_enabled).length).toBe(1);
      keywordGroups = parsed;
    }
  });

  test("DELETE all keyword_groups", async () => {
    for (const keywordGroup of keywordGroups) {
      const { parsed } = zE2E(
        await request.delete(`/${keywordGroup.id}`).expect("Content-Type", /json/).expect(200)
      )(deleteDetailRes);

      expect(parsed.length).toBe(keywordGroups.length - 1);
      expect(parsed).toEqual(keywordGroups.filter((e) => e.id !== keywordGroup.id));
      keywordGroups = parsed;
    }
  });
});
