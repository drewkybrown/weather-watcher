import React from "react";
import Current from "./components/Current";
import Location from "./components/Location";

import "./App.css";

function App() {
  return (
    <div className="bg-slate-800 h-screen flex justify-center items-start">
      <div>{/* Location */}</div>

      <div className="w-1/5 h-1/3 mt-40">{/* Current */}</div>
    </div>
  );
}

export default App;
