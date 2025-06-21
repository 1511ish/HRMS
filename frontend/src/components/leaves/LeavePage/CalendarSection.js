import React,{useEffect, useState} from 'react';
import ApprovedLeaves from '../ApprovedLeaves/ApprovedLeaves';
import styles from './Calendar.module.css';

import Calendar from '../Calendar/Calendar';

const CalendarSection = ({approvedLeaves}) => {

  return (
    <div className={styles.leaveCalendarCard}>
      <div className={styles.calendarHeader}>Leave Calendar</div>
      <div style={{padding:"10px"}}>
      <Calendar approvedLeaves={approvedLeaves}/>
      <ApprovedLeaves approvedLeaves={approvedLeaves}/>
      </div>
    </div>
  );
};

export default CalendarSection;
