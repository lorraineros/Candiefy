import React, { useState } from 'react';
import './styles.css';

export const SearchModal = ({ isOpen, onClose, onSearch, filteredProducts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay">
      <button className="close-button" onClick={onClose}>x</button>
      <div className="search-modal">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
        />
        <div className="search-results">
          {filteredProducts.map(product => (
            <a href={`/product/${product.id}`} className="product-link-wrapper">
              <div key={product.id} className="search-result-item">
                <img src={product.img} alt={product.name} className="search-result-image" />
                <div className="search-result-info">
                  <p>{product.name}</p>
                  <p>{product.price} kr.</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
