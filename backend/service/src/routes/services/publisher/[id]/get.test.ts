import { Ky } from "@/src/libs/kysely";
import { sql } from "kysely";
import { zRes } from "./get";
import { controller } from "./get.controller";
import { getPublisherSpec, getRecentArticleOfPublisher, getRelatedPublishers } from "./get.query";
import moment from "moment";

const getRandomPublihser = () => {
  return Ky.selectFrom("publishers")
    .selectAll()
    .where("is_enabled", "=", sql`TRUE`)
    .limit(1)
    .orderBy(sql`RANDOM()`)
    .executeTakeFirstOrThrow();
};

describe("get.query", () => {
  test("the result of select publisher detail shoould be parsed successfully", async () => {
    const publisher = await getRandomPublihser();

    const res = await getPublisherSpec({ publisherId: publisher.id });

    expect(zRes.shape.publisher.safeParse(res).success).toEqual(true);
  });

  // TODO: write this test
  // test("the result of select related publisher should satisfy the condition", async () => {
  //   // 직무/목적/고유 keyword_group 만 사용
  //   // 직무 = 관계대상과 동일해야함
  //   // 목적/고유 = 각 선택된 publihser간 하나 이상의 keyword만 겹치지 않아야함
  //   const publisher = await getRandomPublihser();
  //
  //   const res = await getRelatedPublishers({ publisherId: publisher.id });
  //
  //   expect().toEqual(true);
  // });

  test("the result of select related publisher sould be parsed successfully", async () => {
    const publisher = await getRandomPublihser();

    const res = await getRelatedPublishers({ publisherId: publisher.id });

    expect(zRes.shape.related_publishers.safeParse(res).success).toEqual(true);
  });

  test("the result of select related publisher should be different each time", async () => {
    const publisher = await getRandomPublihser();

    const resA = await getRelatedPublishers({ publisherId: publisher.id });
    const resB = await getRelatedPublishers({ publisherId: publisher.id });

    expect(resA.every((a) => resB.some((b) => a.id === b.id))).toEqual(false);
  });

  test("the result of select recent article shold be parsed successfully", async () => {
    const publisher = await getRandomPublihser();

    const res = await getRecentArticleOfPublisher({ publisherId: publisher.id });

    expect(zRes.shape.recent_articles.safeParse(res).success).toEqual(true);
  });

  test("the result of select recent articles should be sorted descending", async () => {
    const publisher = await getRandomPublihser();

    const res = await getRecentArticleOfPublisher({ publisherId: publisher.id });
    const sorted = [...res];
    sorted.sort((a, b) => Number(moment(b.created_at)) - Number(moment(a.created_at)));

    expect(res.every((_, idx) => res[idx].id === sorted[idx].id)).toEqual(true);
  });
});

describe("get.controller", () => {
  it("the result of the controller should be parsed successfully", async () => {
    const publisher = await Ky.selectFrom("publishers")
      .selectAll()
      .limit(1)
      .executeTakeFirstOrThrow();

    const res = await controller({ publisherId: publisher.id });
    expect(zRes.safeParse(res).success).toEqual(true);
  });
});
