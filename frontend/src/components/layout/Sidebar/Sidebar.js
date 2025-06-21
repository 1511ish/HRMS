// src/components/Sidebar/Sidebar.js
import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import LogoutModal from '../../modals/LogoutModal/Logout';
import ModalPortal from "../../ui/ModalPortal/ModalPortal";

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
    setShowModal(false);
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>LOGO</div>
      <input type="text" placeholder="Search" className={styles.searchBox} />

      <div className={styles.sectionTitle}>Recruitment</div>
      <div
        className={`${styles.menuItem} ${activeTab === 'Candidates' ? styles.active : ''}`}
        onClick={() => setActiveTab('Candidates')}
      >
        <img src="/icons/candidate.png" alt="Candidates" className={styles.icon} />
        Candidates
      </div>

      <div className={styles.sectionTitle}>Organisation</div>
      <div
        className={`${styles.menuItem} ${activeTab === 'Employees' ? styles.active : ''}`}
        onClick={() => setActiveTab('Employees')}
      >
        <img src="/icons/employees.png" alt="Employees" className={styles.icon} />
        Employees
      </div>
      <div
        className={`${styles.menuItem} ${activeTab === 'Attendance' ? styles.active : ''}`}
        onClick={() => setActiveTab('Attendance')}
      >
        <img src="/icons/attendance.png" alt="Attendance" className={styles.icon} />
        Attendance
      </div>
      <div
        className={`${styles.menuItem} ${activeTab === 'Leaves' ? styles.active : ''}`}
        onClick={() => setActiveTab('Leaves')}
      >
        <img src="/icons/leave.png" alt="Leaves" className={styles.icon} />
        Leaves
      </div>

      <div className={styles.sectionTitle}>Others</div>
      <div className={styles.menuItem} onClick={handleLogoutClick}>
        <img src="/icons/logout.png" alt="Logout" className={styles.icon} />
        Logout
        {showModal &&
          <ModalPortal>
            <LogoutModal onCancel={handleCancel} onLogout={handleLogout} />
          </ModalPortal>}
      </div>
    </div>
  );
};

export default Sidebar;
