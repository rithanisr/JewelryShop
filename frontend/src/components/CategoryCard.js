import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={category.link}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
    >
      <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-500">{category.name}</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
      </div>
    </Link>
  );
}
