import React, { useEffect, useState } from "react";
import Current from "./components/Current";
import Location from "./components/Location";
import Forecast from "./components/Forecast";

import "./App.css";

// Function for the App component that returns the JSX for the app

function App() {
  const [city, setCity] = useState("Tampa");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // Function to fetch weather and forecast data
    const fetchWeatherData = async () => {
      if (!city || isFetching) return;

      setIsFetching(true);
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        const weatherResponse = await fetch(apiUrl);
        if (!weatherResponse.ok) {
          throw new Error("Weather data not found");
        }
        const weather = await weatherResponse.json();
        setWeatherData(weather);

        const forecastApiKey = import.meta.env.VITE_TOMORROW_API_KEY;
        const forecastApiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${city}&timesteps=daily&apikey=${forecastApiKey}`;

        const forecastResponse = await fetch(forecastApiUrl);
        if (!forecastResponse.ok) {
          throw new Error("Forecast data not found");
        }
        const forecast = await forecastResponse.json();
        setForecastData(forecast);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsFetching(false);
      }
    };

    // Invoke the fetch function
    fetchWeatherData();
  }, [city]); // Dependency array includes city

  return (
    <div className="bg-[url('/background.jpg')] min-h-screen w-full bg-cover bg-center flex justify-center items-start">
      <div className="w-1/5 h-1/3 mt-40 bg-white p-5 border-black border-4">
        {weatherData && (
          <Location
            setCity={setCity}
            stats={{
              temp: weatherData.current.temp_f,
              feelsLike: weatherData.current.feelslike_f, // Add feels like temp
              condition: weatherData.current.condition.text,
              isDay: weatherData.current.is_day,
              location: weatherData.location.name,
              region: weatherData.location.region, // Add weather region
              country: weatherData.location.country, // Added weather country
              time: weatherData.location.localtime,
            }}
          />
        )}
      </div>

      <div className="w-1/3 h-1/3 mt-40 grid grid-cols-2 gap-9">
        <h1 className="text-slate-800 text-2xl col-span-2"></h1>
        {weatherData && (
          <>
            <Current
              stats={{
                title: "Wind Status",
                value: weatherData.current.wind_mph,
                unit: "mph",
                direction: weatherData.current.wind_dir,
              }}
            />
            <Current
              stats={{
                title: "Humidity",
                value: weatherData.current.humidity,
                unit: "%",
              }}
            />
            <Current
              stats={{
                title: "Visibility",
                value: weatherData.current.vis_miles,
                unit: "miles",
              }}
            />
            <Current
              stats={{
                title: "Air Pressure",
                value: weatherData.current.pressure_mb,
                unit: "mb",
              }}
            />
          </>
        )}
      </div>
      {/* FORECAST DIV UNDER CURRENT LAYOUT*/}
      <div className="absolute bottom-8 w-3/4 text-center mb-8 border-black border-2 ">
        {forecastData && <Forecast forecastData={forecastData} />}
      </div>
    </div>
  );
}

export default App;
