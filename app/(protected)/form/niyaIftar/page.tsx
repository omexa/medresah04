"use client";

import { useEffect, useState } from "react";

interface IftarNiyah {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  forHowManyDays: number;
  niyah_detail: string;
  amount: number;
  recorded_at: string;
}

export default function IftarNiyahList() {
  const [data, setData] = useState<IftarNiyah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://alhudaic.ca/api/iftar_niyah.php");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      if (Array.isArray(result)) {
        setData(result);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      //   setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Iftar Niyah Donations</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Days</th>
              <th className="border p-2">Detail</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Recorded At</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.fullname}</td>
                  <td className="border p-2">{item.email}</td>
                  <td className="border p-2">{item.phone}</td>
                  <td className="border p-2">{item.forHowManyDays}</td>
                  <td className="border p-2">{item.niyah_detail}</td>
                  <td className="border p-2">${item.amount}</td>
                  <td className="border p-2">
                    {new Date(item.recorded_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
