import React from 'react';
import styles from './ApprovedLeaves.module.css';

const ApprovedLeaves = ({ approvedLeaves }) => {
  console.log("approvedLeaves: ", approvedLeaves);

  return (
    <div className={styles.approvedSection}>
      <h4>Approved Leaves</h4>
      {approvedLeaves.map((leave) => {
        return (
          <div key={leave._id} className={styles.leaveItem}>
            <img src="https://avatars.githubusercontent.com/u/117707870?s=400&u=1ce3d071d197c4e846eeadb497c975b18e63d7b4&v=4" alt="Profile" />
            <div className={styles.leaveDetails}>
              <p className={styles.name}>{leave.employee.name}</p>
              <p className={styles.role}>{leave.designation}</p>
            </div>
            <div className={styles.date}>{leave.leaveDate}</div>
          </div>
        );
      })}

    </div>
  );
};

export default ApprovedLeaves;
