'use client';

import { useState, useEffect, Suspense } from "react";
import ProductList from "../components/ProductList";
import FilterSection from "../components/FilterSection";
import SearchQueryProvider from "../components/SearchQueryProvider";

export default function CatalogPage() {
  const [priceRange, setPriceRange] = useState([0, ""]);
  const [selectedSort, setSelectedSort] = useState("Default");
  const [selectedConditions, setSelectedConditions] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const condition = ["New", "Used", "Refurbished"];
  const sortOptions = [
    "Default",
    "Price: Low to High",
    "Price: High to Low",
    "Review Count",
    "Popularity",
    "Average Rating",
    "Newness",
    "Product Name",
    "Random Products",
  ];

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    // Panggil updateScreenSize di mount awal
    updateScreenSize();
    // Tambahkan event listener untuk resize
    window.addEventListener("resize", updateScreenSize);
    // Cleanup function untuk menghapus event listener
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const handleConditionToggle = (condition) => {
    const newSelection = new Set(selectedConditions);
    newSelection.has(condition) ? newSelection.delete(condition) : newSelection.add(condition);
    setSelectedConditions(newSelection);
  };

  return (
    <div className="p-6">
      <h1 className="text-5xl font-extrabold text-center my-8 text-black drop-shadow-lg">
        🛍️ New Items 🛍️
      </h1>

      {/* Mobile Filter (Dropdown) */}
      {isMobile && (
        <div className="mb-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
          >
            {showDropdown ? "Hide Filters" : "Show Filters"}
          </button>
          {showDropdown && (
            <div className="mt-4 bg-white shadow-md p-4 rounded-lg">
              <FilterSection
                selectedConditions={selectedConditions}
                handleConditionToggle={handleConditionToggle}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
              />
            </div>
          )}
        </div>
      )}

      {/* Tablet Filter (Row) */}
      {isTablet && (
        <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-100 rounded-lg">
          <FilterSection
            selectedConditions={selectedConditions}
            handleConditionToggle={handleConditionToggle}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filter (Sidebar) */}
        {!isMobile && !isTablet && (
          <div className="w-64 space-y-8">
            <FilterSection
              selectedConditions={selectedConditions}
              handleConditionToggle={handleConditionToggle}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </div>
        )}

        {/* Product List - Dibungkus dengan Suspense dan SearchQueryProvider */}
        <div className="flex-1">
          <Suspense fallback={<div className="text-center">Memuat daftar produk...</div>}>
            <SearchQueryProvider>
              {(searchQuery) => ( // SearchQueryProvider meneruskan searchQuery sebagai argumen fungsi
                <ProductList
                  searchQuery={searchQuery}
                  selectedConditions={Array.from(selectedConditions)}
                  priceRange={priceRange}
                  sortOption={selectedSort}
                />
              )}
            </SearchQueryProvider>
          </Suspense>
        </div>
      </div>
    </div>
  );
}