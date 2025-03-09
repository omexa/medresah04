// "use client";
// import React, { useState, useEffect } from "react";

// const PrayerTimesTable = () => {
//   const [prayerTimes, setPrayerTimes] = useState(null);
//   const [loading, setLoading] = useState(true);
//   //   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPrayerTimes = async () => {
//       try {
//         const response = await fetch(
//           "https://alhudaic.ca/api/prayer_times.php?fetch=true"
//         );
//         if (!response.ok) throw new Error("Network response was not ok");
//         const data = await response.json();
//         if (data.error) throw new Error(data.error);
//         setPrayerTimes(data[0]); // Get latest entry
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrayerTimes();
//   }, []);

//   if (loading) return <div className="loading">Loading prayer times...</div>;
//   //   if (error) return <div className="error">Error: {error}</div>;
//   if (!prayerTimes)
//     return <div className="empty">No prayer times available</div>;

//   const prayerList = [
//     {
//       name: "Fajr",
//       azan: "fajr",
//       iqamah: "fajr_iqamah",
//       icon: (
//         <svg className="prayer-icon" viewBox="0 0 24 24" width="24" height="24">
//           <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
//           <path d="M12 6a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V7a1 1 0 0 1 1-1z" />
//         </svg>
//       ),
//     },
//     {
//       name: "Dhuhr",
//       azan: "dhuhr",
//       iqamah: "dhuhr_iqamah",
//       icon: (
//         <svg className="prayer-icon" viewBox="0 0 24 24" width="24" height="24">
//           <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
//           <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
//         </svg>
//       ),
//     },
//     {
//       name: "Asr",
//       azan: "asr",
//       iqamah: "asr_iqamah",
//       icon: (
//         <svg className="prayer-icon" viewBox="0 0 24 24" width="24" height="24">
//           <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
//           <path d="M12 7v3m0 4v3m0-7a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1z" />
//         </svg>
//       ),
//     },
//     {
//       name: "Maghrib",
//       azan: "maghrib",
//       iqamah: "maghrib_iqamah",
//       icon: (
//         <svg className="prayer-icon" viewBox="0 0 24 24" width="24" height="24">
//           <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
//           <path d="M12 7v10m-4-5h8" />
//         </svg>
//       ),
//     },
//     {
//       name: "Isha",
//       azan: "isha",
//       iqamah: "isha_iqamah",
//       icon: (
//         <svg className="prayer-icon" viewBox="0 0 24 24" width="24" height="24">
//           <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
//           <path d="M12 7v3m-4 0v3m8-3v3m-4 0v3" />
//         </svg>
//       ),
//     },
//     {
//       name: "Jumuah",
//       azan: "jumuah",
//       iqamah: null,
//       icon: (
//         <svg className="prayer-icon" viewBox="0 0 24 24" width="24" height="24">
//           <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
//           <path d="M9 9h6v6H9z" />
//         </svg>
//       ),
//     },
//   ];

//   return (
//     <div className="prayer-table-container">
//       <table className="prayer-table">
//         <thead>
//           <tr>
//             <th>Icon</th>
//             <th>Name</th>
//             <th>Begin (Azan)</th>
//             <th>Iqamah</th>
//           </tr>
//         </thead>
//         <tbody>
//           {prayerList.map((prayer, index) => (
//             <tr key={index}>
//               <td>{prayer.icon}</td>
//               <td>{prayer.name}</td>
//               <td>{prayerTimes[prayer.azan]}</td>
//               <td>{prayer.iqamah ? prayerTimes[prayer.iqamah] : "-"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PrayerTimesTable;
"use client";
import { MoonStar } from "lucide-react";
import React, { useState, useEffect } from "react";
// Make sure to install react-feather

const PrayerTimesTable = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://alhudaic.ca/api/prayer_times.php?fetch=true"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setPrayerTimes(data[0]); // Get latest entry
      } catch (err) {
        // setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);
  const formatTime = (timeStr: string | undefined): string => {
    if (!timeStr) return "-";
    const [hours, minutes] = timeStr.split(":");
    let period = "AM";
    let hour = parseInt(hours, 10);

    if (hour >= 12) {
      period = "PM";
      if (hour > 12) hour -= 12;
    }

    return `${hour}:${minutes} ${period}`;
  };
  if (loading) return <div className="loading">Loading prayer times...</div>;
  //   if (error) return <div className="error">Error: {error}</div>;
  if (!prayerTimes)
    return <div className="empty">No prayer times available</div>;

  const prayerList = [
    {
      name: "Fajr",
      azan: "fajr",
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
          {prayerList.map((prayer, index) => (
            <tr key={index} className={prayer.special ? "jumuah-row" : ""}>
              <td>
                {typeof prayer.icon === "string" ? (
                  <img
                    src={prayer.icon}
                    alt={`${prayer.name} Icon`}
                    className="prayer-icon"
                  />
                ) : (
                  prayer.icon
                )}
              </td>
              <td>{prayer.name}</td>
              <td>{formatTime(prayerTimes[prayer.azan])}</td>
              <td>
                {prayer.iqamah ? formatTime(prayerTimes[prayer.iqamah]) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimesTable;
