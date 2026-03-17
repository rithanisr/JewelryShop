import React from "react";

export default function Loader({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg bg-white p-4 shadow-md animate-pulse"
        >
          <div className="h-48 bg-gray-200 rounded-md mb-4" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
