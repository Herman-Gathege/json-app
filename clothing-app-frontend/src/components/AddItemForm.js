import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddItemForm.css';


const AddItemForm = ({ onAddItem, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '', // Include price in formData
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = new FormData();
      data.append('image', file);

      try {
        const response = await axios.post('http://localhost:5000/upload', data);
        setFormData({ ...formData, image: response.data.filePath });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/items', formData);
      onAddItem(response.data); // Add the new item to the list
      setFormData({
        name: '',
        category: '',
        price: '',
        image: '',
      }); // Clear the form after submission
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input type="file" onChange={handleFileChange} accept="image/*" required />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
