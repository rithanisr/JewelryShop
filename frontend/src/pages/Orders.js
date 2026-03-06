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

  if (loading) return <p className="text-center py-12">Loading orders...</p>;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-lg p-6 bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold">Order ID: {order._id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-white font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-600"
                        : order.status === "Shipped"
                          ? "bg-blue-600"
                          : order.status === "Processing"
                            ? "bg-yellow-600"
                            : "bg-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">Items:</p>
                  {order.products &&
                    order.products.map((prod, idx) => (
                      <p key={idx} className="text-sm text-gray-700">
                        {prod.productId?.name} × {prod.quantity} = ₹
                        {(prod.price || 0) * prod.quantity}
                      </p>
                    ))}
                </div>

                <div className="border-t pt-4">
                  <p className="text-lg font-bold">Total: ₹{order.total}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Address: {order.address}
                    <br />
                    Phone: {order.phoneNumber}
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
