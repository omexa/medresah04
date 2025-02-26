// Define prayer times data structure
export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

// Define structure for the city suggestions
export interface CityOption {
  label: string; // City name (e.g., "New York, USA")
  value: string; // City API link (e.g., city API URL)
}
