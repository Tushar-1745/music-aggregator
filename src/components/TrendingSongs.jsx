import React, { useEffect, useState } from 'react';
import { fetchTrendingSongs } from '../api/songsApi';

const TrendingSongs = ({ limit = null }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await fetchTrendingSongs();
        setSongs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ fetchTrendingSongs failed:", err);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, []);

  const displayed = limit ? songs.slice(0, limit) : songs;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#121212', minHeight: '100vh' }}>
      <h2 style={{ color: '#1db954', marginBottom: '1.5rem' }}>🔥 Trending Songs</h2>

      {loading ? (
        <p style={{ color: '#ccc' }}>Loading songs...</p>
      ) : displayed.length === 0 ? (
        <p style={{ color: '#ccc' }}>No trending songs available.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.2rem',
            alignItems: 'stretch'
          }}
        >
          {displayed.map((song, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '12px',
                padding: '1rem',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3
                style={{
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#fff'
                }}
              >
                {song.title}
              </h3>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#ccc',
                  marginBottom: '0.3rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                Artist: {song.artist}
              </p>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#aaa',
                  marginBottom: '0.5rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                Genre: {song.genre || 'Unknown'}
              </p>
              <button
                style={{
                  marginTop: 'auto',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#1db954',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                ▶ Play
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingSongs;
