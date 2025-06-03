import { useState } from "react";

function FilterSection({ selectedConditions, handleConditionToggle, priceRange, setPriceRange, selectedSort, setSelectedSort }) {
  const condition = ["New", "Used", "Refurbished"];
  const sortOptions = [
    "Default",
    "Price: Low to High",
    "Price: High to Low",
    "Product Name",
    "Random Products",
  ];

  return (
    <>
      {/* Product Condition */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">PRODUCT CONDITION</h2>
        {condition.map((cond) => (
          <div
            key={cond}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => handleConditionToggle(cond)}
          >
            <span className={selectedConditions.has(cond) ? "font-semibold text-blue-600" : ""}>
              {cond}
            </span>
          </div>
        ))}
      </div>

      {/* Price Filter */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">FILTER BY PRICE</h2>
        <div className="flex gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-1/2 p-2 border rounded"
            placeholder="Min"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
            className="w-1/2 p-2 border rounded"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">ORDER BY</h2>
        {sortOptions.map((option) => (
          <div
            key={option}
            className={`p-2 cursor-pointer rounded ${
              selectedSort === option ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedSort(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </>
  );
}

export default FilterSection;