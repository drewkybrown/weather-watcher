import React from "react";

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const {
    name,
    main: { temp, feels_like, humidity, temp_min, temp_max },
    weather,
    wind,
  } = weatherData;

  // Convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  return (
    <div>
      <h2>Weather in {name}</h2>
      <div>
        <p>Temperature: {celsiusToFahrenheit(temp)}°F</p>
        <p>Feels like: {celsiusToFahrenheit(feels_like)}°F</p>
        <p>Humidity: {humidity}%</p>
        <p>Condition: {weather[0].description}</p>
        <p>Min Temperature: {celsiusToFahrenheit(temp_min)}°F</p>
        <p>Max Temperature: {celsiusToFahrenheit(temp_max)}°F</p>
        <p>Wind Speed: {wind.speed} m/s</p>
        <p>Wind Direction: {wind.deg}°</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
