import React from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ value, onChange, options }) => {
    console.log("value: ", value);
    const getStatusClass = (status) => {
        if (!status) return '';
        switch (status) {
            case "Pending":
                return styles.statusNew;
            case "Approved":
                return styles.statusSelected;
            case "Selected":
                return styles.statusSelected;
            case "Rejected":
                return styles.statusRejected;
            case "Present":
                return styles.statusSelected;
            case "Absent":
                return styles.statusRejected;
            case "Not Marked":
                return styles.statusRejected;
            default:
                return styles.statusNew;
        }
    };
    return (
        <div className={`${styles.dropdownContainer}`}>
            <select
                value={value}
                onChange={onChange}
                className={`${styles.dropdown} ${getStatusClass(value)}`}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <img src="/icons/dropdown.png" alt=">" className={styles.dropdownArrow} />
        </div>
    );
};

export default Dropdown;
