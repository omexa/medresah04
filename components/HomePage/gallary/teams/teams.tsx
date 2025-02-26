import Image from "next/image";
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const TeamsPage: React.FC = () => {
  return (
    <div className="container mx-auto pt-32 pb-12 px-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-8 text-green-600">
        Our Team
      </h1>

      {/* Main Section */}
      <div className="flex flex-wrap lg:flex-nowrap gap-8 items-start">
        {/* President Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/img/team-1.jpg" // Replace with actual image URL
            alt="Anamul Hasan"
            width={600}
            height={600}
            className="w-full max-w-sm h-auto rounded-lg shadow-lg object-cover lg:max-w-md"
          />
        </div>

        {/* President Details and Other Members */}
        <div className="flex-1 space-y-12">
          {/* President Details */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Anamul Hasan</h2>
            <p className="text-green-600 text-lg font-semibold">President</p>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Aliquip ex ea commodo consequat.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Other Team Members */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Other Members
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  id: 1,
                  name: "Mustafa Kamal",
                  role: "Imam",
                  image: "/img/team-1.jpg", // Replace with actual image URL
                },
                {
                  id: 2,
                  name: "Nahiyan Momen",
                  role: "Teacher",
                  image: "/img/team-2.jpg", // Replace with actual image URL
                },
                {
                  id: 3,
                  name: "Asfaque Ali",
                  role: "Volunteer",
                  image: "/img/team-3.jpg", // Replace with actual image URL
                },
              ].map((member) => (
                <div
                  key={member.id}
                  className="relative bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow group"
                >
                  {/* Image */}
                  <div
                    className="w-full h-48 rounded-t-lg bg-cover bg-top transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    style={{ backgroundImage: `url(${member.image})` }}
                  ></div>
                  {/* Details */}
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-800">
                      {member.name}
                    </h4>
                    <p className="text-green-600 text-sm">{member.role}</p>
                  </div>
                  {/* Social Media */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out">
                    <div className="flex space-x-4 text-white">
                      <a href="#" className="hover:text-gold-500">
                        <FaFacebook size={20} />
                      </a>
                      <a href="#" className="hover:text-gold-500">
                        <FaTwitter size={20} />
                      </a>
                      <a href="#" className="hover:text-gold-500">
                        <FaLinkedin size={20} />
                      </a>
                      <a href="#" className="hover:text-gold-500">
                        <FaInstagram size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
