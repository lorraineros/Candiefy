import './styles.css';

export const Cart = ({ cartItems, setCartItems }) => {
  const increaseQuantity = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const decreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);

    if (updatedCartItems.length === 0) {
      localStorage.removeItem('cartItems');
    } else {
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }

    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h1>Your Cart Items</h1>
      {cartItems.length === 0 
      ? <>
          <div className="explore-items">
            <p className='nothing'>Your cart is currently empty. Start adding items to your cart by exploring our products.</p>
            <a href='/'><button className='explore-button'>Explore items</button></a>
          </div>
        </> 
      : <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: {item.price} kr.</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <h2>Total: {calculateTotal()} kr.</h2>
        <a href='/'><button className='continue-button'>Continue Shopping</button></a>
        <a href='/checkout'><button className='continue-button'>Checkout</button></a>
        </>}
    </div>
  );
};
