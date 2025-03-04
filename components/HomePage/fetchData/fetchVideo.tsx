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
import { Pagination } from "swiper/modules";

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
        "http://alhudaic.ca/api/slide.php?getslider=2"
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

  return (
    <div className="">
      <Swiper
        direction="vertical"
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="flex items-center justify-center"
          >
            {slide.file_url.endsWith(".mp4") ||
            slide.file_url.endsWith(".webm") ? (
              <video
                src={`http://alhudaic.ca/api/${slide.file_url}`}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                controls
              />
            ) : (
              <img
                src={`http://alhudaic.ca/api/${slide.file_url}`}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
