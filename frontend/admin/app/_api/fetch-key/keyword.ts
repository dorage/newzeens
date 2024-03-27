const keywordKey = {
  all: () => ["keywordGroup"].join(""),
  list: () => [keywordKey.all() + "List"].join(""),
  detail: (id: number) => [keywordKey.all(), "Detail_", id].join(""),
}

export default keywordKey
