import React from "react";
import { FaMosque, FaDonate, FaBook, FaChild, FaQuran } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";

const ActivityPage: React.FC = () => {
  const activities = [
    {
      id: 1,
      title: "Mosque Development",
      description:
        "Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.",
      icon: <FaMosque />,
    },
    {
      id: 2,
      title: "Charity & Donation",
      description:
        "Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.",
      icon: <FaDonate />,
    },
    {
      id: 3,
      title: "Quran Learning",
      description:
        "Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.",
      icon: <FaQuran />,
    },
    {
      id: 4,
      title: "Hadith & Sunnah",
      description:
        "Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.",
      icon: <FaBook />,
    },
    {
      id: 5,
      title: "Parent Education",
      description:
        "Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.",
      icon: <MdFamilyRestroom />,
    },
    {
      id: 6,
      title: "Help Orphans",
      description:
        "Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.",
      icon: <FaChild />,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        Activities
      </h1>
      <p className="text-lg text-center text-gray-600 mb-12">
        Here Are Our Activities
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="flex items-center justify-center mb-4 text-green-700 text-5xl">
              {activity.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              {activity.title}
            </h3>
            <p className="text-gray-600 text-center mb-4">
              {activity.description}
            </p>
            <div className="text-center">
              <button className="px-4 py-2 bg-green-700 text-white rounded-sm hover:bg-gold-600">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityPage;
