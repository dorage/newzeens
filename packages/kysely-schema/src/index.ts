import type { KyJTITable } from "./schemas/jtis";
import { JTISchema as _JTISchema } from "./schemas/jtis";
import type { KyAppHealthTable } from "./schemas/app_health";
import { AppHealthSchema as _AppHealthSchema } from "./schemas/app_health";
import type { KyArticleTable } from "./schemas/articles";
import { ArticleSchema as _ArticleSchema } from "./schemas/articles";
import type { KyKeywordArticleRelTable } from "./schemas/keyword_article_rels";
import { KeywordArticleRelSchema as _KeywordArticleRelSchema } from "./schemas/keyword_article_rels";
import type { KyKeywordPublisherRelTable } from "./schemas/keyword_publisher_rels";
import { KeywordPublisherRelSchema as _KeywordPublisherRelSchema } from "./schemas/keyword_publisher_rels";
import type { KyKeywordTable } from "./schemas/keywords";
import { KeywordSchema as _KeywordSchema } from "./schemas/keywords";
import type { KyKeywordGroupTable } from "./schemas/keyword-groups";
import { KeywordGroupSchema as _KeywordGroupSchema } from "./schemas/keyword-groups";
import type { KyPublisherTable } from "./schemas/publishers";
import { PublisherSchema as _PublisherSchema } from "./schemas/publishers";
import type { KyCampaignTable } from "./schemas/campaigns";
import { CampaignSchema as _CampaignSchema } from "./schemas/campaigns";
import type { KySlotTable } from "./schemas/slots";
import { SlotSchema as _SlotSchema } from "./schemas/slots";
import type { KySlotArticleTable } from "./schemas/slot_articles";
import { SlotArticleSchema as _SlotArticleSchema } from "./schemas/slot_articles";
import type { KySlotPublisherTable } from "./schemas/slot_publishers";
import { SlotPublisherSchema as _SlotPublisherSchema } from "./schemas/slot_publishers";

export interface DB {
	jtis: KyJTITable;
	app_health: KyAppHealthTable;
	keywords: KyKeywordTable;
	keyword_groups: KyKeywordGroupTable;
	publishers: KyPublisherTable;
	keyword_publisher_rels: KyKeywordPublisherRelTable;
	articles: KyArticleTable;
	keyword_article_rels: KyKeywordArticleRelTable;
	campaigns: KyCampaignTable;
	slots: KySlotTable;
	slot_articles: KySlotArticleTable;
	slot_publishers: KySlotPublisherTable;
}

export const AppHealthSchema = _AppHealthSchema;
export const ArticleSchema = _ArticleSchema;
export const KeywordArticleRelSchema = _KeywordArticleRelSchema;
export const KeywordPublisherRelSchema = _KeywordPublisherRelSchema;
export const KeywordSchema = _KeywordSchema;
export const KeywordGroupSchema = _KeywordGroupSchema;
export const PublisherSchema = _PublisherSchema;
export const CampaignSchema = _CampaignSchema;
export const SlotSchema = _SlotSchema;
export const SlotArticleSchema = _SlotArticleSchema;
export const SlotPublisherSchema = _SlotPublisherSchema;
export const JTISchema = _JTISchema;

// use adapter what you want
import { SQLiteAdapter as _SQLiteAdapter } from "./adapters/sqlite";
export const KyselyAdapter = _SQLiteAdapter<DB>;
