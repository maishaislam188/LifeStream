import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(savedUser));
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests');
      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const searchDonors = async () => {
  try {
    let url = 'http://localhost:5000/api/donors/search?';
    if (bloodGroup) url += `bloodGroup=${encodeURIComponent(bloodGroup)}&`;
    if (location) url += `location=${encodeURIComponent(location)}`;
    
    const res = await axios.get(url);
    setDonors(res.data);
    
    if (res.data.length === 0) {
      alert('No donors found!');
    }
  } catch (err) {
    console.log(err);
    alert('Search failed!');
  }
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.logo}>🩸 LifeStream</h2>
        <div>
          <span style={styles.welcome}>Welcome, {user?.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Search Donors */}
      <div style={styles.section}>
        <h3>🔍 Search Blood Donors</h3>
        <div style={styles.searchBox}>
          <select style={styles.input} onChange={(e) => setBloodGroup(e.target.value)}>
            <option value="">Select Blood Group</option>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
          <input style={styles.input} type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
          <button style={styles.searchBtn} onClick={searchDonors}>Search</button>
        </div>

        {donors.length > 0 && (
          <div>
            {donors.map(donor => (
              <div key={donor._id} style={styles.card}>
                <p><strong>{donor.name}</strong></p>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>Location: {donor.location}</p>
                <p>Phone: {donor.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Requests */}
      <div style={styles.section}>
        <div style={styles.reqHeader}>
          <h3>🚨 Emergency Requests</h3>
          <button style={styles.addBtn} onClick={() => navigate('/emergency-request')}>+ Post Request</button>
        </div>

        {requests.map(req => (
          <div key={req._id} style={{...styles.card, borderLeft: req.isUrgent ? '4px solid red' : '4px solid green'}}>
            <p><strong>{req.patientName}</strong> {req.isUrgent && <span style={styles.urgent}>URGENT</span>}</p>
            <p>Blood Group: {req.bloodGroup}</p>
            <p>Location: {req.location}</p>
            <p>Phone: {req.phone}</p>
            <p>Status: {req.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e53935', padding: '15px 20px', borderRadius: '10px', marginBottom: '20px' },
  logo: { color: 'white', margin: 0 },
  welcome: { color: 'white', marginRight: '15px' },
  logoutBtn: { padding: '8px 15px', backgroundColor: 'white', color: '#e53935', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  section: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', marginBottom: '20px' },
  searchBox: { display: 'flex', gap: '10px', marginBottom: '15px' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' },
  searchBtn: { padding: '10px 20px', backgroundColor: '#e53935', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  card: { padding: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9', marginBottom: '10px' },
  reqHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  addBtn: { padding: '8px 15px', backgroundColor: '#e53935', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  urgent: { backgroundColor: 'red', color: 'white', padding: '2px 8px', borderRadius: '3px', fontSize: '12px', marginLeft: '10px' }
};

export default Dashboard;