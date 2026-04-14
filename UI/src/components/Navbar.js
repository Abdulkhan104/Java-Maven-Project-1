import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/api';
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('veecart_cart') || '[]');
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await searchProducts(searchQuery);
        setSearchResults(response.data);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('veecart_user');
    localStorage.removeItem('veecart_token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">Vee<span className="logo-highlight">Cart</span></span>
          </div>
        </Link>

        <div className="nav-search">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>🔍</button>
          
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.slice(0, 5).map(product => (
                <div key={product.id} className="search-result-item" onClick={() => { setShowResults(false); navigate(`/product/${product.id}`); }}>
                  <img src={product.imageUrl || 'https://via.placeholder.com/50'} alt={product.name} />
                  <div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">₹{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-dropdown">
              <button className="profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
                👤 {user.fullName.split(' ')[0]}
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/dashboard" onClick={() => setShowDropdown(false)}>Dashboard</Link>
                  {user.role === 'ADMIN' && <Link to="/admin" onClick={() => setShowDropdown(false)}>Admin Panel</Link>}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
          <Link to="/cart" className="cart-btn-link">
            <button className="cart-btn">🛒 Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;