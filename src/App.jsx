import React, { useEffect } from "react";
import Current from "./components/Current";
import Location from "./components/Location";

import "./App.css";

// fetch data from api and store in state variables
function App() {
  // state variables
  const [city, setCity] = React.useState("Tampa");

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

      <div className="w-1/3 h-1/3 mt-40 p-10 grid grid cols-2 gap-6 bg-green-400 border-black border-2">
        <h1 className="text-slate-800 text-2xl col-span-2 bg-blue-300 border-black border-2">
          Current Weather
        </h1>
        {/* Current */}
      </div>
    </div>
  );
}

export default App;
