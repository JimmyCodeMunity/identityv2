import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom"; // ← ADDED
import AppLayout from "@/layout/AppLayout";
import ProductCard from "@/components/ui/productcard";
import api from "@/lib/api";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams(); // ← ADDED

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [quantityTier, setQuantityTier] = useState("2-9");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [allProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Products
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      const normalized = res.data.map((p) => ({
        ...p,
        price: Number(p.price),
        discount: Number(p.discount) || 0,
        // Extract pricing tiers
        pricing: {
          "2-9": p.category.twotonine ? Number(p.category.twotonine) : null,
          "10-19": p.category.onetonineteen
            ? Number(p.category.onetonineteen)
            : null,
          "20-99": p.category.twothousandtonine
            ? Number(p.category.twothousandtonine)
            : null,
          "100-200": p.category.tenthousandtotwenty
            ? Number(p.category.tenthousandtotwenty)
            : null,
          printed: p.category.printed ? Number(p.category.printed) : null,
          fixed: p.category.fixed ? Number(p.category.fixed) : null,
        },
      }));
      setProducts(normalized);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Extract unique types and colors
  const types = useMemo(() => {
    const unique = [
      ...new Set(allProducts.map((p) => p.category.name).filter(Boolean)),
    ];
    return ["All", ...unique.sort()];
  }, [allProducts]);

  const colors = useMemo(() => {
    const unique = [
      ...new Set(allProducts.map((p) => p.color).filter(Boolean)),
    ];
    return ["All", ...unique.sort()];
  }, [allProducts]);

  const quantityTiers = [
    { value: "2-9", label: "2–9 units" },
    { value: "10-19", label: "10–19 units" },
    { value: "20-99", label: "20–99 units" },
    { value: "100-200", label: "100–200 units" },
  ];

  // ──────────────────────────────────────────────────────────────
  // Sync URL ?category=... with selectedType
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory && types.includes(urlCategory)) {
      setSelectedType(urlCategory);
    } else if (!urlCategory) {
      setSelectedType("All");
    }
  }, [searchParams, types]);

  // Filter & Price Logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesType =
          selectedType === "All" || product.category.name === selectedType;
        const matchesColor =
          selectedColor === "All" || product.color === selectedColor;

        return matchesSearch && matchesType && matchesColor;
      })
      .map((product) => {
        const tierPrice = product.pricing[quantityTier];
        const basePrice = product.pricing.fixed || tierPrice || product.price;
        return { ...product, displayPrice: basePrice };
      });
  }, [allProducts, searchTerm, selectedType, selectedColor, quantityTier]);

  // Reset Filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setSelectedColor("All");
    setQuantityTier("2-9");
    setSearchParams({}); // Clear URL
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside
            className={`fixed inset-0 z-50 lg:relative lg:z-auto bg-white lg:bg-transparent p-6 lg:p-0 transition-transform duration-300 ${
              mobileFiltersOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            } lg:block`}
          >
            <div className="lg:sticky lg:top-6 bg-white rounded-2xl shadow-lg p-6 lg:p-8 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search wristbands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  />
                </div>
              </div>

              {/* Product Type – URL Sync Added */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Type</h4>
                <div className="space-y-2">
                  {types.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="type"
                        checked={selectedType === type}
                        onChange={() => {
                          setSelectedType(type);
                          if (type === "All") {
                            setSearchParams({});
                          } else {
                            setSearchParams({ category: type });
                          }
                        }}
                        className="w-4 h-4 text-black focus:ring-black"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black transition">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Color</h4>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setSelectedColor(
                          selectedColor === color ? "All" : color
                        )
                      }
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "ring-4 ring-black ring-offset-2"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{
                        backgroundColor:
                          color === "All" ? "#e5e7eb" : color.toLowerCase(),
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity Tier */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Quantity Tier
                </h4>
                <select
                  value={quantityTier}
                  onChange={(e) => setQuantityTier(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {quantityTiers.map((tier) => (
                    <option key={tier.value} value={tier.value}>
                      {tier.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Price per unit updates based on quantity
                </p>
              </div>

              {/* Reset */}
              <button
                onClick={resetFilters}
                className="w-full py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Event Wristbands
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Showing{" "}
                  <strong className="text-gray-900">
                    {filteredProducts.length}
                  </strong>{" "}
                  products
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 shadow-sm animate-pulse"
                  >
                    <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-2">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={{
                        ...product,
                        price: product.displayPrice,
                        originalPrice: product.price,
                        discount: product.discount,
                      }}
                    />
                  ))}
                </div>

                {/* No Results */}
                {filteredProducts.length === 0 && !loading && (
                  <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">
                      No wristbands found matching your filters.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 text-sm font-medium text-black underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </AppLayout>
  );
}
