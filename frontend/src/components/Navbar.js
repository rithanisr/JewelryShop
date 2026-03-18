import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../Asset/logo.png";
import logo2 from "../Asset/logo2.png";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBox,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { user, logout, cartCount } = useContext(AuthContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ---------- SEARCH SUBMIT ----------
  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim().toLowerCase();
    if (!value) return;

    const categories = ["ring", "earrings", "necklace"];

    if (categories.includes(value)) {
      navigate(`/products?category=${value}`);
    } else {
      navigate(`/products?search=${value}`);
    }

    setSearch("");
    setSearchOpen(false);
  };

  // ---------- CLOSE SEARCH ON OUTSIDE CLICK ----------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#F6F3EF]/90 backdrop-blur-md text-[#6B4F3A] shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ---------- LOGO ---------- */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo2}
              alt="Aurora Logo"
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
            />

            <div className="leading-tight">
              <h1 className="text-xl font-semibold tracking-wider">
                Aurora Jewels
              </h1>
              <p className="text-[10px] text-gray-500 tracking-[0.2em] hidden sm:block">
                Light Up Your Legacy
              </p>
            </div>
          </Link>

          {/* ---------- RIGHT SECTION ---------- */}
          <div className="flex items-center space-x-6">

            {/* ---------- SEARCH ---------- */}
            <div ref={searchRef} className="relative flex items-center">

              {/* SEARCH ICON */}
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="text-lg hover:text-[#C79A7B] transition"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>

              {/* EXPANDABLE SEARCH BAR */}
              <form
                onSubmit={handleSearch}
                className={`absolute right-0 top-12 md:top-0 md:right-10
                  flex items-center bg-white rounded-full shadow-md border
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${
                    searchOpen
                      ? "w-72 opacity-100 px-4 py-2"
                      : "w-0 opacity-0 px-0 py-0"
                  }`}
              >
                <input
                  autoFocus={searchOpen}
                  type="text"
                  placeholder="Search jewellery..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 outline-none text-sm bg-transparent"
                />

                {/* CLOSE BUTTON */}
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-2 text-gray-400 hover:text-red-400"
                >
                  ✕
                </button>
              </form>
            </div>

            {user ? (
              <>
                {/* CART */}
                <Link
                  to="/cart"
                  className="relative hover:text-[#C79A7B] transition text-lg"
                >
                  <FontAwesomeIcon icon={faCartShopping} />

                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>

                {/* ORDERS */}
                <Link
                  to="/orders"
                  className="flex items-center gap-2 hover:text-[#C79A7B]"
                >
                  <FontAwesomeIcon icon={faBox} />
                  <span className="hidden sm:inline">Orders</span>
                </Link>

                {/* USER */}
                <span className="text-[#C79A7B] font-medium">
                  {user.name}
                </span>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="bg-[#C79A7B] hover:bg-[#B88A6B] text-white px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-[#C79A7B]">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-[#C79A7B] text-white px-4 py-2 rounded-lg hover:bg-[#B88A6B] transition shadow-sm"
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