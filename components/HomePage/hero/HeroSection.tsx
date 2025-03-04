"use client";
import React, { useEffect, useRef, useState } from "react";

import { FaPaypal } from "react-icons/fa";
// import FetchSlide from "../fetchData/fetchVideo";
import FetchVideoAndImage from "../fetchData/fetchVideo";

const HeroSection: React.FC = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textElement = textRef.current;
    const handleVisibility = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target === textElement) {
          setIsTextVisible(entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(handleVisibility, {
      threshold: 0.1,
    });

    if (textElement) observer.observe(textElement);

    return () => {
      if (textElement) observer.unobserve(textElement);
    };
  }, []);

  return (
    <div
      className="grid gap- grid-cols-2 5 items-center lg:justify-between px-2 sm:px-4 md:px-10 lg:px-16 py-16 lg:py-24 overflow-x-hidden"
      style={{ minHeight: "calc(100vh - 5rem)" }}
    >
      {/* Hero Text Section */}
      <div
        ref={textRef}
        className={`bg-white bg-opacity-60 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full  transition-all duration-1000 ease-out transform ${
          isTextVisible
            ? "opacity-100 scale-100 translate-x-0"
            : "opacity-0 scale-75 translate-x-[-50px]"
        } text-center lg:text-left`}
      >
        <h2 className="text-3xl max-sm:text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 max-sm:mb-2">
          Purity Comes From Faith
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-sm:text-sm max-sm:mb-2">
          Join us in fostering a community of faith, charity, and compassion.
        </p>
        <div className="grid grid-flow-col justify-between gap-4 max-sm:gap-2">
          <a
            href="https://donorchoice.ca/embedded/mumfc"
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center max-sm:text-sm bg-green-900 text-white py-3 max-sm:px-2  px-6 max-sm:p-2 rounded-md text-lg font-bold hover:bg-yellow-600 shadow-md"
          >
            Donate
          </a>

          <a
            href="https://www.paypal.com/donate/?hosted_button_id=26CHJFCDZVLJ8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-3 px-6 bg-blue-600 text-white max-sm:text-sm font-bold text-lg rounded-sm shadow-lg hover:bg-blue-500 transition-all duration-300"
          >
            <FaPaypal className="mr-2" size={20} />
            Donate with PayPal
          </a>
        </div>
      </div>
      <div className="w-full h-full">
        {/* <FetchSlide /> */}
        <FetchVideoAndImage />
      </div>
    </div>
  );
};

export default HeroSection;
