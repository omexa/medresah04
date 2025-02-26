import axios from "axios";

// Define the types for prayer times
export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

export interface PrayerTimesResponse {
  data: {
    timings: PrayerTimes;
  };
}

export interface CityOption {
  label: string; // City name (e.g., "New York, USA")
  value: string; // City name (string) to be used for city identification
  coordinates: {
    lat: number;
    lng: number;
  }; // Store city coordinates if needed for other functionality
}

// Define types for OpenCage response
interface Geometry {
  lat: number;
  lng: number;
}

interface City {
  formatted: string; // City name with formatted information (e.g., "New York, USA")
  geometry: Geometry; // Coordinates for the city
}

interface OpenCageResponse {
  results: City[];
}

// Function to fetch cities based on country using OpenCage Geocoder API
export const fetchCitiesByCountry = async (country: string) => {
  const apiKey = "YOUR_API_KEY"; // Replace with your OpenCage API key

  try {
    const response = await axios.get<OpenCageResponse>(
      `https://api.opencagedata.com/geocode/v1/json?q=${country}&key=${apiKey}`
    );

    // Mapping response data to return city name as label and coordinates as value
    return response.data.results.map((city) => ({
      label: city.formatted,
      value: city.formatted, // Use formatted city name as value
      coordinates: city.geometry, // Include the coordinates if necessary
    }));
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Could not fetch cities. Please try again.");
  }
};

// Function to fetch prayer times for a city and country
export const getPrayerTimes = async (city: string, country: string) => {
  const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  return data.data?.timings || null;
};

const api = axios.create({
  baseURL: "https://alhudaic.ca/api/",
  // baseURL: "http://10.172.73.69:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
