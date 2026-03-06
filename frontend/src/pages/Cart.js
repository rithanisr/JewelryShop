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
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 border-b pb-4 mb-4">
                  <img
                    src={item.productId?.image}
                    alt={item.productId?.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.productId?.name}</h3>
                    <p className="text-yellow-600">₹{item.productId?.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item._id, item.quantity - 1)
                        }
                        className="bg-gray-200 px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item._id, item.quantity + 1)
                        }
                        className="bg-gray-200 px-2 py-1 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="ml-auto text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <p className="text-2xl font-bold text-yellow-600 mb-6">
                Total: ₹{total}
              </p>

              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>📦</span>
                  <span>{cart.length} items in cart</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚚</span>
                  <span>Free shipping on orders above ₹500</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-lg mb-3"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg"
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
