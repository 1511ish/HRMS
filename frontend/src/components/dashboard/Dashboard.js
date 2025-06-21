// src/pages/Dashboard.js
import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar/Sidebar';
import MainContent from '../layout/MainContent/MainContent';
import styles from './Dashboard.module.css';

const Dashboard = ({onLogout}) => {
  const [activeTab, setActiveTab] = useState('Candidates');

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout}/>
      <MainContent activeTab={activeTab} />
    </div>
  );
};

export default Dashboard;


