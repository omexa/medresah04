"use client";
import React, { useState, useEffect, useMemo } from "react";
import { getPrayerTimes } from "@/lib/api"; // Function to fetch prayer times
import moment from "moment-hijri";
import Image from "next/image";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { MoonStar } from "lucide-react";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

const PrayerTimeCalendar: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [daysUntilRamadan, setDaysUntilRamadan] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<string | null>(null);
  const location = useMemo(() => ({ city: "Calgary", country: "Canada" }), []); // Memoize location

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      const times = await getPrayerTimes(location.city, location.country);
      setPrayerTimes(times);
    };

    fetchPrayerTimes();
  }, [location]); // Now, location won't change on every render

  useEffect(() => {
    const calculateRamadanCountdown = () => {
      const today = moment();
      const currentYear = today.iYear();
      const ramadanStart = moment(`${currentYear}-09-01`, "iYYYY-iMM-iDD");

      if (today.isAfter(ramadanStart)) {
        // If it's already Ramadan, count Ramadan days instead
        setDaysUntilRamadan(today.iDate());
      } else {
        setDaysUntilRamadan(ramadanStart.diff(today, "days"));
      }

      const interval = setInterval(() => {
        const now = moment();
        const remainingTime = ramadanStart.diff(now);
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(interval);
    };

    calculateRamadanCountdown();
  }, []);

  const hijriDate = moment().format("iYYYY-iMM-iDD");
  // const gregorianDate = moment().format("YYYY-MM-DD");
  // const dayOfWeek = moment().format("dddd");

  const calculateIqamahTime = (azanTime: string) => {
    return moment(azanTime, "HH:mm").add(5, "minutes").format("h:mm A");
  };

  return (
    <div className="container mx-auto pb-8 px-4">
      {/* Prayer Times Cards */}
      <div className="flex justify-center flex-wrap max-sm:gap-4">
        {prayerTimes ? (
          (
            ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as Array<
              keyof PrayerTimes
            >
          ).map((prayer, index) => (
            <div
              key={index}
              className="relative bg-white border min-w-max border-gray-500 px-4  py-2 mb-2 flex flex-col items-center justify-center rounded-b-full text-center group overflow-hidden w-32 sm:w-[45%] md:w-52"
            >
              {/* Background Full Green Effect */}
              <div className="absolute inset-0 bg-green-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>

              {/* Icon */}
              <div className="relative z-10 flex items-center gap-2 mb-2">
                {prayer === "Fajr" && (
                  <Image
                    src="https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-1.png"
                    alt="Fajr Icon"
                    className="w-12 h-12"
                    width={1000}
                    height={1000}
                  />
                )}
                {prayer === "Dhuhr" && (
                  <Image
                    src="https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-2.png"
                    alt="Dhuhr Icon"
                    className="w-12 h-12"
                    width={1000}
                    height={1000}
                  />
                )}
                {prayer === "Asr" && (
                  <Image
                    src="https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-3.png"
                    alt="Asr Icon"
                    className="w-12 h-12"
                    width={1000}
                    height={1000}
                  />
                )}
                {prayer === "Maghrib" && (
                  <Image
                    src="https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-4.png"
                    alt="Maghrib Icon"
                    className="w-12 h-12"
                    width={1000}
                    height={1000}
                  />
                )}
                {prayer === "Isha" && (
                  <Image
                    src="https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-5.png"
                    alt="Isha Icon"
                    className="w-12 h-12"
                    width={1000}
                    height={1000}
                  />
                )}
              </div>

              {/* Prayer Name */}
              <h4 className="relative z-10 font-bold text-lg md:text-2xl text-green-700 group-hover:text-white font-serif">
                {prayer}
              </h4>

              {/* Prayer Time */}
              <div className="relative z-10 text-4xl max-sm:text-xs group-hover:text-white font-mono">
                {moment(prayerTimes[prayer], "HH:mm").format("h:mm A")}
              </div>

              {/* Iqamah Time */}
              <div className="relative z-10 text-md mt-2 max-sm:text-xs group-hover:text-white font-mono">
                {calculateIqamahTime(prayerTimes[prayer])}
              </div>
              {/* Gold Dot */}
              <div className="relative z-10 text-gold-500 mt-2">
                <BsFillRecordCircleFill size={16} color="gold" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500 col-span-5">
            Loading prayer times...
          </p>
        )}

        <div className="relative bg-green-700 border min-w-max border-gray-500 px-4 py-2 mb-2 flex flex-col items-center justify-center rounded-b-full text-center group overflow-hidden w-32 sm:w-[45%] md:w-52">
          <div className="absolute inset-0 bg-green-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
          <div className="relative z-10 text-gold-500 mt-2">
            <MoonStar size={40} color="gold" />
          </div>
          <h4 className="relative z-10 font-bold text-lg md:text-2xl text-white group-hover:text-white font-serif">
            Jumea
          </h4>

          <div className="relative z-10 text-4xl text-white max-sm:text-xs group-hover:text-white font-mono">
            6:00 PM
          </div>
          <div className="relative z-10 text-md text-white mt-2 max-sm:text-xs group-hover:text-white font-mono">
            6:25 PM
          </div>
          <div className="relative z-10 text-gold-500 mt-2">
            <BsFillRecordCircleFill size={16} color="gold" />
          </div>
        </div>
      </div>

      {/* Ramadan Countdown */}
      {daysUntilRamadan !== null && countdown && (
        <div
          className="text-center mb-8 bg-cover bg-top overflow-hidden group"
          style={{
            backgroundImage: "url('/img/ramadan2.jpg')",
            backgroundSize: "100%",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-transparent border shadow-lg p-6 rounded-lg">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
              {moment().iMonth() === 8 ? "Ramadan Day:" : "Days Until Ramadan:"}
              <span className="text-white"> {daysUntilRamadan}</span>
            </h3>
            <p className="text-lg text-white">Hijri Date: {hijriDate}</p>
            <p className="text-lg text-white">Time Remaining: {countdown}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerTimeCalendar;
