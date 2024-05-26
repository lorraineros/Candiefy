import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../../products';
import './styles.css';
import AddToCartPopup from '../AddToCart';

export const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const product = PRODUCTS.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  const handleClick = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, img: product.img }, quantity);
    setShowPopup(true);
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => clearTimeout(timeout);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!product) {
    return <div><h1>Product not found</h1></div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-image">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <h1 className="name">{product.name}</h1>
        <p className="price">{product.price} kr.</p>
        <div className="product-detail-quantity">
          <button className="symbol" onClick={handleDecrement}>-</button>
          <input type="text" value={quantity} readOnly />
          <button className="symbol" onClick={handleIncrement}>+</button>
        </div>
        <div className="product-detail-cart">
          <button className="product-button" onClick={handleClick}>
            Add To Cart
          </button>
          {showPopup && <AddToCartPopup name={product.name} price={product.price} img={product.img} quantity={quantity} handleClosePopup={handleClosePopup}/>}
        </div>
        <h3 className="ingredients-name">Ingredients</h3>
        <p className="ingredients">{product.ingredients}</p>
      </div>
    </div>
  );
};
