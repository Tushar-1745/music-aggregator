import React, { useEffect, useState } from 'react';

const WelcomeModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    const token = localStorage.getItem('token');

    if (!hasSeenWelcome && !token) {
      setShowModal(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  if (!showModal) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={{ color: '#1db954' }}>👋 Welcome to MusicTrend</h2>
        <p style={{ margin: '1rem 0', color: '#ccc' }}>
          Please enjoy the service. To unlock all features, make sure to log in.
        </p>
        <a href="/login">
          <button style={styles.loginBtn}>Login</button>
        </a>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#1e1e1e',
    padding: '2rem',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
    color: '#fff',
  },
  loginBtn: {
    backgroundColor: '#1db954',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default WelcomeModal;
