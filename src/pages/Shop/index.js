import './styles.css';
import { PRODUCTS } from '../../products';
import { ProductList } from '../../components/ProductList';

export const Shop = ( { addToCart } ) => {
  return (
    <div className="shop">
      <h1>Welcome to Candiefy!</h1>
      <p>We're here to offer you a variety of delicious candies. Dive into our tasty treats and enjoy the sweetness!</p>
      <ProductList products={PRODUCTS} addToCart={addToCart}/>
    </div>
  )
};