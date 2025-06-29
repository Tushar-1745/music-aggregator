// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import TrendingSongs from '../components/TrendingSongs';

// const TrendingSongsPage = () => {
//   return (
//     <div style={{ display: 'flex', backgroundColor: '#121212' }}>
//       <Sidebar />
//       <div style={{ flex: 1, padding: '2rem 4%', color: '#fff' }}>
//         <h1 style={{ color: '#1db954', marginBottom: '1.5rem' }}>🔥 All Trending Songs</h1>
//         <TrendingSongs />
//       </div>
//     </div>
//   );
// };

// export default TrendingSongsPage;


import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TrendingSongs from '../components/TrendingSongs';
import { fetchTrendingSongs } from '../api/songsApi';
import { getUserProfile } from '../api/userApi';

const TrendingSongsPage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const user = await getUserProfile();
        const trending = await fetchTrendingSongs(user.email);
        setSongs(trending);
      } catch (err) {
        console.error("❌ Failed to load trending songs:", err);
      }
    };
    load();
  }, []);

  return (
    <div style={{ display: 'flex', backgroundColor: '#121212' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '2rem 4%', color: '#fff' }}>
        <h1 style={{ color: '#1db954', marginBottom: '1.5rem' }}>🔥 All Trending Songs</h1>
        <TrendingSongs songs={songs} />
      </div>
    </div>
  );
};

export default TrendingSongsPage;
