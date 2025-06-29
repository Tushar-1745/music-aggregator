// import axios from 'axios';

// const API = import.meta.env.VITE_PY_API || 'http://localhost:5001';

// function getAuthHeaders() {
//   const token = localStorage.getItem('token');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// // 🔥 Fetch Trending Songs
// export const fetchTrendingSongs = async () => {
//   const res = await axios.get(`${NODE_API}/api/trending-songs`, {
//     headers: getAuthHeaders(),
//   });
//   console.log("🎵 Trending songs are:", res.data);
//   return res.data;
// };

// // 🎤 Fetch Trending Artists
// export const fetchTrendingArtists = async () => {
//   const res = await axios.get(`${NODE_API}/api/trending-artists`, {
//     headers: getAuthHeaders(),
//   });
//   console.log("🎤 Trending artists are:", res.data);
//   return res.data;
// };

// // 🎧 Fetch User's Top Tracks from Spotify
// export const fetchUserTopTracks = async () => {
//   const token = localStorage.getItem('token');
//   if (!token) throw new Error('No token found');

//   const res = await fetch(`${NODE_API}/api/auth/spotify/top-tracks`, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (!res.ok) {
//     console.error('❌ Server responded with:', res.status, await res.text());
//     throw new Error('Failed to fetch user top tracks');
//   }

//   const data = await res.json();
//   console.log("🎧 User top tracks:", data.tracks);
//   return data.tracks;
// };


// export const fetchViralSongs = () => {
//   return axios
//     .get(`${NODE_API}/api/viral-songs`, { headers: getAuthHeaders() })
//     .then(res => {
//       console.log("🎧 Viral songs are:", res.data);
//       return res.data;
//     })
//     .catch(err => {
//       console.error("❌ Error fetching viral songs:", err);
//       return [];
//     });
// };



import axios from 'axios';

// Backend APIs
const NODE_API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// Python microservice APIs
const PY_API = import.meta.env.VITE_PY_API || 'http://localhost:5001';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 🎧 Fetch User's Top Tracks from Spotify (Node backend)
export const fetchUserTopTracks = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const res = await fetch(`${NODE_API}/api/auth/spotify/top-tracks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error('❌ Server responded with:', res.status, await res.text());
    throw new Error('Failed to fetch user top tracks');
  }

  const data = await res.json();
  console.log("🎧 User top tracks:", data.tracks);
  return data.tracks;
};

// 🎧 Fetch Viral Songs (Node backend)
export const fetchViralSongs = () => {
  return axios
    .get(`${NODE_API}/api/viral-songs`, { headers: getAuthHeaders() })
    .then(res => {
      console.log("🎧 Viral songs are:", res.data);
      return res.data;
    })
    .catch(err => {
      console.error("❌ Error fetching viral songs:", err);
      return [];
    });
};

// 🔥 Fetch Trending Songs (Python microservice)
export const fetchTrendingSongs = async (tenantId) => {
  const res = await axios.post(`${PY_API}/trending-songs`, { tenantId });
  console.log("🎵 Trending songs are:", res.data);
  return res.data;
};

// 🎤 Fetch Trending Artists (Python microservice)
export const fetchTrendingArtists = async (tenantId) => {
  const res = await axios.post(`${PY_API}/trending-artists`, { tenantId });
  console.log("🎤 Trending artists are:", res.data);
  return res.data;
};

// 📊 Fetch Weekly Report (Python microservice)
export const fetchWeeklyReport = async (tenantId) => {
  const res = await axios.post(`${PY_API}/weekly-report`, { tenantId });
  console.log("📈 Weekly report is:", res.data);
  return res.data;
};

// 🎶 Fetch Genre Movement (Python microservice)
export const fetchGenreMovement = async (tenantId) => {
  const res = await axios.post(`${PY_API}/genre-movement`, { tenantId });
  console.log("🎼 Genre movement is:", res.data);
  return res.data;
};
