import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading
    try {
      const success = await login({ username: form.username, password: form.password });
      if (success) {
        alert('✅ Login successful!');
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Email or Mobile Number"
          value={form.username}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ ...styles.input, marginBottom: 0 }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
          </span>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>

        <p style={styles.text}>
          Don’t have an account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#121212',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    backgroundColor: '#1e1e1e',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
    width: '90%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column'
  },
  heading: {
    color: '#1db954',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  input: {
    padding: '10px',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #555',
    backgroundColor: '#2c2c2c',
    color: '#fff',
    width: '100%'
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: '1rem'
  },
  eyeIcon: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#ccc'
  },
  button: {
    padding: '10px',
    backgroundColor: '#1db954',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center'
  },
  text: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: '1rem'
  },
  link: {
    color: '#1db954',
    textDecoration: 'none'
  },
  error: {
    color: '#ff5555',
    marginBottom: '1rem',
    textAlign: 'center'
  }
};

export default Login;
