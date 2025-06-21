import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddLeaveModal.module.css';

const AddLeaveModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    employeeId: '',
    designation: '',
    leaveDate: '',
    documents: null,
    reason: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    const fetchAllPresentedEmployees = async () => {
      try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/attendance/presented`); 
        console.log(res.data.presentedEmployees);
            setAllEmployees(res.data.presentedEmployees);
      } catch(err){
        console.error("Failed to fetch presented employees:", err.message);
      }
    }

    fetchAllPresentedEmployees();
  }, []);

  // Filter employees when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEmployees([]);
      return;
    }

    const filtered = allEmployees.filter(emp =>
      emp.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchQuery, allEmployees]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleEmployeeSelect = (employee) => {
    setForm({
      ...form,
      employeeId: employee.employeeId,
      designation: employee.desgination
    });
    console.log("form: ",form);
    setSearchQuery(employee.name);
    setFilteredEmployees([]);
  };

  const isFormValid = () => {
    return (
      form.employeeId &&
      form.designation?.trim() &&
      form.leaveDate &&
      form.reason?.trim()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    console.log("submitted");
    onSave(form);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Add New Leave</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.searchWrapper}>
              <input
                name="employeeSearch"
                type="text"
                placeholder="Search Employee Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredEmployees.length > 0 && (
                <ul className={styles.dropdown}>
                  {filteredEmployees.map(emp => (
                    <li key={emp._id} onClick={() => handleEmployeeSelect(emp)}>
                      {emp.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input
              name="designation"
              type="text"
              placeholder="Designation*"
              value={form.designation}
              readOnly
            />
          </div>

          <div className={styles.row}>
            <input
              name="leaveDate"
              type="date"
              value={form.leaveDate}
              onChange={handleChange}
            />
            <input
              name="documents"
              type="text"
              placeholder="Document URL"
              onChange={handleChange}
            />
          </div>

          <div className={styles.row}>
            <input
              name="reason"
              type="text"
              placeholder="Reason*"
              value={form.reason}
              onChange={handleChange}
            />
          </div>

          <button className={styles.saveBtn} type="submit" disabled={!isFormValid()}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeaveModal;







