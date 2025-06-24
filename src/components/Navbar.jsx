import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#1db954',
    color: '#fff'
  }}>
    <h2 style={{ margin: 0 }}>MusicTrend</h2>
    <div>
      <Link to="/" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
      <Link to="/trends" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Trends</Link>
      <Link to="/reports" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Reports</Link>
      <Link to="/login" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Login</Link>
    </div>
  </nav>
);

export default Navbar;
