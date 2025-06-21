
import React, { useState } from 'react';
import axios from 'axios';

export default function LoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useState(() => {console.log(process.env.REACT_APP_BACKEND_BASE_URL)},[]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = () => {
    return formData.email.trim() !== '' && formData.password.trim() !== '';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/login`, formData);

      const { token, name } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('adminName', name);
      onSuccess(); 

    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed.';
      setError(msg);
    }
  };

  return (
    <>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Email Address*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="Email Address"
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Password*</label>
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={styles.passwordInput}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <img
              src={showPassword ? "/icons/eye-open.png" : "/icons/eye-hidden.png"}
              alt={showPassword ? "Hide password" : "Show password"}
              style={styles.eyeIcon}
            />
          </button>
        </div>
      </div>

      <div style={styles.forgotPassword}>
        <span style={styles.forgotLink}>Forgot password?</span>
      </div>

      {error && <p style={{ color: 'red', margin: '6px 0' }}>{error}</p>}

      <button
        style={{
          ...styles.submitButton,
          backgroundColor: isFormValid() ? '#6B46C1' : '#ccc',
          cursor: isFormValid() ? 'pointer' : 'not-allowed'
        }}
        onClick={handleLogin}
        disabled={!isFormValid()}
      >
        Login
      </button>
    </>
  );
}



const styles = {
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    fontSize: '14px',
    color: '#555',
    fontWeight: '500'
  },
  input: {
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: '#f9f9f9'
  },
  passwordContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  passwordInput: {
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    backgroundColor: '#f9f9f9'
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px'
  },
  eyeIcon: {
    width: '16px',
    height: '16px',
    objectFit: 'contain'
  },
  forgotPassword: {
    textAlign: 'left',
    marginTop: '-8px'
  },
  forgotLink: {
    fontSize: '14px',
    color: '#6B46C1',
    textDecoration: 'none'
  },
  submitButton: {
    marginTop: '10px',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff'
  }
};
