import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import {Link} from 'react-router-dom'
import Card from "./Card";

const Items = ({data}) => {
  return (
    <div className="mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold italic mb-4">{data[0].tag.toUpperCase()}</h2>
          <Link className="underline underline-offset-2 text-blue-500 hover:text-blue-900" to={`/organize/mainpage/${data[0].tag}`}>Show More</Link> {/*i will use tag to link this button hallpage or any other page /mainpage/data.tag*/}
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="halls-slider"
        >
          {data.slice(0, 6).map((item, index) => (
            <SwiperSlide key={index}>
              <Card detail={item} id={item.id}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  )
}

export default Items