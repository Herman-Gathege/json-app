import React from "react";
import '../styles/CategoryFilter.css';


const CategoryFilter = ({ categories, onFilterChange }) => {
  return (
    <div className="filter-container">
      <label htmlFor="category">Filter by Category: </label>
      <select
        id="category"
        onChange={(e) => onFilterChange(e.target.value)}
        defaultValue=""
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
