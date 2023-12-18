import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { getWeatherData } from "./services/weatherService";
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
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );

      // Check if the response contains data
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
      {weatherData && (
        <div>
          <h2>Weather Data:</h2>
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
