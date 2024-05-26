import './styles.css';
import { ShoppingCart } from 'phosphor-react';
import { MagnifyingGlass } from 'phosphor-react';
import { useEffect, useState } from 'react';

export const Navbar = ({ onToggleModal, cartItems }) => {
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [animateBadge, setAnimateBadge] = useState(false);

  useEffect(() => {
    if (totalQuantity > 0) {
      setAnimateBadge(true);
      const timeout = setTimeout(() => {
        setAnimateBadge(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [totalQuantity]);

  return (
    <nav className="nav-bar">
      <nav className="title"><a href="/">Candiefy</a></nav>
      <ul className="nav-links">
        <li className="nav-link"><a href="/about">About</a></li>
        <li className="nav-link" onClick={onToggleModal}><MagnifyingGlass size={40}/></li>
        <li className="nav-link"><a href="/cart"><ShoppingCart size={48} />{totalQuantity > 0 && (
              <span className={`cart-badge ${animateBadge ? 'jump' : ''}`}>
                {totalQuantity}
              </span>)}</a></li>
      </ul>
    </nav>
  );
};
