import React from "react";

function Current({ stats }) {
  return (
    <div className="bg-white p-2 text-slate-500 flex flex-col justify-start items-center border-black border-2">
      <h2 className="text-sm mt-2">{stats.title}</h2>
      <div className="mt-2">
        <div className="text-4xl font-bold">
          {stats.value}
          {stats.unit}
        </div>
      </div>
      {stats.direction ? (
        <div className="flex mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-slate-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <div className="text-slate-500 ms-2">{stats.direction}</div>
        </div>
      ) : null}
    </div>
  );
}

export default Current;
