import { describe, expect, test, beforeAll, afterAll } from "vitest";

import { z } from "zod";
import supertest from "supertest";
import dotenv from "dotenv";

import { API_HOST } from "../constants";

import { zRes as getBaseRes } from "../../src/routes/admin/article/base/get";
import {
  zRes as postBasePublisherRes,
  zJson as postBasPublishereJson,
} from "../../src/routes/admin/publisher/base/post";
import {
  zRes as postBaseRes,
  zJson as postBaseJson,
} from "../../src/routes/admin/article/base/post";
import { zRes as getDetailRes } from "../../src/routes/admin/article/[id]/get";
import { zRes as putDetailRes } from "../../src/routes/admin/article/[id]/put";
import { zRes as deleteDetailRes } from "../../src/routes/admin/article/[id]/delete";

const originalJson: z.infer<typeof postBaseJson> = {
  title: "테스트 뉴스레터",
  summary: "테스트입니다",
  thumbnail: "www.tester.com",
  is_enabled: true,
  publisher_id: "",
};
const modifiedJson: z.infer<typeof postBaseJson> = {
  title: "테스트 뉴스레터2",
  summary: "테스트입니다2",
  thumbnail: "www.tester.com2",
  is_enabled: false,
  publisher_id: "",
};

beforeAll(async () => {
  dotenv.config();

  // preprae publisher
  const request = supertest(API_HOST + "/admin/publisher");
  const publisher: z.infer<typeof postBasPublishereJson> = {
    name: "테스트 뉴스레터",
    description: "테스트입니다",
    thumbnail: "www.tester.com",
    is_enabled: true,
    subscriber: 0,
    url_subscribe: "www.tester.com",
  };

  {
    const { body } = await request
      .post("")
      .send(publisher)
      .expect("Content-Type", /json/)
      .expect(200);
    originalJson.publisher_id = body.id;
  }
  {
    const { body } = await request
      .post("")
      .send(publisher)
      .expect("Content-Type", /json/)
      .expect(200);
    modifiedJson.publisher_id = body.id;
  }
});

afterAll(() => {
  const request = supertest(API_HOST + "/admin/publisher");
  request.delete(`/${originalJson.publisher_id}`).expect("Content-Type", /json/).expect(200);
  request.delete(`/${modifiedJson.publisher_id}`).expect("Content-Type", /json/).expect(200);
});

const request = supertest(API_HOST + "/admin/article");

describe("CRUD /admin/article", () => {
  let id: string;

  test("POST", async () => {
    // 삽입
    const { body } = await request
      .post("")
      .send(originalJson)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    const json = body;
    id = json.id;
  });
  test("GET all", async () => {
    // 삽입
    const { body } = await request.get("").expect("Content-Type", /json/).expect(200);

    const res = getBaseRes.safeParse(body);
    expect(res.success).toBe(true);
  });
  test("GET original detail", async () => {
    // 삽입
    const { body } = await request.get(`/${id}`).expect("Content-Type", /json/).expect(200);

    const json = getDetailRes.parse(body);
    expect(
      Object.keys(originalJson).every(
        (key) => json[key as keyof typeof json] === originalJson[key as keyof typeof originalJson]
      )
    ).toBe(true);
  });
  Object.keys(modifiedJson).forEach((key) =>
    test(`PUT modify ${key}`, async () => {
      // 삽입
      const { body } = await request
        .put(`/${id}`)
        .send({ [key]: modifiedJson[key as keyof typeof modifiedJson] })
        .expect("Content-Type", /json/)
        .expect(200);

      const json = putDetailRes.parse(body);
      expect(json[key as keyof typeof json]).toBe(modifiedJson[key as keyof typeof modifiedJson]);
    })
  );
  test("GET modified detail", async () => {
    // 삽입
    const { body } = await request.get(`/${id}`).expect("Content-Type", /json/).expect(200);

    const json = getDetailRes.parse(body);
    expect(
      Object.keys(modifiedJson).every(
        (key) => json[key as keyof typeof json] === modifiedJson[key as keyof typeof modifiedJson]
      )
    ).toBe(true);
  });
  test("DELETE", async () => {
    const { body } = await request.delete(`/${id}`).expect("Content-Type", /json/).expect(200);

    const json = deleteDetailRes.parse(body);
    expect(json.okay).toBe(true);
  });
  test("GET detail is error", async () => {
    // 삽입
    await request.get(`/${id}`).expect(500);
  });
});
