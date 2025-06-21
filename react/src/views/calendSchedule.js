import React, { useState, useRef, useEffect } from "react";
import "./calender.css";
import gsap from "gsap";
import moment from "moment";
import { useCallback } from "react";
import axios from "axios";
import BookingPopup from "../components/BookingPopup";

const CalenSchedule = ({
  onTimeSlotSelected,
  setSelectedDatex,
  changeCalend,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [booking, setBooking] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const calendarRef = useRef(null);
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

        requestAnimationFrame(() => {
          gsap.fromTo(
            calendarRef.current,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5 }
          );
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

        // Force immediate animation after the DOM updates
        requestAnimationFrame(() => {
          gsap.fromTo(
            calendarRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.5 }
          );
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
    const map = {};

    const currentYear = new Date().getFullYear();
    const endOfYear = moment().endOf("year");

    cleans.forEach((clean) => {
      if (clean.regularOronetime) {
        const start = moment(parseInt(clean.deltatime)).startOf("day");
        const end = endOfYear;

        // Loop from start date to end of year
        let day = start.clone();
        while (day.isSameOrBefore(end, "day")) {
          const weekday = day.day(); // 0 (Sun) to 6 (Sat)
          const isOnThisDay =
            (weekday === 0 && clean.sun === "1") ||
            (weekday === 1 && clean.mon === "1") ||
            (weekday === 2 && clean.tue === "1") ||
            (weekday === 3 && clean.wed === "1") ||
            (weekday === 4 && clean.thu === "1") ||
            (weekday === 5 && clean.fri === "1") ||
            (weekday === 6 && clean.sat === "1");

          if (isOnThisDay) {
            const key = day.format("YYYY-MM-DD");
            if (!map[key]) map[key] = [];
            map[key].push(clean);
          }

          day.add(1, "day");
        }
      } else {
        // One-time clean
        const parsed = moment(clean.date);
        if (!parsed.isValid()) return;

        const key = parsed.format("YYYY-MM-DD");
        if (!map[key]) map[key] = [];
        map[key].push(clean);
      }
    });

    return map;
  }, [cleans]);

  const renderDay = ({ day, isCurrentMonth, fullDate }) => {
    const isToday = moment().isSame(fullDate, "day");
    const isSelected =
      selectedDate && moment(selectedDate).isSame(fullDate, "day");
    const isPast = moment(fullDate).isBefore(moment(), "day");

    const dateKey = moment(fullDate).format("YYYY-MM-DD");
    const dayCleans = cleansByDate[dateKey] || [];

    const handleClick = () => {
      if (!isPast) {
        setSelectedDate(fullDate);
        setSelectedDatex(formatDate(fullDate));
      }
    };

    return (
      <div
        className={`calendar-day ${
          isToday ? "schedule-container427x" : "schedule-container136x"
        } ${isSelected ? "selected" : ""} ${
          !isCurrentMonth ? "other-month" : ""
        }`}
        onClick={handleClick}
      >
        <span className="day-number">{day}</span>

        {dayCleans.length > 0 &&
          dayCleans.map((clean, i) => {
            let typeClass = "";
            let typeLabel = "Unknown";

            if (clean.typeOfClean === "280") {
              typeClass = "vacant";
              typeLabel = "Vacate";
            } else if (clean.typeOfClean === "135") {
              typeClass = "deep";
              typeLabel = "Deep";
            } else if (clean.typeOfClean === "45") {
              typeClass = "regular";
              typeLabel = "Regular";
            }

            return (
              <div key={i} className={`scheduled-clean ${typeClass}`}>
                {typeLabel} Clean
                <span className="clean-circle"></span>
              </div>
            );
          })}

        {(() => {
          const hoursUntilDay = moment(fullDate).diff(moment(), "hours");
          const isMoreThan48HoursAway = hoursUntilDay >= 48;

          return (
            dayCleans.length === 0 &&
            !isPast &&
            isCurrentMonth &&
            isSelected &&
            isMoreThan48HoursAway && (
              <button className="book-now-btn" onClick={() => setBooking(true)}>
                Book Now
              </button>
            )
          );
        })()}
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
    <>
      {booking && <BookingPopup onClose={() => setBooking(false)} />}
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
    </>
  );
};

export default CalenSchedule;
