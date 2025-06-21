import React, { useState } from 'react';
import styles from './EmployeeTable.module.css';
import Table from '../../ui/Table/Table';


const EmployeeTable = ({ employees, handleEdit, handleDelete }) => {

  const [dropdownId, setDropdownId] = useState(null);

  const toggleActionMenu = (id) => {
    setDropdownId(dropdownId === id ? null : id);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Profile</th>
          <th>Employee Name</th>
          <th>Email Address</th>
          <th>Phone Number</th>
          <th>Position</th>
          <th>Department</th>
          <th>Date of Joining</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id}>
            <td>
              <img src={`https://avatars.githubusercontent.com/u/117707870?s=400&u=1ce3d071d197c4e846eeadb497c975b18e63d7b4&v=4`} alt="profile" className={styles.profile} />
            </td>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.phone}</td>
            <td>{emp.position}</td>
            <td>{emp.department}</td>
            <td>{emp.joiningDate}</td>
            <td className={styles.actionCell}>
              <div className={styles.dots} onClick={() => toggleActionMenu(emp._id)}>
                <img src="/icons/more.png" alt="options" />
              </div>
              {dropdownId === emp._id && (
                <div className={styles.dropdown}>
                  <div onClick={() => handleEdit(emp)}>Edit</div>
                  <div onClick={() => handleDelete(emp._id)}>Delete</div>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

  );
};

export default EmployeeTable;

