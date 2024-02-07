import type { KyAppHealthTable } from "./schemes/app_health";
import { AppHealthSchema as _AppHealthSchema } from "./schemes/app_health";
import type { KyArticleTable } from "./schemes/articles";
import { ArticleSchema as _ArticleSchema } from "./schemes/articles";
import type { KyBannerTable } from "./schemes/banners";
import { BannerSchema as _BannerSchema } from "./schemes/banners";
import type { KyKeywordArticleRelTable } from "./schemes/keyword_article_rels";
import { KeywordArticleRelSchema as _KeywordArticleRelSchema } from "./schemes/keyword_article_rels";
import type { KyKeywordGroupRelTable } from "./schemes/keyword_group_rels";
import { KeywordGroupRelSchema as _KeywordGroupRelSchema } from "./schemes/keyword_group_rels";
import type { KyKeywordGroupTable } from "./schemes/keyword_groups";
import { KeywordGroupSchema as _KeywordGroupSchema } from "./schemes/keyword_groups";
import type { KyKeywordPublisherRelTable } from "./schemes/keyword_publisher_rels";
import { KeywordPublisherRelSchema as _KeywordPublisherRelSchema } from "./schemes/keyword_publisher_rels";
import type { KyKeywordTable } from "./schemes/keywords";
import { KeywordSchema as _KeywordSchema } from "./schemes/keywords";
import type { KyPublisherTable } from "./schemes/publishers";
import { PublisherSchema as _PublisherSchema } from "./schemes/publishers";
import type { KyKeywordGroupRelArticleTable } from "./schemes/keyword_group_rel_articles";
import { KeywordGroupRelArticleSchema as _KeywordGroupRelArticleSchema } from "./schemes/keyword_group_rel_articles";
import type { KyKeywordGroupRelPublisherTable } from "./schemes/keyword_group_rel_publishers";
import { KeywordGroupRelPublisherSchema as _KeywordGroupRelPublisherSchema } from "./schemes/keyword_group_rel_publishers";

export interface DB {
  app_health: KyAppHealthTable;
  keyword_groups: KyKeywordGroupTable;
  keywords: KyKeywordTable;
  keyword_group_rels: KyKeywordGroupRelTable;
  publishers: KyPublisherTable;
  keyword_publisher_rels: KyKeywordPublisherRelTable;
  articles: KyArticleTable;
  keyword_article_rels: KyKeywordArticleRelTable;
  banners: KyBannerTable;
  keyword_group_rel_articles: KyKeywordGroupRelArticleTable;
  keyword_group_rel_publishers: KyKeywordGroupRelPublisherTable;
}

export const AppHealthSchema = _AppHealthSchema;
export const ArticleSchema = _ArticleSchema;
export const BannerSchema = _BannerSchema;
export const KeywordArticleRelSchema = _KeywordArticleRelSchema;
export const KeywordGroupRelSchema = _KeywordGroupRelSchema;
export const KeywordGroupSchema = _KeywordGroupSchema;
export const KeywordPublisherRelSchema = _KeywordPublisherRelSchema;
export const KeywordSchema = _KeywordSchema;
export const PublisherSchema = _PublisherSchema;
export const KeywordGroupRelArticleSchema = _KeywordGroupRelArticleSchema;
export const KeywordGroupRelPublisherSchema = _KeywordGroupRelPublisherSchema;

// use adapter what you want
import { SQLiteAdapter as _SQLiteAdapter } from "./adapters/sqlite";
export const KyselyAdapter = _SQLiteAdapter<DB>;
