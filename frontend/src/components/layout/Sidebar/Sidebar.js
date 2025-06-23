import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import LogoutModal from '../../modals/LogoutModal/Logout.js';
import ModalPortal from "../../ui/ModalPortal/ModalPortal.js";
import Logo from '../../ui/Logo/Logo.js';

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
        <>
            <div className={styles.sidebar}>
                <div className={styles.upperSection}>
                    <Logo boxSize={32} />
                    <input type="text" placeholder="Search" className={styles.searchBox} />
                </div>

                <div className={styles.lowerSection}>
                    <div className={styles.sectionTitle}>Recruitment</div>
                    <div
                        className={`${styles.menuItem} ${activeTab === 'Candidates' ? styles.active : ''}`}
                        onClick={() => setActiveTab('Candidates')}
                    >    {activeTab === 'Candidates' && <div className={styles.activeBar}></div>}
                        <img src="/icons/candidate2x.png" alt="Candidates" className={styles.icon} />
                        Candidates
                    </div>

                    <div className={styles.sectionTitle}>Organisation</div>
                    <div
                        className={`${styles.menuItem} ${activeTab === 'Employees' ? styles.active : ''}`}
                        onClick={() => setActiveTab('Employees')}
                    >
                        {activeTab === 'Employees' && <div className={styles.activeBar}></div>}
                        <img src="/icons/employees2x.png" alt="Employees" className={styles.icon} />
                        Employees
                    </div>

                    <div
                        className={`${styles.menuItem} ${activeTab === 'Attendance' ? styles.active : ''}`}
                        onClick={() => setActiveTab('Attendance')}
                    >
                        {activeTab === 'Attendance' && <div className={styles.activeBar}></div>}
                        <img src="/icons/attendance2x.png" alt="Attendance" className={styles.icon} />
                        Attendance
                    </div>

                    <div
                        className={`${styles.menuItem} ${activeTab === 'Leaves' ? styles.active : ''}`}
                        onClick={() => setActiveTab('Leaves')}
                    >
                        {activeTab === 'Leaves' && <div className={styles.activeBar}></div>}
                        <img src="/icons/leave2x.png" alt="Leaves" className={styles.icon} />
                        Leaves
                    </div>

                    <div className={styles.sectionTitle}>Others</div>
                    <div className={styles.menuItem} onClick={handleLogoutClick}>
                        <img src="/icons/logout2x.png" alt="Logout" className={styles.icon} />
                        Logout
                        {showModal && (
                            <ModalPortal>
                                <LogoutModal onCancel={handleCancel} onLogout={handleLogout} />
                            </ModalPortal>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
