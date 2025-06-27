import React from 'react';

const ViralSongs = ({ songs }) => {
  if (!songs || songs.length === 0) return <p>No viral songs found.</p>;

  return (
    <div>
      <h1 style={{ color: '#1db954', marginBottom: '1.5rem' }}>🚀 Viral Songs</h1>
      <div style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
      }}>
        {songs.map((song, index) => (
          <div key={index} style={{
            backgroundColor: '#1e1e1e',
            borderRadius: '12px',
            padding: '1rem'
          }}>
            <h3>{song.title}</h3>
            <p>Artist: {song.artist}</p>
            <p>Platforms: {song.platforms}</p>
            <p>Matched At: {new Date(song.matchedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViralSongs;
