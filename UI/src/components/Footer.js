import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">Vee<span className="logo-highlight">Cart</span></span>
          </div>
          <p>India's fastest growing e-commerce platform. Shop with confidence!</p>
          <div className="social-links">
            <button className="social-btn" aria-label="Facebook">📘</button>
            <button className="social-btn" aria-label="Twitter">🐦</button>
            <button className="social-btn" aria-label="Instagram">📷</button>
            <button className="social-btn" aria-label="YouTube">▶️</button>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>About VeeCart</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Investor Relations</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Policy</h4>
          <ul>
            <li>Return Policy</li>
            <li>Terms of Use</li>
            <li>Security</li>
            <li>Privacy</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📞 1800-123-VEECART</p>
          <p>✉️ support@veecart.com</p>
          <p>🏢 Mumbai, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 VeeCart. All rights reserved. | Made with ❤️ in India</p>
      </div>
    </footer>
  );
};

export default Footer;