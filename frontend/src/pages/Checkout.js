import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { token, updateCartCount } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [errors, setErrors] = useState({});

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
      setCartItems(data.data || []);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  };

  const validateShippingInfo = () => {
    const newErrors = {};
    if (!shippingInfo.firstName.trim())
      newErrors.firstName = "First name required";
    if (!shippingInfo.lastName.trim())
      newErrors.lastName = "Last name required";
    if (!shippingInfo.email.trim()) newErrors.email = "Email required";
    if (!shippingInfo.phone.trim()) newErrors.phone = "Phone number required";
    if (!shippingInfo.address.trim()) newErrors.address = "Address required";
    if (!shippingInfo.city.trim()) newErrors.city = "City required";
    if (!shippingInfo.state.trim()) newErrors.state = "State required";
    if (!shippingInfo.postalCode.trim())
      newErrors.postalCode = "Postal code required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBillingInfo = () => {
    if (billingInfo.sameAsShipping) return true;
    const newErrors = {};
    if (!billingInfo.firstName.trim())
      newErrors.firstName = "First name required";
    if (!billingInfo.lastName.trim()) newErrors.lastName = "Last name required";
    if (!billingInfo.address.trim()) newErrors.address = "Address required";
    if (!billingInfo.city.trim()) newErrors.city = "City required";
    if (!billingInfo.state.trim()) newErrors.state = "State required";
    if (!billingInfo.postalCode.trim())
      newErrors.postalCode = "Postal code required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (nextStep) => {
    if (step === 1 && validateShippingInfo()) {
      setStep(nextStep);
    } else if (step === 2 && validateBillingInfo()) {
      setStep(nextStep);
    } else if (step > 2) {
      setStep(nextStep);
    }
  };

  const handlePlaceOrder = async () => {
    setCheckoutLoading(true);
    try {
      const orderData = {
        address: shippingInfo.address,
        phoneNumber: shippingInfo.phone,
      };
      const { data } = await api.post("/orders/create", orderData);
      updateCartCount(0);
       toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const shippingCost =
    shippingMethod === "express"
      ? 200
      : shippingMethod === "overnight"
        ? 500
        : 0;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax + shippingCost;

  if (loading) return <p className="text-center py-12">Loading...</p>;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F6F3EF] py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">
            Add items to proceed with checkout
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#C79A7B] hover:bg-[#A87D5F] text-white font-bold py-2 px-6 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
           <h1 className="text-4xl font-bold text-[#6B4F3A] mb-10">
            Secure Checkout
          </h1>

          <div className="flex items-center justify-between max-w-3xl">
            {[1, 2, 3, 4].map((stepNum, idx) => (
              <React.Fragment key={stepNum}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    step >= stepNum
                      ? "bg-[#C79A7B] text-white"
                      : "bg-[#A87D5F] text-white"
                  }`}
                >
                  {stepNum}
                </div>
                {idx < 3 && (
                  <div
                    className={`flex-1 h-1 ${
                      step > stepNum ? "bg-[#C79A7B]" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between max-w-3xl mt-2 text-sm text-[#6B4F3A]">
            <span>Shipping</span>
            <span>Billing</span>
            <span>Review</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#6B4F3A]">
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            firstName: e.target.value,
                          })
                        }
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            lastName: e.target.value,
                          })
                        }
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          email: e.target.value,
                        })
                      }
                      className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          phone: e.target.value,
                        })
                      }
                      className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                        errors.address ? "border-red-500" : ""
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value,
                          })
                        }
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                          errors.city ? "border-red-500" : ""
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            state: e.target.value,
                          })
                        }
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                          errors.state ? "border-red-500" : ""
                        }`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.state}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.postalCode}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            postalCode: e.target.value,
                          })
                        }
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                          errors.postalCode ? "border-red-500" : ""
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => navigate("/cart")}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    ← Back to Cart
                  </button>
                  <button
                    onClick={() => handleNextStep(2)}
                    className="bg-[#C79A7B] hover:bg-[#A87D5F] text-white font-bold py-2 px-6 rounded-lg"
                  >
                    Continue to Billing
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Billing Information</h2>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={billingInfo.sameAsShipping}
                      onChange={(e) =>
                        setBillingInfo({
                          ...billingInfo,
                          sameAsShipping: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="ml-3 text-gray-700">
                      Same as shipping address
                    </span>
                  </label>
                </div>

                {!billingInfo.sameAsShipping && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={billingInfo.firstName}
                          onChange={(e) =>
                            setBillingInfo({
                              ...billingInfo,
                              firstName: e.target.value,
                            })
                          }
                          className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                            errors.firstName ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={billingInfo.lastName}
                          onChange={(e) =>
                            setBillingInfo({
                              ...billingInfo,
                              lastName: e.target.value,
                            })
                          }
                          className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                            errors.lastName ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={billingInfo.address}
                        onChange={(e) =>
                          setBillingInfo({
                            ...billingInfo,
                            address: e.target.value,
                          })
                        }
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                          errors.address ? "border-red-500" : ""
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={billingInfo.city}
                          onChange={(e) =>
                            setBillingInfo({
                              ...billingInfo,
                              city: e.target.value,
                            })
                          }
                          className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                            errors.city ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          value={billingInfo.state}
                          onChange={(e) =>
                            setBillingInfo({
                              ...billingInfo,
                              state: e.target.value,
                            })
                          }
                          className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                            errors.state ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={billingInfo.postalCode}
                          onChange={(e) =>
                            setBillingInfo({
                              ...billingInfo,
                              postalCode: e.target.value,
                            })
                          }
                          className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C79A7B] ${
                            errors.postalCode ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => handleNextStep(3)}
                    className="bg-[#C79A7B] hover:bg-[#A87D5F] text-white font-bold py-2 px-6 rounded-lg"
                  >
                    Continue to Review
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Review Order</h2>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Shipping Address
                  </h3>
                  <p className="text-gray-700">
                    {shippingInfo.firstName} {shippingInfo.lastName}
                  </p>
                  <p className="text-gray-700">{shippingInfo.address}</p>
                  <p className="text-gray-700">
                    {shippingInfo.city}, {shippingInfo.state}{" "}
                    {shippingInfo.postalCode}
                  </p>
                  <p className="text-gray-700">{shippingInfo.email}</p>
                  <p className="text-gray-700">{shippingInfo.phone}</p>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="text-[#6B4F3A] hover:text-[#C79A7B] mb-6 font-semibold transition"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => handleNextStep(4)}
                    className="bg-[#C79A7B] hover:bg-[#A87D5F] text-white font-bold py-2 px-6 rounded-lg"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                <div className="space-y-4 mb-8">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium">Credit/Debit Card</span>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium">UPI</span>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="netbanking"
                      checked={paymentMethod === "netbanking"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium">Net Banking</span>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium">Cash on Delivery</span>
                  </label>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                  <p className="text-blue-900">
                    💳 Your payment information is secure. This is a demo
                    checkout.
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(3)}
                    className="text-[#6B4F3A] hover:text-[#C79A7B] mb-6 font-semibold transition"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={checkoutLoading}
                    className="bg-[#C79A7B] hover:bg-[#A87D5F] text-white font-bold py-2 px-8 rounded-lg disabled:opacity-50"
                  >
                    {checkoutLoading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between border-b pb-2"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {item.productId?.name}
                      </p>
                      <p className="text-gray-600 text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{(item.productId?.price || 0) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%):</span>
                  <span>₹{tax}</span>
                </div>
                {shippingCost > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span>₹{shippingCost}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-[#C79A7B]">
                  <span>Total:</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📦</span>
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
