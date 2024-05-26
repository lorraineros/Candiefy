import React, { useState } from 'react';
import './styles.css';

export const Checkout = ({ cartItems, setCartItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    paymentMethod: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Full Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.zip) errors.zip = 'Zip code is required';
    if (!formData.paymentMethod) errors.paymentMethod = 'Payment method is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        alert('Order submitted successfully!');
        setCartItems([]);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          zip: '',
          paymentMethod: '',
        });
        
        localStorage.removeItem('cartItems');
        window.location.href = '/';
      }, 1000);
      
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <h2>Your Order</h2>
        <table className="checkout-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="checkout-cart-item">
                <td>{item.name}</td>
                <td>{item.price} kr.</td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity} kr.</td>
              </tr>
            ))}
            <tr className="checkout-total">
              <td colSpan={3}><strong>Grand Total</strong></td>
              <td><strong>{calculateTotal()} kr.</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="checkout-right">
      <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && <span className="error">{formErrors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && <span className="error">{formErrors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {formErrors.phone && <span className="error">{formErrors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {formErrors.address && <span className="error">{formErrors.address}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip Code:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
              {formErrors.zip && <span className="error">{formErrors.zip}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="">Select a payment method</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
              {formErrors.paymentMethod && <span className="error">{formErrors.paymentMethod}</span>}
            </div>
            <button className="order-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Place Order'}
            </button>
          </form>
      </div>
    </div>
  );
};
