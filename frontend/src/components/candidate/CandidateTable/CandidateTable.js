import { useState } from "react"
import styles from './CandidateTable.module.css';

import Dropdown from "../../ui/Dropdown/Dropdown";
import Table from '../../ui/Table/Table';

const CandidateTable = ({ candidates, onStatusChange, deleteCandidate }) => {
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const toggleActionMenu = (candidateId) => {
    setOpenActionMenu(openActionMenu === candidateId ? null : candidateId);
  };

  const handleActionClick = (action, candidateId) => {

    if (action === "Delete Candidate") {
      deleteCandidate(candidateId);
    } else {
      console.log("download resume");
    }

    setOpenActionMenu(null);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Sr no.</th>
          <th>Candidates Name</th>
          <th>Email Address</th>
          <th>Phone Number</th>
          <th>Position</th>
          <th>Status</th>
          <th>Experience</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate, index) => (
          <tr key={candidate.id}>
            <td>{index + 1}</td>
            <td>{candidate.name}</td>
            <td>{candidate.email}</td>
            <td>{candidate.phone}</td>
            <td>{candidate.position}</td>
            <td>
              <Dropdown
                value={candidate.status}
                onChange={(e) => onStatusChange(candidate._id, e.target.value)}
                options={[
                  { label: "New", value: "New" },
                  { label: "Selected", value: "Selected" },
                  { label: "Rejected", value: "Rejected" }
                ]}
              />
            </td>
            <td>{candidate.experience}</td>
            <td>
              <div className={styles.actionMenuContainer}>
                {/* <button
                  className={styles.actionMenuBtn}
                  onClick={() => toggleActionMenu(candidate._id)}
                >
                  ⋮
                </button> */}
                <div className={styles.dots} onClick={() => toggleActionMenu(candidate._id)}>
                  <img src="/icons/more.png" alt="options" />
                </div>
                {openActionMenu === candidate._id && (
                  <div className={styles.actionMenu}>
                    <button
                      className={styles.actionMenuItem}
                      onClick={() =>
                        handleActionClick("Download Resume", candidate.id)
                      }
                    >
                      Download Resume
                    </button>
                    <button
                      className={`${styles.actionMenuItem} ${styles.delete}`}
                      onClick={() =>
                        handleActionClick("Delete Candidate", candidate._id)
                      }
                    >
                      Delete Candidate
                    </button>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CandidateTable;


