import React, { useState } from 'react';
import LazyLoad from 'react-lazyload';
import './styles.css';
import AddToCartPopup from '../AddToCart';

export const Product = ({ id, name, price, img, addToCart }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    addToCart({ id, name, price, img }, 1);
    setShowPopup(true);
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => clearTimeout(timeout);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="product">
      <a href={`/product/${id}`} className="product-link-wrapper">
        <div>
          <LazyLoad height={200} offset={100}>
            <img alt={name} src={img} className="product-image" />
          </LazyLoad>
          <h3 className="product-name">{name}</h3>
          <p className="product-price">{price} kr.</p>
        </div>
      </a>
      <button className="product-button" onClick={handleClick}>
        Add To Cart
      </button>
      {showPopup && <AddToCartPopup name={name} price={price} img={img} quantity={1} handleClosePopup={handleClosePopup} />}
    </div>
  );
};
