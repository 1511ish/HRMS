import React, { useState, useEffect } from 'react';
import FilterSection from '../../ui/FilterSection/FilterSection';
import LeavePage from '../LeavePage/LeavePage';
import AddLeaveModal from '../../modals/AddLeaveModal/AddLeaveModal';

import axios from 'axios';

const LeaveSection = () => {

    const [search, setSearch] = useState('');

    const handleSearch = (value) => {
        setSearch(value);
    };
    const [showModal, setShowModal] = useState(false);
    const [leaves, setLeaves] = useState([]);
    const [filters, setFilters] = useState({ status: '' });

    const fetchLeaves = async () => {
        try {
            const { status } = filters;
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/leaves`, {
                params: { status }
            });
            setLeaves(response.data.leaves);
        } catch (err) {
            console.error('Error fetching candidates:', err.message);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [filters]);

    useEffect(() => {
       console.log("leaves: ", leaves);
    },[leaves])

    const applyLeave = async (leaveData) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/leaves`, {
                ...leaveData,
                status: 'Pending'
            });
            console.log(res.data);
            setLeaves((prev) => [...prev, res.data.newLeave]);
        } catch (err) {
            console.error('Error adding candidate:', err.message);
        }
    };

    const updateLeaveStatus = async (id, status) => {
        try {
            const updated = await axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/leaves/${id}/status`, { status: status })
            console.log("updated leave: ",updated.data);
            setLeaves((prev) =>
                prev.map((l) => (l._id === id ? { ...l, status: updated.data.status } : l))
            );
        } catch (err) {
            console.error('Error updating status:', err.message);
        }
    };

    return (
        <div >
            <FilterSection
                showPosition={false}
                showStatus={true}
                showAddButton={true}
                showSearchBar={true}
                searchValue={search}
                onSearch={handleSearch}
                addButtonLabel="Add Leave"
                onStatusChange={(status) => setFilters((prev) => ({ ...prev, status }))}
                statusOptions={["Pending", "Approved", "Rejected"]}
                onButtonClick={() => setShowModal(true)}
            />
            <LeavePage leaves={leaves} onStatusChange={updateLeaveStatus}/>

            {showModal && (
                <AddLeaveModal
                    onClose={() => setShowModal(false)}
                    onSave={applyLeave}
                />
            )}
        </div>
    );
};

export default LeaveSection;