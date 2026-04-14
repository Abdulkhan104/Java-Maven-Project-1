import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = ({ user }) => {
  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Please login to view dashboard</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Welcome, {user.fullName}!</h1>
      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', marginTop: '20px' }}>
        <h3>Profile Information</h3>
        <p><strong>Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserDashboard;