import React, { useEffect, useState } from "react";
import Current from "./components/Current";
import Location from "./components/Location";

import "./App.css";

// fetch data from api and store in state variables
function App() {
  const [city, setCity] = useState("Tampa");
  const [weatherData, setWeatherData] = useState(null);

  // fetch data from api when city changes
  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    // fetch data from api
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Weather data not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [city]);

  return (
    <div className="bg-white h-screen flex justify-center items-start">
      <div className="w-1/5 h-1/3 mt-40 bg-yellow-400 border-black border-2">
        <h1 className="text-slate-800 text-2xl col-span-2 bg-red-400 border-black border-2">
          Weather Location
        </h1>
        {/* Location */}
        <Location />
      </div>

      <div className="w-1/3 h-1/3 mt-40 p-10 grid grid-cols-2 gap-6">
        <h1 className="text-slate-200 text-2xl col-span-2"></h1>
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
    </div>
  );
}

export default App;
