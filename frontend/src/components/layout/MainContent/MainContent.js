import React from 'react';
import EmployeeSection from '../../employee/EmployeeSection/EmployeeSection';
import Header from '../Header/Header';
import styles from './MainContent.module.css';
import CandidateSection from '../../candidate/CandidateSection/CandidateSection';
import AttendanceSection from '../../attendance/AttendanceSection/AttendanceSection';
import LeaveSection from '../../leaves/LeaveSection/LeaveSection';

export default function MainContent({ activeTab }) {
  return (
    <div className={styles.container}>
      <Header title={activeTab} />
      <div className={styles.mainContent}>
        {activeTab === 'Candidates' && <CandidateSection />}
        {activeTab === 'Employees' && <EmployeeSection />}
        {activeTab === 'Attendance' && <AttendanceSection />}
        {activeTab === 'Leaves' && <LeaveSection />}
      </div>
    </div>
  );
}
