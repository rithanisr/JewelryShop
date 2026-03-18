import React, { useState, useEffect } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import LuxuryHero from "../components/Heropage";
import BrandTrust from "../components/BrandTrust";
import BrandStory from "../components/BrandSTory";
import MarketingBanner from "../components/Brandmarketing";
import InspireCollection from "../components/Banner";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.data || []);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      name: "Earrings",
      image:
        "https://images.unsplash.com/photo-1705326453282-e4e1b78f5fea?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fEVhcnJpbmd8ZW58MHx8MHx8fDA%3D",
      link: "/products?category=earrings",
    },

    {
      name: "Rings",
      image:
        "https://images.unsplash.com/photo-1550368566-f9cc32d7392d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJpbmd8ZW58MHx8MHx8fDA%3D",
      link: "/products?category=ring",
    },
    {
      name: "Necklaces",
      image:
        "https://images.unsplash.com/photo-1610661022658-5068c4d8f286?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5lY2tsYWNlfGVufDB8fDB8fHww",
      link: "/products?category=necklace",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F3EF]">
      {/* <section
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Jewelry of Precious Craft</h1>
          <p className="text-xl mb-6">
            Because every piece carries a precious story
          </p>
          <a
            href="/products"
            className="bg-[#C79A7B] text-white hover:bg-[#B88A6B] shadow-md px-6 py-3 rounded-full font-semibold  transition"
          >
            Explore Now
          </a>
        </div>
      </section> */}
        <LuxuryHero />
         <BrandTrust />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-[#6B4F3A] mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard className="" key={cat.name} category={cat} />
          ))}
        </div>
      </section>

         <BrandStory />

         <InspireCollection/>

     

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-[#6B4F3A] mb-8">New Arrivals</h2>

        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="text-center">
              <a
                href="/products"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-[#6B4F3A] px-8 py-3 rounded-full font-semibold transition"
              >
                View Collection
              </a>
            </div>
          </>
        ) : (
          !loading && (
            <p className="text-center text-gray-500">No products available</p>
          )
        )}
      </section>

       <section className="bg-[#F6F3EF] py-10">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-[#6B4F3A] mb-4">
            We make high-quality, handcrafted jewelry for over a decade
          </h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>
      <MarketingBanner />


      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B4F3A] mb-8">
            Featured Products
          </h2>
          {!loading && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="text-center">
                <a
                  href="/products"
                  className="inline-block bg-[#C79A7B] hover:bg-[#B88A6B] text-white px-8 py-3 rounded-full font-semibold transition"
                >
                  View Collection
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-[#6B4F3A] mb-8">
          Precious Metals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">14k Solid Gold</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Sterling Silver</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Gold Vermeil</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#C79A7B] py-10">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-[#6B4F3A] mb-4">
            25% Discount on Making Charges
          </h2>
          <p className="text-[#6B4F3A] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
          </p>
          <a
  href="/stores"
  className="bg-white text-[#6B4F3A] px-6 py-3 rounded-full font-semibold hover:bg-[#F6F3EF] transition"
>
  Visit Our Stores
</a>
        </div>
      </section>
    </div>
  );
}
