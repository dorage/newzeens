import type { DB as _DB } from "./migrations/v0.0.0-2024-04-29T07:31:56.202Z/index";
import * as DBSchema from "./migrations/v0.0.0-2024-04-29T07:31:56.202Z/index";

export type DB = _DB;

export const ArticleSchema = DBSchema.ArticleSchema;
export const KeywordArticleRelSchema = DBSchema.KeywordArticleRelSchema;
export const KeywordPublisherRelSchema = DBSchema.KeywordPublisherRelSchema;
export const KeywordSchema = DBSchema.KeywordSchema;
export const KeywordGroupSchema = DBSchema.KeywordGroupSchema;
export const PublisherSchema = DBSchema.PublisherSchema;
export const CampaignSchema = DBSchema.CampaignSchema;
export const SlotSchema = DBSchema.SlotSchema;
export const SlotArticleSchema = DBSchema.SlotArticleSchema;
export const SlotPublisherSchema = DBSchema.SlotPublisherSchema;
export const JTISchema = DBSchema.JTISchema;

// use adapter what you want
import { SQLiteAdapter as _SQLiteAdapter } from "./adapters/sqlite";
export const KyselyAdapter = _SQLiteAdapter<DB>;
