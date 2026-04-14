import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const fetchProductsByCategory = (categoryId) => api.get(`/products/category/${categoryId}`);
export const fetchFeaturedProducts = () => api.get('/products/featured');
export const fetchNewArrivals = () => api.get('/products/new-arrivals');
export const searchProducts = (keyword) => api.get(`/products/search?keyword=${keyword}`);
export const filterProductsByPrice = (minPrice, maxPrice) => 
  api.get(`/products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`);

// Categories API
export const fetchCategories = () => api.get('/categories');
export const fetchActiveCategories = () => api.get('/categories/active');

// Cart API
export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity) => api.post('/cart/add', { productId, quantity });
export const updateCartItem = (cartItemId, quantity) => api.put(`/cart/${cartItemId}?quantity=${quantity}`);
export const removeFromCart = (cartItemId) => api.delete(`/cart/${cartItemId}`);
export const clearCart = () => api.delete('/cart/clear');
export const getCartTotal = () => api.get('/cart/total');

export default api;