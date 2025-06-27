import React, { useEffect, useRef, useState } from 'react';
import { fetchUserTopTracks } from '../api/songsApi';

const YourPicks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef();

  const cardsPerPage = 4;
  const totalPages = Math.ceil(tracks.length / cardsPerPage);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const data = await fetchUserTopTracks();
        setTracks(data);
      } catch (err) {
        console.error("❌ Failed to fetch user top tracks:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTracks();
  }, []);

  const scrollToPage = (page) => {
    const cardWidth = carouselRef.current.offsetWidth / cardsPerPage;
    const scrollAmount = cardWidth * cardsPerPage * page;
    carouselRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const scroll = (direction) => {
    const newPage = Math.max(0, Math.min(currentPage + direction, totalPages - 1));
    scrollToPage(newPage);
  };

  if (loading) return <p>Loading your picks...</p>;
  if (tracks.length === 0) return <p>No top tracks found.</p>;

  return (
    <div style={{ position: 'relative', padding: '1rem 0' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h1 style={{ color: '#1db954', margin: 0 }}>💚 Your Picks</h1>
      </div>

      <div style={{
        position: 'relative',
        padding: '0 2rem'
      }}>
        {/* Scroll Buttons */}
        <button onClick={() => scroll(-1)} style={scrollButtonStyle('left')}>←</button>

        <div
          ref={carouselRef}
          style={{
            display: 'flex',
            overflow: 'hidden',
            gap: '1rem',
            scrollBehavior: 'smooth'
          }}
        >
          {tracks.map((track, index) => (
            <div key={index} style={{
              flex: '0 0 calc(25% - 1rem)',
              backgroundColor: '#1e1e1e',
              borderRadius: '12px',
              padding: '1rem',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '320px'
            }}>
              <img
                src={track.cover}
                alt={track.name}
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '0.5rem'
                }}
              />
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{track.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '0.2rem 0' }}>{track.artist}</p>
                <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.5rem' }}>{track.album}</p>
              </div>
              <button style={{
                marginTop: 'auto',
                padding: '0.5rem',
                backgroundColor: '#1db954',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.85rem',
                width: '100%'
              }}>
                ▶ Play
              </button>
            </div>
          ))}
        </div>

        <button onClick={() => scroll(1)} style={scrollButtonStyle('right')}>→</button>
      </div>

      {/* Pagination Dots */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            onClick={() => scrollToPage(index)}
            style={{
              height: '10px',
              width: '10px',
              margin: '0 5px',
              backgroundColor: currentPage === index ? '#1db954' : '#888',
              borderRadius: '50%',
              display: 'inline-block',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

const scrollButtonStyle = (direction) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [direction]: '-1.5rem',
  backgroundColor: '#1db954',
  border: 'none',
  color: '#fff',
  padding: '0.5rem 0.75rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1.25rem',
  borderRadius: direction === 'left' ? '0 8px 8px 0' : '8px 0 0 8px',
  zIndex: 2
});

export default YourPicks;
