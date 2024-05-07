import { z } from "@hono/zod-openapi";
import {
  ArticleSchema,
  CampaignSchema,
  KeywordGroupSchema,
  KeywordSchema,
  PublisherSchema,
  SlotSchema,
} from "kysely-schema";

const AdminKeyword = z.object({}).merge(KeywordSchema).openapi("AdminKeyword");

const AdminKeywordGroup = z.object({}).merge(KeywordGroupSchema).openapi("AdminKeywordGroup");

const AdminRelatedKeyword = z
  .object({})
  .merge(KeywordSchema)
  .extend({})
  .openapi("AdminRelatedKeyword");

const AdminPublisher = z.object({}).merge(PublisherSchema).openapi("AdminPublisher");

const AdminArticle = z.object({}).merge(ArticleSchema).openapi("AdminArticle");

const AdminCampaign = z.object({}).merge(CampaignSchema).openapi("AdminCampaign");

const AdminSlot = z.object({}).merge(SlotSchema).openapi("AdminSlot");

const Keyword = z
  .object({
    keyword_id: KeywordSchema.shape.id,
    keyword_name: KeywordSchema.shape.name.nullable(),
    keyword_group_id: KeywordGroupSchema.shape.id,
    keyword_group_name: KeywordGroupSchema.shape.name.nullable(),
  })
  .openapi("Keyword");

const PublisherRank = z
  .object({})
  .merge(
    PublisherSchema.pick({
      id: true,
      name: true,
      subscriber: true,
      thumbnail: true,
    }).extend({
      keywords: Keyword.array(),
    })
  )
  .openapi("PublisherRank");

const PublisherDetail = z
  .object({})
  .merge(
    PublisherSchema.pick({
      name: true,
      thumbnail: true,
      description: true,
      url_subscribe: true,
      publisher_main: true,
    }).extend({ keywords: Keyword.array() })
  )
  .openapi("PublisherDetail", { description: "" });

const PublisherPreview = z
  .object({})
  .merge(
    PublisherSchema.pick({
      id: true,
      name: true,
      description: true,
      thumbnail: true,
    }).extend({ keywords: Keyword.array() })
  )
  .openapi("PublisherPreview");

const ArticlePreview = z
  .object({})
  .merge(
    ArticleSchema.pick({
      id: true,
      title: true,
      summary: true,
      thumbnail: true,
      created_at: true,
    })
  )
  .openapi("ArticlePreview");

const OpenAPISchema = {
  AdminKeyword,
  AdminKeywordGroup,
  AdminRelatedKeyword,
  AdminPublisher,
  AdminArticle,
  AdminCampaign,
  AdminSlot,
  Keyword,
  PublisherRank,
  PublisherDetail,
  PublisherPreview,
  ArticlePreview,
};

export default OpenAPISchema;
