import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay"; // Import the WeatherDisplay component
import axios from "axios";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearchSubmit = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
        // Use 'units=imperial' for Fahrenheit
      );

      if (response.data) {
        setWeatherData(response.data);
      } else {
        throw new Error("Weather data not available");
      }
    } catch (error) {
      setError("Error fetching weather data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Welcome to Weather Watcher!
      </h1>
      <SearchBar onSearchSubmit={handleSearchSubmit} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Include the WeatherDisplay component here */}
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
}

export default App;
