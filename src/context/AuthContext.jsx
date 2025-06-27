import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      axios
        .get('http://localhost:5000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        });
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const res = await axios.post('http://localhost:5000/login', credentials);
  
      localStorage.setItem('token', res.data.token);
  
      const profileRes = await axios.get('http://localhost:5000/profile', {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });
  
      setUser(profileRes.data.user);
      localStorage.setItem('user', JSON.stringify(profileRes.data.user));
      return true; // ✅ THIS IS IMPORTANT
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return false;
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
