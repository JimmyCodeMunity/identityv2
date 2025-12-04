import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import ProductCard from "@/components/ui/productcard";
import api from "@/lib/api";
import { useApi } from "@/context/ApiContext";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories = [], loading: categoriesLoading } = useApi(); // ← From your context

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
        categoryId: p.category?._id || p.category, // handle both populated & ref
        categoryName: p.category?.name || "Uncategorized",
        pricing: {
          "2-9": p.category?.twotonine ? Number(p.category.twotonine) : null,
          "10-19": p.category?.onetonineteen ? Number(p.category.onetonineteen) : null,
          "20-99": p.category?.twothousandtonine ? Number(p.category.twothousandtonine) : null,
          "100-200": p.category?.tenthousandtotwenty ? Number(p.category.tenthousandtotwenty) : null,
          printed: p.category?.printed ? Number(p.category.printed) : null,
          fixed: p.category?.fixed ? Number(p.category.fixed) : null,
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

  // ── Backend Categories + "All" option ──
  const categoryOptions = useMemo(() => {
    const cats = categories
      .filter((cat) => cat.name && cat.isActive !== false) // optional: hide inactive
      .sort((a, b) => a.name.localeCompare(b.name));

    return [{ _id: "all", name: "All" }, ...cats];
  }, [categories]);

  // Count products per category
  const productCountByCategory = useMemo(() => {
    const counts = {};
    allProducts.forEach((p) => {
      const catId = p.categoryId || p.category?._id;
      counts[catId] = (counts[catId] || 0) + 1;
    });
    return counts;
  }, [allProducts]);

  // Extract unique colors from products
  const colors = useMemo(() => {
    const unique = [...new Set(allProducts.map((p) => p.color).filter(Boolean))];
    return ["All", ...unique.sort()];
  }, [allProducts]);

  const quantityTiers = [
    { value: "2-9", label: "2–9 units" },
    { value: "10-19", label: "10–19 units" },
    { value: "20-99", label: "20–99 units" },
    { value: "100-200", label: "100–200 units" },
  ];

  // ── Sync URL ?category=slug or ?category=id with selectedType ──
  // useEffect(() => {
  //   const urlCat = searchParams.get("category");

  //   if (!urlCat || urlCat === "all") {
  //     setSelectedType("All");
  //     return;
  //   }

  //   const matchedCat = categories.find(
  //     (c) => c.name.toLowerCase() === urlCat.toLowerCase() || c._id === urlCat
  //   );

  //   if (matchedCat) {
  //     setSelectedType(matchedCat.name);
  //   } else {
  //     setSelectedType("All");
  //   }
  // }, [searchParams, categories]);

  // Sync URL → selectedType (runs when URL or categories change)
useEffect(() => {
  const urlCat = searchParams.get("category");

  if (!urlCat || urlCat === "all") {
    setSelectedType("All");
    return;
  }

  // Match by slug (e.g. "tyvek-wristbands" → "Tyvek Wristbands")
  const matchedCat = categories.find((c) => {
    const slug = c.name.toLowerCase().replace(/\s+/g, "-");
    return slug === urlCat;
  });

  if (matchedCat) {
    setSelectedType(matchedCat.name);
  } else {
    setSelectedType("All");
  }
}, [searchParams, categories]);

  // ── Filtered Products ──
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesType =
          selectedType === "All" ||
          product.categoryName === selectedType ||
          (categories.find((c) => c.name === selectedType)?._id === product.categoryId);

        const matchesColor =
          selectedColor === "All" || product.color === selectedColor;

        return matchesSearch && matchesType && matchesColor;
      })
      .map((product) => {
        const tierPrice = product.pricing[quantityTier];
        const basePrice = product.pricing.fixed || tierPrice || product.price;
        return { ...product, displayPrice: basePrice };
      });
  }, [allProducts, searchTerm, selectedType, selectedColor, quantityTier, categories]);

  // ── Reset Filters ──
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setSelectedColor("All");
    setQuantityTier("2-9");
    setSearchParams({});
  };

  // ── Handle Category Selection (with URL update) ──
  const handleCategoryChange = (categoryName) => {
    setSelectedType(categoryName);
    if (categoryName === "All") {
      setSearchParams({});
    } else {
      const cat = categories.find((c) => c.name === categoryName);
      if (cat) {
        setSearchParams({ category: cat.name.toLowerCase().replace(/\s+/g, "-") });
      }
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside
            className={`fixed inset-0 z-50 lg:relative lg:z-auto bg-white lg:bg-transparent p-6 lg:p-0 transition-transform duration-300 ${
              mobileFiltersOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            } lg:block`}
          >
            <div className="lg:sticky lg:top-6 bg-white rounded-2xl shadow-xl p-6 lg:p-8 h-fit border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#161E31] flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="lg:hidden"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search wristbands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8B179] transition"
                  />
                </div>
              </div>

              {/* Categories from Backend */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#161E31] mb-4">Category</h4>
                {categoriesLoading ? (
                  <p className="text-sm text-gray-500">Loading categories...</p>
                ) : (
                  <div className="space-y-3">
                    {categoryOptions.map((cat) => {
                      const count =
                        cat._id === "all"
                          ? allProducts.length
                          : productCountByCategory[cat._id] || 0;

                      return (
                        <label
                          key={cat._id}
                          className="flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="category"
                              checked={selectedType === cat.name}
                              onChange={() => handleCategoryChange(cat.name)}
                              className="w-4 h-4 text-[#F8B179] focus:ring-[#F8B179]"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-[#161E31] transition font-medium">
                              {cat.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {count}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Color Filter */}
              {/* <div className="mb-6">
                <h4 className="font-semibold text-[#161E31] mb-4">Color</h4>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(selectedColor === color ? "All" : color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "ring-4 ring-[#F8B179] ring-offset-2"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      style={{
                        backgroundColor: color === "All" ? "#e5e7eb" : color,
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div> */}

              {/* Quantity Tier */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#161E31] mb-3">Quantity Tier</h4>
                <select
                  value={quantityTier}
                  onChange={(e) => setQuantityTier(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8B179]"
                >
                  {quantityTiers.map((tier) => (
                    <option key={tier.value} value={tier.value}>
                      {tier.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="w-full py-3 text-sm font-medium text-[#161E31] border border-[#161E31] rounded-xl hover:bg-[#161E31] hover:text-white transition"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#161E31]">Event Wristbands</h1>
                <p className="text-gray-600 mt-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
                </p>
              </div>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-5 py-3 bg-[#161E31] text-white rounded-xl font-medium"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Loading & Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm animate-pulse p-4">
                    <div className="bg-gray-200 rounded-xl h-64 mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500 mb-4">No wristbands found.</p>
                <button onClick={resetFilters} className="text-[#F8B179] font-semibold underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={{
                      ...product,
                      price: product.displayPrice || product.price,
                      originalPrice: product.price,
                      discount: product.discount,
                    }}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </AppLayout>
  );
}