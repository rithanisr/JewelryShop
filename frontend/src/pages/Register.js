import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/users/register", formData);
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-[#F6F3EF] p-6">

    <div className="w-full max-w-md bg-white rounded-[35px] overflow-hidden shadow-xl">

      {/* HEADER */}
      <div className="relative bg-[#C79A7B] h-64 p-8 text-white">

        <button
          onClick={() => navigate("/login")}
          className="text-2xl opacity-80"
        >
          ←
        </button>

        <div className="mt-10">
          <h2 className="text-3xl font-light">
            Create <br /> Account
          </h2>
          <p className="text-sm opacity-80 mt-2">
            Join Aurora Jewels
          </p>
        </div>

      
      </div>

      {/* FORM */}
      <div className="bg-[#F6F3EF] px-8 py-12 rounded-t-[40px] -mt-10">

        <form onSubmit={handleSubmit} className="space-y-6">

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e)=>
                setFormData({...formData,name:e.target.value})
              }
              className="w-full mt-2 bg-transparent border-b border-[#E7D8CC]
              focus:outline-none focus:border-[#C79A7B] py-2"
              required
            />
          </div>

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

          <div>
            <label className="text-sm text-gray-500">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e)=>
                setFormData({...formData,password:e.target.value})
              }
              className="w-full mt-2 bg-transparent border-b border-[#E7D8CC]
              focus:outline-none focus:border-[#C79A7B] py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C79A7B] text-white py-4 rounded-full
            font-semibold shadow-md hover:bg-[#B88A6B]
            transition duration-300 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  </div>
);
}
