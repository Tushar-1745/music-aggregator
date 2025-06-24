import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Trends from './pages/Trends';
import Reports from './pages/Reports';
import Register from './pages/Register';

const Router = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register/>}/>
    <Route path="/trends" element={<Trends />} />
    <Route path="/reports" element={<Reports />} />
  </Routes>
);

export default Router; // ✅ This is required!

