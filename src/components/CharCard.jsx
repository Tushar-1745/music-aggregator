const ChartCard = ({ title, value }) => (
  <div style={{
    padding: '1rem',
    background: '#1e1e1e',
    borderRadius: '10px',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out'
  }}>
    <h3 style={{ color: '#1db954', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
  </div>
);

export default ChartCard;
