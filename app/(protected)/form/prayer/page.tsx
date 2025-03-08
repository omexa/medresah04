// "use client";
// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import Image from "next/image";
// import { BsFillRecordCircleFill } from "react-icons/bs";
// import { MoonStar } from "lucide-react";

// interface PrayerTimes {
//   Fajr: string;
//   Dhuhr: string;
//   Asr: string;
//   Maghrib: string;
//   Isha: string;
//   Jumuah?: string;
// }

// const PrayerTimePage: React.FC = () => {
//   const [mode, setMode] = useState<"automatic" | "manual">("automatic");
//   const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>({
//     Fajr: "",
//     Dhuhr: "",
//     Asr: "",
//     Maghrib: "",
//     Isha: "",
//     Jumuah: "",
//   });
//   const [iqamahTimes, setIqamahTimes] = useState<PrayerTimes>({
//     Fajr: "",
//     Dhuhr: "",
//     Asr: "",
//     Maghrib: "",
//     Isha: "",
//     Jumuah: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch prayer times from API for Automatic Mode
//   const fetchPrayerTimes = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://alhudaic.ca/api/prayer_time.php");
//       if (!response.ok) throw new Error("Failed to fetch prayer times");
//       const data = await response.json();
//       const times: PrayerTimes = {
//         Fajr: data.setting_type_Subhi,
//         Dhuhr: data.setting_type_Dhuhr,
//         Asr: data.setting_type_Asr,
//         Maghrib: data.setting_type_Maghrib,
//         Isha: data.setting_type_Isha,
//         Jumuah: data.setting_type_Jumuah || "",
//       };
//       setPrayerTimes(times);
//       setIqamahTimes(calculateIqamahTimes(times));
//     } catch (err) {
//       setError("Failed to load prayer times.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate Iqamah times by adding 5 minutes to each prayer time
//   const calculateIqamahTimes = (times: PrayerTimes): PrayerTimes => {
//     return Object.fromEntries(
//       Object.entries(times).map(([prayer, time]) => [
//         prayer,
//         moment(time, "HH:mm").add(5, "minutes").format("HH:mm"),
//       ])
//     ) as PrayerTimes;
//   };

