import { z } from "@hono/zod-openapi";
import { KeywordGroupRelSchema, KeywordGroupSchema, KeywordSchema } from "kysely-schema";

const AdminKeywordGroup = z.object({}).merge(KeywordGroupSchema).openapi("AdminKeywordGroup");

const AdminRelatedKeyword = z
  .object({})
  .merge(KeywordSchema)
  .extend({
    preference: KeywordGroupRelSchema.shape.preference,
  })
  .openapi("AdminRelatedKeyword");

const OpenAPISchema = { AdminKeywordGroup, AdminRelatedKeyword };

export default OpenAPISchema;
