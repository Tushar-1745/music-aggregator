import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call backend login API here
    console.log('Login submitted:', form);
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Login</button>

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
    color: '#fff'
  },
  button: {
    padding: '10px',
    backgroundColor: '#1db954',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  text: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: '1rem'
  },
  link: {
    color: '#1db954',
    textDecoration: 'none'
  }
};

export default Login;
