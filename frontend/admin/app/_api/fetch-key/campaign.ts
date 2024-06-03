const campaignKey = {
  all: () => ["campaign"].join(""),
  list: () => [campaignKey.all() + "List"].join(""),
  detail: (id: number) => [campaignKey.all(), "Detail_", id].join(""),

  slotList: (id: number) => [campaignKey.detail(id) + "SlotList"].join(""),

  slotArticle: ({ id, slotId }: { id: number; slotId: number }) =>
    [campaignKey.slotList(id), "Article_", slotId].join(""),

  slotPublisher: ({ id, slotId }: { id: number; slotId: number }) =>
    [campaignKey.slotList(id), "Publisher_", slotId].join(""),
}

export default campaignKey
