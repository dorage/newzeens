const detailQueryKey = {
  all: () => ["detail"],

  article: {
    all: () => [...detailQueryKey.all(), "article"],
    detail: ({ articleId }: { articleId: string }) => [...detailQueryKey.article.all(), "detail", articleId],
  },

  publisher: {
    all: () => [...detailQueryKey.all(), "publisher"],
    detail: ({ publisherId }: { publisherId: string }) => [...detailQueryKey.publisher.all(), "detail", publisherId],
  },
}

export default detailQueryKey
