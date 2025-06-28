import axios from 'axios';

const API = import.meta.env.VITE_PY_API || 'http://localhost:5001';

function getTenantId() {
  return JSON.parse(localStorage.getItem('user'))?.tenantId || 'default';
}

// 🟢 Weekly report
export const getWeeklyReport = () =>
  axios
    .post(`${API}/weekly-report`, { tenantId: getTenantId() })
    .then(res => {
      console.log("✅ Weekly Report Response:", res.data);
      return res.data;
    })
    .catch(err => {
      console.error("❌ Error fetching weekly report:", err);
      return [];
    });

// 🟢 Genre movement
export const getGenreMovement = () =>
  axios
    .post(`${API}/genre-movement`, { tenantId: getTenantId() })
    .then(res => {
      console.log("✅ Genre Movement Response:", res.data);
      return res.data;
    })
    .catch(err => {
      console.error("❌ Error fetching genre movement:", err);
      return [];
    });

    export const exportInsights = (type = 'csv') =>
    axios
      .post(
        `${API}/export`,
        { tenantId: getTenantId(), format: type },
        { responseType: 'blob' } // important for file download
      )
      .then(res => {
        console.log(`✅ Export ${type.toUpperCase()} Response:`, res);
        return res;  // return whole response, not just res.data
      })
      .catch(err => {
        console.error(`❌ Error exporting ${type}:`, err);
        return null;
      });
  
