import React, { useState, useRef, useEffect } from 'react';
import './calender.css';
import gsap from 'gsap';

const CalenSchedule = ({ onTimeSlotSelected, setSelectedDatex, changeCalend }) => {
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

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInCurrentMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = firstDayOfMonth + daysInCurrentMonth;

    const days = [];

    // Days from the previous month to fill the start of the first week
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = new Date(year, month, -i).getDate();
      days.push({ day, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Days from the next month to complete the last week
    const remainingCells = (7 - (totalDays % 7)) % 7;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  };

  const renderTableHeader = () => {
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return (
        <div className="schedule-container127">
            {weekdays.map((day) => (
              <div className="schedule-container128" key={day}>
                <span className="schedule-text117">{day}</span>
              </div>
              
            ))}
              
        </div>
    );
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
    return dateToCheck < currentDate.setHours(0, 0, 0, 0);
  };

  const handleDateClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth || isPastDay(day)) return;
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    setSelectedDatex(formatDate(newDate));
  };

  const handleMouseEnterFade = (button) => {
    gsap.to(button, {
      scale:1.1,
      opacity: 0.8,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveFade = (button) => {
    gsap.to(button, {
      scale:1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseEnterFadex = (button) => {
    gsap.to(button, {
      scale:1.1,
      opacity: 0.9,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveFadex = (button) => {
    gsap.to(button, {
      scale:1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const renderDay = ({ day, isCurrentMonth }) => {
    const isCurrentDay = highlightCurrentDay(day);
    const isPast = !isCurrentMonth;
    const isSelected = selectedDate && selectedDate.getDate() === day &&
                       selectedDate.getMonth() === currentMonth.getMonth() &&
                       selectedDate.getFullYear() === currentMonth.getFullYear();

    const dayClass = isCurrentDay ? 'home-container110XSelect' : 
                    isSelected ? 'home-container110XSelectx' : 
                    'home-container110X';
    const textClass = isCurrentDay || isSelected ? 'home-textSelect' : isCurrentMonth ? 'home-text067X' : 'home-text-faded';

    return (
         <div className={`${isCurrentDay?'schedule-container427x':"schedule-container136x"}`}>
      
      <div className={`schedule-container137`}>
      <span className={`${isPast ? 'schedule-text388':"schedule-text124"}`}>{day}</span>
      <div className="schedule-container138">
        <span className="schedule-text125">{day}</span>
      </div>
      <div className="schedule-container139">
        <span className="schedule-text126">{day}</span>
      </div>
      <div className="schedule-container140">
        <span className="schedule-text127">{day}</span>
      </div>
    </div>
    <div className="schedule-container141" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
      <span className="schedule-text128">Deep Clean</span>
      <div className="schedule-container142"></div>
    </div>
    <div className="schedule-container143" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
      <span className="schedule-text129">Regular Clean</span>
      <div className="schedule-container144"></div>
    </div>
    <div className="schedule-container145" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
      <span className="schedule-text130">Vacate Clean</span>
      <div className="schedule-container146"></div>
    </div>
    <div className={`${isCurrentDay?"schedule-container438":"schedule-container147"}`}  onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
      <span className="schedule-text131">Book Now</span>
    </div>
    </div>
    );
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleMouseEnter = (button) => {
    gsap.to(button, {
      scale: 1.05,
      opacity: 0.9,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (button) => {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div className="home-container087x" ref={calendarRef}>
      
      <div className="schedule-container121">
              <div className="schedule-container122">
                <span onClick={changeCalend} className="schedule-navlink17" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                  Fortnightly
                </span>
                <span className="schedule-text115" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>Monthly</span>
              </div>
              <div className="schedule-container123">
                <span className="schedule-text116">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <div className="schedule-container124">
                  <div className="schedule-container125" onClick={handlePrevMonth} onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                    <img
                      alt="image"
                      src={require("./img/left-200w.png")}
                      className="schedule-image23"
                    />
                  </div>
                  <div className="schedule-container126" onClick={handleNextMonth} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                    <img
                      alt="image"
                      src={require("./img/right-200w.png")}
                      className="schedule-image24"
                    />
                  </div>
                </div>
              </div>
            </div>
            {renderTableHeader()}
                {Array.from({ length: 6 }).map((_, rowIndex) => (
                    <div className="schedule-container135" key={rowIndex}>
                    {generateMonthDays().slice(rowIndex * 7, rowIndex * 7 + 7).map((dayInfo, index) => (
                        <div style={{width:'12%'}} key={index}>
                            {renderDay(dayInfo)}
                        
                      </div>
                    ))}
                    </div>
                ))}
    </div>
  );
};

export default CalenSchedule;
