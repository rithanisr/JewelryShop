import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, addToCartCount } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data.data || data);
    } catch (err) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    setAdding(true);
    const loadingToast = toast.loading("Adding to cart...");
    try {
      await api.post("/cart/add", { productId: product._id, quantity });
      addToCartCount(quantity);
      toast.success(`${product.name} added to cart!`, { id: loadingToast });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>;
  if (!product) return <p className="text-center py-12">Product not found</p>;

  return (
    <div className="min-h-screen bg-[#F6F3EF]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
         className="text-[#6B4F3A] hover:text-[#C79A7B] mb-6 font-semibold transition"
        >
          &larr; Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-4 sticky top-20">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded"
              />
              <div className="mt-4 flex items-center">
                <span className="text-[#C79A7B] text-xl">⭐</span>
                <span className="ml-2 font-semibold">
                  {product.rating || 0}/5
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4 capitalize text-sm">
              Category: {product.category}
            </p>
            <p className="text-3xl font-bold text-[#C79A7B] mb-6">
              ₹{product.price.toLocaleString()}
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6 p-3 bg-[#F6F3EF] border border-[#E5D6CC] rounded-lg">
              <p className="text-sm">
                {product.stock > 0 ? (
                  <>
                    <span className="text-[#6B4F3A] font-semibold">
                      ✓ In Stock
                    </span>
                    {product.stock < 5 && (
                      <span className="ml-2 text-orange-600">
                        ({product.stock} items left)
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-red-600 font-semibold">
                    ✗ Out of Stock
                  </span>
                )}
              </p>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <label className="font-semibold">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#C79A7B]"
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={adding || product.stock === 0}
              className="w-full bg-[#C79A7B] hover:bg-[#B88A6B] text-white font-bold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed mb-8 shadow-sm"
            >
              {adding ? "Adding to Cart..." : "Add to Cart"}
            </button>

            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-4 text-[#6B4F3A]">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.material && (
                  <div className="pb-3 border-b">
                    <p className="text-gray-600 text-sm">Material</p>
                    <p className="font-semibold">{product.material}</p>
                  </div>
                )}
                {product.purity && (
                  <div className="pb-3 border-b">
                    <p className="text-gray-600 text-sm">Purity</p>
                    <p className="font-semibold">{product.purity}</p>
                  </div>
                )}
                {product.weight && (
                  <div className="pb-3 border-b">
                    <p className="text-gray-600 text-sm">Weight</p>
                    <p className="font-semibold">{product.weight}</p>
                  </div>
                )}
                {product.dimensions && (
                  <div className="pb-3 border-b">
                    <p className="text-gray-600 text-sm">Dimensions</p>
                    <p className="font-semibold">{product.dimensions}</p>
                  </div>
                )}
                {product.gemstone && (
                  <div className="pb-3 border-b">
                    <p className="text-gray-600 text-sm">Gemstone</p>
                    <p className="font-semibold">{product.gemstone}</p>
                  </div>
                )}
                {product.metalFinish && (
                  <div className="pb-3 border-b">
                    <p className="text-gray-600 text-sm">Metal Finish</p>
                    <p className="font-semibold">{product.metalFinish}</p>
                  </div>
                )}
                {product.warranty && (
                  <div className="pb-3 border-b">
                    <p className="text-gray-600 text-sm">Warranty</p>
                    <p className="font-semibold">{product.warranty}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
