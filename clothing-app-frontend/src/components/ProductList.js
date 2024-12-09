import React from 'react';
import axios from 'axios';
import '../styles/ProductList.css';



const ProductList = ({ items, onDelete }) => {

   const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      onDelete(id); // Call the delete handler passed as a prop
    } catch (error) {
      console.error('Error deleting item:', error);
    }};

  return (
    <div className="product-list">
      {items.map((item) => (
        <div key={item.id} className="product-card">
          <img
            src={`http://localhost:5000${item.image}`}
            alt={item.name}
            style={{ width: '150px' }}
          />
          <h3>{item.name}</h3>
          <p>Category: {item.category}</p>
          <p>Price: kes{item.price}</p> {/* Display price */}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
