import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";
import { PRODUCTS } from "./products";
import { SearchModal } from "./components/SearchModal";
import { Shop } from "./pages/Shop";
import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { ProductDetail } from "./components/ProductDetail";
import { Checkout } from './pages/Checkout';

function App() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleSearch = (query) => {
    if (query) {
      const filtered = PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addToCart = (product, quantity) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity }];
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  return (
    <div className="App">
          <Navbar onToggleModal={toggleModal} cartItems={cartItems}/>
          <SearchModal
              isOpen={isModalOpen}
              onClose={toggleModal}
              onSearch={handleSearch}
              filteredProducts={filteredProducts}
            />
          <div className="page">
            <Router>
              <Routes>
                <Route path="/" element={<Shop addToCart={addToCart} />}/>
                <Route path="about" element={<About />} />
                <Route path="cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/product/:productId" element={<ProductDetail addToCart={addToCart} />} />
                <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
              </Routes>
            </Router>
          </div>
          <Footer />
    </div>
  )
}

export default App;
