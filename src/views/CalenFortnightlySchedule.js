import React, { useState, useRef, useEffect, useCallback } from "react";
import "./calender.css";
import gsap from "gsap";
import axios from "axios";
import moment from "moment";

const CalenFortnightlySchedule = ({
  onTimeSlotSelected,
  setSelectedDatex,
  changeCalend,
}) => {
  const [currentStartDate, setCurrentStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [calendarMode, setCalendarMode] = useState("fortnightly"); // or "monthly"
  const [cleans, setCleans] = useState([]);

  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  const fetchCleans = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(
        `https://api-crisp-cleaning.onrender.com/user-clean/${userId}`
      );
      if (response.data && response.data.cleanRecords) {
        setCleans(response.data.cleanRecords); // Save cleans to state
      } else {
        throw new Error("No clean records found.");
      }
    } catch (error) {
      console.error("Error fetching cleans:", error);
      setCleans([]);
    }
  }, [userId]);

  // Effect to fetch cleans when userId changes
  useEffect(() => {
    if (userId) {
      fetchCleans();
    }
  }, [userId, fetchCleans]);

  const getDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const cleansByDay = cleans.reduce((acc, clean) => {
    const day = getDay(clean.clean_date);
    if (!acc[day]) acc[day] = [];
    acc[day].push(clean);
    return acc;
  }, {});

  useEffect(() => {
    gsap.fromTo(
      calendarRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5 }
    );
  }, [currentStartDate]);

  const handleNextFortnight = () => {
    gsap.to(calendarRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.5,
      onComplete: () => {
        setCurrentStartDate((prevDate) => {
          const nextStartDate = new Date(prevDate);
          nextStartDate.setDate(prevDate.getDate() + 14);
          return nextStartDate;
        });
      },
    });
  };

  const handlePrevFortnight = () => {
    gsap.to(calendarRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.5,
      onComplete: () => {
        setCurrentStartDate((prevDate) => {
          const prevStartDate = new Date(prevDate);
          prevStartDate.setDate(prevDate.getDate() - 14);
          return prevStartDate;
        });
      },
    });
  };

  const generateMonthCalendar = (date) => {
    const startOfMonth = moment(date).startOf("month");
    const endOfMonth = moment(date).endOf("month");

    const startDate = startOfMonth.clone().startOf("week");
    const endDate = endOfMonth.clone().endOf("week");

    const day = startDate.clone();
    const calendar = [];

    while (day.isBefore(endDate, "day")) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(day.clone());
        day.add(1, "day");
      }
      calendar.push(week);
    }

    return calendar; // Array of weeks (each week = array of 7 days)
  };

  const renderTableHeader = () => {
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
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
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleMouseEnter = (button) => {
    gsap.to(button, {
      scale: 1.05,
      opacity: 0.9,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (button) => {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnterFade = (button) => {
    gsap.to(button, {
      scale: 1.1,
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveFade = (button) => {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleMouseEnterFadex = (button) => {
    gsap.to(button, {
      scale: 1.1,
      opacity: 0.9,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveFadex = (button) => {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const renderDay = (dayMoment) => {
    const isToday = dayMoment.isSame(moment(), "day");
    const isSelected = selectedDate && dayMoment.isSame(selectedDate, "day");
    const isCurrentMonth =
      dayMoment.month() === moment(currentStartDate).month();

    const matchingCleans = cleans.filter((clean) =>
      moment(clean.date, "DD/MM/YYYY").isSame(dayMoment, "day")
    );

    return (
      <div
        key={dayMoment.format("DD-MM-YYYY")}
        className={`calendar-day ${isToday ? "today" : ""} ${
          isSelected ? "selected" : ""
        } ${!isCurrentMonth ? "other-month" : ""}`}
        onClick={() => {
          setSelectedDate(dayMoment.toDate());
        }}
      >
        <span className="day-number">{dayMoment.date()}</span>

        {matchingCleans.map((clean, i) => (
          <div key={i} className="scheduled-clean">
            Booked for {clean.typeOfClean}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="home-container087x" ref={calendarRef}>
      <div className="schedule-container121">
        <div className="schedule-container122">
          <span
            className="schedule-text115"
            onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}
          >
            Fortnightly
          </span>
          <span
            onClick={changeCalend}
            className="schedule-navlink17"
            onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}
          >
            Monthly
          </span>
        </div>
        <div className="schedule-container123">
          <span className="schedule-text116">
            {currentStartDate.toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <div className="schedule-container124">
            <div
              className="schedule-container125"
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
              onClick={handlePrevFortnight}
            >
              <img
                alt="image"
                src={require("./img/left-200w.png")}
                className="schedule-image23"
              />
            </div>
            <div
              className="schedule-container126"
              onClick={handleNextFortnight}
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
            >
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
      <div className="calendar-grid">
        {generateMonthCalendar(currentStartDate).map((week, weekIdx) => (
          <div key={weekIdx} className="calendar-week">
            {week.map((day) => renderDay(day))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalenFortnightlySchedule;
