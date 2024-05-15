import Image from "next/image"
import Link from "next/link"
import Header from "./_components/header"
import MainBanner from "./_components/home/main-banner"
import NewsLetterRanking from "./_components/home/new-letter-ranking"
import NewsLetterList from "./_components/home/news-letter-list"
import RecommendArticles from "./_components/home/recommend-articles"

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <MainBanner />

        <div className="mx-auto max-w-screen-xl">
          <div className="bg-white px-20 py-40 xl:px-40 xl:py-60">
            <RecommendArticles />
          </div>
          <div className="bg-white p-20 pb-40 xl:px-40 xl:pb-80">
            <NewsLetterRanking />
          </div>

          <div className="px-20 py-40 xl:px-40 xl:py-80">
            <NewsLetterList />
          </div>
        </div>
      </main>
    </>
  )
}
