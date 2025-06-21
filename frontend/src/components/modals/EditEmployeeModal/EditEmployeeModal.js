import React, { useState, useEffect } from 'react';
import styles from './EditEmployeeModal.module.css'; // ✅ Reusing styles
import axios from 'axios';

const EditEmployeeModal = ({ onClose, onSave, employee }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    dateOfJoining: '',
    agreed: false,
  });

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        position: employee.position || '',
        department: employee.department || '',
        dateOfJoining: employee.dateOfJoining || '',
        agreed: false,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const isFormValid = () => {
    return (
      form.name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.position.trim() &&
      form.department.trim() &&
      form.dateOfJoining.trim() &&
      form.agreed
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const {
      name,
      email,
      phone,
      position,
      department,
      dateOfJoining
    } = form;

    const payload = {
      name,
      email,
      phone,
      position,
      department,
      dateOfJoining
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/employees/${employee._id}`, payload
      );
      console.log(response.data);
      onSave(response.data.updatedEmployee);
    } catch (err) {
      console.error('Error updating employee:', err.message);
    }

    onClose();
  };


  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Edit Employee Details</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input name="name" type="text" placeholder="Full Name*" value={form.name} onChange={handleChange} />
            <input name="email" type="email" placeholder="Email Address*" value={form.email} onChange={handleChange} />
          </div>
          <div className={styles.row}>
            <input name="phone" type="tel" placeholder="Phone Number*" value={form.phone} onChange={handleChange} />
            <input name="department" type="text" placeholder="Department*" value={form.department} onChange={handleChange} />
          </div>
          <div className={styles.row}>
            <input name="position" type="text" placeholder="Position*" value={form.position} onChange={handleChange} />
            <input name="dateOfJoining" type="date" placeholder="Date of Joining*" value={form.dateOfJoining} onChange={handleChange} />
          </div>

          <div className={styles.checkboxRow}>
            <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} />
            <label>I hereby declare that the above information is true to the best of my knowledge and belief</label>
          </div>

          <button className={styles.saveBtn} type="submit" disabled={!isFormValid()}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
