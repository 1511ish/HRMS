import React, { useState } from 'react';
import styles from './Calendar.module.css';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function Calendar({ approvedLeaves }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };


  const generateCalendarCells = () => {
    const cells = [];

    // Build leave count map: { "2024-09-08": 1, "2024-09-11": 1 }
    const leaveCountMap = {};
    approvedLeaves.forEach(leave => {
      if (!leave.leaveDate) return;

      const [day, month, year] = leave.leaveDate.split('/'); // "21/06/2025"
      const date = new Date(`${year}-${month}-${day}`); // Converts to "2025-06-21"

      if (isNaN(date.getTime())) return; // still safeguard

      const key = date.toISOString().split('T')[0];

      if (leaveCountMap[key]) {
        leaveCountMap[key]++;
      } else {
        leaveCountMap[key] = 1;
      }
    });

    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<div key={`empty-${i}`} className={styles.cell}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      const cellKey = cellDate.toISOString().split('T')[0];
      const leaveCount = leaveCountMap[cellKey] || 0;

      const isToday =
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day;

      cells.push(
        <div
          key={day}
          className={`${styles.cell} ${isToday ? styles.today : ''}`}
        >
          {day}
          {leaveCount > 0 && (
            <div className={styles.leaveBadge}>
              {leaveCount}
            </div>
          )}
        </div>
      );
    }

    return cells;
  };


  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        {/* <img src="/icons/" alt="" /> */}
        <button onClick={handlePrevMonth}>&lt;</button>
        <h3>{currentDate.toLocaleString('default', { month: 'long' })} {year}</h3>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      <div className={styles.days}>
        {daysOfWeek.map((day, ind) => (
          <div key={`${day}${ind}`} className={styles.day}>{day}</div>
        ))}
      </div>

      <div className={styles.grid}>
        {generateCalendarCells()}
      </div>
    </div>
  );
}

export default Calendar;
