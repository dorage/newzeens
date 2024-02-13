import { z } from "@hono/zod-openapi";
import {
  ArticleSchema,
  BannerSchema,
  KeywordGroupRelSchema,
  KeywordGroupSchema,
  KeywordSchema,
  PublisherSchema,
} from "kysely-schema";

const AdminKeyword = z.object({}).merge(KeywordSchema).openapi("AdminKeyword");

const AdminRelatedKeyword = z
  .object({})
  .merge(KeywordSchema)
  .extend({
    preference: KeywordGroupRelSchema.shape.preference,
  })
  .openapi("AdminRelatedKeyword");

const AdminKeywordGroup = z.object({}).merge(KeywordGroupSchema).openapi("AdminKeywordGroup");

const AdminPublisher = z.object({}).merge(PublisherSchema).openapi("AdminPublisher");

const AdminArticle = z.object({}).merge(ArticleSchema).openapi("AdminArticle");

const AdminBanner = z.object({}).merge(BannerSchema).openapi("AdminBanner");

const OpenAPISchema = {
  AdminKeyword,
  AdminKeywordGroup,
  AdminRelatedKeyword,
  AdminPublisher,
  AdminArticle,
  AdminBanner,
};

export default OpenAPISchema;
