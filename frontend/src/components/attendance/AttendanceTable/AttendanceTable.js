
import { useState, useEffect } from "react"
import styles from './AttendanceTable.module.css';
import Dropdown from "../../ui/Dropdown/Dropdown";
import Table from "../../ui/Table/Table";

const AttendanceTable = ({ employees, handleStatusChange }) => {

  const [openActionMenu, setOpenActionMenu] = useState(null)

  const toggleActionMenu = (candidateId) => {
    setOpenActionMenu(openActionMenu === candidateId ? null : candidateId)
  }

  const handleActionClick = (action, candidateId) => {
    console.log(`${action} clicked for candidate ${candidateId}`)
    setOpenActionMenu(null)
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Profile</th>
          <th>Employee Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Status</th>
          <th>Action</th>     </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>
              <img src={`https://avatars.githubusercontent.com/u/117707870?s=400&u=1ce3d071d197c4e846eeadb497c975b18e63d7b4&v=4`} alt="profile" className={styles.profile} />
            </td>
            <td>{employee.name}</td>
            <td>{employee.position}</td>
            <td>{employee.department}</td>
            <td>
              <Dropdown
                value={employee.status}
                onChange={(e) => handleStatusChange(employee.employeeId, e.target.value)}
                options={[
                  { label: "Present", value: "Present" },
                  { label: "Absent", value: "Absent" },
                  { label: "Not Marked", value: "Not Marked" }
                ]}
              />
            </td>
            <td>
              <div className={styles.actionMenuContainer}>
                <div className={styles.dots} onClick={() => toggleActionMenu(employee.id)}>
                  <img src="/icons/more.png" alt="options" />
                </div>
                {/* {openActionMenu === employee._id && (
                      // we can add some action here 
                )} */}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )

}

export default AttendanceTable;