//   // Handle mode change
//   useEffect(() => {
//     if (mode === "automatic") {
//       fetchPrayerTimes();
//     } else {
//       setPrayerTimes({
//         Fajr: "",
//         Dhuhr: "",
//         Asr: "",
//         Maghrib: "",
//         Isha: "",
//         Jumuah: "",
//       });
//       setIqamahTimes({
//         Fajr: "",
//         Dhuhr: "",
//         Asr: "",
//         Maghrib: "",
//         Isha: "",
//         Jumuah: "",
//       });
//     }
//   }, [mode]);

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("https://alhudaic.ca/api/prayer_time.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...prayerTimes, ...iqamahTimes }),
//       });
//       if (!response.ok) throw new Error("Failed to update prayer times");
//       alert("Prayer times updated successfully!");
//       fetchPrayerTimes(); // Refresh data after submission
//     } catch (err) {
//       setError("Failed to update prayer times.");
//     }
//   };

//   return (
//     <div className="container mx-auto pb-8 px-4">
//       {/* Mode Selection */}
//       <div className="mb-4">
//         <label className="mr-2">Mode:</label>
//         <select
//           value={mode}
//           onChange={(e) => setMode(e.target.value as "automatic" | "manual")}
//           className="border border-gray-300 rounded px-2 py-1"
//         >
//           <option value="automatic">Automatic</option>
//           <option value="manual">Manual</option>
//         </select>
//       </div>

//       {/* Loading/Error States */}
//       {loading && <p className="text-gray-500">Loading prayer times...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Prayer Times Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         {Object.keys(prayerTimes).map((prayer) => (
//           <div key={prayer} className="flex items-center space-x-4">
//             <label className="w-20">{prayer}:</label>
//             <input
//               type="time"
//               value={prayerTimes[prayer as keyof PrayerTimes]}
//               onChange={(e) =>
//                 setPrayerTimes({
//                   ...prayerTimes,
//                   [prayer]: e.target.value,
//                 })
//               }
//               disabled={mode === "automatic"}
//               className={`border ${
//                 mode === "automatic" ? "bg-gray-100" : "bg-white"
//               } border-gray-300 rounded px-2 py-1 w-32`}
//             />
//             <span className="mx-2">Iqamah:</span>
//             <input
//               type="time"
//               value={iqamahTimes[prayer as keyof PrayerTimes]}
//               onChange={(e) =>
//                 setIqamahTimes({
//                   ...iqamahTimes,
//                   [prayer]: e.target.value,
//                 })
//               }
//               className="border border-gray-300 rounded px-2 py-1 w-32"
//             />
//           </div>
//         ))}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Save Changes
//         </button>
//       </form>

//       {/* Display Prayer Times */}
//       <div className="flex justify-center flex-wrap max-sm:gap-4">
//         {prayerTimes.Fajr ? (
//           ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer, index) => (
//             <div
//               key={index}
//               className="relative bg-white border min-w-max border-gray-500 px-4 py-2 mb-2 flex flex-col items-center justify-center rounded-b-full text-center group overflow-hidden w-32 sm:w-[45%] md:w-52"
//             >
//               {/* Background Full Green Effect */}
//               <div className="absolute inset-0 bg-green-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>

//               {/* Icon */}
//               <div className="relative z-10 flex items-center gap-2 mb-2">
//                 {prayer === "Fajr" && (
//                   <Image
//                     src="https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-1.png"
//                     alt="Fajr Icon"
//                     className="w-12 h-12"
//                     width={1000}
//                     height={1000}
//                   />
//                 )}
//                 {prayer === "Dhuhr" && (
//                   <Image
//                     src="https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-2.png"
//                     alt="Dhuhr Icon"
//                     className="w-12 h-12"
//                     width={1000}
//                     height={1000}
//                   />
//                 )}
//                 {prayer === "Asr" && (
//                   <Image
//                     src="https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-3.png"
//                     alt="Asr Icon"
//                     className="w-12 h-12"
//                     width={1000}
//                     height={1000}
//                   />
//                 )}
//                 {prayer === "Maghrib" && (
//                   <Image
//                     src="https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-4.png"
//                     alt="Maghrib Icon"
//                     className="w-12 h-12"
//                     width={1000}
//                     height={1000}
//                   />
//                 )}
//                 {prayer === "Isha" && (
//                   <Image
//                     src="https://winsfolio.net/html/ibadah/assets/img/namaz-time-icon-5.png"
//                     alt="Isha Icon"
//                     className="w-12 h-12"
//                     width={1000}
//                     height={1000}
//                   />
//                 )}
//               </div>

//               {/* Prayer Name */}
//               <h4 className="relative z-10 font-bold text-lg md:text-2xl text-green-700 group-hover:text-white font-serif">
//                 {prayer}
//               </h4>

//               {/* Prayer Time */}
//               <div className="relative z-10 text-4xl max-sm:text-xs group-hover:text-white font-mono">
//                 {moment(prayerTimes[prayer], "HH:mm").format("h:mm A")}
//               </div>

//               {/* Iqamah Time */}
//               <div className="relative z-10 text-md mt-2 max-sm:text-xs group-hover:text-white font-mono">
//                 {moment(iqamahTimes[prayer], "HH:mm").format("h:mm A")}
//               </div>

//               {/* Gold Dot */}
//               <div className="relative z-10 text-gold-500 mt-2">
//                 <BsFillRecordCircleFill size={16} color="gold" />
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-lg text-gray-500 col-span-5">
//             Loading prayer times...
//           </p>
//         )}

//         {/* Jumuah Card */}
//         <div className="relative bg-green-700 border min-w-max border-gray-500 px-4 py-2 mb-2 flex flex-col items-center justify-center rounded-b-full text-center group overflow-hidden w-32 sm:w-[45%] md:w-52">
//           <div className="absolute inset-0 bg-green-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
//           <div className="relative z-10 text-gold-500 mt-2">
//             <MoonStar size={40} color="gold" />
//           </div>
//           <h4 className="relative z-10 font-bold text-lg md:text-2xl text-white group-hover:text-white font-serif">
//             Jumea
//           </h4>
//           <div className="relative z-10 text-4xl text-white max-sm:text-xs group-hover:text-white font-mono">
//             {moment(prayerTimes.Jumuah, "HH:mm").format("h:mm A")}
//           </div>
//           <div className="relative z-10 text-md text-white mt-2 max-sm:text-xs group-hover:text-white font-mono">
//             {moment(iqamahTimes.Jumuah, "HH:mm").format("h:mm A")}
//           </div>
//           <div className="relative z-10 text-gold-500 mt-2">
//             <BsFillRecordCircleFill size={16} color="gold" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrayerTimePage;

"use client";
import React, { useState } from "react";

interface PrayerSettings {
  salat: string;
  setting_type: "0" | "1"; // 0 = Manual, 1 = Automatic
  azan: string; // Time in HH:mm format or null for Automatic
  iqam: string; // Minutes offset (e.g., "5", "10", etc.)
}

const PrayerTimeForm: React.FC = () => {
  const [settings, setSettings] = useState<PrayerSettings[]>([
    { salat: "Subhi", setting_type: "0", azan: "", iqam: "5" },
    { salat: "Dhuhr", setting_type: "0", azan: "", iqam: "5" },
    { salat: "Asr", setting_type: "0", azan: "", iqam: "5" },
    { salat: "Maghrib", setting_type: "0", azan: "", iqam: "5" },
    { salat: "Isha", setting_type: "0", azan: "", iqam: "5" },
    { salat: "Jumuah", setting_type: "0", azan: "", iqam: "5" },
  ]);

  // Handle radio button changes
  const handleSettingTypeChange = (salat: string, value: "0" | "1") => {
    setSettings((prev) =>
      prev.map((s) =>
        s.salat === salat
          ? { ...s, setting_type: value, azan: value === "1" ? "" : s.azan }
          : s
      )
    );
  };

  // Handle Azan time changes
  const handleAzanChange = (salat: string, value: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.salat === salat ? { ...s, azan: value } : s))
    );
  };

  // Handle Iqamah time changes
  const handleIqamChange = (salat: string, value: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.salat === salat ? { ...s, iqam: value } : s))
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://alhudaic.ca/api/prayer_time.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          settings.map((s) => ({
            salat: s.salat,
            setting_type: s.setting_type,
            azan: s.setting_type === "1" ? null : s.azan,
            iqam: s.iqam,
          }))
        ),
      });

      const result = await response.json();
      if (result.success) {
        alert(result.message);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update settings.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Salat Settings</h2>
      <form onSubmit={handleSubmit}>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Salat</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Azan Time</th>
              <th className="border border-gray-300 p-2">Iqam Time</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((s, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{s.salat}</td>
                <td className="border border-gray-300 p-2">
                  <div className="flex gap-4">
                    <label>
                      <input
                        type="radio"
                        name={`setting_type_${s.salat}`}
                        value="0"
                        checked={s.setting_type === "0"}
                        onChange={() => handleSettingTypeChange(s.salat, "0")}
                      />
                      Manual
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`setting_type_${s.salat}`}
                        value="1"
                        checked={s.setting_type === "1"}
                        onChange={() => handleSettingTypeChange(s.salat, "1")}
                      />
                      Automatic
                    </label>
                  </div>
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="time"
                    value={s.azan}
                    disabled={s.setting_type === "1"}
                    onChange={(e) => handleAzanChange(s.salat, e.target.value)}
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={s.iqam}
                    onChange={(e) => handleIqamChange(s.salat, e.target.value)}
                    className="w-full"
                  >
                    {[...Array(15)].map((_, i) => (
                      <option key={i * 5} value={(i * 5).toString()}>
                        {(i * 5).toString()} min
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default PrayerTimeForm;
