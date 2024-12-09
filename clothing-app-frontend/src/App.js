import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddItemForm from './components/AddItemForm';
import ProductList from './components/ProductList';
import CategoryFilter from "./components/CategoryFilter";
import './styles/App.css';


const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories] = useState([
    "Sports Wear",
    "Casual Wear",
    "Ceremony Wear",
    "Swim Wear",
    "Shoes",
    "Jewelry",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch items from the server
  useEffect(() => {
    axios.get('http://localhost:5000/items').then((response) => {
      setItems(response.data);
      setFilteredItems(response.data); // Initialize filtered items
    });
  }, []);

  // Handle adding a new item
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
    setFilteredItems((prevItems) => [...prevItems, newItem]);
  };

  // Handle category filtering
  const handleFilterChange = (category) => {
    setSelectedCategory(category);

    if (category === "") {
      setFilteredItems(items); // Show all items if no category selected
    } else {
      setFilteredItems(items.filter((item) => item.category === category));
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Clothing App</h1>
      <CategoryFilter categories={categories} onFilterChange={handleFilterChange} />
      <AddItemForm onAddItem={handleAddItem} categories={categories} />
      {/* <ProductList items={filteredItems} /> */}
      <ProductList items={filteredItems} onDelete={handleDeleteItem} />

    </div>
  );
};

export default App;
