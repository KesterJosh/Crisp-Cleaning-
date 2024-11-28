import React, { useState, useRef, useEffect } from 'react';
import './calender.css';
import gsap from 'gsap';

const Calendar = ({ onTimeSlotSelected, setSelectedDatex }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(calendarRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 });
  }, [currentMonth]);

  const handleNextMonth = () => {
    gsap.to(calendarRef.current, { opacity: 0, x: 20, duration: 0.5, onComplete: () => {
      setCurrentMonth((prevMonth) => {
        const nextMonth = new Date(prevMonth);
        nextMonth.setMonth(prevMonth.getMonth() + 1);
        return nextMonth;
      });
    }});
  };

  const handlePrevMonth = () => {
    gsap.to(calendarRef.current, { opacity: 0, x: -20, duration: 0.5, onComplete: () => {
      setCurrentMonth((prevMonth) => {
        const prevMonthCopy = new Date(prevMonth);
        prevMonthCopy.setMonth(prevMonth.getMonth() - 1);
        return prevMonthCopy;
      });
    }});
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth(); // Zero-indexed month
    return new Date(year, month + 1, 0).getDate();
  };

  const generateMonthDays = () => {
    const totalDays = getDaysInMonth(currentMonth);
    return Array.from({ length: totalDays }, (_, index) => index + 1);
  };

  const generateDaysTable = () => {
    const currentMonthDays = generateMonthDays();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const startingDay = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

    const daysTable = [];
    let currentWeek = [];

    // Fill in empty cells for days before the start of the month
    for (let i = 0; i < startingDay; i++) {
      currentWeek.push(null);
    }

    currentMonthDays.forEach((day) => {
      currentWeek.push(day);

      // Start a new row for the next week (Sunday)
      if (currentWeek.length === 7) {
        daysTable.push(currentWeek);
        currentWeek = [];
      }
    });

    // Fill in empty cells for days after the end of the month
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }

    daysTable.push(currentWeek);

    return daysTable;
  };

  const renderTableHeader = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <tr>
        {weekdays.map((day) => (
          <th key={day} className="home-text055">
            <div className="home-container093">
              <span className="home-text056">{day}</span>
            </div>
          </th>
        ))}
      </tr>
    );
  };

  const isFirstMonth = () => {
    const currentDate = new Date();
    return currentMonth.getMonth() === currentDate.getMonth() && currentMonth.getFullYear() === currentDate.getFullYear();
  };

  const isLastMonth = () => {
    const currentDate = new Date();
    const nextThreeMonths = new Date(currentDate);
    nextThreeMonths.setMonth(currentDate.getMonth() + 2);
    return currentMonth > nextThreeMonths;
  };

  const highlightCurrentDay = (day) => {
    const currentDate = new Date();
    return (
      currentMonth.getMonth() === currentDate.getMonth() &&
      currentMonth.getFullYear() === currentDate.getFullYear() &&
      day === currentDate.getDate()
    );
  };

  const isPastDay = (day) => {
    const currentDate = new Date();
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return dateToCheck < currentDate.setHours(0, 0, 0, 0); // Compare dates without time
  };

  const handleDateClick = (day) => {
    if (isPastDay(day)) return; // Prevent selection of past dates
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    setSelectedDatex(formatDate(newDate)); // Export formatted date
  };

  const renderDay = (day) => {
    const isCurrentDay = highlightCurrentDay(day);
    const isPast = isPastDay(day);
    const isSelected = selectedDate && selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentMonth.getMonth() && 
                        selectedDate.getFullYear() === currentMonth.getFullYear();
  
    const dayClass = isCurrentDay ? 'home-container110XSelect' : 
                    isSelected ? 'home-container110XSelectx' : 
                    'home-container110X';
    const textClass = isCurrentDay || isSelected ? 'home-textSelect' : 'home-text067X';
  
    return (
      <div
        className={`home-container109X ${isPast ? 'line-through' : ''}`}
        onClick={() => handleDateClick(day)}
        style={{ cursor: isPast ? 'not-allowed' : 'pointer' }}
      >
        <div className={dayClass}>
          <span className={textClass}>{day}</span>
        </div>
      </div>
    );
  };
  

  const timeSlots = [
    { id: '8to10', period: '8:00am - 10:00am' },
    { id: '10to12', period: '10:00am - 12:00pm' },
    { id: '12to2', period: '12:00pm - 2:00pm' },
    { id: '2to4', period: '2:00pm - 4:00pm' },
    { id: '4to6', period: '4:00pm - 6:00pm' },
    { id: '6to8', period: '6:00pm - 8:00pm' },
  ];
  
  const handleTimeSlotClick = (slotId) => {
    if (selectedDate) {
      setSelectedTimeSlot(slotId);
      onTimeSlotSelected(slotId);
    }
  };
  
  useEffect(() => {
    if (selectedDate && !selectedTimeSlot) {
      // Automatically select the first time slot by default
      const firstSlotId = timeSlots[0].id;
      setSelectedTimeSlot(firstSlotId);
      onTimeSlotSelected(firstSlotId);
    }
  }, [selectedDate]); // Runs whenever selectedDate changes
  
  const renderTimeSlots = () => {
    if (!selectedDate) return null;
  
    return (
      <div className="time-slots-container">
        {/* <h4 className='headSec'>Available Time Slots for {selectedDate.toDateString()}</h4> */}
        {timeSlots.map(({ id, period }, index) => (
          <button
            key={id}
            className={`time-slot-button ${index === 1 ? 'line-button' : ''} ${selectedTimeSlot === id ? 'selected' : ''}`}
            onClick={index === 1 ? null : () => handleTimeSlotClick(id)}
          >
            {period}
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="home-container087" ref={calendarRef}>
      <div className="home-container088">
        <span className="home-text055">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <div className="home-container089">
          {!isFirstMonth() && (
            <div className="home-container090" onClick={handlePrevMonth}>
              <img alt="image" src="/img/left-200w.png" className="home-image16" />
            </div>
          )}
          {!isLastMonth() && (
            <div className="home-container091" onClick={handleNextMonth}>
              <img alt="image" src="/img/right-200w.png" className="home-image17" />
            </div>
          )}
        </div>
      </div>
      <table className="calendar-table">
        <thead>{renderTableHeader()}</thead>
        <tbody>
          {generateDaysTable().map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex}>{day !== null ? renderDay(day) : null}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {renderTimeSlots()}
    </div>
  );
};

export default Calendar;