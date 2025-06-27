import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const TrendingArtistsCarousel = ({ artists }) => {
  const items = artists.map((artist, index) => (
    <div key={index} style={{
      backgroundColor: '#1e1e1e',
      borderRadius: '12px',
      padding: '1rem',
      color: '#fff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      margin: '0.5rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      minWidth: '200px',
      maxWidth: '220px',
    }}>
      <h3 style={{ color: '#1db954', marginBottom: '0.5rem' }}>{artist.artist}</h3>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Songs:</strong> {artist.song_count}</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Total Score:</strong> {artist.total_score.toLocaleString()}</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}><strong>Avg. Score:</strong> {Math.round(artist.avg_score)}</p>
    </div>
  ));

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ color: '#1db954', marginBottom: '1rem' }}>🎤 Trending Artists</h2>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{
          0: { items: 1 },
          600: { items: 2 },
          900: { items: 3 },
          1200: { items: 4 },
        }}
        autoPlay
        autoPlayInterval={3000}
        infinite
        disableButtonsControls
        dotsDisabled={false} // enable dots
        controlsStrategy="responsive"
      />
    </div>
  );
};

export default TrendingArtistsCarousel;
