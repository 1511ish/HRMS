import { useState } from "react"
import styles from './LeaveTable.module.css';
import Dropdown from "../../ui/Dropdown/Dropdown";
import Table from "../../ui/Table/Table";

const LeaveTable = ({ leaves, onStatusChange }) => {
  //   const [openActionMenu, setOpenActionMenu] = useState(null);

  //   const toggleActionMenu = (candidateId) => {
  //     setOpenActionMenu(openActionMenu === candidateId ? null : candidateId);
  //   };

  //   const handleActionClick = (action, candidateId) => {
  //     // console.log(`${action} clicked for candidate ${candidateId}`);
  //     if(action === "Delete Candidate"){
  //       console.log("deletedId", candidateId);
  //       deleteCandidate(candidateId);
  //     }else{
  //       console.log("download resume");
  //     }

  //     setOpenActionMenu(null);
  //   };
  // const styles = {
  //   customWidth:
  // }
  return (
    // <div className={styles.container}>
    //   <table className={styles.table}>
    //     <thead>
    //       <tr>
    //         <th>Profile</th>
    //         <th>Name</th>
    //         <th>Date</th>
    //         <th>Status</th>
    //         <th>Reason</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {leaves.map((leave) => (
    //         <tr key={leave._id}>
    //           <td>
    //             <img src="https://avatars.githubusercontent.com/u/117707870?s=400&u=1ce3d071d197c4e846eeadb497c975b18e63d7b4&v=4" alt="profile" className={styles.profile} />
    //           </td>
    //           <td>{leave.employee.name}</td>
    //           <td>{leave.leaveDate}</td>
    //           <td>
    //             <Dropdown
    //               value={leave.status}
    //               onChange={(e) => onStatusChange(leave._id, e.target.value)}
    //               options={[
    //                 { label: "Pending", value: "Pending" },
    //                 { label: "Approved", value: "Approved" },
    //                 { label: "Rejected", value: "Rejected" }
    //               ]}
    //             />
    //           </td>
    //           <td>{leave.reason}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

    <div style={{ width: '65%', margin: '0 auto' }}>
      <Table>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>
                <img src="https://avatars.githubusercontent.com/u/117707870?s=400&u=1ce3d071d197c4e846eeadb497c975b18e63d7b4&v=4" alt="profile" className={styles.profile} />
              </td>
              <td>{leave.employee.name}</td>
              <td>{leave.leaveDate}</td>
              <td>
                <Dropdown
                  value={leave.status}
                  onChange={(e) => onStatusChange(leave._id, e.target.value)}
                  options={[
                    { label: "Pending", value: "Pending" },
                    { label: "Approved", value: "Approved" },
                    { label: "Rejected", value: "Rejected" }
                  ]}
                />
              </td>
              <td>{leave.reason}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

  );
};

export default LeaveTable;
