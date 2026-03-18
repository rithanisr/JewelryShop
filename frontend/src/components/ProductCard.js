import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ProductCard({ product, onAdd }) {
  const [loading, setLoading] = useState(false);
  const { token, addToCartCount } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = async (event) => {
    event.stopPropagation();

    if (product.stock === 0) return;

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      if (onAdd) {
        await onAdd(product);
      } else {
        await api.post("/cart/add", {
          productId: product._id,
          quantity: 1,
        });
        addToCartCount(1);
        toast.success(`${product.name} added to cart!`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  const stars = [];
  const starCount = Math.round(product.rating || 0);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
       className={i <= starCount ? "text-[#C79A7B]" : "text-gray-300"}
      >
        ★
      </span>,
    );
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
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

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-[#C79A7B]">
            ₹{product.price}
          </span>
          <div className="flex items-center gap-1 text-sm">{stars}</div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || loading}
          className={`w-full py-2 rounded-lg font-semibold text-sm transition ${
  product.stock === 0
    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
    : "bg-[#C79A7B] text-white hover:bg-[#B88A6B] shadow-sm"
}`}
        >
          {loading
            ? "Adding..."
            : product.stock === 0
              ? "Out of Stock"
              : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
