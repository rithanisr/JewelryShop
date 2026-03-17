import React from "react";

export default function EmptyState({
  title = "No items found",
  message = "Try another category or refresh the page.",
}) {
  return (
    <div className="text-center py-16">
      <p className="text-2xl font-semibold text-gray-800 mb-3">{title}</p>
      <p className="text-gray-500 mb-6">{message}</p>
      <div className="inline-flex items-center px-5 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white">
        <span> No products to show</span>
      </div>
    </div>
  );
}
