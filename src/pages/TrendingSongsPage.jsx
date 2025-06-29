import React, { useEffect, useState } from 'react';
import { fetchTrendingSongs } from '../api/songsApi';
import { getUserProfile } from '../api/userApi';

const TrendingSongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const user = await getUserProfile();
        if (!user || !user.email) {
          console.warn("❌ No valid user found for tenantId");
          return;
        }

        console.log("📡 Sending request to trending-songs with tenantId:", user.email);
        const trending = await fetchTrendingSongs(user.email);
        console.log("🎵 Trending songs are:", trending);
        setSongs(trending);
        setFilteredSongs(trending);
      } catch (err) {
        console.error("❌ Failed to load trending songs:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFilteredSongs(
      songs.filter(song =>
        song.title.toLowerCase().includes(q) || song.artist.toLowerCase().includes(q)
      )
    );
  }, [search, songs]);

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem 4%' }}>
      <h1 style={{ color: '#1db954', marginBottom: '1.5rem' }}>🔥 All Trending Songs</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by song or artist"
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          marginBottom: '2rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#1e1e1e',
          color: '#fff',
          fontSize: '1rem',
          outline: 'none'
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredSongs.map((song, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '12px',
                padding: '1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              <h3 style={{ color: '#1db954', fontSize: '1rem' }}>{song.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#ccc' }}>{song.artist}</p>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>Score: {song.score}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingSongsPage;
