// "use client";
// import React, { useState } from "react";

// type PrayerTimes = {
//   fajr: string;
//   fajr_iqamah: string;
//   dhuhr: string;
//   dhuhr_iqamah: string;
//   asr: string;
//   asr_iqamah: string;
//   maghrib: string;
//   maghrib_iqamah: string;
//   isha: string;
//   isha_iqamah: string;
//   jumuah: string;
// };

// const PrayerTimesForm: React.FC = () => {
//   const [formData, setFormData] = useState<PrayerTimes>({
//     fajr: "",
//     fajr_iqamah: "",
//     dhuhr: "",
//     dhuhr_iqamah: "",
//     asr: "",
//     asr_iqamah: "",
//     maghrib: "",
//     maghrib_iqamah: "",
//     isha: "",
//     isha_iqamah: "",
//     jumuah: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const params = new URLSearchParams();
//     for (const key in formData) {
//       params.append(key, formData[key as keyof PrayerTimes]);
//     }

//     try {
//       const res = await fetch("https://alhudaic.ca/api/prayer_times.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: params.toString(),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         console.log("Success:", data);
//       } else {
//         console.error("Error:", data.error);
//       }
//     } catch (err) {
//       console.error("Submission failed:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Fajr:</label>
//         <input
//           type="time"
//           name="fajr"
//           value={formData.fajr}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Fajr Iqamah:</label>
//         <input
//           type="time"
//           name="fajr_iqamah"
//           value={formData.fajr_iqamah}
//           onChange={handleChange}
//         />
//       </div>
//       {/* ... other fields with snake_case names */}
//       <div>
//         <label>Fajr:</label>
//         <input
//           type="time"
//           name="fajr"
//           value={formData.fajr}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Fajr Iqamah:</label>
//         <input
//           type="time"
//           name="fajr_iqamah"
//           value={formData.fajr_iqamah}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Dhuhr:</label>
//         <input
//           type="time"
//           name="dhuhr"
//           value={formData.dhuhr}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Dhuhr Iqamah:</label>
//         <input
//           type="time"
//           name="dhuhr_iqamah"
//           value={formData.dhuhr_iqamah}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Asr:</label>
//         <input
//           type="time"
//           name="asr"
//           value={formData.asr}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Asr Iqamah:</label>
//         <input
//           type="time"
//           name="asr_iqamah"
//           value={formData.asr_iqamah}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Maghrib:</label>
//         <input
//           type="time"
//           name="maghrib"
//           value={formData.maghrib}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Maghrib Iqamah:</label>
//         <input
//           type="time"
//           name="maghrib_iqamah"
//           value={formData.maghrib_iqamah}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Isha:</label>
//         <input
//           type="time"
//           name="isha"
//           value={formData.isha}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Isha Iqamah:</label>
//         <input
//           type="time"
//           name="isha_iqamah"
//           value={formData.isha_iqamah}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Jumuah:</label>
//         <input
//           type="time"
//           name="jumuah"
//           value={formData.jumuah}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default PrayerTimesForm;
"use client";
import React, { useState, useEffect } from "react";

type PrayerTimes = {
  id?: number;
  fajr: string;
  fajr_iqamah: string;
  dhuhr: string;
  dhuhr_iqamah: string;
  asr: string;
  asr_iqamah: string;
  maghrib: string;
  maghrib_iqamah: string;
  isha: string;
  isha_iqamah: string;
  jumuah: string;
};

const PrayerTimesForm: React.FC = () => {
  const [formData, setFormData] = useState<PrayerTimes>({
    fajr: "",
    fajr_iqamah: "",
    dhuhr: "",
    dhuhr_iqamah: "",
    asr: "",
    asr_iqamah: "",
    maghrib: "",
    maghrib_iqamah: "",
    isha: "",
    isha_iqamah: "",
    jumuah: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://alhudaic.ca/api/prayer_times.php?fetch=true"
        );
        if (!response.ok) throw new Error("Failed to fetch prayer times");
        const data = await response.json();
        if (data.length > 0) {
          setFormData(data[0]);
        }
      } catch (err) {
        setError("Failed to load prayer times");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PrayerTimes
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://alhudaic.ca/api/prayer_times.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // body: new URLSearchParams(formData as any).toString(),
        body: new URLSearchParams(
          Object.fromEntries(
            Object.entries(formData).filter(
              ([, value]) => value !== undefined && value !== null
            )
          ) as Record<string, string>
        ).toString(),
      });

      if (!response.ok) throw new Error("Update failed");
      const data = await response.json();
      console.log("Update successful:", data);
      setError(null);
    } catch (err) {
      setError("Update failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="prayer-form sm:grid sm:grid-cols-2 gap-4"
    >
      <div className="form-group">
        <label>Fajr:</label>
        <input
          type="time"
          value={formData.fajr}
          onChange={(e) => handleChange(e, "fajr")}
        />
      </div>
      <div className="form-group">
        <label>Fajr Iqamah:</label>
        <input
          type="time"
          value={formData.fajr_iqamah}
          onChange={(e) => handleChange(e, "fajr_iqamah")}
        />
      </div>
      <div className="form-group">
        <label>Dhuhr:</label>
        <input
          type="time"
          value={formData.dhuhr}
          onChange={(e) => handleChange(e, "dhuhr")}
        />
      </div>
      <div className="form-group">
        <label>Dhuhr Iqamah:</label>
        <input
          type="time"
          value={formData.dhuhr_iqamah}
          onChange={(e) => handleChange(e, "dhuhr_iqamah")}
        />
      </div>
      <div className="form-group">
        <label>Asr:</label>
        <input
          type="time"
          value={formData.asr}
          onChange={(e) => handleChange(e, "asr")}
        />
      </div>
      <div className="form-group">
        <label>Asr Iqamah:</label>
        <input
          type="time"
          value={formData.asr_iqamah}
          onChange={(e) => handleChange(e, "asr_iqamah")}
        />
      </div>
      <div className="form-group">
        <label>Maghrib:</label>
        <input
          type="time"
          value={formData.maghrib}
          onChange={(e) => handleChange(e, "maghrib")}
        />
      </div>
      <div className="form-group">
        <label>Maghrib Iqamah:</label>
        <input
          type="time"
          value={formData.maghrib_iqamah}
          onChange={(e) => handleChange(e, "maghrib_iqamah")}
        />
      </div>
      <div className="form-group">
        <label>Isha:</label>
        <input
          type="time"
          value={formData.isha}
          onChange={(e) => handleChange(e, "isha")}
        />
      </div>
      <div className="form-group">
        <label>Isha Iqamah:</label>
        <input
          type="time"
          value={formData.isha_iqamah}
          onChange={(e) => handleChange(e, "isha_iqamah")}
        />
      </div>
      <div className="form-group">
        <label>Jumuah:</label>
        <input
          type="time"
          value={formData.jumuah}
          onChange={(e) => handleChange(e, "jumuah")}
        />
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? "Updating..." : "Update Prayer Times"}
      </button>
    </form>
  );
};

export default PrayerTimesForm;
