// "use client";
// import React, { useState } from "react";

// interface PrayerSettings {
//   salat: string;
//   setting_type: "0" | "1"; // 0 = Manual, 1 = Automatic
//   azan: string; // Time in HH:mm format or null for Automatic
//   iqam: string; // Minutes offset (e.g., "5", "10", etc.)
// }

// const PrayerTimeForm: React.FC = () => {
//   const [settings, setSettings] = useState<PrayerSettings[]>([
//     { salat: "Subhi", setting_type: "0", azan: "", iqam: "5" },
//     { salat: "Dhuhr", setting_type: "0", azan: "", iqam: "5" },
//     { salat: "Asr", setting_type: "0", azan: "", iqam: "5" },
//     { salat: "Maghrib", setting_type: "0", azan: "", iqam: "5" },
//     { salat: "Isha", setting_type: "0", azan: "", iqam: "5" },
//     { salat: "Jumuah", setting_type: "0", azan: "", iqam: "5" },
//   ]);

//   // Handle radio button changes
//   const handleSettingTypeChange = (salat: string, value: "0" | "1") => {
//     setSettings((prev) =>
//       prev.map((s) =>
//         s.salat === salat
//           ? { ...s, setting_type: value, azan: value === "1" ? "" : s.azan }
//           : s
//       )
//     );
//   };

//   // Handle Azan time changes
//   const handleAzanChange = (salat: string, value: string) => {
//     setSettings((prev) =>
//       prev.map((s) => (s.salat === salat ? { ...s, azan: value } : s))
//     );
//   };

//   // Handle Iqamah time changes
//   const handleIqamChange = (salat: string, value: string) => {
//     setSettings((prev) =>
//       prev.map((s) => (s.salat === salat ? { ...s, iqam: value } : s))
//     );
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("https://alhudaic.ca/api/prayer_time.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(
//           settings.map((s) => ({
//             salat: s.salat,
//             setting_type: s.setting_type,
//             azan: s.setting_type === "1" ? null : s.azan,
//             iqam: s.iqam,
//           }))
//         ),
//       });

//       const result = await response.json();
//       if (result.success) {
//         alert(result.message);
//       } else {
//         alert(`Error: ${result.message}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to update settings.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Update Salat Settings</h2>
//       <form onSubmit={handleSubmit}>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2">Salat</th>
//               <th className="border border-gray-300 p-2">Type</th>
//               <th className="border border-gray-300 p-2">Azan Time</th>
//               <th className="border border-gray-300 p-2">Iqam Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {settings.map((s, index) => (
//               <tr key={index}>
//                 <td className="border border-gray-300 p-2">{s.salat}</td>
//                 <td className="border border-gray-300 p-2">
//                   <div className="flex gap-4">
//                     <label>
//                       <input
//                         type="radio"
//                         name={`setting_type_${s.salat}`}
//                         value="0"
//                         checked={s.setting_type === "0"}
//                         onChange={() => handleSettingTypeChange(s.salat, "0")}
//                       />
//                       Manual
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         name={`setting_type_${s.salat}`}
//                         value="1"
//                         checked={s.setting_type === "1"}
//                         onChange={() => handleSettingTypeChange(s.salat, "1")}
//                       />
//                       Automatic
//                     </label>
//                   </div>
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   <input
//                     type="time"
//                     value={s.azan}
//                     disabled={s.setting_type === "1"}
//                     onChange={(e) => handleAzanChange(s.salat, e.target.value)}
//                     className="w-full"
//                   />
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   <select
//                     value={s.iqam}
//                     onChange={(e) => handleIqamChange(s.salat, e.target.value)}
//                     className="w-full"
//                   >
//                     {[...Array(15)].map((_, i) => (
//                       <option key={i * 5} value={(i * 5).toString()}>
//                         {(i * 5).toString()} min
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button
//           type="submit"
//           className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PrayerTimeForm;
// pages/create-prayer-times.js
"use client";
import React, { useState } from "react";

type PrayerTimes = {
  date: string;
  fajr: string;
  fajrIqamah: string;
  dhuhr: string;
  dhuhrIqamah: string;
  asr: string;
  asrIqamah: string;
  maghrib: string;
  maghribIqamah: string;
  isha: string;
  ishaIqamah: string;
  jumuah: string;
};

const PrayerTimesForm: React.FC = () => {
  const [formData, setFormData] = useState<PrayerTimes>({
    date: "",
    fajr: "",
    fajrIqamah: "",
    dhuhr: "",
    dhuhrIqamah: "",
    asr: "",
    asrIqamah: "",
    maghrib: "",
    maghribIqamah: "",
    isha: "",
    ishaIqamah: "",
    jumuah: "",
  });

  const [submittedData, setSubmittedData] = useState<PrayerTimes | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the formData using the name as a key
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof PrayerTimes]: value, // Safe indexing with keyof PrayerTimes
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Iterate over formData and append each field
    for (const key in formData) {
      // Safe indexing with keyof PrayerTimes
      params.append(key, formData[key as keyof PrayerTimes]);
    }

    try {
      const response = await fetch("https://alhudaic.ca/api/prayer_times.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmittedData(formData); // Show the submitted data in a table
        console.log("Form Data Submitted:", data);
        setError(null); // Clear any previous error
      } else {
        setError(data.error || "An error occurred while submitting the form.");
        console.error("Error:", data.error);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fajr:</label>
          <input
            type="time"
            name="fajr"
            value={formData.fajr}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fajr Iqamah:</label>
          <input
            type="time"
            name="fajrIqamah"
            value={formData.fajrIqamah}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Dhuhr:</label>
          <input
            type="time"
            name="dhuhr"
            value={formData.dhuhr}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Dhuhr Iqamah:</label>
          <input
            type="time"
            name="dhuhrIqamah"
            value={formData.dhuhrIqamah}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Asr:</label>
          <input
            type="time"
            name="asr"
            value={formData.asr}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Asr Iqamah:</label>
          <input
            type="time"
            name="asrIqamah"
            value={formData.asrIqamah}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Maghrib:</label>
          <input
            type="time"
            name="maghrib"
            value={formData.maghrib}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Maghrib Iqamah:</label>
          <input
            type="time"
            name="maghribIqamah"
            value={formData.maghribIqamah}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Isha:</label>
          <input
            type="time"
            name="isha"
            value={formData.isha}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Isha Iqamah:</label>
          <input
            type="time"
            name="ishaIqamah"
            value={formData.ishaIqamah}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Jumuah:</label>
          <input
            type="time"
            name="jumuah"
            value={formData.jumuah}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display the submitted data */}
      {submittedData && (
        <table border={1} style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Fajr</th>
              <th>Fajr Iqamah</th>
              <th>Dhuhr</th>
              <th>Dhuhr Iqamah</th>
              <th>Asr</th>
              <th>Asr Iqamah</th>
              <th>Maghrib</th>
              <th>Maghrib Iqamah</th>
              <th>Isha</th>
              <th>Isha Iqamah</th>
              <th>Jumuah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{submittedData.date}</td>
              <td>{submittedData.fajr}</td>
              <td>{submittedData.fajrIqamah}</td>
              <td>{submittedData.dhuhr}</td>
              <td>{submittedData.dhuhrIqamah}</td>
              <td>{submittedData.asr}</td>
              <td>{submittedData.asrIqamah}</td>
              <td>{submittedData.maghrib}</td>
              <td>{submittedData.maghribIqamah}</td>
              <td>{submittedData.isha}</td>
              <td>{submittedData.ishaIqamah}</td>
              <td>{submittedData.jumuah}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PrayerTimesForm;
