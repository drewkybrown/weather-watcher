import axios from "axios";

const getWeatherData = async (lat, lon) => {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat: lat, // Use the passed lat and lon values
        lon: lon,
        appid: API_KEY,
        units: "imperial", // or 'metric' for Celsius
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { error: error.response ? error.response.data : "Unknown error" };
  }
};

export { getWeatherData };
