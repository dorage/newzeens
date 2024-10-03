"use client"

import React from "react"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import DeveloperBanner from "@/public/banner/developer.png"
import MarketerBanner from "@/public/banner/marketer.png"
import DesignerBanner from "@/public/banner/designer.png"
import Image from "next/image"
import Link from "next/link"
import { SwiperOptions } from "swiper/types"
import "swiper/css"
import "swiper/css/pagination"

const MainBanner = () => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <Swiper {...BANNER_SWIPER_SETTINGS}>
        {BANNER_DATA.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="w-full h-auto">
              <Link href={banner.href}>
                <Image src={banner.src} alt={banner.category} />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MainBanner

const BANNER_SWIPER_SETTINGS: SwiperOptions = {
  autoplay: {
    delay: 5000,
  },
  loop: true,
  modules: [Pagination, Autoplay],
}

const BANNER_DATA = [
  {
    id: 1,
    category: "developer",
    src: DeveloperBanner,
    href: "/search?word=IT",
  },
  {
    id: 2,
    category: "marketer",
    src: MarketerBanner,
    href: "/search?word=IT",
  },
  {
    id: 3,
    category: "designer",
    src: DesignerBanner,
    href: "/search?word=IT",
  },
]
