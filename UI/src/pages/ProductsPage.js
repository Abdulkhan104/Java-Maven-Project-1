import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts, fetchProductsByCategory, fetchCategories } from '../services/api';
import './ProductsPage.css';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      loadProductsByCategory(categoryId);
    } else {
      loadAllProducts();
    }
  }, [categoryId]);

  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadAllProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProductsByCategory = async (id) => {
    setLoading(true);
    try {
      const response = await fetchProductsByCategory(id);
      setProducts(response.data);
      const category = categories.find(c => c.id === parseInt(id));
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error loading products by category:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSortedProducts = () => {
    let filtered = [...products];

    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const addToCart = (product) => {
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

  const sortedProducts = getSortedProducts();

  return (
    <div className="products-page">
      <div className="products-container">
        <div className="filters-sidebar">
          <h3>Filters</h3>
          
          <div className="filter-section">
            <h4>Categories</h4>
            <ul className="category-list">
              <li>
                <Link to="/products" className={!categoryId ? 'active' : ''}>
                  All Products
                </Link>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link 
                    to={`/category/${cat.id}`}
                    className={parseInt(categoryId) === cat.id ? 'active' : ''}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 100000 })}
              />
            </div>
          </div>
        </div>

        <div className="products-main">
          <div className="products-header">
            <h2>{selectedCategory ? selectedCategory.name : 'All Products'}</h2>
            <div className="sort-selector">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {sortedProducts.length === 0 ? (
              <div className="no-products">No products found</div>
            ) : (
              sortedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.imageUrl || 'https://via.placeholder.com/200'} alt={product.name} />
                    <h3>{product.name}</h3>
                    <div className="price-container">
                      <span className="current-price">₹{product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="original-price">₹{product.originalPrice}</span>
                          <span className="discount">{product.discountPercent}% off</span>
                        </>
                      )}
                    </div>
                    {product.rating && (
                      <div className="rating">
                        ⭐ {product.rating} ({product.reviewCount || 0})
                      </div>
                    )}
                  </Link>
                  <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;