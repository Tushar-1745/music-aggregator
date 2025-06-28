const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;  // expects { token, user }
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;  // expects { token }
};

// ✅ NEW: Fetch user profile from backend using stored token
export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:5000/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
  return data.user;
};

export const syncUserData = () =>
  axios.post(`${NODE_API}/api/sync-data`, {}, { headers: getAuthHeaders() });
