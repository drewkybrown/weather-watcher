import React, { useEffect, useState } from "react";
import Current from "./components/Current";
import Location from "./components/Location";

import "./App.css";

// Function for the App component that returns the JSX for the app

function App() {
  const [city, setCity] = useState("Tampa");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

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
    <div className="bg-[url('/background.jpg')] min-h-screen w-full bg-cover bg-center flex justify-center items-start">
      <div className="w-1/5 h-1/3 mt-40 bg-white p-5">
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
        <h1>FORECAST BOX</h1>
      </div>
    </div>
  );
}

export default App;
