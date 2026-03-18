import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [token, navigate]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center py-12 text-[#6B4F3A] font-semibold">
        Loading orders...
      </p>
    );

  return (
    <div className="min-h-screen bg-[#F6F3EF] py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-[#6B4F3A] mb-10 text-center">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <p className="text-gray-500 text-lg">
              You haven't placed any orders yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-[#C79A7B] hover:bg-[#B88A6B] text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
                  <div>
                    <p className="font-semibold text-[#6B4F3A]">
                      Order ID: {order._id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${
                      order.status === "Delivered"
                        ? "bg-green-600"
                        : order.status === "Shipped"
                        ? "bg-blue-600"
                        : order.status === "Processing"
                        ? "bg-[#C79A7B]"
                        : "bg-gray-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="mb-6 bg-[#F6F3EF] rounded-xl p-4 border border-[#E5D6CC]">
                  <p className="font-semibold text-[#6B4F3A] mb-3">
                    Ordered Items
                  </p>

                  <div className="space-y-2">
                    {order.products?.map((prod, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-700">
                          {prod.productId?.name} × {prod.quantity}
                        </span>
                        <span className="font-semibold text-[#6B4F3A]">
                          ₹{(prod.price || 0) * prod.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="border-t pt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <p>
                      <span className="font-semibold text-[#6B4F3A]">
                        Address:
                      </span>{" "}
                      {order.address}
                    </p>
                    <p>
                      <span className="font-semibold text-[#6B4F3A]">
                        Phone:
                      </span>{" "}
                      {order.phoneNumber}
                    </p>
                  </div>

                  <p className="text-2xl font-bold text-[#C79A7B]">
                    ₹{order.total.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}