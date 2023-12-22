import React, { useEffect, useState } from "react";

function Location({ setCity, stats, updateBackgroundImage }) {
  const [inputValue, setInputValue] = useState(""); // State for input value
  // useEffect to respond to changes in stats
  useEffect(() => {
    if (stats) {
      updateBackgroundImage(stats.isDay, stats.condition);
    }
  }, [stats, updateBackgroundImage]); // Dependency array

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page from refreshing on submit
    setCity(inputValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="display: flex">
        <input
          type="text"
          className="flex-grow p-3 mr-2 border-2 bg-sky-100 text-black text-[17px] placeholder-black rounded-xl"
          placeholder="Enter a city, Zip code, or Airport Code..."
          onChange={handleInputChange}
          value={inputValue}
        />
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="mt-3 mb-3 mr-2 object-right h-6 text-transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </div>
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>

      <div className="flex justify-center p-1 font-sm">
        {stats && stats.isDay !== undefined ? (
          stats.isDay !== 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-14 h-14 text-yellow-300 mt-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-yellow-200 mt-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          )
        ) : null}
      </div>
      <div className="flex flex-col justify-center items-center text-white mt-2">
        <p className="font-semibold text-[40px]">
          {stats && stats.temp}
          <span className="text-[33px]">°F</span>
        </p>
        {stats && stats.feelsLike && (
          <p className="font-semibold text-[14px] mt-1">
            Feels like: {stats.feelsLike}°F
          </p>
        )}
      </div>

      <div className="flex justify-center text-white mt-8 font-bold text-[20px] ">
        {stats && stats.condition}
      </div>

      <div className="flex justify-center text-white mt-5 mb-5 text-[13px] font-bold text-center">
        Today &#183; {stats && stats.time} |{" "}
        {stats && `${stats.location}, ${stats.region}, ${stats.country}`}
      </div>
    </>
  );
}

export default Location;
