import React, { useState, useRef, useEffect } from 'react';
import './calender.css';
import gsap from 'gsap';

const CalenFortnightlySchedule = ({ onTimeSlotSelected, setSelectedDatex, changeCalend }) => {
  const [currentStartDate, setCurrentStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(calendarRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 });
  }, [currentStartDate]);

  const handleNextFortnight = () => {
    gsap.to(calendarRef.current, { opacity: 0, x: 20, duration: 0.5, onComplete: () => {
      setCurrentStartDate((prevDate) => {
        const nextStartDate = new Date(prevDate);
        nextStartDate.setDate(prevDate.getDate() + 14);
        return nextStartDate;
      });
    }});
  };

  const handlePrevFortnight = () => {
    gsap.to(calendarRef.current, { opacity: 0, x: -20, duration: 0.5, onComplete: () => {
      setCurrentStartDate((prevDate) => {
        const prevStartDate = new Date(prevDate);
        prevStartDate.setDate(prevDate.getDate() - 14);
        return prevStartDate;
      });
    }});
  };

  const generateFortnightDays = () => {
    const days = [];
    for (let i = 0; i < 14; i++) {
      const day = new Date(currentStartDate);
      day.setDate(currentStartDate.getDate() + i);
      days.push(day);
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

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setSelectedDatex(formatDate(day));
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

  const renderDay = (day) => {
    const isToday = day.toDateString() === new Date().toDateString();
    const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
    const isCurrentMonth = day.getMonth() === currentStartDate.getMonth();
  
    const dayClass = isToday ? 'home-container110XSelect' :
                    isSelected ? 'home-container110XSelectx' :
                    isCurrentMonth ? 'home-container110X' : 'home-container110XOtherMonth';
    const textClass = isToday || isSelected ? 'schedule-text124' :
                      isCurrentMonth ? 'schedule-text124' : 'schedule-text388';

    return (
      <div className={`${isToday ? 'schedule-container427x' : 'schedule-container136x'}`} key={day}>
        <div className={`schedule-container137`} onClick={() => handleDateClick(day)}>
          <span className={`${textClass}`}>{day.getDate()}</span>
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
        <div className={`${isToday ? 'schedule-container438' : 'schedule-container147'}`} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
          <span className="schedule-text131">Book Now</span>
        </div>
      </div>
    );
  };
  

  return (
    <div className="home-container087x" ref={calendarRef}>
      <div className="schedule-container121">
        <div className="schedule-container122">
          <span className="schedule-text115" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>Fortnightly</span>
          <span onClick={changeCalend} className="schedule-navlink17" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
            Monthly
          </span>
        </div>
        <div className="schedule-container123">
          <span className="schedule-text116">
            {currentStartDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
          </span>
          <div className="schedule-container124">
            <div className="schedule-container125" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)} onClick={handlePrevFortnight}>
              <img
                alt="image"
                src={require("./img/left-200w.png")}
                className="schedule-image23"
              />
            </div>
            <div className="schedule-container126" onClick={handleNextFortnight} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
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
      <div className="schedule-container135">
        {generateFortnightDays().slice(0, 7).map((day) => (
          <div style={{ width: '12%' }} key={day}>
            {renderDay(day)}
          </div>
        ))}
      </div>
      <div className="schedule-container135">
        {generateFortnightDays().slice(7, 14).map((day) => (
          <div style={{ width: '12%' }} key={day}>
            {renderDay(day)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalenFortnightlySchedule;
