import React from 'react';
import Sidebar from '../components/Sidebar';
import TrendingSongs from '../components/TrendingSongs';

const TrendingSongsPage = () => {
  return (
    <div style={{ display: 'flex', backgroundColor: '#121212' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '2rem 4%', color: '#fff' }}>
        <h1 style={{ color: '#1db954', marginBottom: '1.5rem' }}>🔥 All Trending Songs</h1>
        <TrendingSongs />
      </div>
    </div>
  );
};

export default TrendingSongsPage;
