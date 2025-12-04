// src/components/Products.jsx
import React, { useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ui/productcard";
import api, { baseUrl } from "@/lib/api";
import { useApi } from "@/context/ApiContext";

export default function Products() {
  const { categories, banners } = useApi();
 

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      console.log("products", res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="py-12 bg-white rounded-t-3xl">
      <div className="w-full">
         {/* ==== SHOP BY CATEGORY ==== */}
              <section className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4">
                  <h3 className="text-center text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                    Shop by category
                  </h3>
        
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
                    {categories?.map((cat) => (
                      <a
                        href={`/products?category=${cat.name}`}
                        key={cat._id}
                        className="flex flex-col items-center text-center group cursor-pointer"
                      >
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-slate-400 transition">
                          <img
                            src={`${baseUrl}/${cat.image}`}
                            alt={cat.name}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <p className="text-xs md:text-sm text-gray-700 group-hover:text-slate-700">
                          {cat.name}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-10">
          Featured Products
        </h2>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-4 xl:grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow-sm animate-pulse"
              >
                <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.slice(0, 4).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}
      </div>

      <div className="w-full py-4 my-6 mx-auto text-center">
        <a href="/products" className="bg-black text-white px-6 py-2 rounded">
          View All Products
        </a>
      </div>
    </section>
  );
}
