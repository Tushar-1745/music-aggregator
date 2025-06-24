import React from 'react';
import ChartCard from "../components/CharCard"

const Dashboard = () => {
  const trendingSongs = [
    { title: 'Song A', artist: 'Artist 1' },
    { title: 'Song B', artist: 'Artist 2' },
    { title: 'Song C', artist: 'Artist 3' },
    { title: 'Song D', artist: 'Artist 4' },
    { title: 'Song E', artist: 'Artist 5' }
  ];

  return (
    <div style={{
      width: '100%',
      padding: '2rem 4%',
      backgroundColor: '#121212',
      color: '#fff',
      minHeight: '100vh',
    }}>
      <h1 style={{ color: '#1db954', marginBottom: '2rem' }}>Music Trends Dashboard</h1>

      {/* Overview Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <ChartCard title="Top Artist" value="Artist Name" />
        <ChartCard title="Top Genre" value="Pop" />
        <ChartCard title="Most Viral Song" value="Song Title" />
        <ChartCard title="Total Streams" value="1.2M" />
      </div>

      {/* Trending Songs List */}
      <div style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '10px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ color: '#1db954' }}>Top 5 Trending Songs</h2>
        <ul style={{ marginTop: '1rem', lineHeight: '2' }}>
          {trendingSongs.map((song, index) => (
            <li key={index}>
              <strong>{song.title}</strong> by {song.artist}
            </li>
          ))}
        </ul>
      </div>

      {/* Platform Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <ChartCard title="Spotify Streams" value="800K" />
        <ChartCard title="YouTube Views" value="600K" />
        <ChartCard title="TikTok Shares" value="300K" />
      </div>

      {/* Weekly Report Summary */}
      <div style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '10px',
        padding: '1.5rem',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ color: '#1db954' }}>This Week's Highlights</h2>
        <p style={{ marginTop: '1rem' }}>
          - <strong>Newcomer:</strong> <span style={{ color: '#00bfa6' }}>IndieStar</span> jumped 45% in Spotify streams<br />
          - <strong>Genre Growth:</strong> EDM saw a 25% rise on YouTube<br />
          - <strong>Most Viral:</strong> “DanceRush” went viral on TikTok with 180k shares<br />
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
