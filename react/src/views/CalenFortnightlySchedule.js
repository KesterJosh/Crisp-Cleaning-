import React, { useState, useRef, useEffect, useCallback } from "react";
import "./calender.css";
import gsap from "gsap";
import axios from "axios";
import moment from "moment";
import BookingPopup from "../components/BookingPopup";

const CalenFortnightlySchedule = ({
  onTimeSlotSelected,
  setSelectedDatex,
  changeCalend,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [calendarMode, setCalendarMode] = useState("fortnightly"); // or "monthly"
  const [cleans, setCleans] = useState([]);
  const [currentStartDate, setCurrentStartDate] = useState(new Date());
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)

    // Subtract the day index to get back to Sunday
    const sundayOfWeek = new Date(firstDayOfMonth);
    sundayOfWeek.setDate(firstDayOfMonth.getDate() - dayOfWeek);

    setCurrentStartDate(sundayOfWeek);
  }, []);

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

  const generateFortnightCalendar = (startDate) => {
    const start = moment(startDate).startOf("day");
    const calendar = [];

    let day = start.clone();
    for (let week = 0; week < 2; week++) {
      const weekDays = [];
      for (let i = 0; i < 7; i++) {
        weekDays.push(day.clone());
        day.add(1, "day");
      }
      calendar.push(weekDays);
    }

    return calendar;
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
    const isPastDate = dayMoment.isBefore(moment(), "day");

    const matchingCleans = cleans.filter((clean) =>
      moment(clean.date, "DD/MM/YYYY").isSame(dayMoment, "day")
    );

    const handleClick = () => {
      if (!isPastDate) {
        setSelectedDate(dayMoment.toDate());
        setSelectedDatex(formatDate(dayMoment.toDate()));
      }
    };

    return (
      <div
        key={dayMoment.format("DD-MM-YYYY")}
        className={`calendar-day ${isToday ? "today" : ""} ${
          isSelected ? "selected" : ""
        } ${!isCurrentMonth ? "other-month" : ""}`}
        onClick={handleClick}
      >
        <span className="day-number">{dayMoment.date()}</span>

        {matchingCleans.map((clean, i) => {
          let typeClass = "";
          if (clean.typeOfClean == 280) typeClass = "vacant";
          else if (clean.typeOfClean == 135) typeClass = "deep";
          else if (clean.typeOfClean == 45) typeClass = "regular";

          return (
            <>
              <div key={i} className={`scheduled-clean ${typeClass}`}>
                {clean.typeOfClean == 280 && "Vacant"}
                {clean.typeOfClean == 135 && "Deep"}
                {clean.typeOfClean == 45 && "Regular"} Clean
                <span className="clean-circle"></span>
              </div>
            </>
          );
        })}

        {!isPastDate && isSelected && (
          <button onClick={() => setBooking(true)} className="book-now-btn">
            Book Now
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {booking && <BookingPopup onClose={() => setBooking(false)} />}
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
          <div className="calendar-grid">
            {generateFortnightCalendar(currentStartDate).map(
              (week, weekIdx) => (
                <div key={weekIdx} className="calendar-week">
                  {week.map((day) => renderDay(day))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalenFortnightlySchedule;
