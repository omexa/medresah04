import React from "react";
import Image from "next/image";

const EventPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gold">
        Online Fundraising Program
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center md:items-start gap-6">
        <div className="flex-1">
          <p className="text-center md:text-3xl text-white mb-6">
            Join us live and support our masjid on Saturday, January 25, 2025.
            The event will be held in Calgary, AB, Canada.
          </p>
          <p className="text-white leading-relaxed md:text-2xl font-mono">
            This event is a great opportunity to come together as a community
            and support our masjid. We hope to see you there to make a
            meaningful contribution and strengthen our bonds.
          </p>
        </div>
        <div className="flex-1 border-2 border-gray-200 rounded-lg overflow-hidden">
          <Image
            alt="Join us live and support our masjid on Saturday, January 25, 2025, at Calgary, AB, Canada"
            width={1000}
            height={1000}
            src="/img/event1.jpg"
            className="w-full h-auto object-contain size-48"
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
