import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const { token, addToCartCount } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      addToCartCount(1);
      alert("Added to cart!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
    >
      <div className="relative h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        )}

        {product.stock > 0 && product.stock < 10 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
            Limited Stock
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h3>


        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-yellow-600">
            ₹{product.price}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-500">⭐</span>
            <span className="ml-1 text-sm font-medium">
              {product.rating || 0}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
