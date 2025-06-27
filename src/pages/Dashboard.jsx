import React, { useEffect, useState } from 'react';
import ViralSongs from '../components/ViralSongs';
import TrendingArtistsCarousel from '../components/TrendingArtistsCarousel';
import {
  fetchTrendingArtists,
  fetchViralSongs
} from '../api/songsApi.js';
import TrendingSongs from '../components/TrendingSongs.jsx';
import YourPicks from '../components/YourPicks.jsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [viralSongs, setViralSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loadingArtists, setLoadingArtists] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchViralSongs()
      .then(setViralSongs)
      .catch(e => console.error("❌ Viral Songs:", e));
  }, []);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const data = await fetchTrendingArtists();
        setArtists(data);
      } catch (err) {
        console.error('❌ Failed to fetch trending artists:', err);
      } finally {
        setLoadingArtists(false);
      }
    };
    loadArtists();
  }, []);

  return (
    <div style={{
      backgroundColor: '#121212',
      minHeight: '100vh',
      padding: '2rem 4%',
      color: '#fff',
      overflowY: 'auto'
    }}>
      {/* ✅ Your Picks */}
      <YourPicks />

      <hr style={{ border: '1px solid #1db954', margin: '2rem 0' }} />

      {/* ✅ Viral Songs */}
      <ViralSongs songs={viralSongs} />

      <hr style={{ border: '1px solid #1db954', margin: '2rem 0' }} />

      {/* ✅ Trending Songs Header + View All */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h1 style={{ color: '#1db954', margin: 0 }}>🔥 Trending Songs</h1>
        <button onClick={() => navigate('/trending')} style={{
          background: 'none',
          border: 'none',
          color: '#1db954',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}>
          View All →
        </button>
      </div>

      <TrendingSongs limit={5} />

      <hr style={{ border: '1px solid #1db954', margin: '2rem 0' }} />

      {/* ✅ Trending Artists */}
      <h1 style={{ color: '#1db954', marginBottom: '1.5rem' }}>🎤 Trending Artists</h1>
      {!loadingArtists && artists.length > 0 ? (
        <TrendingArtistsCarousel artists={artists} />
      ) : (
        <p>Loading artists...</p>
      )}
    </div>
  );
};

export default Dashboard;
