import { z } from "@hono/zod-openapi";
import { ArticleSchema, BannerSchema, KeywordSchema, PublisherSchema } from "kysely-schema";

const AdminKeyword = z.object({}).merge(KeywordSchema).openapi("AdminKeyword");

const AdminRelatedKeyword = z
  .object({})
  .merge(KeywordSchema)
  .extend({})
  .openapi("AdminRelatedKeyword");

const AdminPublisher = z.object({}).merge(PublisherSchema).openapi("AdminPublisher");

const AdminArticle = z.object({}).merge(ArticleSchema).openapi("AdminArticle");

const AdminBanner = z.object({}).merge(BannerSchema).openapi("AdminBanner");

const OpenAPISchema = {
  AdminKeyword,
  AdminRelatedKeyword,
  AdminPublisher,
  AdminArticle,
  AdminBanner,
};

export default OpenAPISchema;
