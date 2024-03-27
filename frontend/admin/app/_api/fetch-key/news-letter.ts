const newsLetterKey = {
  publisher: () => ["publisher"].join(""),
  publisherDetail: (id: string) => [newsLetterKey.publisher(), "detail", id].join(""),
  article: () => ["article"].join(""),
}
export default newsLetterKey
