"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MoonStar } from "lucide-react";

// Define PrayerTimes type with index signature
interface PrayerTimes {
  [key: string]: string | undefined; // Allow string indexing
  Fajr?: string;
  Dhuhr?: string;
  Asr?: string;
  Maghrib?: string;
  Isha?: string;
  Jumuah?: string;
}

const PrayerTimeCalendarNew: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://alhudaic.ca/api/prayer_times.php?fetch=true"
        );
        if (!response.ok) throw new Error("Failed to fetch prayer times");
        const data = await response.json();
        setPrayerTimes(data[0] || {}); // Initialize with empty object if no data
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  const formatTime = (timeStr?: string): string => {
    if (!timeStr) return "-";
    return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const prayerList = [
    {
      name: "Fajr",
      azan: "fajr", // Match API field names (lowercase)
      iqamah: "fajr_iqamah",
      icon: "https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-1.png",
    },
    {
      name: "Dhuhr",
      azan: "dhuhr",
      iqamah: "dhuhr_iqamah",
      icon: "https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-2.png",
    },
    {
      name: "Asr",
      azan: "asr",
      iqamah: "asr_iqamah",
      icon: "https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-3.png",
    },
    {
      name: "Maghrib",
      azan: "maghrib",
      iqamah: "maghrib_iqamah",
      icon: "https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-4.png",
    },
    {
      name: "Isha",
      azan: "isha",
      iqamah: "isha_iqamah",
      icon: "https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-5.png",
    },
    {
      name: "Jumuah",
      azan: "jumuah",
      iqamah: null,
      icon: <MoonStar size={24} color="#ffd700" />,
      special: true,
    },
  ];

  if (loading) return <div className="loading">Loading prayer times...</div>;

  return (
    <div className="prayer-table-container">
      <table className="prayer-table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Begin (Azan)</th>
            <th>Iqamah</th>
          </tr>
        </thead>
        <tbody>
          {prayerList.map((prayer, index) => {
            // Use optional chaining for safe property access
            const azanTime = prayerTimes?.[prayer.azan] || "-";
            const iqamahTime = prayer.iqamah
              ? prayerTimes?.[prayer.iqamah] || "-"
              : "-";

            return (
              <tr key={index} className={prayer.special ? "jumuah-row" : ""}>
                <td>
                  {typeof prayer.icon === "string" ? (
                    <Image
                      src={prayer.icon}
                      alt={`${prayer.name} Icon`}
                      width={24}
                      height={24}
                      className="prayer-icon"
                    />
                  ) : (
                    prayer.icon
                  )}
                </td>
                <td>{prayer.name}</td>
                <td>{formatTime(azanTime)}</td>
                <td>{formatTime(iqamahTime)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimeCalendarNew;
