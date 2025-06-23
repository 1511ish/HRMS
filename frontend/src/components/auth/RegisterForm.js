import React, { useState } from 'react';
import axios from 'axios';
import styles from './auth.module.css';

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
      formData.confirmPassword.trim() !== ''
    );
  };

  const handleRegister = async () => {
    if (!isFormValid()) {
      setError("Please fill all fields.");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  

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
      <div className={styles.inputGroup}>
        <label className={styles.label}>Full name<span className={styles.required}>*</span></label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Full Name"
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Email Address<span className={styles.required}>*</span></label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Email Address"
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Password<span className={styles.required}>*</span></label>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles.passwordInput}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeButton}
          >
            <img
              src={showPassword ? "/icons/eye-open.png" : "/icons/eye-hidden.png"}
              alt={showPassword ? "Hide password" : "Show password"}
              className={styles.eyeIcon}
            />
          </button>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Confirm Password<span className={styles.required}>*</span></label>
        <div className={styles.passwordContainer}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={styles.passwordInput}
            placeholder="Confirm Password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={styles.eyeButton}
          >
            <img
              src={showConfirmPassword ? "/icons/eye-open.png" : "/icons/eye-hidden.png"}
              alt={showConfirmPassword ? "Hide password" : "Show password"}
              className={styles.eyeIcon}
            />
          </button>
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      <button
        className={styles.submitButton}
        style={{
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