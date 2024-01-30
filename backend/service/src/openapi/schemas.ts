import { z } from "@hono/zod-openapi";
import { KeywordGroupRelSchema, KeywordGroupSchema, KeywordSchema } from "kysely-schema";

const AdminKeyword = z.object({}).merge(KeywordSchema).openapi("AdminKeyword");

const AdminRelatedKeyword = z
  .object({})
  .merge(KeywordSchema)
  .extend({
    preference: KeywordGroupRelSchema.shape.preference,
  })
  .openapi("AdminRelatedKeyword");

const AdminKeywordGroup = z.object({}).merge(KeywordGroupSchema).openapi("AdminKeywordGroup");

const OpenAPISchema = { AdminKeyword, AdminKeywordGroup, AdminRelatedKeyword };

export default OpenAPISchema;
