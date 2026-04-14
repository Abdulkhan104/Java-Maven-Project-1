import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('veecart_cart') || '[]');
    setCartItems(cart);
    setLoading(false);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem('veecart_cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    localStorage.setItem('veecart_cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    localStorage.setItem('veecart_cart', '[]');
    setCartItems([]);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty!</h2>
        <p>Looks like you haven't added any items yet</p>
        <Link to="/" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-items-section">
          <div className="cart-header">
            <h2>My Cart ({getTotalItems()} items)</h2>
            <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
          </div>
          
          {cartItems.map((item) => (
            <div key={item.productId} className="cart-item">
              <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <div className="cart-item-price">₹{item.price}</div>
                <div className="cart-item-actions">
                  <div className="quantity-selector">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeItem(item.productId)} className="remove-btn">Remove</button>
                </div>
              </div>
              <div className="cart-item-total">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Price Details</h3>
          <div className="summary-row">
            <span>Price ({getTotalItems()} items)</span>
            <span>₹{getTotalAmount()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span className="free">FREE</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{getTotalAmount()}</span>
          </div>
          <div className="savings">
            You will save ₹{Math.floor(getTotalAmount() * 0.1)} on this order
          </div>
          <button className="checkout-btn">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;