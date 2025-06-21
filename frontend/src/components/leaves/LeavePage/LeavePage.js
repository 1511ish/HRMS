import React, { useState, useEffect } from 'react';
import CalendarSection from '../LeavePage/CalendarSection';
import LeaveTable from '../LeaveTable/LeaveTable';
import styles from './LeavePage.module.css';

const LeavePage = ({ leaves, onStatusChange }) => {

  const [approvedLeaves, setApprovedLeaves] = useState([]);

  useEffect(() => {
    const approved = leaves.filter((leave) => leave.status === "Approved");
    setApprovedLeaves(approved);
  },[leaves]);

  return (
    <div className={styles.LeavePage}>
      <LeaveTable leaves={leaves} onStatusChange={onStatusChange} /> 
      <CalendarSection approvedLeaves={approvedLeaves} />
    </div>
  );
};

export default LeavePage;
