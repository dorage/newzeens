import type { KyAppHealthTable } from "./schemes/app_health";
import { AppHealthSchema as _AppHealthSchema } from "./schemes/app_health";
import type { KyArticleTable } from "./schemes/articles";
import { ArticleSchema as _ArticleSchema } from "./schemes/articles";
import type { KyBannerTable } from "./schemes/banners";
import { BannerSchema as _BannerSchema } from "./schemes/banners";
import type { KyKeywordArticleRelTable } from "./schemes/keyword_article_rels";
import { KeywordArticleRelSchema as _KeywordArticleRelSchema } from "./schemes/keyword_article_rels";
import type { KyKeywordPublisherRelTable } from "./schemes/keyword_publisher_rels";
import { KeywordPublisherRelSchema as _KeywordPublisherRelSchema } from "./schemes/keyword_publisher_rels";
import type { KyKeywordTable } from "./schemes/keywords";
import { KeywordSchema as _KeywordSchema } from "./schemes/keywords";
import type { KyPublisherTable } from "./schemes/publishers";
import { PublisherSchema as _PublisherSchema } from "./schemes/publishers";
import type { KyCampaignTable } from "./schemes/campaigns";
import { CampaignSchema as _CampaignSchema } from "./schemes/campaigns";
import type { KySlotTable } from "./schemes/slots";
import { SlotSchema as _SlotSchema } from "./schemes/slots";
import type { KySlotArticleTable } from "./schemes/slot_articles";
import { SlotArticleSchema as _SlotArticleSchema } from "./schemes/slot_articles";
import type { KySlotPublisherTable } from "./schemes/slot_publishers";
import { SlotPublisherSchema as _SlotPublisherSchema } from "./schemes/slot_publishers";

export interface DB {
  app_health: KyAppHealthTable;
  keywords: KyKeywordTable;
  publishers: KyPublisherTable;
  keyword_publisher_rels: KyKeywordPublisherRelTable;
  articles: KyArticleTable;
  keyword_article_rels: KyKeywordArticleRelTable;
  banners: KyBannerTable;
  campaigns: KyCampaignTable;
  slots: KySlotTable;
  slot_articles: KySlotArticleTable;
  slot_publishers: KySlotPublisherTable;
}

export const AppHealthSchema = _AppHealthSchema;
export const ArticleSchema = _ArticleSchema;
export const BannerSchema = _BannerSchema;
export const KeywordArticleRelSchema = _KeywordArticleRelSchema;
export const KeywordPublisherRelSchema = _KeywordPublisherRelSchema;
export const KeywordSchema = _KeywordSchema;
export const PublisherSchema = _PublisherSchema;
export const CampaignSchema = _CampaignSchema;
export const SlotSchema = _SlotSchema;
export const SlotArticleSchema = _SlotArticleSchema;
export const SlotPublisherSchema = _SlotPublisherSchema;

// use adapter what you want
import { SQLiteAdapter as _SQLiteAdapter } from "./adapters/sqlite";
export const KyselyAdapter = _SQLiteAdapter<DB>;
