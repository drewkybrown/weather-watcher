import React from "react";

function Current({ stats }) {
  return (
    <div className="bg-transparent p-2 text-white flex flex-col justify-start items-center">
      <h2 className="text-sm mt-2">{stats.title}</h2>
      <div className="mt-2">
        <div className="text-3xl font-bold">
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
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <div className="text-white ms-2">{stats.direction}</div>
        </div>
      ) : null}
    </div>
  );
}

export default Current;
