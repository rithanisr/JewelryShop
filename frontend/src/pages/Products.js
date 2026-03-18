import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ read URL params
  const categoryParam = searchParams.get("category") || "all";
  const searchParam = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] =
    useState(categoryParam);

  const categories = ["all", "earrings", "necklace", "ring"];

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      const productList = data.data || [];

      setProducts(productList);
      applyFilters(productList, categoryParam, searchParam);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= APPLY FILTERS ================= */
  const applyFilters = (productList, category, search) => {
    let updatedProducts = [...productList];

    // ✅ SEARCH FILTER
    if (search) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // ✅ CATEGORY FILTER
    if (category !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.category?.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredProducts(updatedProducts);
    setSelectedCategory(category);
  };

  /* ================= URL CHANGE LISTENER ================= */
  useEffect(() => {
    applyFilters(products, categoryParam, searchParam);
  }, [searchParams, products]);

  /* ================= CATEGORY CLICK ================= */
  const handleCategoryClick = (category) => {
    navigate(
      `/products?category=${category}${
        searchParam ? `&search=${searchParam}` : ""
      }`
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F3EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* HEADING */}
        <h1 className="text-4xl font-bold text-[#6B4F3A] mb-2">
          All Products
        </h1>

        <p className="text-gray-600 mb-6">
          Discover our premium collection of handcrafted jewelry
        </p>

        {/* ✅ SHOW SEARCH RESULT TEXT */}
        {searchParam && (
          <p className="mb-8 text-[#C79A7B] font-medium">
            Showing results for: <span className="font-bold">"{searchParam}"</span>
          </p>
        )}

        {/* CATEGORY FILTER */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border
                  ${
                    active
                      ? "bg-[#C79A7B] text-white border-[#C79A7B] shadow-md"
                      : "bg-white text-[#6B4F3A] border-[#E5D6CC] hover:bg-[#F6F3EF]"
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            );
          })}
        </div>

        {/* LOADER */}
        {loading && <Loader count={8} />}

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-500 mb-6 font-semibold">
            {error}
          </p>
        )}

        {/* PRODUCTS GRID */}
        {!loading && !error && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          !loading && !error && <EmptyState />
        )}

        {/* FOOTER COUNT */}
        <div className="mt-12 text-center text-[#6B4F3A] font-medium">
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}