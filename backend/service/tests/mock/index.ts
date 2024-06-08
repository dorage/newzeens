import { Ky } from "@/src/libs/kysely";
import { createUniqueId } from "@/src/libs/nanoid";
import ArticleProvider from "@/src/providers/articles";
import CampaignProvider from "@/src/providers/campaigns";
import { PublisherProvider } from "@/src/providers/publishers";
import SlotProvider from "@/src/providers/slots";
import { generateMock } from "@anatine/zod-mock";
import { ArticleSchema, CampaignSchema, PublisherSchema, SlotSchema } from "kysely-schema";
import { z } from "zod";

const insertPublisher = async (): Promise<z.infer<typeof PublisherSchema>> => {
  const mock = generateMock(
    PublisherSchema.pick({
      id: true,
      thumbnail: true,
      name: true,
      description: true,
      is_enabled: true,
      url_main: true,
      url_subscribe: true,
      publisher_main: true,
      publisher_spec: true,
      subscriber: true,
    })
  );

  return Ky.insertInto("publishers")
    .values({ ...mock, is_enabled: Number(mock.is_enabled) })
    .returningAll()
    .executeTakeFirstOrThrow();
};

const insertArticle = async (
  publisherId?: z.infer<typeof PublisherSchema.shape.id>
): Promise<z.infer<typeof ArticleSchema>> => {
  const publisher =
    publisherId == null
      ? await insertPublisher()
      : await PublisherProvider.selectPublisherById(publisherId);

  const mock = generateMock(
    ArticleSchema.pick({
      id: true,
      thumbnail: true,
      title: true,
      summary: true,
      is_enabled: true,
      url: true,
    })
  );

  return Ky.insertInto("articles")
    .values({ ...mock, is_enabled: Number(mock.is_enabled), publisher_id: publisher.id })
    .returningAll()
    .executeTakeFirstOrThrow();
};

const insertCampaign = async (): Promise<z.infer<typeof CampaignSchema>> => {
  const mock = generateMock(CampaignSchema.pick({ name: true, description: true, comment: true }));

  return Ky.insertInto("campaigns")
    .values({
      ...mock,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
};

const insertSlot = async (
  campaignId?: z.infer<typeof CampaignSchema.shape.id>
): Promise<z.infer<typeof SlotSchema>> => {
  const campaign =
    campaignId == null
      ? await insertCampaign()
      : await CampaignProvider.selectCampaignById(campaignId);

  const mock = generateMock(
    SlotSchema.pick({ name: true, description: true, comment: true, is_enabled: true })
  );

  return Ky.insertInto("slots")
    .values({ ...mock, campaign_id: campaign.id, is_enabled: Number(mock.is_enabled) })
    .returningAll()
    .executeTakeFirstOrThrow();
};

const insertSlotArticle = async (options?: {
  slotId?: z.infer<typeof SlotSchema.shape.id>;
  articleId?: z.infer<typeof ArticleSchema.shape.id>;
}) => {
  const slot =
    options?.slotId == null
      ? await insertSlot()
      : await SlotProvider.selectSlotById(options.slotId);
  const article =
    options?.articleId == null
      ? await insertArticle()
      : await ArticleProvider.selectArticleById(options.articleId);

  await Ky.insertInto("slot_articles")
    .values({ slot_id: slot.id, article_id: article.id })
    .execute();

  return { slot, article };
};

const insertSlotPublisher = async (options?: {
  slotId?: z.infer<typeof SlotSchema.shape.id>;
  publisherId?: z.infer<typeof PublisherSchema.shape.id>;
}) => {
  const slot =
    options?.slotId == null
      ? await insertSlot()
      : await SlotProvider.selectSlotById(options.slotId);
  const publisher =
    options?.publisherId == null
      ? await insertPublisher()
      : await PublisherProvider.selectPublisherById(options.publisherId);

  await Ky.insertInto("slot_publishers")
    .values({ slot_id: slot.id, publisher_id: publisher.id })
    .execute();

  return { slot, publisher };
};

export const TestingMock = {
  insertPublisher,
  insertArticle,
  insertCampaign,
  insertSlot,
  insertSlotArticle,
  insertSlotPublisher,
};
