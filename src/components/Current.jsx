import React from "react";

function Current({ stats }) {
  return (
    <div className="bg-white p-2 text-slate-200 flex flex-col justify-start items-center border-black border-2">
      <h2 className="text-sm mt-2">Wind Status</h2>
      <div className="mt-2">
        {" "}
        <span className="text-4xl font-bold">{stats.value}</span>
        <span className="text-2xl">{stats.unit}</span>
      </div>
      {stats.direction ? (
        <div className="flex mt-4">
          <div className="text-slate-200 ms-2">{stats.direction}</div>
        </div>
      ) : null}

      {stats.title == "Humidity" ? (
        <div className="w-full mt-4 bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
            style={{ width: `${stats.value}%` }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}

export default Current;
