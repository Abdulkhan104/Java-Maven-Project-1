import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories, fetchProducts, fetchFeaturedProducts, fetchNewArrivals } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banner images (authentic Flipkart-style banners)
  const banners = [
    {
      id: 1,
      image: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/ed6bb7d582602223.jpg?q=20",
      alt: "Super Value Deals",
      link: "/products"
    },
    {
      id: 2,
      image: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/67ce126f536c7e2d.jpg?q=20",
      alt: "Electronics Sale",
      link: "/category/4"
    },
    {
      id: 3,
      image: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5a7f0b3e5a7f0b3e.jpg?q=20",
      alt: "Fashion Week",
      link: "/category/1"
    },
    {
      id: 4,
      image: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/8d9e4d8e5f6a7b8c.jpg?q=20",
      alt: "Mega Electronics Sale",
      link: "/category/4"
    }
  ];

  useEffect(() => {
    loadData();
    // Auto-slide banner every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [categoriesRes, featuredRes, newArrivalsRes] = await Promise.all([
        fetchCategories(),
        fetchFeaturedProducts(),
        fetchNewArrivals()
      ]);
      setCategories(categoriesRes.data || []);
      setFeaturedProducts(featuredRes.data || []);
      setNewArrivals(newArrivalsRes.data || []);
      // Set best sellers (using featured products for now)
      setBestSellers(featuredRes.data || []);
    } catch (error) {
      console.error('Error loading homepage data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('veecart_cart') || '[]');
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        quantity: 1
      });
    }
    
    localStorage.setItem('veecart_cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  return (
    <div className="homepage">
      {/* Top Header with Weather */}
      <div className="top-header">
        <div className="weather-widget">
          <span className="weather-icon">☀️</span>
          <span className="weather-temp">34°C Sunny</span>
          <span className="weather-location">Mumbai</span>
        </div>
        <div className="top-links">
          <Link to="/offers">Offers Zone</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/help">Help Center</Link>
          <Link to="/track-order">Track Order</Link>
          <Link to="/sell">Sell on VeeCart</Link>
        </div>
      </div>

      {/* Main Category Navigation */}
      <div className="category-strip">
        {categories.slice(0, 16).map((category) => (
          <Link to={`/category/${category.id}`} key={category.id} className="category-item">
            <div className="category-icon">
              {category.iconUrl ? (
                <img src={category.iconUrl} alt={category.name} />
              ) : (
                <span>📦</span>
              )}
            </div>
            <span>{category.name}</span>
          </Link>
        ))}
      </div>

      {/* Hero Carousel Banner */}
      <div className="hero-carousel">
        <div className="carousel-container">
          {banners.map((banner, index) => (
            <Link 
              to={banner.link} 
              key={banner.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <img src={banner.image} alt={banner.alt} />
            </Link>
          ))}
        </div>
        <div className="carousel-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Banking & Offers Banner */}
      <div className="bank-offers">
        <div className="offer-card">
          <img src="https://rukminim2.flixcart.com/fk-p-flap/278/278/image/06b0a2d0d5b8d5c0.jpg?q=20" alt="Bank Offer" />
          <div className="offer-content">
            <h4>Bank Offer</h4>
            <p>5% Unlimited Cashback on Axis Bank Credit Card</p>
          </div>
        </div>
        <div className="offer-card">
          <img src="https://rukminim2.flixcart.com/fk-p-flap/278/278/image/2d5a2d5a2d5a2d5a.jpg?q=20" alt="EMI Offer" />
          <div className="offer-content">
            <h4>No Cost EMI</h4>
            <p>Available on select products</p>
          </div>
        </div>
        <div className="offer-card">
          <img src="https://rukminim2.flixcart.com/fk-p-flap/278/278/image/3f7b0c3f7b0c3f7b.jpg?q=20" alt="Exchange Offer" />
          <div className="offer-content">
            <h4>Exchange Offer</h4>
            <p>Get up to ₹30,000 off on exchange</p>
          </div>
        </div>
      </div>

      {/* For You - Launch Products */}
      <div className="launch-section">
        <div className="section-header">
          <h2>🔥 For You</h2>
          <Link to="/products" className="view-all">View All →</Link>
        </div>
        <div className="launch-products">
          <div className="launch-card">
            <div className="launch-badge">Launch 15th Apr, 12 PM</div>
            <div className="launch-image">
              <img src="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/w/8/l/-original-imagzymzawgsguap.jpeg" alt="vivo T5 Pro" />
            </div>
            <h3>vivo T5 Pro 5G</h3>
            <p>144 Hz 1.5K AMOLED eyecare display</p>
            <div className="launch-price">Expected ₹29,999</div>
            <button className="notify-btn">Notify Me</button>
          </div>
          <div className="launch-card">
            <div className="launch-badge">Launch Today, 12 PM</div>
            <div className="launch-image">
              <img src="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/q/u/k/-original-imagvpmdtyjhygyg.jpeg" alt="Infinix Note 60" />
            </div>
            <h3>INFINITIX NOTE 60 Pro</h3>
            <p>Active matrix display | 108MP Camera</p>
            <div className="launch-price">Expected ₹19,999</div>
            <button className="notify-btn">Notify Me</button>
          </div>
          <div className="launch-card perfume">
            <div className="brand-tag">ENVY</div>
            <div className="launch-image">
              <img src="https://rukminim2.flixcart.com/image/312/312/xif0q/perfume/b/e/q/-original-imagv5gczdpjf2mh.jpeg" alt="ENVY Perfume" />
            </div>
            <h3>Long-lasting</h3>
            <p>Up to 40% Off • The power of French perfume</p>
            <div className="launch-price">₹1,299 onwards</div>
            <button className="shop-btn">Shop Now →</button>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="featured-section">
        <div className="section-header">
          <h2>⚡ Featured Products</h2>
          <Link to="/products" className="view-all">View All →</Link>
        </div>
        <div className="products-slider">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>

      {/* Still Looking For Section */}
      <div className="still-looking-section">
        <div className="section-header">
          <h2>✨ Still looking for these?</h2>
        </div>
        <div className="still-looking-grid">
          <div className="still-card">
            <div className="still-icon">💊</div>
            <h4>YOUWEFIT</h4>
            <p>Multivitamin + Men</p>
            <p className="small-text">60 Capsules • 30 Capsules</p>
            <div className="still-price">₹599</div>
            <button className="still-btn">Shop Now</button>
          </div>
          <div className="still-card">
            <div className="still-icon">🔬</div>
            <h4>hk vitals®</h4>
            <p>Research Driven Innovations</p>
            <p className="small-text">Multi Vitamin + Men</p>
            <div className="still-price">₹799</div>
            <button className="still-btn">Shop Now</button>
          </div>
          <div className="still-card">
            <div className="still-icon">💪</div>
            <h4>MuscleBlaze</h4>
            <p>Whey Protein 2kg</p>
            <p className="small-text">Chocolate Flavor</p>
            <div className="still-price">₹3,999</div>
            <button className="still-btn">Shop Now</button>
          </div>
          <div className="still-card">
            <div className="still-icon">🥤</div>
            <h4>BOOST</h4>
            <p>Energy Drink Mix</p>
            <p className="small-text">1kg • Chocolate</p>
            <div className="still-price">₹499</div>
            <button className="still-btn">Shop Now</button>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="bestseller-section">
        <div className="section-header">
          <h2>🏆 Best Sellers</h2>
          <Link to="/products" className="view-all">View All →</Link>
        </div>
        <div className="products-grid">
          {bestSellers.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="new-arrivals-section">
        <div className="section-header">
          <h2>🆕 New Arrivals</h2>
          <Link to="/products" className="view-all">View All →</Link>
        </div>
        <div className="products-grid">
          {newArrivals.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>

      {/* Advertisement Banner */}
      <div className="ad-banner">
        <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5a7f0b3e5a7f0b3e.jpg?q=20" alt="Big Billion Days" />
      </div>

      {/* Brand Showcase */}
      <div className="brand-showcase">
        <div className="section-header">
          <h2>Top Brands</h2>
        </div>
        <div className="brands-grid">
          <div className="brand-card"><img src="https://img.icons8.com/color/96/apple.png" alt="Apple" /><span>Apple</span></div>
          <div className="brand-card"><img src="https://img.icons8.com/color/96/samsung.png" alt="Samsung" /><span>Samsung</span></div>
          <div className="brand-card"><img src="https://img.icons8.com/color/96/nike.png" alt="Nike" /><span>Nike</span></div>
          <div className="brand-card"><img src="https://img.icons8.com/color/96/adidas.png" alt="Adidas" /><span>Adidas</span></div>
          <div className="brand-card"><img src="https://img.icons8.com/color/96/sony.png" alt="Sony" /><span>Sony</span></div>
          <div className="brand-card"><img src="https://img.icons8.com/color/96/lg.png" alt="LG" /><span>LG</span></div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-badge">
        {product.discountPercent > 30 && <span className="hot-badge">HOT 🔥</span>}
        {product.isNew && <span className="new-badge">NEW</span>}
      </div>
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl || 'https://via.placeholder.com/200'} alt={product.name} />
        <h3>{product.name.length > 40 ? product.name.substring(0, 40) + '...' : product.name}</h3>
        <div className="price-container">
          <span className="current-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
              <span className="discount">{product.discountPercent}% off</span>
            </>
          )}
        </div>
        <div className="rating">
          ⭐ {product.rating || 4.0} <span>({product.reviewCount || 0})</span>
        </div>
        <div className="free-delivery">Free Delivery</div>
      </Link>
      <button onClick={() => onAddToCart(product)} className="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  );
};

export default HomePage;