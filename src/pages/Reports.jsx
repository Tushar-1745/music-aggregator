import React, { useEffect, useState } from 'react';
import { getWeeklyReport, getGenreMovement, exportInsights } from '../api/reportsApi';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Reports = () => {
  const [weeklyData, setWeeklyData] = useState({ top_songs: [], top_artists: [] });
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportStatus, setExportStatus] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const weekly = await getWeeklyReport();
        const genre = await getGenreMovement();
        setWeeklyData(weekly);
        setGenreData(genre);
      } catch (err) {
        console.error('❌ Error loading reports:', err);
        setError('Failed to load reports.');
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const handleExport = async (type = 'csv') => {
    try {
      const res = await exportInsights(type);
      if (!res) return;
  
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `trending_songs.${type}`;
      a.click();
      setExportStatus(`✅ Exported as ${type.toUpperCase()}`);
    } catch (err) {
      console.error('❌ Export failed:', err);
      setExportStatus('❌ Export failed');
    }
  };
  

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', padding: '2rem 4%', minHeight: '100vh' }}>
      <h1 style={{ color: '#1db954', marginBottom: '2rem' }}>📊 Automated Reports</h1>

      {loading && <p>Loading reports...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && (
        <>
          {/* 🎵 Top Songs Chart */}
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#1db954', marginBottom: '1rem' }}>🎵 Top Songs This Week</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData.top_songs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" name="Score" fill="#1db954" />
              </BarChart>
            </ResponsiveContainer>
          </section>

          {/* 🎤 Top Artists Chart */}
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#1db954', marginBottom: '1rem' }}>🎤 Top Artists This Week</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData.top_artists}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="artist" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_score" name="Total Score" fill="#8884d8" />
                <Bar dataKey="avg_score" name="Avg Score" fill="#1db954" />
              </BarChart>
            </ResponsiveContainer>
          </section>

          {/* 🎼 Genre Movement Chart */}
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#1db954', marginBottom: '1rem' }}>🎼 Genre Movement</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="genre" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="last_week_count" name="This Week" fill="#1db954" />
                <Bar dataKey="prev_week_count" name="Last Week" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </section>

          {/* 📤 Export Buttons */}
          <section>
            <h2 style={{ color: '#1db954', marginBottom: '1rem' }}>📤 Export Insights</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => handleExport('csv')} style={exportBtnStyle}>Export CSV</button>
              <button onClick={() => handleExport('json')} style={exportBtnStyle}>Export JSON</button>
            </div>
            {exportStatus && <p style={{ marginTop: '0.5rem', color: '#ccc' }}>{exportStatus}</p>}
          </section>
        </>
      )}
    </div>
  );
};

const exportBtnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#1db954',
  border: 'none',
  borderRadius: '6px',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default Reports;
