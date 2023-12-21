import React, { useEffect, useState } from "react";
import Current from "./components/Current";
import Location from "./components/Location";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const [city, setCity] = useState("Tampa");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("/default.jpg"); // DELETE THIS LINE IF AS A LAST RESORT

  // function to update background image based on weather condition
  const updateBackgroundImage = (isDay, condition) => {
    let newBackground = "/default.jpg"; // default background image

    // Update the logic to set background based on isDay and condition
    if (isDay) {
      newBackground = "/day.jpg";
    } else {
      newBackground = "/night.jpg";
    }

    if (condition.includes("Rain")) {
      newBackground = "/rain.jpg";
    } else if (condition.includes("Snow")) {
      newBackground = "/snow.jpg";
    }
    setBackgroundImage(newBackground);
  };

  useEffect(() => {
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
        console.log("Forecast API URL:", forecastApiUrl); // Added for debugging

        const forecastResponse = await fetch(forecastApiUrl);

        if (forecastResponse.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }

        if (!forecastResponse.ok) {
          throw new Error("Forecast data not found");
        }

        const forecast = await forecastResponse.json();
        console.log("Raw forecast data:", forecast); // Add this line for debugging
        setForecastData(forecast);
      } catch (err) {
        console.error(err.message);
        // Consider setting an error state here
      } finally {
        setIsFetching(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div
      className="flex flex-col w-full h-screen bg-cover bg-center overflow-auto"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col items-center space-y-4 bg-transparent">
        <div className="w-1/4 max-h-[60vh] mt-4 p-5 overflow-hidden bg-transparent">
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
              updateBackgroundImage={updateBackgroundImage} // PASS THE FUNCTION AS A PROP
            />
          )}
        </div>

        <div className="w-1/3 h-1/3 mt-36 grid grid-cols-2 gap-4 p-4 bg-transparent">
          {weatherData && (
            <>
              <div className="flex flex-col items-center justify-center p-2 border border-gray-600 rounded">
                <Current
                  stats={{
                    title: "Wind Status",
                    value: weatherData.current.wind_mph,
                    unit: "mph",
                    direction: weatherData.current.wind_dir,
                  }}
                />
              </div>
              <div className="flex flex-col items-center justify-center p-2 border border-gray-600 rounded">
                <Current
                  stats={{
                    title: "Humidity",
                    value: weatherData.current.humidity,
                    unit: "%",
                  }}
                />
              </div>
              <div className="flex flex-col items-center justify-center p-2 border border-gray-600 rounded">
                <Current
                  stats={{
                    title: "Visibility",
                    value: weatherData.current.vis_miles,
                    unit: "miles",
                  }}
                />
              </div>
              <div className="flex flex-col items-center justify-center p-2 border border-gray-600 rounded">
                <Current
                  stats={{
                    title: "Air Pressure",
                    value: weatherData.current.pressure_mb,
                    unit: "mb",
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {/* FORECAST DIV UNDER CURRENT LAYOUT*/}
      <div className="w-full p-4  bg-transparent">
        {forecastData && <Forecast forecastData={forecastData} />}
      </div>
    </div>
  );
}

export default App;
