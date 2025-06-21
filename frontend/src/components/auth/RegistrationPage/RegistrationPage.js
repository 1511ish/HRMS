import React, { useState } from 'react';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './RegistrationPage.module.css';

export default function RegistrationPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Left Panel Code */}

        <div className={styles.leftPanel}>
          <img src="/images/dashboard.png" alt="Dashboard Preview" className={styles.dashboardImage} />
          <div className={styles.description}>
            <p className={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
            <p className={styles.descriptionSubtext}>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <div className={styles.dots}>
            <div className = {styles.dot} style={{ backgroundColor: '#fff' }}></div>
            <div className = {styles.dot} style={{  backgroundColor: 'rgba(255,255,255,0.5)' }}></div>
            <div className = {styles.dot} style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}></div>
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Welcome to Dashboard</h2>
            {isLogin ? (
              <LoginForm onSuccess={onLoginSuccess} />
            ) : (
              <RegisterForm setIsLogin={setIsLogin}/>
            )}
            <div className={styles.switchMode}>
              <span className={styles.switchText}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button type="button" onClick={toggleMode} className={styles.switchButton}>
                {isLogin ? 'Register' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


