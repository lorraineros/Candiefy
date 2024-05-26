import React from 'react';
import './styles.css';
import { Product } from '../Product';

export const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Product key={product.id} id={product.id} {...product} addToCart={addToCart} />
      ))}
    </div>
  );
};
