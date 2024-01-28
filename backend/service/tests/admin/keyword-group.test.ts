import { describe, expect, test, beforeAll } from "@jest/globals";

import supertest from "supertest";
import dotenv from "dotenv";

import { API_HOST } from "../constants";

import { zRes as getBaseRes } from "../../src/routes/admin/keyword-group/base/get";
import { zRes as postBaseRes } from "../../src/routes/admin/keyword-group/base/post";
import { zRes as getDetailRes } from "../../src/routes/admin/keyword-group/[id]/get";
import { zRes as putDetailRes } from "../../src/routes/admin/keyword-group/[id]/put";
import { zRes as deleteDetailRes } from "../../src/routes/admin/keyword-group/[id]/delete";

const request = supertest(API_HOST + "/admin/keyword_group");

beforeAll(() => {
  dotenv.config();
});

describe("CRUD /admin/keyword_group", () => {
  const name = "테스트";
  const name2 = "테스트2";
  const enabled = true;

  let id: number;

  test("POST", async () => {
    // 삽입
    const { body } = await request
      .post("")
      .send({ name: "테스트", is_enabled: enabled })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    const json = postBaseRes.parse(body);

    id = json.id;
  });
  test("GET", async () => {
    // 삽입
    const { body } = await request.get(`/${id}`).expect("Content-Type", /json/).expect(200);

    const json = getDetailRes.parse(body);
    expect(json.name).toBe(name);
    expect(json.is_enabled).toBe(enabled);
  });
  test("PUT change name", async () => {
    // 삽입
    const { body } = await request
      .put(`/${id}`)
      .send({ name: name2 })
      .expect("Content-Type", /json/)
      .expect(200);

    const json = putDetailRes.parse(body);
    expect(json.name).toBe(name2);
  });
  test("PUT change enabled", async () => {
    // 삽입
    const { body } = await request
      .put(`/${id}`)
      .send({ is_enabled: !enabled })
      .expect("Content-Type", /json/)
      .expect(200);

    const json = putDetailRes.parse(body);
    expect(json.is_enabled).toBe(!enabled);
  });
  test("DELETE", async () => {
    // 삽입
    const { body } = await request.delete(`/${id}`).expect("Content-Type", /json/).expect(200);

    const json = deleteDetailRes.parse(body);
    expect(json.okay).toBe(true);
  });
  test("GET detail is error", async () => {
    await request.get(`/${id}`).expect(404);
  });
});
