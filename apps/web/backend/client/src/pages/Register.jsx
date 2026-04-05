import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
    role: 'patient', bloodGroup: '', location: '', phone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>LifeStream Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input style={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <select style={styles.input} name="role" onChange={handleChange}>
            <option value="patient">Patient</option>
            <option value="donor">Donor</option>
          </select>
          <select style={styles.input} name="bloodGroup" onChange={handleChange}>
            <option value="">Select Blood Group</option>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
          <input style={styles.input} type="text" name="location" placeholder="Location" onChange={handleChange} />
          <input style={styles.input} type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
          <button style={styles.button} type="submit">Register</button>
        </form>
        <p style={styles.login}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
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
  error: { color: 'red', textAlign: 'center' },
  login: { textAlign: 'center', marginTop: '15px' }
};

export default Register;