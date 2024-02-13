import { describe, expect, test, beforeAll, afterAll } from "vitest";

import { z } from "zod";
import supertest from "supertest";
import dotenv from "dotenv";

import { API_HOST } from "../constants";
import Mock from "@/tests/mock";

import { zRes as postKeywordRes } from "@/src/routes/admin/keyword/base/post";
import { zRes as postKeywordGroupRes } from "@/src/routes/admin/keyword-group/base/post";
import { zRes as getDetailKeywordRes } from "@/src/routes/admin/keyword-group/[id].keyword/get";
import {
  zJson as postDetailKeywordJson,
  zRes as postDetailKeywordRes,
} from "@/src/routes/admin/keyword-group/[id].keyword/post";
import {
  zJson as putDetailKeywordJson,
  zRes as putDetailKeywordRes,
} from "@/src/routes/admin/keyword-group/[id].keyword/put";
import {
  zJson as deleteDetailKeywordJson,
  zRes as deleteDetailKeywordRes,
} from "@/src/routes/admin/keyword-group/[id].keyword/delete";

const keywords: z.infer<typeof postKeywordRes>[] = [];
const keywordGroups: z.infer<typeof postKeywordGroupRes>[] = [];

beforeAll(async () => {
  dotenv.config();
  // add keyword
  {
    for (let i = 0; i < 3; i++) {
      const { body } = await supertest(API_HOST + "/admin/keyword")
        .post("")
        .send(Mock.createKeyword())
        .expect(200);
      keywords.push(postKeywordRes.parse(body));
    }
  }
  // add keyword-group
  {
    for (let i = 0; i < 3; i++) {
      const { body } = await supertest(API_HOST + "/admin/keyword_group")
        .post("")
        .send(Mock.createKeywordGroup())
        .expect(200);
      keywordGroups.push(postKeywordGroupRes.parse(body));
    }
  }
});

afterAll(async () => {
  // remove keyword
  {
    for (const keyword of keywords) {
      const { body } = await supertest(API_HOST + "/admin/keyword")
        .delete(`/${keyword.id}`)
        .expect(200);
    }
  }
  // remove keyword-group
  {
    for (const keywordGroup of keywordGroups) {
      const { body } = await supertest(API_HOST + "/admin/keyword_group")
        .delete(`/${keywordGroup.id}`)
        .expect(200);
    }
  }
});

const client = supertest(API_HOST + "/admin/keyword_group");

describe("CRUD /keyword_group/:id/keyword", () => {
  test("POST create relation, single", async () => {
    for (const keywordGroup of keywordGroups) {
      for (const keyword of keywords) {
        const postJson: z.infer<typeof postDetailKeywordJson> = {
          keyword_id: keyword.id,
        };
        await client
          .post(`/${keywordGroup.id}/keyword`)
          .send(postJson)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200);
      }
    }
  });

  test("GET get keywords of keyword_groups", async () => {
    for (const keywordGroup of keywordGroups) {
      const res = await client
        .get(`/${keywordGroup.id}/keyword`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      const parsed = getDetailKeywordRes.safeParse(res.body);
      expect(parsed.success).toBe(true);
    }
  });

  test("DELETE delete some keyword of keyword_groups", async () => {
    const deleteJson: z.infer<typeof deleteDetailKeywordJson> = {
      keyword_id: keywords[1].id,
    };
    await client
      .delete(`/${keywordGroups[0].id}/keyword`)
      .send(deleteJson)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  test("GET keyword of keywords_group 0", async () => {
    const res = await client
      .get(`/${keywordGroups[0].id}/keyword`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    const parsed = getDetailKeywordRes.safeParse(res.body);
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.length).toBe(2);
    if (parsed.success) expect(parsed.data.every((e) => e.id !== keywords[1].id)).toBe(true);
  });

  test("GET keyword of keywords_group 1", async () => {
    const res = await client
      .get(`/${keywordGroups[1].id}/keyword`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    const parsed = getDetailKeywordRes.safeParse(res.body);
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.length).toBe(3);
    if (parsed.success) expect(parsed.data.every((e) => e.id !== keywords[1].id)).toBe(false);
  });

  test("PUT change keywords order", async () => {
    const deleteJson: z.infer<typeof putDetailKeywordJson> = {
      keyword_id: keywords[1].id,
      preference: 99,
    };
    const res = await client
      .put(`/${keywordGroups[1].id}/keyword`)
      .send(deleteJson)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    const parsed = putDetailKeywordRes.safeParse(res.body);

    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data[0].id === keywords[1].id).toBe(true);
    if (parsed.success) expect(parsed.data[0].preference).toBe(99);
  });
});
