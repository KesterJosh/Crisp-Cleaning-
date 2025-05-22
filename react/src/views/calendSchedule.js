import React, { useState, useRef, useEffect } from "react";
import "./calender.css";
import gsap from "gsap";
import moment from "moment";
import { useCallback } from "react";
import axios from "axios";

const CalenSchedule = ({
  onTimeSlotSelected,
  setSelectedDatex,
  changeCalend,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const calendarRef = useRef(null);
  const [cleans, setCleans] = useState([]);

  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  const fetchCleans = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(
        `http://localhost:4000/user-clean/${userId}`
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

  useEffect(() => {
    gsap.fromTo(
      calendarRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5 }
    );
  }, [currentMonth]);

  const handleNextMonth = () => {
    gsap.to(calendarRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.5,
      onComplete: () => {
        setCurrentMonth((prevMonth) => {
          const nextMonth = new Date(prevMonth);
          nextMonth.setMonth(prevMonth.getMonth() + 1);
          return nextMonth;
        });
      },
    });
  };

  const handlePrevMonth = () => {
    gsap.to(calendarRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.5,
      onComplete: () => {
        setCurrentMonth((prevMonth) => {
          const prevMonthCopy = new Date(prevMonth);
          prevMonthCopy.setMonth(prevMonth.getMonth() - 1);
          return prevMonthCopy;
        });
      },
    });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
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
        week.push({
          day: day.date(),
          isCurrentMonth: day.month() === moment(date).month(),
          fullDate: day.clone().toDate(),
        });
        day.add(1, "day");
      }
      calendar.push(week);
    }

    return calendar; // Array of weeks
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
    const dateToCheck = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return dateToCheck < currentDate.setHours(0, 0, 0, 0);
  };

  const handleDateClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth || isPastDay(day)) return;
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setSelectedDate(newDate);
    setSelectedDatex(formatDate(newDate));
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

  const cleansByDate = React.useMemo(() => {
    return cleans.reduce((acc, clean) => {
      const dateKey = moment(clean.date, "DD/MM/YYYY").format("YYYY-MM-DD");

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(clean);
      return acc;
    }, {});
  }, [cleans]);

  const renderDay = ({ day, isCurrentMonth, fullDate }) => {
    const isCurrentDay = highlightCurrentDay(fullDate.getDate());
    const isPast = !isCurrentMonth;
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === fullDate.getDate() &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear();

    // Get cleans for this day
    const dateKey = moment(fullDate).format("YYYY-MM-DD");
    const dayCleans = cleansByDate[dateKey] || [];

    return (
      <div
        className={`${
          isCurrentDay ? "schedule-container427x" : "schedule-container136x"
        }`}
      >
        <div
          className="schedule-container137"
          onClick={() => handleDateClick(day, isCurrentMonth)}
        >
          <span
            className={`${isPast ? "schedule-text388" : "schedule-text124"}`}
          >
            {day}
          </span>
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
        <div className="cleans-info">
          {dayCleans.length > 0 ? (
            dayCleans.map((clean, i) => (
              <div
                key={i}
                className={`scheduled-clean ${clean.typeOfClean
                  ?.toLowerCase()
                  ?.replace(" ", "-")}`}
              >
                Booked for {clean.typeOfClean}
              </div>
            ))
          ) : (
            <small className="no-clean">No cleans</small>
          )}
        </div>
        {dayCleans.length === 0 && (
          <div
            className={`${
              isCurrentDay ? "schedule-container438" : "schedule-container147"
            }`}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <span className="schedule-text131">Book Now</span>
          </div>
        )}
      </div>
    );
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

  return (
    <div className="home-container087x" ref={calendarRef}>
      <div className="schedule-container121">
        <div className="schedule-container122">
          <span
            onClick={changeCalend}
            className="schedule-navlink17"
            onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}
          >
            Fortnightly
          </span>
          <span
            className="schedule-text115"
            onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}
          >
            Monthly
          </span>
        </div>
        <div className="schedule-container123">
          <span className="schedule-text116">
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <div className="schedule-container124">
            <div
              className="schedule-container125"
              onClick={handlePrevMonth}
              onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
            >
              <img
                alt="image"
                src={require("./img/left-200w.png")}
                className="schedule-image23"
              />
            </div>
            <div
              className="schedule-container126"
              onClick={handleNextMonth}
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
      {generateMonthCalendar(currentMonth).map((week, weekIdx) => (
        <div className="schedule-container135" key={weekIdx}>
          {week.map((dayInfo, index) => (
            <div style={{ width: "12%" }} key={index}>
              {renderDay(dayInfo)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalenSchedule;
