 # 🎧 Music Trend Aggregator – Frontend

This is the **React + Material-UI frontend** for the **Music Trend Aggregator** platform. It visualizes music trends across Spotify, YouTube, and TikTok, enabling users to explore viral tracks, rising artists, genre shifts, and generate insightful reports.

---

## 🚀 Features

### ✅ Core Functionality
- 🎵 **Dashboard** with viral songs, trending artists, and your Spotify top picks.
- 🔐 **Secure Login System** (JWT-based).
- 🪪 **Spotify OAuth Integration** with consent flow.
- 📈 **Trend Reports Page** with visual analytics:
  - Weekly reports
  - Genre movement
  - Artist growth

### 💡 Bonus UX
- ⚡ Smooth loading states and feedback
- 🎯 Responsive and mobile-friendly layout
- 📊 Chart visualizations using `Recharts`
- 👤 Profile page with Spotify linking
- 🎬 Modal onboarding for new users (optional)

---

## 🧑‍💻 Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Framework    | React + Vite           |
| UI Library   | Material-UI (MUI)      |
| State/Auth   | React Context API      |
| HTTP Client  | Axios                  |
| Routing      | React Router DOM       |
| Charts       | Recharts               |
| Deployment   | Vercel                 |

---

## 🌐 Live Demo

🔗 **Frontend**: [https://music-aggregator-virid.vercel.app](https://music-aggregator-virid.vercel.app)  
🔗 **Backend API**: [https://music-aggregator-server.onrender.com](https://music-aggregator-server.onrender.com)

---


---

## 🔧 Environment Variables

Create a `.env` file at the root:

```env
VITE_API_URL=https://music-aggregator-server.onrender.com
VITE_PY_API=https://music-aggregator-python.onrender.com


# Clone the frontend repo
git clone https://github.com/tushar-1745/music-trend-aggregator-client.git
cd music-trend-aggregator-client

# Install dependencies
npm install

# Start dev server
npm run dev

