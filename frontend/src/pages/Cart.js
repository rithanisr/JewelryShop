import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, updateCartCount } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [token, navigate]);

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      const cartItems = data.data || [];
      setCart(cartItems);

      const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      updateCartCount(totalItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`);
      const updatedCart = cart.filter((item) => item._id !== cartId);
      setCart(updatedCart);
    
      const totalItems = updatedCart.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      updateCartCount(totalItems);
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  const handleUpdateQuantity = async (cartId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.put(`/cart/${cartId}`, { quantity });
      fetchCart(); 
    } catch (err) {
      alert("Failed to update quantity");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0,
  );

  if (loading) return <p className="text-center py-12">Loading cart...</p>;

  return (
  <div className="min-h-screen bg-[#F6F3EF] py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#6B4F3A] mb-10">
        Your Shopping Bag
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-5 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-[#6B4F3A] text-lg">
                    {item.productId?.name}
                  </h3>

                  <p className="text-[#C79A7B] font-semibold mt-1">
                    ₹{item.productId?.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity - 1)
                      }
                      className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
                    >
                      −
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity + 1)
                      }
                      className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleRemove(item._id)}
                      className="ml-auto text-red-500 hover:text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-7 rounded-xl shadow-md h-fit sticky top-6">
            <h2 className="text-xl font-bold text-[#6B4F3A] mb-5">
              Order Summary
            </h2>

            <p className="text-2xl font-bold text-[#C79A7B] mb-6">
              Total: ₹{total}
            </p>

            <div className="space-y-3 mb-6 text-sm text-gray-600">
              <div className="flex gap-2">
                <span>📦</span>
                <span>{cart.length} items in cart</span>
              </div>

              <div className="flex gap-2">
                <span>🚚</span>
                <span>Free shipping above ₹500</span>
              </div>

              <div className="flex gap-2">
                <span>🔒</span>
                <span>Secure checkout</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#C79A7B] hover:bg-[#B88A6B] text-white font-semibold py-3 rounded-lg transition mb-3"
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <button
              onClick={() => navigate("/")}
              className="w-full border border-[#C79A7B] text-[#6B4F3A] font-semibold py-3 rounded-lg hover:bg-[#F6F3EF] transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
