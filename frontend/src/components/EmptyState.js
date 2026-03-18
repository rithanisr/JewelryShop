import React from "react";

export default function EmptyState({
  title = "No items found",
  message = "Try another category or refresh the page.",
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      
      {/* Icon Circle */}
      <div className="w-20 h-20 rounded-full bg-[#F6F3EF] flex items-center justify-center mb-6 shadow-sm">
        <span className="text-3xl text-[#C79A7B]">✨</span>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-[#6B4F3A] mb-3">
        {title}
      </h2>

      {/* Message */}
      <p className="text-gray-500 max-w-md mb-8">
        {message}
      </p>

      {/* Badge */}
      <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold text-[#6B4F3A] bg-white border border-[#E5D6CC] shadow-sm">
        No products to show
      </div>
    </div>
  );
}