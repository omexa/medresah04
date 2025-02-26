import type { NextApiRequest, NextApiResponse } from "next";

// Function to fetch prayer times for a city and country
const getPrayerTimes = async (city: string, country: string) => {
  const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.data?.timings || null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city, country } = req.query;

  if (!city || !country) {
    return res.status(400).json({ error: "City and country are required" });
  }

  try {
    const prayerTimes = await getPrayerTimes(city as string, country as string);
    res.status(200).json(prayerTimes);
  } catch {
    res.status(500).json({ error: "Failed to fetch prayer times" });
  }
}
