import React from "react";

function Location() {
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  return (
    <>
      <div className="flex-align middle justify-center border-black border-2">
        <input
          type="text"
          className="bg-white text-slate-800 placeholder-slate-200 text-md focus:border-slate-400 block w-60 p-2 border-black border-2"
          placeholder="Enter a city"
          onChange={handleCityChange}
          defaultValue="Tampa"
        />
        <div className="m-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6 text-transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out"
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
      </div>
    </>
  );
}

export default Location;
