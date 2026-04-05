import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmergencyRequest = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    location: '',
    phone: '',
    message: '',
    isUrgent: false
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/requests', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Request posted successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post request');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>🚨 Emergency Blood Request</h2>
        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="text" name="patientName" placeholder="Patient Name" onChange={handleChange} required />
          <select style={styles.input} name="bloodGroup" onChange={handleChange} required>
            <option value="">Select Blood Group</option>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
          <input style={styles.input} type="text" name="location" placeholder="Location" onChange={handleChange} required />
          <input style={styles.input} type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <textarea style={styles.input} name="message" placeholder="Additional Message" onChange={handleChange} />
          <label style={styles.checkbox}>
            <input type="checkbox" name="isUrgent" onChange={handleChange} />
            &nbsp; Mark as URGENT
          </label>
          <button style={styles.button} type="submit">Post Request</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' },
  box: { backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '400px' },
  title: { textAlign: 'center', color: '#e53935', marginBottom: '20px' },
  input: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' },
  button: { width: '100%', padding: '10px', backgroundColor: '#e53935', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' },
  success: { color: 'green', textAlign: 'center' },
  error: { color: 'red', textAlign: 'center' },
  checkbox: { display: 'block', marginBottom: '15px' }
};

export default EmergencyRequest;