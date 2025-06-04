import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import { Helmet } from "react-helmet";

import "./schedule1.css";
import Menu from "./menu";
import CalenSchedule from "./calendSchedule";
import CalenFortnightlySchedule from "./CalenFortnightlySchedule";
import Popschedule from "../components/popschedule";
import Popschedule1 from "../components/popschedule1";
import axios from "axios";
import BookingPopup from "../components/BookingPopup";
import UpdateClean from "../components/UpdateClean";
import CancelBookingPopup from "../components/CancelBooking";

const Schedule1 = (props) => {
  const [forthNightly, setforthNighly] = useState(true);
  const [myDate, setMyDate] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [booking, setBooking] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const changeCalender = () => {
    setforthNighly(!forthNightly);
  };

  const handleSelectDate = (selectedValue) => {
    // Map the selected value to a time frame
    const timeFrameMap = {
      "8to10": 8,
      "10to12": 10,
      "12to2": 12,
      "2to4": 14,
      "4to6": 16,
      "6to8": 18,
    };

    // Set the state based on the selected value
    const newTimeFrame = timeFrameMap[selectedValue] || 8; // Default to 8 if not found
    settimeFrame(newTimeFrame);

    // Optional: alert for debugging
  };

  const setSelectedDate = (formattedDate) => {
    setMyDate(formattedDate);
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

  const Colorit = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      color: "#ff914d",
      // borderRadius:'100%',
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const unColorit = (button) => {
    gsap.to(button, {
      color: "#1F3042",
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const SearchColorit = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      borderColor: "#ff914d",
      // borderRadius:'100%',
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const SearchunColorit = (button) => {
    gsap.to(button, {
      borderColor: "#C3C3C3",
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const [cancelScreenX, setCancelScreenX] = useState(false);
  const [cancelScreenY, setCancelScreenY] = useState(false);

  const CancelScreen = () => {
    setCancelScreenX(true);
  };
  const CancelScreenY = () => {
    setCancelScreenY(true);
  };

  const CloseCancelScreen = () => {
    setCancelScreenX(false);
  };
  const CloseCancelScreenY = () => {
    setCancelScreenY(false);
  };

  useEffect(() => {
    // schedule1-container305
    gsap.fromTo(
      ".schedule1-container305",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );
  }, []);

  const [cleans, setCleans] = useState([]);
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

  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  const fetchCleans = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(
        `http://localhost:4000/user-clean/${userId}`
      );
      if (response.data && response.data.cleanRecords) {
        setCleans(response.data.cleanRecords);
        console.log(response.data); // Save cleans to state
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

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [editClean, setEditClean] = useState(false);
  const [editId, setEditId] = useState(null);

  return (
    <div className="schedule1-container100">
      {booking && <BookingPopup onClose={() => setBooking(false)} />}
      {editClean && cleans && (
        <UpdateClean cleanId={editId} onClose={() => setEditClean(false)} />
      )}
      {showLogoutPopup && (
        <div className="logout-popup-overlay">
          <div className="logout-popup">
            <p>Are you sure you want to logout?</p>
            <div className="logout-popup-buttons">
              <button onClick={handleLogout}>Yes</button>
              <button onClick={() => setShowLogoutPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <Helmet>
        <title>Schedule - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="Schedule1 - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      {cancelScreenX ? (
        <Popschedule CloseCancelScreen={CloseCancelScreen} cleanId={editId} />
      ) : null}
      {cancelScreenY ? (
        <Popschedule1 CloseCancelScreenY={CloseCancelScreenY} />
      ) : null}
      <div className="schedule1-container101">
        <Link to="/">
          <img
            alt="image"
            src={require("./img/logo-200h.png")}
            className="schedule1-image10"
          />
        </Link>
        <div className="schedule1-container102">
          <span className="schedule1-text100">OVERVIEW</span>
          <Link to="/dashboard" className="schedule1-navlink10">
            <div className="schedule1-container103">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="schedule1-image11"
              />
              <span
                className="schedule1-text101"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Dashboard
              </span>
            </div>
          </Link>
          <div className="schedule1-container104">
            <img
              alt="image"
              src={require("./img/calenderx-200h.png")}
              className="schedule1-image12"
            />
            <span className="schedule1-text102">Schedule</span>
          </div>
          <Link to="/referral" className="schedule1-navlink11">
            <div className="schedule1-container105">
              <img
                alt="image"
                src={require("./img/link-200h.png")}
                className="schedule1-image13"
              />
              <span
                className="schedule1-text103"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Referrals
              </span>
            </div>
          </Link>
          <Link to="/reward" className="schedule1-navlink12">
            <div className="schedule1-container106">
              <img
                alt="image"
                src={require("./img/lock1-200h.png")}
                className="schedule1-image14"
              />
              <span
                className="schedule1-text104"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Rewards
              </span>
            </div>
          </Link>
          <Link to="/cleanerspass" className="schedule1-navlink13">
            <div className="schedule1-container107">
              <img
                alt="image"
                src={require("./img/key-200h.png")}
                className="schedule1-image15"
              />
              <span
                className="schedule1-text105"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Cleaner's Pass
              </span>
            </div>
          </Link>
        </div>
        <div className="schedule1-container108">
          <span className="schedule1-text106">SETTINGS</span>
          <Link to="/settings" className="schedule1-navlink14">
            <div className="schedule1-container109">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="schedule1-image16"
              />
              <span
                className="schedule1-text107"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Settings
              </span>
            </div>
          </Link>
          <div
            onClick={() => setShowLogoutPopup(true)}
            className="schedule1-container110"
          >
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="schedule1-image17"
            />
            <span className="schedule1-text108">Logout</span>
          </div>
        </div>
      </div>
      <div className="schedule1-container111">
        <span className="schedule1-text109">Schedule</span>
        <div className="schedule1-container112">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="schedule1-image18"
          />
          <div className="schedule1-container113">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="schedule1-image19"
            />
            <span className="schedule1-text110">Search for anything...</span>
            <input type="text" className="schedule1-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="schedule1-image20"
          />
        </Link>
        <div className="schedule1-container114">
          <span className="schedule1-text111">Book Now</span>
        </div>
      </div>
      <div className="schedule1-container115">
        <div className="schedule1-container116">
          <span className="schedule1-text112">Schedule</span>
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="schedule1-image21"
          />
          <div
            className="schedule1-container117"
            onMouseEnter={(e) => SearchColorit(e.currentTarget)}
            onMouseLeave={(e) => SearchunColorit(e.currentTarget)}
          >
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="schedule1-image22"
            />
            <span className="schedule1-text113">Search for anything...</span>
            <input type="text" className="schedule1-textinput2 input" />
          </div>
          <div
            className="schedule1-container118"
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            onClick={() => setBooking(true)}
          >
            <span className="schedule1-text114">Book Now</span>
          </div>
        </div>
        <div className="schedule1-container119">
          {/* Fortnight  */}
          {forthNightly ? (
            <div className="schedule1-container120">
              <CalenFortnightlySchedule
                onTimeSlotSelected={handleSelectDate}
                setSelectedDatex={setMyDate}
                changeCalend={changeCalender}
              />

              {/* ////Clear Up sight  */}
              <div className="schedule1-container305">
                <div className="schedule1-container305">
                  {cleans && cleans.length > 0 ? (
                    cleans.map((clean, index) => (
                      <div key={index} className="schedule1-container306">
                        <div className="schedule1-container307">
                          <div className="schedule1-container308">
                            <div className="schedule1-container309">
                              <img
                                alt="calendar"
                                src={
                                  require("./img/calenderx-200h.png") ||
                                  "/placeholder.svg"
                                }
                                className="schedule1-image25"
                              />
                              <span className="schedule1-text235">
                                {clean.date}
                              </span>
                              <div className="schedule1-container310">
                                <div className="schedule1-container311"></div>
                              </div>
                            </div>
                            <div className="schedule1-container312">
                              <div className="schedule1-container313">
                                <span className="schedule1-text236">
                                  Booked for{" "}
                                  {clean.typeOfClean == 280 ? "Vacant" : null}
                                  {clean.typeOfClean == 135 ? "Deep" : null}
                                  {clean.typeOfClean == 45
                                    ? "Regular"
                                    : null}{" "}
                                  Clean
                                </span>
                                <span className="schedule1-text237">
                                  {clean.completed
                                    ? `Completed ${clean.date}`
                                    : "Pending"}
                                </span>
                                <div className="schedule-container569">
                                  {clean.bathroom !== "0" && (
                                    <span className="schedule-text407">
                                      {clean.bathroom}X Bathroom
                                    </span>
                                  )}
                                  {clean.kitchen !== "0" && (
                                    <span className="schedule-text408">
                                      {clean.kitchen}X Kitchen
                                    </span>
                                  )}
                                  {clean.rooms !== "0" && (
                                    <span className="schedule-text409">
                                      {clean.rooms}X Rooms
                                    </span>
                                  )}
                                  {clean.microwave !== "0" && (
                                    <span className="schedule-text410">
                                      {clean.microwave}X Microwave
                                    </span>
                                  )}
                                  {clean.blinds !== "0" && (
                                    <span className="schedule-text410">
                                      {clean.blinds}X Blinds
                                    </span>
                                  )}
                                  {clean.cabinets !== "0" && (
                                    <span className="schedule-text410">
                                      {clean.cabinets}X Cabinets
                                    </span>
                                  )}
                                  {clean.dishwasher !== "0" && (
                                    <span className="schedule-text410">
                                      {clean.dishwasher}X Dishwasher
                                    </span>
                                  )}
                                  {clean.fridge !== "0" && (
                                    <span className="schedule-text410">
                                      {clean.fridge}X Fridge
                                    </span>
                                  )}
                                  {clean.garage !== "0" && (
                                    <span className="schedule-text410">
                                      {clean.garage}X Garage
                                    </span>
                                  )}
                                  {clean.laundry !== "0" && (
                                    <span className="schedule-text410">
                                      {clean.laundry}X Laundry
                                    </span>
                                  )}
                                  {clean.stove !== "0" && (
                                    <span className="schedule-text410">
                                      {clean.stove}X Stove
                                    </span>
                                  )}
                                  {clean.tiles !== "0" && (
                                    <span className="schedule-text410">
                                      {clean.tiles}X Tiles
                                    </span>
                                  )}
                                  {clean.walls !== "0" && (
                                    <span className="schedule-text410">
                                      {clean.walls}X Walls
                                    </span>
                                  )}
                                  {clean.windows !== "0" && (
                                    <span className="schedule-text410">
                                      {clean.windows}X Windows
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="schedule1-container315">
                            <div className="schedule1-container316"></div>
                          </div>
                        </div>
                        <div className="schedule1-container317">
                          <div
                            onClick={() => {
                              setEditClean(true);
                              setEditId(clean._id);
                            }}
                            className="schedule1-container318"
                            onMouseEnter={(e) =>
                              handleMouseEnter(e.currentTarget)
                            }
                            onMouseLeave={(e) =>
                              handleMouseLeave(e.currentTarget)
                            }
                          >
                            <span className="schedule1-text242">Amend</span>
                          </div>
                          <div
                            className="schedule1-container319"
                            onMouseEnter={(e) =>
                              handleMouseEnter(e.currentTarget)
                            }
                            onMouseLeave={(e) =>
                              handleMouseLeave(e.currentTarget)
                            }
                            onClick={() => {
                              setCancelScreenX(true);
                              setEditId(clean._id);
                            }}
                          >
                            <span className="schedule1-text243">Cancel</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="schedule1-container306">
                      <div className="schedule1-container307">
                        <p
                          className="schedule1-text236"
                          style={{ padding: "1rem", textAlign: "center" }}
                        >
                          No cleans available at the moment.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="schedule-container120">
              <CalenSchedule
                onTimeSlotSelected={handleSelectDate}
                setSelectedDatex={setSelectedDate}
                changeCalend={changeCalender}
              />

              <div className="schedule-container560">
                {cleans && cleans.length > 0 ? (
                  cleans.map((clean, index) => (
                    <div key={index} className="schedule1-container306">
                      <div className="schedule1-container307">
                        <div className="schedule1-container308">
                          <div className="schedule1-container309">
                            <img
                              alt="calendar"
                              src={
                                require("./img/calenderx-200h.png") ||
                                "/placeholder.svg"
                              }
                              className="schedule1-image25"
                            />
                            <span className="schedule1-text235">
                              {clean.date}
                            </span>
                            <div className="schedule1-container310">
                              <div className="schedule1-container311"></div>
                            </div>
                          </div>
                          <div className="schedule1-container312">
                            <div className="schedule1-container313">
                              <span className="schedule1-text236">
                                {clean.typeOfClean == 280 ? "Vacant" : null}
                                {clean.typeOfClean == 135 ? "Deep" : null}
                                {clean.typeOfClean == 45
                                  ? "Regular"
                                  : null}{" "}
                                Clean{" "}
                              </span>
                              <span className="schedule1-text237">
                                {clean.completed
                                  ? `Completed ${clean.date}`
                                  : "Pending"}
                              </span>
                              <div className="schedule-container569">
                                {clean.bathroom !== "0" && (
                                  <span className="schedule-text407">
                                    {clean.bathroom}X Bathroom
                                  </span>
                                )}
                                {clean.kitchen !== "0" && (
                                  <span className="schedule-text408">
                                    {clean.kitchen}X Kitchen
                                  </span>
                                )}
                                {clean.rooms !== "0" && (
                                  <span className="schedule-text409">
                                    {clean.rooms}X Rooms
                                  </span>
                                )}
                                {clean.microwave !== "0" && (
                                  <span className="schedule-text410">
                                    {clean.microwave}X Microwave
                                  </span>
                                )}
                                {clean.blinds !== "0" && (
                                  <span className="schedule-text410">
                                    {clean.blinds}X Blinds
                                  </span>
                                )}
                                {clean.cabinets !== "0" && (
                                  <span className="schedule-text410">
                                    {clean.cabinets}X Cabinets
                                  </span>
                                )}
                                {clean.dishwasher !== "0" && (
                                  <span className="schedule-text410">
                                    {clean.dishwasher}X Dishwasher
                                  </span>
                                )}
                                {clean.fridge !== "0" && (
                                  <span className="schedule-text410">
                                    {clean.fridge}X Fridge
                                  </span>
                                )}
                                {clean.garage !== "0" && (
                                  <span className="schedule-text410">
                                    {clean.garage}X Garage
                                  </span>
                                )}
                                {clean.laundry !== "0" && (
                                  <span className="schedule-text410">
                                    {clean.laundry}X Laundry
                                  </span>
                                )}
                                {clean.stove !== "0" && (
                                  <span className="schedule-text410">
                                    {clean.stove}X Stove
                                  </span>
                                )}
                                {clean.tiles !== "0" && (
                                  <span className="schedule-text410">
                                    {clean.tiles}X Tiles
                                  </span>
                                )}
                                {clean.walls !== "0" && (
                                  <span className="schedule-text410">
                                    {clean.walls}X Walls
                                  </span>
                                )}
                                {clean.windows !== "0" && (
                                  <span className="schedule-text410">
                                    {clean.windows}X Windows
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="schedule1-container315">
                          <div className="schedule1-container316"></div>
                        </div>
                      </div>
                      <div className="schedule1-container317">
                        <div
                          className="schedule1-container318"
                          onClick={() => {
                            setEditClean(true);
                            setEditId(clean._id);
                          }}
                          onMouseEnter={(e) =>
                            handleMouseEnter(e.currentTarget)
                          }
                          onMouseLeave={(e) =>
                            handleMouseLeave(e.currentTarget)
                          }
                        >
                          <span className="schedule1-text242">Amend</span>
                        </div>
                        <div
                          className="schedule1-container319"
                          onMouseEnter={(e) =>
                            handleMouseEnter(e.currentTarget)
                          }
                          onMouseLeave={(e) =>
                            handleMouseLeave(e.currentTarget)
                          }
                          onClick={() => {
                            setCancelScreenX(true);
                            setEditId(clean._id);
                          }}
                        >
                          <span className="schedule1-text243">Cancel</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="schedule1-container306">
                    <div className="schedule1-container307">
                      <p
                        className="schedule1-text236"
                        style={{ padding: "1rem", textAlign: "center" }}
                      >
                        No cleans available at the moment.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Menu />
      <div className="schedule1-container340"></div>
    </div>
  );
};

export default Schedule1;
