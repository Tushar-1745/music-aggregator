import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const navLinkStyle = {
  margin: '0 1rem',
  color: '#fff',
  textDecoration: 'none',
  position: 'relative',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  paddingBottom: '2px',
};

const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const location = useLocation();
  const { user } = useAuth();

  const links = [
    { label: 'Dashboard', path: '/' },
    { label: 'Reports', path: '/reports' },
  ];

  const getLinkStyle = (index, path) => {
    const isActive = location.pathname === path;
    return {
      ...navLinkStyle,
      textShadow:
        hovered === index || isActive
          ? '0 0 5px rgba(255,255,255,0.6), 0 0 10px rgba(255,255,255,0.4)'
          : 'none',
      borderBottom:
        hovered === index || isActive ? '2px solid white' : 'none',
    };
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: '#1db954',
        color: '#fff',
      }}
    >
      <h2 style={{ margin: 0, fontWeight: 700 }}>MusicAggregator</h2> {/* ✅ updated brand name */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {links.map((link, idx) => (
          <Link
            key={link.label}
            to={link.path}
            style={getLinkStyle(idx, link.path)}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            {link.label}
          </Link>
        ))}

        {user ? (
          <Link
            to="/profile"
            style={{
              ...navLinkStyle,
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.5rem',
              marginLeft: '1rem',
            }}
            onMouseEnter={() => setHovered('profile')}
            onMouseLeave={() => setHovered(null)}
          >
            <FaUserCircle />
          </Link>
        ) : (
          <Link
            to="/login"
            style={getLinkStyle(links.length, '/login')}
            onMouseEnter={() => setHovered(links.length)}
            onMouseLeave={() => setHovered(null)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
