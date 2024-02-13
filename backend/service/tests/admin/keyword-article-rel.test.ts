import { describe, expect, test, beforeAll, afterAll } from "vitest";

import { z } from "zod";
import supertest from "supertest";
import dotenv from "dotenv";

import { API_HOST } from "../constants";
import Mock from "@/tests/mock";

import { zRes as postKeywordRes } from "@/src/routes/admin/keyword/base/post";
import { zRes as postPublisherRes } from "@/src/routes/admin/publisher/base/post";
import { zRes as postArticleRes } from "@/src/routes/admin/article/base/post";

import { zRes as getDetailRelationRes } from "@/src/routes/admin/article/[id]-relation/get";
import {
  zJson as postDetailRelationJson,
  zRes as postDetailRelationRes,
} from "@/src/routes/admin/article/[id]-relation/post";
import {
  zJson as putDetailRelationJson,
  zRes as putDetailRelationRes,
} from "@/src/routes/admin/article/[id]-relation/put";
import {
  zJson as deleteDetailRelationJson,
  zRes as deleteDetailRelationRes,
} from "@/src/routes/admin/article/[id]-relation/delete";

const keywords: z.infer<typeof postKeywordRes>[] = [];
let publisher: z.infer<typeof postPublisherRes>;
let article: z.infer<typeof postArticleRes>;

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
  // add publisher
  {
    const { body } = await supertest(API_HOST + "/admin/publisher")
      .post("")
      .send(Mock.createPublisher())
      .expect(200);
    publisher = postPublisherRes.parse(body);
  }
  // add article
  {
    const { body } = await supertest(API_HOST + "/admin/article")
      .post("")
      .send(Mock.createArticle(publisher.id))
      .expect(200);
    article = postArticleRes.parse(body);
  }
});

afterAll(async () => {
  // remove article
  {
    await supertest(API_HOST + "/admin/article")
      .delete(`/${article.id}`)
      .expect(200);
  }
  // remove publisher
  {
    await supertest(API_HOST + "/admin/publisher")
      .delete(`/${publisher.id}`)
      .expect(200);
  }
  // remove keywords
  {
    for (const keyword of keywords) {
      await supertest(API_HOST + "/admin/keyword")
        .delete(`/${keyword.id}`)
        .expect(200);
    }
  }
});

const client = supertest(API_HOST + "/admin/article");

describe("CRUD /article/:id/relation", () => {
  test("POST create relation, single", async () => {
    let i = 0;
    for (const keyword of keywords) {
      i++;
      const postJson: z.infer<typeof postDetailRelationJson> = {
        keyword_id: keyword.id,
      };
      const { body } = await client
        .post(`/${article.id}/relation`)
        .send(postJson)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      const relatedKeywords = postDetailRelationRes.parse(body);
      expect(relatedKeywords.length).toBe(i);
    }
  });

  test("GET get keywords of articles", async () => {
    const { body } = await client
      .get(`/${article.id}/relation`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    const relatedKeywords = getDetailRelationRes.parse(body);
    expect(relatedKeywords.length).toBe(3);
  });

  test("DELETE delete some keyword of articles", async () => {
    const deleteJson: z.infer<typeof deleteDetailRelationJson> = {
      keyword_id: keywords[1].id,
    };
    const { body } = await client
      .delete(`/${article.id}/relation`)
      .send(deleteJson)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    const result = deleteDetailRelationRes.parse(body);
    expect(result.okay).toBe(true);
  });

  test("GET get keywords of articles", async () => {
    const { body } = await client
      .get(`/${article.id}/relation`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    const relatedKeywords = getDetailRelationRes.parse(body);
    expect(relatedKeywords.length).toBe(2);
    expect(relatedKeywords.every((e) => e.id !== keywords[1].id)).toBe(true);
  });

  test("PUT deleted keyword", async () => {
    const deleteJson: z.infer<typeof putDetailRelationJson> = {
      keyword_id: keywords[1].id,
      preference: 99,
    };
    const { body } = await client
      .put(`/${article.id}/relation`)
      .send(deleteJson)
      .set("Accept", "application/json")
      .expect(200);

    const relatedKeywords = getDetailRelationRes.parse(body);
    expect(relatedKeywords.length).toBe(2);
    expect(relatedKeywords.every((e) => e.preference !== 99)).toBe(true);
  });

  test("PUT change preference", async () => {
    const deleteJson: z.infer<typeof putDetailRelationJson> = {
      keyword_id: keywords[0].id,
      preference: 99,
    };
    const { body } = await client
      .put(`/${article.id}/relation`)
      .send(deleteJson)
      .set("Accept", "application/json")
      .expect(200);

    const relatedKeywords = putDetailRelationRes.parse(body);
    expect(relatedKeywords.some((e) => e.id === keywords[0].id && e.preference === 99)).toBe(true);
  });
});
