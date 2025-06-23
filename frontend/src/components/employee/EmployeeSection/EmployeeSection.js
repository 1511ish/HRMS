
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import EmployeeTable from '../EmployeeTable/EmployeeTable';
import FilterSection from '../../ui/FilterSection/FilterSection';
import EditEmployeeModal from '../../modals/EditEmployeeModal/EditEmployeeModal';
import ModalPortal from "../../ui/ModalPortal/ModalPortal";

// const EmployeesSection = () => {

//   const [employees, setEmployees] = useState([]);
//   const [filters, setFilters] = useState({ position: '' });
//   const [editEmployee, setEditEmployee] = useState(false);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/employees`);
//       setEmployees(response.data.employees);
//     } catch (err) {
//       console.error('Error fetching candidates:', err.message);
//     }
//   };

//   useEffect(() => {

//   }, [filters]);


//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/employees/${id}`);
//       setEmployees(prev => prev.filter(emp => emp._id !== id));
//     } catch (err) {
//       console.error('Error fetching candidates:', err.message);
//     }
//   };

//   const handleEdit = async (employee) => {
//     setEditEmployee(employee);
//   };

//   const handleSave = async (updatedEmployee) => {
//     setEmployees(prev =>
//       prev.map(emp => (emp._id === updatedEmployee._id ? updatedEmployee : emp))
//     );
//     setEditEmployee(null);
//   };

//   return (
//     <div >
//       <FilterSection
//         showPosition={true}
//         showStatus={false}
//         showAddButton={false}
//         showSearchBar={true}
//         onPositionChange={(position) => setFilters((prev) => ({ ...prev, position }))}
//         positionOptions={["Intern", "Full Time", "Junior", "Senior", "Team Lead"]}
//       />

//       {editEmployee && (
//         <ModalPortal>
//           <EditEmployeeModal
//             employee={editEmployee}
//             onClose={() => setEditEmployee(null)}
//             onSave={handleSave}
//           />
//         </ModalPortal>
//       )}

//       <EmployeeTable
//         employees={employees}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//       />
//     </div>
//   );
// };

// export default EmployeesSection;








import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeesSection = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({ position: '' });
  const [editEmployee, setEditEmployee] = useState(false);

  // Fetch only once on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/employees`);
        setAllEmployees(response.data.employees);
        setEmployees(response.data.employees); // show all initially
      } catch (err) {
        console.error('Error fetching employees:', err.message);
      }
    };

    fetchEmployees();
  }, []);

  // Apply filter when filters change
  useEffect(() => {
    const filtered = allEmployees.filter(emp =>
      emp.position.toLowerCase().includes(filters.position.toLowerCase())
    );
    setEmployees(filtered);
  }, [filters, allEmployees]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/employees/${id}`);
      setAllEmployees(prev => prev.filter(emp => emp._id !== id));
      setEmployees(prev => prev.filter(emp => emp._id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err.message);
    }
  };

  const handleEdit = async (employee) => {
    setEditEmployee(employee);
  };

  const handleSave = async (updatedEmployee) => {
    setAllEmployees(prev =>
      prev.map(emp => (emp._id === updatedEmployee._id ? updatedEmployee : emp))
    );
    setEmployees(prev =>
      prev.map(emp => (emp._id === updatedEmployee._id ? updatedEmployee : emp))
    );
    setEditEmployee(null);
  };

  return (
    <>
      <FilterSection
        showPosition={true}
        showStatus={false}
        showAddButton={false}
        showSearchBar={true}
        onPositionChange={(position) => setFilters((prev) => ({ ...prev, position }))}
        positionOptions={["Intern", "Full Time", "Junior", "Senior", "Team Lead"]}
      />

      {editEmployee && (
        <ModalPortal>
          <EditEmployeeModal
            employee={editEmployee}
            onClose={() => setEditEmployee(null)}
            onSave={handleSave}
          />
        </ModalPortal>
      )}

      <EmployeeTable
        employees={employees}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default EmployeesSection;

