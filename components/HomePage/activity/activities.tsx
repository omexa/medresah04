import React from "react";
import { FaMosque, FaDonate, FaBook, FaChild, FaQuran } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";

const ActivityPage: React.FC = () => {
  const activities = [
    {
      id: 1,
      title: "Mosque Development",
      description:
        "Support the construction and maintenance of mosques to serve the community.",
      icon: <FaMosque />,
    },
    {
      id: 2,
      title: "Charity & Donation",
      description:
        "Provide financial and material support to those in need within our community.",
      icon: <FaDonate />,
    },
    {
      id: 3,
      title: "Quran Learning",
      description:
        "Join our Quran classes to learn and memorize the Holy Quran with qualified teachers.",
      icon: <FaQuran />,
    },
    {
      id: 4,
      title: "Hadith & Sunnah",
      description:
        "Study the teachings of the Prophet Muhammad (PBUH) through Hadith and Sunnah sessions.",
      icon: <FaBook />,
    },
    {
      id: 5,
      title: "Parent Education",
      description:
        "Workshops and resources to help parents raise children with Islamic values.",
      icon: <MdFamilyRestroom />,
    },
    {
      id: 6,
      title: "Help Orphans",
      description:
        "Sponsor and support orphaned children to ensure their well-being and education.",
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
