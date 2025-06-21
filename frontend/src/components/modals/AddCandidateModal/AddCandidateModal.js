import React, { useState } from 'react';
import styles from './AddCandidateModal.module.css'; // 👈 CSS module import

const AddCandidateModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resumeUrl: null,
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      setForm({ ...form, resume: files[0] });
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
      form.experience.trim() &&
      form.resumeUrl &&
      form.agreed
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const { agreed, ...allFormData } = form;
    onSave(allFormData);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Add New Candidate</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input name="name" type="text" placeholder="Full Name*" value={form.name} onChange={handleChange} />
            <input name="email" type="email" placeholder="Email Address*" value={form.email} onChange={handleChange} />
          </div>
          <div className={styles.row}>
            <input name="phone" type="tel" placeholder="Phone Number*" value={form.phone} onChange={handleChange} />
            <input name="position" type="text" placeholder="Position*" value={form.position} onChange={handleChange} />
          </div>
          <div className={styles.row}>
            <input name="experience" type="text" placeholder="Experience*" value={form.experience} onChange={handleChange} />
            <input name="resumeUrl" type="text" placeholder="Resume URL" onChange={handleChange} />
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

export default AddCandidateModal;