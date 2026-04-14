import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../services/api';

const AdminDashboard = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    try {
      const productsRes = await fetchProducts();
      const categoriesRes = await fetchCategories();
      setProducts(productsRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h2>Total Products</h2>
          <p style={{ fontSize: '36px', color: '#667eea' }}>{products.length}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h2>Categories</h2>
          <p style={{ fontSize: '36px', color: '#667eea' }}>{categories.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;