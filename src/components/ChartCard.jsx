const ChartCard = ({ title, value }) => (
  <div style={{
    backgroundColor: '#1e1e1e',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    textAlign: 'center'
  }}>
    <h3 style={{ color: '#1db954' }}>{title}</h3>
    <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{value}</p>
  </div>
);

export default ChartCard;
