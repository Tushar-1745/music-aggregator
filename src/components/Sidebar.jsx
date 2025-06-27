import React from 'react';

const Sidebar = () => {
  return (
    <div style={{
      width: '250px',
      backgroundColor: '#1e1e1e',
      padding: '1rem',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h2 style={{ color: '#1db954', marginBottom: '1.5rem' }}>🎧 Dashboard</h2>

      <input
        type="text"
        placeholder="Search songs..."
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1.5rem',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#2c2c2c',
          color: '#fff'
        }}
      />

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li style={{ margin: '1rem 0', cursor: 'pointer' }}>🎶 Recent Songs</li>
        <li style={{ margin: '1rem 0', cursor: 'pointer' }}>🔥 Trending</li>
        <li style={{ margin: '1rem 0', cursor: 'pointer' }}>🚀 Viral Songs</li>
        <li style={{ margin: '1rem 0', cursor: 'pointer' }}>🎤 Artists</li>
      </ul>
    </div>
  );
};

export default Sidebar;
