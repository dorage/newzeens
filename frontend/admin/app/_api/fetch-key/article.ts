const articleKey = {
  all: () => ["article"].join(""),
  list: () => [articleKey.all() + "List"].join(""),

  detail: (id: string) => [articleKey.all(), "Detail_", id].join(""),
}

export default articleKey
