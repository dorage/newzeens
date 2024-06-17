export interface KeywordDto {
  keyword_group_id: number
  keyword_group_name: string
  keyword_id: number
  keyword_name: string
}

export interface PublisherDto {
  id: string
  description: string
  keywords: KeywordDto[]
  name: string
  thumbnail: string
}

export interface ArticleDto {
  id: string
  title: string
  publisher: PublisherDto
  created_at: string
  thumbnail: string
}

export interface SlotPublisherDto {
  name: string
  publishers: PublisherDto[]
}
export interface SlotArticleDto {
  name: string
  articles: ArticleDto[]
}

export interface CampaignPublishersResponse {
  name: string
  slots: SlotPublisherDto[]
}

export interface CampaignArticlesResponse {
  name: string
  slots: SlotArticleDto[]
}
