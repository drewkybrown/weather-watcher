import React from "react";

function Location() {
  const handleCityChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <div className="flex-align middle justify-center border-black border-2">
        <input
          type="text"
          className="bg-slate-600 border border-slate-500 text-slate-200 placeholder-slate-400 text-md focus:border-slate-400 block w-60 p-2 border-black border-2"
          placeholder="Enter a city"
          onChange={handleCityChange}
          defaultValue=""
        />
      </div>
    </>
  );
}

export default Location;
