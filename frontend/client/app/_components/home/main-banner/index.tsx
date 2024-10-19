"use client"

import React from "react"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import DeveloperBanner from "@/public/banner/developer.png"
import DeveloperMobile from "@/public/banner/m3.png"
import DesignerMobile from "@/public/banner/m1.png"
import MarketerBanner from "@/public/banner/marketer.png"
import MarketerMobile from "@/public/banner/m2.png"
import DesignerBanner from "@/public/banner/designer.png"
import Image from "next/image"
import Link from "next/link"
import { SwiperOptions } from "swiper/types"
import { sendEvent } from "@/app/_meta/track"
import "swiper/css"
import "swiper/css/pagination"

const MainBanner = () => {
  return (
    <>
      <div className="block md:hidden">
        <div className="w-full">
          <Swiper {...BANNER_SWIPER_SETTINGS}>
            {BANNER_DATA.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="w-full h-auto">
                  <Link
                    href={banner.href}
                    onClick={() => {
                      sendEvent("mobile_banner_click", {
                        category: banner.category,
                      })
                    }}
                  >
                    <Image src={banner.mobileSrc} alt={banner.category} />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="max-w-[1280px] mx-auto">
          <Swiper {...BANNER_SWIPER_SETTINGS}>
            {BANNER_DATA.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="w-full h-auto">
                  <Link
                    href={banner.href}
                    onClick={() => {
                      sendEvent("pc_banner_click", {
                        category: banner.category,
                      })
                    }}
                  >
                    <Image src={banner.src} alt={banner.category} />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
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
    mobileSrc: DeveloperMobile,
    // 프로덕션 요즘IT
    href: "/news-letter/odsljy",
  },
  {
    id: 2,
    category: "marketer",
    src: MarketerBanner,
    mobileSrc: MarketerMobile,
    // 프로덕션 와이즈앱
    href: "/news-letter/sgpktm",
  },
  {
    id: 3,
    category: "designer",
    src: DesignerBanner,
    mobileSrc: DesignerMobile,
    // 프로덕션 디자인나침반
    href: "/news-letter/bbzlfu",
  },
]
