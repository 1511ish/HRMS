import React, { useEffect, useState } from 'react';
import axios from 'axios';

import FilterSection from '../../ui/FilterSection/FilterSection';
import CandidateTable from '../CandidateTable/CandidateTable';
import AddCandidateModal from '../../modals/AddCandidateModal/AddCandidateModal';
import ModalPortal from "../../ui/ModalPortal/ModalPortal";

const CandidateSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({ status: '', position: '' });

  const fetchCandidates = async () => {
    try {
      const { status, position } = filters;
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/candidates`, {
        params: { status, position }
      });
      setCandidates(response.data);
    } catch (err) {
      console.error('Error fetching candidates:', err.message);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [filters]);

  const addCandidate = async (candidateData) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/candidates`, {
        ...candidateData,
        status: 'New'
      });
      setCandidates((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Error adding candidate:', err.message);
    }
  };

  const deleteCandidate = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/candidates/${id}`);
      if (res.status === 204) {
        setCandidates((prev) => prev.filter((can) => can._id !== id));
      }
    } catch (err) {
      console.error("Error in deleting: ", err.message);
    }
  };

  const updateCandidateStatus = async (id, status) => {
    try {
      const updated = await axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/candidates/${id}`, { status });
      setCandidates((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: updated.data.status } : c))
      );
    } catch (err) {
      console.error('Error updating status:', err.message);
    }
  };

  return (
    <>
      <FilterSection
        showStatus={true}
        showPosition={true}
        showAddButton={true}
        showSearchBar={true}
        addButtonLabel="Add Candidate"
        onButtonClick={() => setShowModal(true)}
        onStatusChange={(status) => setFilters((prev) => ({ ...prev, status }))}
        onPositionChange={(position) => setFilters((prev) => ({ ...prev, position }))}
        statusOptions={["New", "Selected", "Rejected", "Scheduled", "Ongoing"]}
        positionOptions={["Designer", "Developer", "Human Resource"]}
      />


      {showModal && (
        <ModalPortal>
          <AddCandidateModal
            onClose={() => setShowModal(false)}
            onSave={addCandidate}
          />
        </ModalPortal>)
      }

      <CandidateTable
        candidates={candidates}
        onStatusChange={updateCandidateStatus}
        deleteCandidate={deleteCandidate}
      />
    </>
  );
};

export default CandidateSection;

