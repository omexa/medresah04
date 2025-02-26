"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import {
  FaHandsHelping,
  FaHandHoldingHeart,
  FaBuilding,
  FaHandHoldingUsd,
  FaLeaf,
  FaChild,
  FaMosque,
} from "react-icons/fa";

const DonationPage: React.FC = () => {
  const donationTypes = [
    {
      id: 1,
      title: "Zakat (Obligatory Charity)",
      description: "Support the poor and needy with your Zakat.",
      icon: <FaHandsHelping size={40} className="text-yellow-500" />,
      redirectUrl: "/donation/zakat",
    },
    {
      id: 2,
      title: "Sadaqah (Voluntary Charity)",
      description: "Give Sadaqah for blessings and well-being.",
      icon: <FaHandHoldingHeart size={40} className="text-red-500" />,
      redirectUrl: "/donation/sadaqah",
    },
    {
      id: 3,
      title: "Waqf (Endowment)",
      description: "Invest in projects that benefit generations.",
      icon: <FaBuilding size={40} className="text-blue-500" />,
      redirectUrl: "/donation/waqf",
    },
    {
      id: 4,
      title: "Fidya and Kaffara",
      description: "Donate to compensate for missed fasts or oaths.",
      icon: <FaHandHoldingUsd size={40} className="text-green-500" />,
      redirectUrl: "/donation/fidya-kaffara",
    },
    {
      id: 5,
      title: "Sadaqah Jariyah",
      description: "Support ongoing charity projects like wells and schools.",
      icon: <FaLeaf size={40} className="text-teal-500" />,
      redirectUrl: "/donation/sadaqah-jariyah",
    },
    {
      id: 6,
      title: "Helping Orphans and Widows",
      description: "Help support vulnerable orphans and widows.",
      icon: <FaChild size={40} className="text-purple-500" />,
      redirectUrl: "/donation/orphans-widows",
    },
    {
      id: 7,
      title: "General Donations",
      description: "Contribute to mosque development and maintenance.",
      icon: <FaMosque size={40} className="text-indigo-500" />,
      redirectUrl: "/donation/general",
    },
  ];

  return (
    <div className="container mx-auto h-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-900">
        Donate for a Cause
      </h1>
      <Swiper
        modules={[Pagination, Autoplay, EffectCreative]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="creative"
        loop={true} // This makes the swiper loop infinitely
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
            rotate: [0, 0, -45],
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
            rotate: [0, 0, 45],
          },
        }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-full"
      >
        {donationTypes.map((type) => (
          <SwiperSlide key={type.id}>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow w-full p-20">
              <div className="flex items-center justify-center mb-4">
                {type.icon}
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                {type.title}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {type.description}
              </p>
              <div className="text-center">
                <a
                  href="https://donorchoice.ca/embedded/mumfc"
                  target="_blank"
                  className="px-4 py-2 bg-green-700 text-white rounded-sm font-medium hover:bg-yellow-600 transition-all"
                >
                  Donate Now
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DonationPage;
