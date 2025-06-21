

import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterForm({ setIsLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      formData.password === formData.confirmPassword
    );
  };

  const handleRegister = async () => {
    if (!isFormValid()) return;

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/register`, formData);
      setIsLogin(true);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      setError(msg);
    }
  };

  return (
    <>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Full name*</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="Full Name"
        />
      </div>

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

      <div style={styles.inputGroup}>
        <label style={styles.label}>Confirm Password*</label>
        <div style={styles.passwordContainer}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            style={styles.passwordInput}
            placeholder="Confirm Password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeButton}
          >
            <img
              src={showConfirmPassword ? "/icons/eye-open.png" : "/icons/eye-hidden.png"}
              alt={showConfirmPassword ? "Hide password" : "Show password"}
              style={styles.eyeIcon}
            />
          </button>
        </div>
      </div>

      {error && <p style={{ color: 'red', margin: '6px 0' }}>{error}</p>}

      <button
        style={{
          ...styles.submitButton,
          backgroundColor: isFormValid() ? '#6B46C1' : '#ccc',
          cursor: isFormValid() ? 'pointer' : 'not-allowed'
        }}
        onClick={handleRegister}
        disabled={!isFormValid()}
      >
        Register
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
