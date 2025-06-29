import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TrendingSongs from '../components/TrendingSongs';
import { fetchTrendingSongs } from '../api/songsApi';
import { getUserProfile } from '../api/userApi';

const TrendingSongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const user = await getUserProfile();
        if (!user || !user.email) {
          console.error("❌ No valid user found for tenantId");
          return;
        }

        console.log("📡 Sending request to trending-songs with tenantId:", user.email);
        const trending = await fetchTrendingSongs(user.email);
        console.log("🎵 Trending songs are:", trending);
        setSongs(trending);
      } catch (err) {
        console.error("❌ Failed to load trending songs:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div style={{ display: 'flex', backgroundColor: '#121212' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '2rem 4%', color: '#fff' }}>
        <h1 style={{ color: '#1db954', marginBottom: '1.5rem' }}>🔥 All Trending Songs</h1>
        {loading ? <p>Loading...</p> : <TrendingSongs songs={songs} />}
      </div>
    </div>
  );
};

export default TrendingSongsPage;
