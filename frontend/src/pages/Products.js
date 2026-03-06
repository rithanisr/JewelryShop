import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );

  const categories = ["all", "earrings", "necklace", "ring"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.data || []);
      filterProductsByCategory(
        data.data || [],
        searchParams.get("category") || "all",
      );
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterProductsByCategory = (productList, category) => {
    if (category === "all") {
      setFilteredProducts(productList);
    } else {
      setFilteredProducts(
        productList.filter(
          (product) =>
            product.category?.toLowerCase() === category.toLowerCase(),
        ),
      );
    }
    setSelectedCategory(category);
  };

  const handleCategoryClick = (category) => {
    filterProductsByCategory(products, category);

    navigate(`/products?category=${category}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600 mb-8">
          Discover our premium collection of jewelry
        </p>


        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>


        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}


        {!loading && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500">
              No products available in this category
            </p>
          )
        )}


        <div className="mt-8 text-center text-gray-600">
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
