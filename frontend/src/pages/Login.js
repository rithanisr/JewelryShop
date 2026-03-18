import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff, Check, X } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/users/login", formData);
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-[#F6F3EF] p-6">

    {/* Card */}
    <div className="w-full max-w-md bg-white rounded-[35px] overflow-hidden shadow-xl">

      {/* TOP HEADER */}
      <div className="relative bg-[#C79A7B] h-64 p-8 text-white">
        

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="text-2xl opacity-80 hover:opacity-100"
        >
          ←
        </button>

        {/* Title */}
        <div className="mt-10">
          <h2 className="text-3xl font-light leading-snug">
            Welcome Back
          </h2>
          <p className="text-sm opacity-80 mt-2">
            Sign in to Aurora Jewels
          </p>
          
        </div>

       
      </div>

      {/* FORM AREA */}
      <div className="bg-[#F6F3EF] px-8 py-12 rounded-t-[40px] -mt-10">

        <form onSubmit={handleSubmit} className="space-y-6">

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e)=>
                setFormData({...formData,email:e.target.value})
              }
              className="w-full mt-2 bg-transparent border-b border-[#E7D8CC]
              focus:outline-none focus:border-[#C79A7B] py-2"
              required
            />
          </div>

          {/* Password */}
         <div>
  <label className="text-sm text-gray-500">Password</label>
  <div className="relative mt-2"> {/* Added relative and moved mt-2 here */}
    <input
      type={showPassword ? "text" : "password"} // Dynamic type
      value={formData.password}
      onChange={(e) =>
        setFormData({ ...formData, password: e.target.value })
      }
      className="w-full bg-transparent border-b border-[#E7D8CC]
      focus:outline-none focus:border-[#C79A7B] py-2 pr-10" // Added padding-right
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-0 bottom-2 text-gray-400 hover:text-[#C79A7B] transition-colors"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C79A7B] text-white py-4 rounded-full
            font-semibold shadow-md hover:bg-[#B88A6B]
            transition duration-300 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#C79A7B] font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  </div>
);
}
