import { z } from "@hono/zod-openapi";
import {
  ArticleSchema,
  BannerSchema,
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

const AdminBanner = z.object({}).merge(BannerSchema).openapi("AdminBanner");

const AdminCampaign = z.object({}).merge(CampaignSchema).openapi("AdminCampaign");

const AdminSlot = z.object({}).merge(SlotSchema).openapi("AdminSlot");

const OpenAPISchema = {
  AdminKeyword,
  AdminKeywordGroup,
  AdminRelatedKeyword,
  AdminPublisher,
  AdminArticle,
  AdminBanner,
  AdminCampaign,
  AdminSlot,
};

export default OpenAPISchema;
