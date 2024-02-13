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

export interface DB {
  app_health: KyAppHealthTable;
  keywords: KyKeywordTable;
  publishers: KyPublisherTable;
  keyword_publisher_rels: KyKeywordPublisherRelTable;
  articles: KyArticleTable;
  keyword_article_rels: KyKeywordArticleRelTable;
  banners: KyBannerTable;
}

export const AppHealthSchema = _AppHealthSchema;
export const ArticleSchema = _ArticleSchema;
export const BannerSchema = _BannerSchema;
export const KeywordArticleRelSchema = _KeywordArticleRelSchema;
export const KeywordPublisherRelSchema = _KeywordPublisherRelSchema;
export const KeywordSchema = _KeywordSchema;
export const PublisherSchema = _PublisherSchema;

// use adapter what you want
import { SQLiteAdapter as _SQLiteAdapter } from "./adapters/sqlite";
export const KyselyAdapter = _SQLiteAdapter<DB>;
