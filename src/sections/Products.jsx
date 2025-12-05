// // src/components/Products.jsx
// import React, { useEffect, useState } from "react";
// import { Heart, Star } from "lucide-react";
// import { Link } from "react-router-dom";
// import ProductCard from "@/components/ui/productcard";
// import api, { baseUrl } from "@/lib/api";
// import { useApi } from "@/context/ApiContext";

// export default function Products() {
//   const { categories, banners } = useApi();
 

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const getProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//       console.log("products", res.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <section className="py-12 bg-white rounded-t-3xl">
//       <div className="w-full">
//          {/* ==== SHOP BY CATEGORY ==== */}
//               <section className="bg-white py-8">
//                 <div className="max-w-7xl mx-auto px-4">
//                   <h3 className="text-center text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
//                     Shop by category
//                   </h3>
        
//                   <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
//                     {categories?.map((cat) => (
//                       <a
//                         href={`/products?category=${cat.name}`}
//                         key={cat._id}
//                         className="flex flex-col items-center text-center group cursor-pointer"
//                       >
//                         <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-slate-400 transition">
//                           <img
//                             src={`${baseUrl}/${cat.image}`}
//                             alt={cat.name}
//                             className="w-16 h-16 object-contain"
//                           />
//                         </div>
//                         <p className="text-xs md:text-sm text-gray-700 group-hover:text-slate-700">
//                           {cat.name}
//                         </p>
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </section>
//       </div>
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Section Title */}
//         <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-10">
//           Featured Products
//         </h2>

//         {/* Product Grid */}
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-4 xl:grid-cols-4 gap-2">
//             {[...Array(4)].map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-xl p-4 shadow-sm animate-pulse"
//               >
//                 <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
//                 <div className="h-5 bg-gray-200 rounded mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded w-20"></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {products?.slice(0, 4).map((product, index) => (
//               <ProductCard key={index} product={product} />
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="w-full py-4 my-6 mx-auto text-center">
//         <a href="/products" className="bg-black text-white px-6 py-2 rounded">
//           View All Products
//         </a>
//       </div>
//     </section>
//   );
// }

// src/components/Products.jsx
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
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
    <section className="py-20 bg-gradient-to-b from-[#000000] via-[#1e1b4b] to-[#0f172a] text-white overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#f9b17a]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-[#6761gd]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Shop by Category */}
        <div className="mb-20">
          <h3 className="text-center text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Shop by Category
          </h3>
          <p className="text-center text-[#9ca3af] text-lg mb-12 max-w-2xl mx-auto">
            Discover premium wristbands crafted for every event — from festivals to corporate functions
          </p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {categories?.map((cat) => (
              <a
                key={cat._id}
                href={`/products?category=${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-110"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 flex items-center justify-center mb-4 shadow-2xl group-hover:bg-[#f9b17a]/20 group-hover:border-[#f9b17a]/50 transition-all">
                  <img
                    src={`${baseUrl}/${cat.image}`}
                    alt={cat.name}
                    className="w-16 h-16 object-contain filter brightness-40 invert group-hover:invert-0 group-hover:brightness-100 transition-all"
                  />
                </div>
                <p className="text-sm md:text-base font-medium text-gray-300 group-hover:text-[#f9b17a] transition">
                  {cat.name}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-[#f9b17a] bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-[#94a3b8] text-lg">
            Handpicked bestsellers trusted by Kenya's top event organizers
          </p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md rounded-3xl p-6 animate-pulse border border-white/10"
              >
                <div className="bg-white/10 rounded-2xl h-64 mb-6"></div>
                <div className="h-6 bg-white/20 rounded mb-3"></div>
                <div className="h-5 bg-white/10 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.slice(0, 4).map((product) => (
              <div
                key={product._id}
                className="group relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-[#f9b17a]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#f9b17a]/20"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-16">
          <a
            href="/products"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#f9b17a] to-[#f48c56] text-[#0f172a] font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-[#f9b17a]/50 transition-all duration-300 transform hover:scale-105"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}