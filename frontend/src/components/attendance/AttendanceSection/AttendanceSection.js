import { useState, useEffect } from "react"
import FilterSection from '../../ui/FilterSection/FilterSection';
import AttendanceTable from '../AttendanceTable/AttendanceTable';
import axios from 'axios';

const AttendanceSection = () => {

  const [employees, setEmployees] = useState([])
  const [filters, setFilters] = useState({ status: '' });

  const fetchEmployees = async () => {
    if (filters.status === '') {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/attendance`);
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching candidates:', err.message);
      }
    } else {
      try {
        const { status } = filters;
        console.log("status: ", status);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/attendance/${status}`);
        console.log("filtered employees: ", response.data);
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching candidates:', err.message);
      }
    }
  };
  
  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/attendance/${id}`, { status: newStatus })
      setEmployees((prev) => prev.map((emp) => (emp.employeeId === id ? { ...emp, status: response.data.status } : emp)));
    } catch (err) {
      console.error('Error updating status:', err.message);
    }
  }

  return (
    <div >
      <FilterSection
        showPosition={false}
        showStatus={true}
        showAddButton={false}
        showSearchBar={true}
        onStatusChange={(status) => setFilters((prev) => ({ ...prev, status }))}
        statusOptions={["Present", "Absent", "Medical Leave", "Work From Home"]}
      />
      <AttendanceTable employees={employees} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default AttendanceSection;
