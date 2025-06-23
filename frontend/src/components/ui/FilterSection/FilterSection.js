
import React from 'react';
import styles from './FilterSection.module.css';
import Dropdown from '../Dropdown/Dropdown';

const FilterSection = ({
  showStatus,
  showPosition,
  showSearchBar,
  showAddButton,
  addButtonLabel,
  onButtonClick,
  onStatusChange,
  onPositionChange,
  statusOptions = [],
  positionOptions = [],
}) => {
  return (
    <div className={styles.filterSection}>
      <div>
        {showStatus && (
          <select className={styles.dropdown} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="">Status</option>
            {statusOptions.map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </select>
          
          // <Dropdown
          //   onChange={(e) => onStatusChange(e.target.value)}
          //   value={"Status"}
          //   options={[
          //     { label: "Status", value: "Status" },
          //     ...statusOptions.map((status) => ({ label: status, value: status }))
          //   ]}
          // />

        )}
        {showPosition && (
          <select className={styles.dropdown} onChange={(e) => onPositionChange(e.target.value)}>
            <option value="">Position</option>
            {positionOptions.map((position, idx) => (
              <option key={idx} value={position}>
                {position}
              </option>
            ))}
          </select>
        )}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        {showSearchBar && (
          <div className={styles.searchBox}>
            <input type="text" placeholder="Search" />
            <img src="/icons/search.png" alt="Search" />
          </div>
        )}
        

        {showAddButton && (
          <button onClick={onButtonClick} className={styles.button}>
            {addButtonLabel || 'Add'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterSection;

