"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const MosqueGalleryPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false); // Reset animation state
          setTimeout(() => setIsVisible(true), 100); // Trigger animation
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the div is visible
    );

    const divElement = divRef.current; // Store ref in a variable
    if (divElement) {
      observer.observe(divElement);
    }

    return () => {
      if (divElement) {
        observer.unobserve(divElement); // Cleanup using the stored variable
      }
    };
  }, []);

  // Example gallery items
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Main Prayer Hall",
      description:
        "A beautiful space for daily prayers with intricate designs.",
      imageUrl: "/img/sermon-3.jpg", // Replace with actual URL
    },
    {
      id: 2,
      title: "Minaret",
      description: "The iconic minaret, a symbol of the mosque's architecture.",
      imageUrl: "/img/about-1.jpg", // Replace with actual URL
    },
    {
      id: 3,
      title: "Courtyard",
      description: "A peaceful courtyard where visitors can relax and reflect.",
      imageUrl: "/img/about-2.jpg", // Replace with actual URL
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 ">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        Mosque Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            ref={divRef}
            className={`relative bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden ${
              isVisible ? "animate-scale-up" : "opacity-0 scale-90"
            }`}
          >
            {/* Image with Zoom-Out Effect */}
            <div className="relative group">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={1000}
                height={1000}
                className="rounded-t-lg w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                style={{ objectPosition: "top" }} // Ensuring zoom focuses on the top part of the image
              />
              {/* Overlay with Description */}
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-center px-4">
                  {item.description}
                </p>
              </div>
            </div>
            {/* Title */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MosqueGalleryPage;
