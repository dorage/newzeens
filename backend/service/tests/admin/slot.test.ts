import { describe, expect, test, beforeAll, afterAll } from "vitest";

import supertest from "supertest";
import { z } from "zod";
import { API_HOST } from "../constants";
import Mock from "../mock";

import { zRes as postCampaignRes } from "../../src/routes/admin/campaign/base/post";

import { zRes as getBaseRes } from "../../src/routes/admin/campaign/[id].slot/get";
import {
  zRes as postBaseRes,
  zJson as postBaseJson,
} from "../../src/routes/admin/campaign/[id].slot/post";
import {
  zJson as putDetailJson,
  zRes as putDetailRes,
} from "../../src/routes/admin/campaign/[id].slot.[slotId]/put";
import { zRes as deleteDetailRes } from "../../src/routes/admin/campaign/[id].slot.[slotId]/delete";

let campaign: z.infer<typeof postCampaignRes.element>;

beforeAll(async () => {
  const campaignJson = Mock.createCampaign();
  const request = supertest(API_HOST + "/admin/campaign");
  const { body } = await request.post("").send(campaignJson).expect(200);
  const res = postCampaignRes.parse(body);
  campaign = res.filter((e) => e.name === campaignJson.name).shift()!;
});

afterAll(async () => {
  const request = supertest(API_HOST + "/admin/campaign");

  await request.delete(`/${campaign.id}`).expect(200);
});

describe("CRUD /campaign/:id/slot", () => {
  let slot: z.infer<typeof postBaseRes.element>;
  const request = supertest(API_HOST + `/admin/campaign`);

  test("POST /slot: success", async () => {
    const slotJson = postBaseJson.parse(Mock.createSlot());
    const { body } = await request
      .post(`/${campaign.id}/slot`)
      .send(slotJson)
      .expect("Content-Type", /json/)
      .expect(200);

    slot = postBaseRes
      .parse(body)
      .filter((e) => e.name === slotJson.name)
      .shift()!;
  });

  test("GET /slot: success", async () => {
    const { body } = await request
      .get(`/${campaign.id}/slot`)
      .expect("Content-Type", /json/)
      .expect(200);
    const res = getBaseRes.parse(body);
    expect(res[0].id).toBe(slot.id);
  });

  test("PUT /slot/:slotId: success", async () => {
    const json = putDetailJson.parse({
      name: "요호호 테스트",
      description: "요호호 테스트 테스트",
    });
    console.log(slot);
    const { body } = await request
      .put(`/${campaign.id}/slot/${slot.id}`)
      .send(json)
      .expect("Content-Type", /json/)
      .expect(200);
    const res = putDetailRes.parse(body)[0];

    expect(res.name).toBe(json.name);
    expect(res.description).toBe(json.description);
  });

  test("DELETE /slot/:slotId: success", async () => {
    const { body } = await request
      .delete(`/${campaign.id}/slot/${slot.id}`)
      .expect("Content-Type", /json/)
      .expect(200);
    const res = deleteDetailRes.parse(body);

    expect(res.findIndex((e) => e.id === slot.id)).toBe(-1);
  });
});
