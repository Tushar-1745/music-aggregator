const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:10000";

// Register a new user
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data; // { token, user }
};

// Login user
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data; // { token }
};

// Get user profile
export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not found');

  const res = await fetch(`${API_BASE}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
  return data.user; // { ...user }
};

// Sync user data (example for protected POST request)
export const syncUserData = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not found');

  const res = await fetch(`${API_BASE}/api/sync-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Data sync failed');
  return data;
};
