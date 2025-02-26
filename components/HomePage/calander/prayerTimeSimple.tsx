"use client";
import React, { useState, useEffect } from "react";
import { getPrayerTimes } from "@/lib/api";
import moment from "moment-hijri";
import Image from "next/image";
import { FaCloudSun, FaSun, FaMoon, FaCity, FaStar } from "react-icons/fa";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise?: string;
}

const PrayerTimePP: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const location = { city: "New York", country: "USA" };

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const times = await getPrayerTimes(location.city, location.country);
        setPrayerTimes(times);
        setError(null);
      } catch {
        setError("Failed to load prayer times. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [location]);

  const calculateIqamahTime = (azanTime: string) => {
    return moment(azanTime, "h:mm A").add(5, "minutes").format("h:mm A");
  };

  const prayerIcons: { [key: string]: JSX.Element } = {
    Fajr: <FaMoon className="text-blue-600" />,
    Dhuhr: <FaSun className="text-yellow-600" />,
    Asr: <FaCloudSun className="text-orange-500" />,
    Maghrib: <FaCity className="text-red-600" />,
    Isha: <FaStar className="text-indigo-800" />,
  };

  return (
    <div className="container mx-auto py-4 px-2 sm:px-4 md:px-6 overflow-hidden">
      {/* Loading and Error States */}
      {loading && (
        <p className="text-center text-sm sm:text-base text-gray-500">
          Loading prayer times...
        </p>
      )}
      {error && (
        <p className="text-center text-sm sm:text-base text-red-500">{error}</p>
      )}

      {/* Prayer Times Table */}
      {prayerTimes && !error && (
        <div className="p-4 bg-white bg-opacity-70 border border-green-600 rounded-lg shadow-lg w-full max-w-sm mx-auto sm:max-w-md">
          <div className="flex justify-center mb-6">
            <Image
              src="/img/prayerIcon.jpg"
              alt="Prayer Times"
              width={1000}
              height={1000}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-green-600 shadow-md"
            />
          </div>
          <table
            className="w-full text-left border-collapse"
            aria-label="Prayer Times Table"
          >
            <thead>
              <tr className="bg-green-600  text-white">
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold">
                  Prayer
                </th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold">
                  Azan Time
                </th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold">
                  Iqamah Time
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(prayerTimes).map(([prayer, azanTime], index) => {
                if (
                  ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(prayer)
                ) {
                  return (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200`}
                    >
                      <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm flex items-center">
                        <span className="text-xl sm:text-2xl mr-2 sm:mr-3">
                          {prayerIcons[prayer]}
                        </span>
                        {prayer}
                      </td>
                      <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                        {azanTime}
                      </td>
                      <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                        {calculateIqamahTime(azanTime)}
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PrayerTimePP;
