const mainQueryKey = {
  all: () => ["main-page"],

  recommendArticles: {
    all: () => [...mainQueryKey.all(), "recommend-articles"],
    list: (params: any) => [...mainQueryKey.recommendArticles.all(), "list", params],
  },

  recommendPublishers: {
    all: () => [...mainQueryKey.all(), "recommend-publishers"],
    list: (params: any) => [...mainQueryKey.recommendPublishers.all(), "list", params],
  },
}

export default mainQueryKey
