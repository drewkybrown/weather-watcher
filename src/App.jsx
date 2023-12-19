import React from "react";
import Current from "./components/Current";
import Location from "./components/Location";

import "./App.css";

function App() {
  return (
    <div className="bg-slate-800 h-screen flex justify-center items-start">
      <div className="w-1/5 h-1/3 mt-40 bg-yellow-400">
        <h1 className="text-slate-800 text-2xl col-span-2 bg-red-400 ">
          Weather Location
        </h1>
        {/* Location */}
      </div>

      <div className="w-1/3 h-1/3 mt-40 p-10 grid grid cols-2 gap-6 bg-white">
        <h1 className="text-slate-800 text-2xl col-span-2 bg-blue-300">
          Current Weather
        </h1>
        {/* Current */}
      </div>
    </div>
  );
}

export default App;
