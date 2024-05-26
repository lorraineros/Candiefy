import React from 'react';
import './styles.css';

const AddToCartPopup = ({ name, price, img, quantity, handleClosePopup }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h4>Added to Cart</h4>
          <button onClick={handleClosePopup} className="close-button">X</button>
        </div>
        <div className="item-details">
          <img src={img} alt={name} />
          <div>
            <h3>{name}</h3>
            <p>Price: {price} kr.</p>
            <p>Quantity: {quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartPopup;
