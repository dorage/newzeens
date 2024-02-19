import { describe, expect, test, beforeAll, afterAll } from "vitest";
import { z } from "zod";
import supertest from "supertest";
import { API_HOST } from "../constants";

import { zRes as getBaseRes } from "../../src/routes/admin/campaign/base/get";
import {
  zRes as postBaseRes,
  zJson as postBaseJson,
} from "../../src/routes/admin/campaign/base/post";
import {
  zJson as putDetailJson,
  zRes as putDetailRes,
} from "../../src/routes/admin/campaign/[id]/put";
import { zRes as deleteDetailRes } from "../../src/routes/admin/campaign/[id]/delete";

const request = supertest(API_HOST + "/admin/campaign");

describe("CRUD /admin/campaign", () => {
  let campaign: z.infer<typeof postBaseRes.element>;

  test("POST /campaign: success", async () => {
    const { body } = await request
      .post("")
      .send(
        postBaseJson.parse({
          name: "오오",
        })
      )
      .expect("Content-Type", /json/)
      .expect(200);

    campaign = postBaseRes.parse(body)[0];
  });
  test("GET /campaign: success", async () => {
    const { body } = await request.get("").expect("Content-Type", /json/).expect(200);
    const res = getBaseRes.parse(body);
    expect(res[0].id).toBe(campaign.id);
  });
  test("PUT /campaign: success", async () => {
    const json = putDetailJson.parse({
      name: "요호호 테스트",
      description: "요호호 테스트 테스트",
    });
    const { body } = await request
      .put(`/${campaign.id}`)
      .send(json)
      .expect("Content-Type", /json/)
      .expect(200);
    const res = putDetailRes.parse(body)[0];

    expect(res.name).toBe(json.name);
    expect(res.description).toBe(json.description);
  });
  test("DELETE /campaign: success", async () => {
    const { body } = await request
      .delete(`/${campaign.id}`)
      .expect("Content-Type", /json/)
      .expect(200);
    const res = deleteDetailRes.parse(body);

    expect(res.findIndex((e) => e.id === campaign.id)).toBe(-1);
  });
});
