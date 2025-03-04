// import React from "react";
// import { FaMosque, FaDonate, FaBook, FaChild, FaQuran } from "react-icons/fa";
// import { MdFamilyRestroom } from "react-icons/md";

// const ActivityPage: React.FC = () => {
//   const activities = [
//     {
//       id: 1,
//       title: "Mosque Development",
//       description:
//         "Support the construction and maintenance of mosques to serve the community.",
//       icon: <FaMosque />,
//     },
//     {
//       id: 2,
//       title: "Charity & Donation",
//       description:
//         "Provide financial and material support to those in need within our community.",
//       icon: <FaDonate />,
//     },
//     {
//       id: 3,
//       title: "Quran Learning",
//       description:
//         "Join our Quran classes to learn and memorize the Holy Quran with qualified teachers.",
//       icon: <FaQuran />,
//     },
//     {
//       id: 4,
//       title: "Hadith & Sunnah",
//       description:
//         "Study the teachings of the Prophet Muhammad (PBUH) through Hadith and Sunnah sessions.",
//       icon: <FaBook />,
//     },
//     {
//       id: 5,
//       title: "Parent Education",
//       description:
//         "Workshops and resources to help parents raise children with Islamic values.",
//       icon: <MdFamilyRestroom />,
//     },
//     {
//       id: 6,
//       title: "Help Orphans",
//       description:
//         "Sponsor and support orphaned children to ensure their well-being and education.",
//       icon: <FaChild />,
//     },
//   ];

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
//         Activities
//       </h1>
//       <p className="text-lg text-center text-gray-600 mb-12">
//         Here Are Our Activities
//       </p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {activities.map((activity) => (
//           <div
//             key={activity.id}
//             className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105"
//           >
//             <div className="flex items-center justify-center mb-4 text-green-700 text-5xl">
//               {activity.icon}
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
//               {activity.title}
//             </h3>
//             <p className="text-gray-600 text-center mb-4">
//               {activity.description}
//             </p>
//             <div className="text-center">
//               <button className="px-4 py-2 bg-green-700 text-white rounded-sm hover:bg-gold-600">
//                 Learn More
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActivityPage;






// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";
// import "swiper/css/pagination";
// import api from "@/lib/api";

// type Activity = {
//   id: string;
//   type: string;
//   icon: string | null;
//   title: string | null;
//   content: string | null;
//   link: string;
//   image: string;
//   uploaded_at: string;
// };

// const ProgramsPage: React.FC = () => {
//   const [activities, setActivities] = useState<Activity[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch activities from API
//   const fetchActivities = async () => {
//     try {
//       const response = await api.get("/activities.php?activity=2");
//       setActivities(response.data);
//     } catch (error) {
//       console.error("Error fetching activities:", error);
//       setActivities([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchActivities();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto py-12 px-4">
//       <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
//         Activities
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
//         {activities.map((activity) => (
//           <SwiperSlide key={activity.id}>
//             <div className="relative bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col max-h-[400px]">
//               {/* Display only the image if it exists */}
//               {activity.image ? (
//                 <img
//                   src={"https://alhudaic.ca/api/" + activity.image}
//                   alt={activity.title || "Activity Image"}
//                   className="w-full h-40 object-cover"
//                 />
//               ) : (
//                 // Display title, description, and other details if no image
//                 <div className="p-6 flex flex-col h-full">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2 flex-grow">
//                     {activity.title || "N/A"}
//                   </h3>
//                   <p className="text-gray-600 mb-4 flex-grow">
//                     {activity.content || "No description available."}
//                   </p>
//                   <p className="text-green-700 font-semibold mb-4">
//                     {activity.uploaded_at}
//                   </p>
//                   <button className="mt-auto px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-gold-600">
//                     <a
//                       href={activity.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Register
//                     </a>
//                   </button>
//                 </div>
//               )}
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

// export default ProgramsPage;


import React, { useEffect, useState } from "react";
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
        Activities
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="relative bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col max-h-[400px]"
          >
            {/* Display the image if it exists */}
            {activity.image && (
              <img
              
                src={"https://alhudaic.ca/api/" + activity.image}
                alt={activity.title || "Activity Image"}
                className="w-full h-40 object-cover"
              />
            )}

            {/* Card content (title, description, uploaded_at) */}
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
            </div>

            {/* Register button (always displayed) */}
            <div className="p-6">
              <button className="w-full px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-gold-600">
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
        ))}
      </div>
    </div>
  );
};

export default ProgramsPage;