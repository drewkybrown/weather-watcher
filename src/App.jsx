import { useState, useEffect } from "react";
import { getWeatherData } from "./services/weatherService";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Example coordinates for testing
  const lat = 40.7128; // Latitude for New York City
  const lon = -74.006; // Longitude for New York City

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const data = await getWeatherData(lat, lon);
        setWeatherData(data);
        setError("");
      } catch (err) {
        setError("Error fetching weather data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Welcome to Weather Watcher!
      </h1>
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
