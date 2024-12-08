export interface Keyword {
  keyword_id: number
  keyword_name: string
  keyword_group_id: number
  keyword_group_name: string
}

export interface Publisher {
  id: string
  name: string
  thumbnail: string
  description: string
  url_main: string
  url_subscribe: string
  publisher_main: string
  keywords: Keyword[]
}

export interface Article {
  id: string
  title: string
  summary: string
  thumbnail: string
  created_at: string
  url: string
}

export interface RelatedPublisher {
  id: string
  name: string
  description: string
  thumbnail: string
  keywords: Keyword[]
}

export interface PublisherDetailDto {
  publisher: Publisher
  recent_articles: Article[]
  related_publishers: RelatedPublisher[]
}

export interface ArticleDetailDto {
  article: Article
  publisher: Publisher
  related_articles: {
    title: string
    created_at: string
    publisher: {
      id: string
      name: string
      keywords: Keyword[]
    }
  }[]
}
