import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../api/userApi';

const ProfilePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showSpotifySuccess, setShowSpotifySuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('spotify') === 'success') {
      setShowSpotifySuccess(true);
      setTimeout(() => {
        navigate('/profile', { replace: true });
      }, 3000);
    }
  }, [location.search, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (err) {
        console.error(err.message);
        handleLogout();
      }
    };
    fetchProfile();
  }, []);

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return '';
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  if (!user) return <p style={{ textAlign: 'center', marginTop: '2rem', color: '#ccc' }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {showSpotifySuccess && (
          <div style={styles.successAlert}>
            ✅ Spotify connected successfully!
          </div>
        )}
        <div style={styles.avatar}>{getInitials(user.firstName, user.lastName)}</div>
        <h2 style={styles.heading}>Welcome, {user.firstName}!</h2>
        <div style={styles.info}>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Tenant:</strong> {user.tenantId}</p>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#121212',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    width: '100%',
    maxWidth: '500px',
    color: '#fff',
  },
  successAlert: {
    backgroundColor: '#1db954',
    color: '#000',
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#1db954',
    color: '#fff',
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    fontWeight: 'bold',
  },
  heading: {
    textAlign: 'center',
    color: '#1db954',
    marginBottom: '1.5rem',
  },
  info: {
    lineHeight: '1.8',
    fontSize: '1rem',
    marginBottom: '2rem',
  },
  logoutBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#1db954',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ProfilePage;
