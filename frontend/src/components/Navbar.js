import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, cartCount } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-yellow-500">
            ✨ JewelShop
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/cart"
                  className="relative hover:text-yellow-500 transition"
                >
                  🛒 Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="hover:text-yellow-500 transition">
                  📦 Orders
                </Link>
                <span className="text-yellow-500">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-yellow-500 transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
