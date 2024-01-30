import { z } from "@hono/zod-openapi";
import {
  ArticleSchema,
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

const OpenAPISchema = {
  AdminKeyword,
  AdminKeywordGroup,
  AdminRelatedKeyword,
  AdminPublisher,
  AdminArticle,
};

export default OpenAPISchema;
