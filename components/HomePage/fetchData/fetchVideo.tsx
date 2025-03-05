// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, FreeMode, Pagination } from "swiper/modules";
// import { Swiper as SwiperClass } from "swiper"; // ✅ Import Swiper type
// import api from "@/lib/api";

// interface Media {
//   id: string;
//   image: string;
//   type: string;
// }

// const FetchSlide: React.FC = () => {
//   const [events, setEvents] = useState<Media[]>([]);
//   const [loading, setLoading] = useState(false);
//   const swiperRef = useRef<SwiperClass | null>(null); // ✅ Fix TypeScript issue

//   // Fetch events from API
//   const fetchEvents = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get("/activities.php?activity=2");
//       if (Array.isArray(response.data)) {
//         setEvents(response.data);
//       } else {
//         console.error("Unexpected response format:", response.data);
//         setEvents([]);
//       }
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setEvents([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Function to handle video playback time
//   const handleVideoPlay = (videoElement: HTMLVideoElement) => {
//     if (swiperRef.current) {
//       swiperRef.current.autoplay.stop(); // Stop swiper when video plays
//     }
//     videoElement.onended = () => {
//       if (swiperRef.current) {
//         swiperRef.current.slideNext(); // Move to next slide when video ends
//         swiperRef.current.autoplay.start(); // Resume autoplay
//       }
//     };
//   };

//   if (loading) {
//     return <div className="text-center text-gray-500">Loading media...</div>;
//   }

//   return (
//     <div className="h-full w-80 flex justify-center">
//       <Swiper
//         slidesPerView={"auto"}
//         spaceBetween={15}
//         freeMode={true}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000, disableOnInteraction: false }} // Default autoplay time for images
//         modules={[Autoplay, FreeMode, Pagination]}
//         className="w-full"
//         onSwiper={(swiper) => (swiperRef.current = swiper)} // ✅ Fix TypeScript issue
//       >
//         {events.map((event) => (
//           <SwiperSlide key={event.id} className="w-full">
//             <div className="w-80 h-full rounded-lg overflow-hidden shadow-md">
//               {event.type.includes("image") ? (
//                 <img
//                   src={`https://alhudaic.ca/api/${event.image}`}
//                   alt={`Event ${event.id}`}
//                   className="w-full h-full object-cover"
//                 />
//               ) : event.type.includes("video") ? (
//                 <video
//                   src={`https://alhudaic.ca/api/${event.image}`}
//                   className="w-full h-full object-cover"
//                   autoPlay
//                   muted
//                   controls
//                   loop={false}
//                   playsInline
//                   onPlay={(e) => handleVideoPlay(e.currentTarget)} // Detect when video plays
//                 />
//               ) : null}
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default FetchSlide;
"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

interface Slide {
  id: number;
  file_url: string;
  title: string;
}

export default function FetchVideoAndImage() {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch(
        `https://alhudaic.ca/api/slide.php?getslider=2&_=${Date.now()}`
      );
      if (!response.ok) throw new Error("Failed to fetch slides");

      const data = await response.json();
      const validSlides = Array.isArray(data)
        ? data.filter((slide) => slide.file_url && slide.file_url.trim() !== "")
        : [];

      setSlides(validSlides);
    } catch (error) {
      console.error("Error fetching slides:", error);
      setSlides([]);
    }
  };

  const isVideo = (url: string) => /\.(mp4|webm|ogg|mov|avi|mkv)$/.test(url);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Swiper
        direction="horizontal"
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-pagination">${
              index + 1
            }</span>`;
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-full max-w-lg h-[500px] flex items-center justify-center"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="flex items-center justify-center"
          >
            {isVideo(slide.file_url) ? (
              <video
                src={`https://alhudaic.ca/api/${slide.file_url}`}
                className="h-full w-full object-contain"
                autoPlay
                loop
                muted
                controls
              />
            ) : (
              <img
                src={`https://alhudaic.ca/api/${slide.file_url}`}
                alt={slide.title}
                className="h-full w-full object-contain"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styling for Pagination */}
      <style jsx global>{`
        .custom-pagination {
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          border-radius: 50%;
          background-color: white;
          color: black;
          margin: 5px;
          cursor: pointer;
        }

        .swiper-pagination-bullet-active.custom-pagination {
          background-color: green;
        }
      `}</style>
    </div>
  );
}
