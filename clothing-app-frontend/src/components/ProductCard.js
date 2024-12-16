import React from 'react';
import '../styles/ProductCard.css'; // Optional: separate styles for cards

const ProductCard = ({ item, onDelete }) => {
  return (
    <div className="product-card">
      <img
        src={`http://localhost:5000${item.image}`}
        alt={item.name}
        style={{ width: '150px' }}
      />
      <h3>{item.name}</h3>
      <p>Category: {item.category}</p>
      <p>Price: kes{item.price}</p>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
};

export default ProductCard;
