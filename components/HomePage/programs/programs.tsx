// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// interface Program {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
// }

// const ProgramsPage: React.FC = () => {
//   const programs: Program[] = [
//     {
//       id: 1,
//       title: "Friday Prayers (Jumu'ah)",
//       description:
//         "Weekly congregational prayers on Fridays, which include a sermon (Khutbah) followed by the main prayer.",
//       date: "Every Friday, 1:00 PM",
//     },
//     {
//       id: 2,
//       title: "Islamic Educational Classes",
//       description:
//         "Classes aimed at teaching the basics of Islam, including Quranic studies, Fiqh (Islamic jurisprudence), and Islamic history.",
//       date: "Every Monday and Wednesday, 6:00 PM",
//     },
//     {
//       id: 3,
//       title: "Youth Programs",
//       description:
//         "Activities designed for young members of the community, including Quran recitation competitions, Islamic quizzes, and social gatherings.",
//       date: "Every Saturday, 10:00 AM",
//     },
//     {
//       id: 4,
//       title: "Charity Drives",
//       description:
//         "Organizing charitable initiatives such as food distribution, fundraising for underprivileged communities, and aiding the poor.",
//       date: "Every second Sunday of the month, 2:00 PM",
//     },
//     {
//       id: 5,
//       title: "Health & Wellness Programs",
//       description:
//         "Providing health check-ups, fitness programs, mental health workshops, and dietary guidance based on Islamic principles of health.",
//       date: "Every Tuesday, 5:00 PM",
//     },
//     {
//       id: 6,
//       title: "Marriage Counseling",
//       description:
//         "Offering premarital counseling and guidance for married couples based on Islamic teachings about family and relationships.",
//       date: "By appointment, available throughout the week",
//     },
//   ];

//   return (
//     <div className="container mx-auto py-12 px-4">
//       <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
//         Mosque Programs
//       </h1>
//       <Swiper
//         modules={[Autoplay, Pagination]}
//         spaceBetween={30}
//         loop={true}
//         autoplay={{
//           delay: 3000, // 3 seconds delay
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//           renderBullet: (index, className) => {
//             return `<span class="${className}" style="font-size: 16px; width: 16px; height: 16px; border-radius: 50%; background-color: #2d6a4f; display: inline-block; margin: 0 8px;"></span>`;
//           },
//         }}
//         breakpoints={{
//           640: {
//             slidesPerView: 1, // 1 slide for small screens
//           },
//           768: {
//             slidesPerView: 2, // 2 slides for medium screens
//           },
//           1024: {
//             slidesPerView: 3, // 3 slides for large screens
//           },
//         }}
//         className="custom-swiper"
//       >
//         {programs.map((program) => (
//           <SwiperSlide key={program.id}>
//             <div className="relative bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col max-h-[400px]">
//               <div className="p-6 flex flex-col h-full">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2 flex-grow">
//                   {program.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4 flex-grow">
//                   {program.description}
//                 </p>
//                 <p className="text-green-700 font-semibold mb-4">
//                   {program.date}
//                 </p>
//                 <button className="mt-auto px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-gold-600">
//                   Register
//                 </button>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <div className="swiper-pagination mb-40" />{" "}
//       {/* Added margin to prevent collapse */}
//       <style jsx>{`
//         .custom-swiper .swiper-slide {
//           transition: transform 0.5s, opacity 0.5s;
//         }

//         .custom-swiper .swiper-slide-active {
//           transform: scale(1.05); /* Slight zoom-in for active slide */
//           opacity: 1;
//         }

//         .custom-swiper .swiper-slide:not(.swiper-slide-active) {
//           transform: scale(0.95); /* Slight zoom-out for non-active slides */
//           opacity: 0.7;
//         }

//         .swiper-button-next,
//         .swiper-button-prev {
//           color: #2d6a4f; /* Green-800 */
//           font-size: 20px;
//         }

//         .swiper-button-next:hover,
//         .swiper-button-prev:hover {
//           color: #34d399; /* Green-400 on hover */
//         }

//         .swiper-pagination-bullet {
//           background-color: #2d6a4f; /* Green-800 for dots */
//         }

//         .swiper-pagination-bullet-active {
//           background-color: #34d399; /* Green-400 for active dot */
//         }
//       `}</style>
//     </div>
//   );
// };

// ==============================================================================================
// export default ProgramsPage;
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import api from "@/lib/api";

type Activity = {
  id: string;
  type: string;
  icon: string | null;
  title: string | null;
  content: string | null;
  link: string;
  image: string;
  uploaded_at: string;
};

const ProgramsPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch activities from API
  const fetchActivities = async () => {
    try {
      const response = await api.get("/activities.php?activity=2");

      setActivities(response.data);
      // console.log("hhhhhhh", response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
        Mosque Programs
      </h1>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000, // 3 seconds delay
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}" style="font-size: 16px; width: 16px; height: 16px; border-radius: 50%; background-color: #2d6a4f; display: inline-block; margin: 0 8px;"></span>`;
          },
        }}
        breakpoints={{
          640: {
            slidesPerView: 1, // 1 slide for small screens
          },
          768: {
            slidesPerView: 2, // 2 slides for medium screens
          },
          1024: {
            slidesPerView: 3, // 3 slides for large screens
          },
        }}
        className="custom-swiper"
      >
        {activities.map((activity) => (
          <SwiperSlide key={activity.id}>
            <div className="relative bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col max-h-[400px]">
              <img
                src={"https://alhudaic.ca/api/" + activity.image}
                alt={activity.title || "Activity Image"}
                className="w-full h-40 object-cover"
              />
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex-grow">
                  {activity.title || "N/A"}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {activity.content || "No description available."}
                </p>
                <p className="text-green-700 font-semibold mb-4">
                  {activity.uploaded_at}
                </p>
                <button className="mt-auto px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-gold-600">
                  <a
                    href={activity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register
                  </a>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination mb-40" />{" "}
      {/* Added margin to prevent collapse */}
      <style jsx>{`
        .custom-swiper .swiper-slide {
          transition: transform 0.5s, opacity 0.5s;
        }

        .custom-swiper .swiper-slide-active {
          transform: scale(1.05); /* Slight zoom-in for active slide */
          opacity: 1;
        }

        .custom-swiper .swiper-slide:not(.swiper-slide-active) {
          transform: scale(0.95); /* Slight zoom-out for non-active slides */
          opacity: 0.7;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: #2d6a4f; /* Green-800 */
          font-size: 20px;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: #34d399; /* Green-400 on hover */
        }

        .swiper-pagination-bullet {
          background-color: #2d6a4f; /* Green-800 for dots */
        }

        .swiper-pagination-bullet-active {
          background-color: #34d399; /* Green-400 for active dot */
        }
      `}</style>
    </div>
  );
};

export default ProgramsPage;
// 'use client'
// import api from '@/lib/api'
// import React, { useEffect, useState } from 'react'

// function Page () {
//   const [data, setData] = useState('')

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get('/api/shortEvent.php?getshortEvent=1')
//         console.log('Response:', response)
//         setData(response.data) // Update state with response data
//       } catch (error) {
//         console.error('Error fetching data:', error)
//       }
//     }

//     fetchData()
//   }, []) // Runs only once when the component mounts

//   return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>
// }

// export default Page
