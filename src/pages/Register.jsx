import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';   // ← add useNavigate
import { registerUser } from '../api/userApi';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Register = () => {
  const navigate = useNavigate();  

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, mobile } = form;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character.");
      return;
    }

    try {
      const res = await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        mobile: form.mobile,
        email: form.email,
        password: form.password
      });

      // Store token and redirect
      localStorage.setItem('token', res.token);
      alert("✅ Registered successfully!");
      navigate('/login');
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };


  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>

        <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required style={styles.input} />
        <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required style={styles.input} />
        <input type="text" name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required style={styles.input} maxLength={10} />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={styles.input} />

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
          <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
          </span>
        </div>

        <div style={styles.passwordContainer}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={{ ...styles.input, marginBottom: 0 }}
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            {showConfirmPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
          </span>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>Register</button>

        <p style={styles.text}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
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
    maxWidth: '450px',
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
  },
  error: {
    color: '#ff5555',
    marginBottom: '1rem',
    textAlign: 'center'
  }
};

export default Register;

