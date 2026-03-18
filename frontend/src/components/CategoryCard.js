import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={category.link}
      className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
    >
      {/* Image Section */}
      <div className="h-48 w-full bg-[#F6F3EF] overflow-hidden">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-[#6B4F3A] font-semibold">
            {category.name}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-[#6B4F3A] group-hover:text-[#C79A7B] transition">
          {category.name}
        </h3>

        {/* Gold underline animation */}
        <div className="mt-2 h-[2px] w-0 bg-[#C79A7B] mx-auto group-hover:w-16 transition-all duration-300"></div>
      </div>
    </Link>
  );
}