import React, { useEffect, useState } from 'react';
import { fetchTrendingArtists } from '../api/songsApi';

const Trr = () => {
  const [artists, setArtists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const loadArtists = async () => {
      const data = await fetchTrendingArtists();
      setArtists(data);
    };
    loadArtists();
  }, []);

  const handleViewMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, artists.length));
  };

  const handleViewLess = () => {
    setVisibleCount(prev => Math.max(4, prev - 4));
  };

  return (
    <div style={{ padding: '2rem', color: '#fff', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1abc9c' }}>
        🎤 Trending Artists
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        {artists.slice(0, visibleCount).map((item, idx) => (
          <div key={idx} style={{
            flex: '1 1 calc(25% - 1rem)',
            backgroundColor: '#34495e',
            borderRadius: '10px',
            padding: '1rem',
            minWidth: '220px',
            maxWidth: 'calc(25% - 1rem)',
            boxSizing: 'border-box',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}>
            <h3 style={{ color: '#1abc9c', fontSize: '1.2rem' }}>{item.artist}</h3>
            <p style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>{item.title}</p>
            <p style={{ fontSize: '0.85rem', color: '#ccc' }}>Score: {item.score}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        {visibleCount < artists.length && (
          <button onClick={handleViewMore} style={buttonStyle}>
            View More
          </button>
        )}
        {visibleCount > 4 && (
          <button onClick={handleViewLess} style={buttonStyle}>
            View Less
          </button>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  background: '#1abc9c',
  color: '#fff',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem'
};

export default Trr;
