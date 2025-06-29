// import React, { useEffect, useState } from 'react';
// import ViralSongs from '../components/ViralSongs';
// import TrendingArtistsCarousel from '../components/TrendingArtistsCarousel';
// import TrendingSongs from '../components/TrendingSongs.jsx';
// import YourPicks from '../components/YourPicks.jsx';
// import { fetchTrendingArtists, fetchViralSongs } from '../api/songsApi.js';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [viralSongs, setViralSongs] = useState([]);
//   const [artists, setArtists] = useState([]);
//   const [loadingArtists, setLoadingArtists] = useState(true);
//   const [search, setSearch] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchViralSongs()
//       .then(setViralSongs)
//       .catch(e => console.error("❌ Viral Songs:", e));
//   }, []);

//   useEffect(() => {
//     const loadArtists = async () => {
//       try {
//         const data = await fetchTrendingArtists();
//         setArtists(data);
//       } catch (err) {
//         console.error('❌ Failed to fetch trending artists:', err);
//       } finally {
//         setLoadingArtists(false);
//       }
//     };
//     loadArtists();
//   }, []);

//   return (
//     <div style={{
//       backgroundColor: '#121212',
//       minHeight: '100vh',
//       padding: '2rem 4%',
//       color: '#fff',
//       overflowY: 'auto'
//     }}>
//       {/* 🔍 Search Box */}
//       <div style={{ marginBottom: '2rem' }}>
//         <input
//           type="text"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           placeholder="Search song"
//           style={{
//             width: '100%',
//             padding: '0.75rem 1rem',
//             borderRadius: '8px',
//             border: 'none',
//             backgroundColor: '#1e1e1e',
//             color: '#fff',
//             fontSize: '1rem',
//             outline: 'none'
//           }}
//         />
//       </div>

//       {/* 💚 Your Picks */}
//       <section style={{ marginBottom: '3rem' }}>
//         <YourPicks />
//       </section>

//       <hr style={{ border: '1px solid #1db954', margin: '2rem 0' }} />

//       {/* 🎵 Viral Songs */}
//       <section style={{ marginBottom: '3rem' }}>
//         <ViralSongs songs={viralSongs} />
//       </section>

//       <hr style={{ border: '1px solid #1db954', margin: '2rem 0' }} />

//       {/* 🔥 Trending Songs */}
//       <section style={{ marginBottom: '3rem' }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '1rem'
//         }}>
//           <h1 style={{ color: '#1db954', margin: 0, fontSize: '30px', marginBottom: '10px' }}>
//             🔥 Trending Songs
//           </h1>
//           <button onClick={() => navigate('/trending')} style={{
//             background: 'none',
//             border: 'none',
//             color: '#1db954',
//             fontWeight: 'bold',
//             fontSize: '1rem',
//             cursor: 'pointer',
//             textDecoration: 'underline'
//           }}>
//             View All →
//           </button>
//         </div>
//         <TrendingSongs limit={5} />
//       </section>

//       <hr style={{ border: '1px solid #1db954', margin: '2rem 0' }} />

//       {/* 🎤 Trending Artists */}
//       <section style={{ marginBottom: '3rem' }}>
//         {!loadingArtists && artists.length > 0 ? (
//           <TrendingArtistsCarousel artists={artists} />
//         ) : (
//           <p style={{ color: '#ccc' }}>Loading artists...</p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import ViralSongs from '../components/ViralSongs';
import TrendingArtistsCarousel from '../components/TrendingArtistsCarousel';
import TrendingSongs from '../components/TrendingSongs.jsx';
import YourPicks from '../components/YourPicks.jsx';
import { fetchTrendingArtists, fetchTrendingSongs, fetchViralSongs } from '../api/songsApi.js';
import { getUserProfile } from '../api/userApi.js';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [viralSongs, setViralSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [loadingArtists, setLoadingArtists] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchViralSongs()
      .then(setViralSongs)
      .catch(e => console.error("❌ Viral Songs:", e));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getUserProfile(); // tenantId = user.email
        const [songs, artists] = await Promise.all([
          fetchTrendingSongs(user.email),
          fetchTrendingArtists(user.email),
        ]);
        setTrendingSongs(songs);
        setArtists(artists);
      } catch (err) {
        console.error('❌ Failed to load dashboard data:', err);
      } finally {
        setLoadingArtists(false);
      }
    };
    loadData();
  }, []);

  return (
    <div style={{
      backgroundColor: '#121212',
      minHeight: '100vh',
      padding: '2rem 4%',
      color: '#fff',
      overflowY: 'auto'
    }}>
      {/* 🔍 Search Box */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search song"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#1e1e1e',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

      {/* 💚 Your Picks */}
      <section style={{ marginBottom: '3rem' }}>
        <YourPicks />
      </section>

      <hr style={{ border: '1px solid #1db954', margin: '2rem 0' }} />

      {/* 🎵 Viral Songs */}
      <section style={{ marginBottom: '3rem' }}>
        <ViralSongs songs={viralSongs} />
      </section>

      <hr style={{ border: '1px solid #1db954', margin: '2rem 0' }} />

      {/* 🔥 Trending Songs */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h1 style={{ color: '#1db954', margin: 0, fontSize: '30px', marginBottom: '10px' }}>
            🔥 Trending Songs
          </h1>
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
        <TrendingSongs songs={trendingSongs.slice(0, 5)} />
      </section>

      <hr style={{ border: '1px solid #1db954', margin: '2rem 0' }} />

      {/* 🎤 Trending Artists */}
      <section style={{ marginBottom: '3rem' }}>
        {!loadingArtists && artists.length > 0 ? (
          <TrendingArtistsCarousel artists={artists} />
        ) : (
          <p style={{ color: '#ccc' }}>Loading artists...</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
