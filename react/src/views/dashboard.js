import React, { useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { parse, isAfter } from "date-fns";

import { Helmet } from "react-helmet";
import "./dashboard.css";
import Menu from "./menu";
import BookingPopup from "../components/BookingPopup";
import UpdateClean from "../components/UpdateClean";
import CancelBookingPopup from "../components/CancelBooking";

const Dashboard = (props) => {
  const [cleans, setCleans] = useState([]);
  const [allCleans, setAllCleans] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [booking, setBooking] = useState(false);
  const [editClean, setEditClean] = useState(false);
  const [selectedCleanId, setSelectedCleanId] = useState(null);

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Fetch userId from sessionStorage
  const fetchUserData = useCallback(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (!storedUserId) {
      // Redirect to home page if no userId is found
      window.location.href = "/#/";
      return;
    }
    setUserId(storedUserId);
  }, []);

  const today = new Date();

  const Next = cleans
    ?.map((c) => {
      const parsedDate = parse(c.date, "dd/MM/yyyy", new Date());
      return { ...c, parsedDate };
    })
    .filter((c) => isAfter(c.parsedDate, today))
    .sort((a, b) => a.parsedDate - b.parsedDate)[0];

  const cleanType = (code) => {
    if (code == 280 || code === "280") return "Vacant Clean";
    if (code == 135 || code === "135") return "Deep Clean";
    if (code == 45 || code === "45") return "Regular Clean";
    return "Unknown Type";
  };

  // Fetch cleans based on userId
  const fetchCleans = useCallback(async () => {
    if (!userId) return; // Skip if userId is not available
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:4000/user-clean/${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response data exists
      if (response.data) {
        console.log(response.data);
        setCleans(response.data.cleanRecords);
        setError(null);
        console.log("Cleans fetched successfully:", response.data); // Optional: Debug log
      } else {
        throw new Error("No data found in the response.");
      }
    } catch (error) {
      // Extract error details
      let errorMessage = "An unexpected error occurred.";

      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.error(
          "Server responded with an error:",
          error.response.status,
          error.response.data
        );
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server:", error.request);
        errorMessage =
          "No response received from the server. Please check your network.";
      } else {
        // An error occurred during the setup of the request
        console.error("Error setting up the request:", error.message);
        errorMessage = error.message;
      }

      // Update state
      setCleans([]);
      setError(errorMessage);
    }
  }, [userId]);

  const fetchAllCleans = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:4000/cleans`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response data exists
      if (response.data) {
        console.log(response.data);
        setAllCleans(response.data.cleanRecords);
        setError(null);
        console.log("All Cleans fetched successfully:", response.data); // Optional: Debug log
      } else {
        throw new Error("No data found in the response.");
      }
    } catch (error) {
      // Extract error details
      let errorMessage = "An unexpected error occurred.";

      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.error(
          "Server responded with an error:",
          error.response.status,
          error.response.data
        );
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server:", error.request);
        errorMessage =
          "No response received from the server. Please check your network.";
      } else {
        // An error occurred during the setup of the request
        console.error("Error setting up the request:", error.message);
        errorMessage = error.message;
      }

      // Update state
      setAllCleans([]);
      setError(errorMessage);
    }
  }, []);

  // Effect to fetch userId on mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Effect to fetch cleans when userId changes
  useEffect(() => {
    if (userId) {
      fetchCleans();
      fetchAllCleans();
    }
  }, [userId, fetchCleans]);

  // GSAP animations
  useEffect(() => {
    gsap
      .timeline()
      .fromTo(
        ".dashboard-container118",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.1 }
      )
      .fromTo(
        ".dashboard-container121",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, delay: 0.0, duration: 0.1 }
      )
      .fromTo(
        ".dashboard-container160",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, delay: 0.0, duration: 0.1 }
      )
      .fromTo(
        ".dashboard-container164",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, delay: 0.0, duration: 0.1 }
      )
      .fromTo(
        ".dashboard-text207",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, delay: 0.0, duration: 0.1 }
      )
      .fromTo(
        ".dashboard-container193",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, delay: 0.0, duration: 0.1 }
      );
  }, []);

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
      // opacity: 0.8,
      background: "rgba(250,250,250,0.7)",
      // borderRadius:'100%',
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveFade = (button) => {
    gsap.to(button, {
      background: "rgba(250,250,250,0)",
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleMouseEnterFadeY = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      background: "rgba(250,250,250,0.7)",
      // borderRadius:'100%',
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveFadeY = (button) => {
    gsap.to(button, {
      background: "#FFE2D0",
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

  const handleMouseEnterFadex = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      background: "rgba(0,0,0,0.1)",
      // borderRadius:'100%',
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveFadex = (button) => {
    gsap.to(button, {
      background: "rgba(250,250,250,0)",
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const sortedCleans = [...cleans].sort((a, b) => {
    const dateA = moment(a.date, "DD/MM/YYYY").toDate();
    const dateB = moment(b.date, "DD/MM/YYYY").toDate();
    return dateA - dateB; // ascending
  });

  const upcomingClean = sortedCleans.find((clean) => {
    const cleanDate = moment(clean.date, "DD/MM/YYYY").toDate();
    return cleanDate >= new Date(); // only future or today
  });

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [cancelCleanId, setCancelCleanId] = useState(null);

  return (
    <div className="dashboard-container100">
      {booking && <BookingPopup onClose={() => setBooking(false)} />}
      {editClean && upcomingClean && (
        <UpdateClean
          cleanId={upcomingClean._id}
          onClose={() => setEditClean(false)}
        />
      )}
      {showCancelPopup && upcomingClean && (
        <CancelBookingPopup
          cleanId={upcomingClean._id}
          onClose={() => setShowCancelPopup(false)}
          onCancelSuccess={fetchCleans} // refetch cleans after deletion
        />
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
        <title>dashboard - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="dashboard - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      <div className="dashboard-container101">
        <Link to="/">
          {" "}
          <img
            alt="image"
            src={require("./img/logo-200h.png")}
            className="dashboard-image10"
          />
        </Link>
        <div className="dashboard-container102">
          <span className="dashboard-text100">OVERVIEW</span>
          <div className="dashboard-container103">
            <img
              alt="image"
              src={require("./img/homep-200h.png")}
              className="dashboard-image11"
            />
            <span className="dashboard-text101">Dashboard</span>
          </div>
          <Link to="/schedule" className="dashboard-navlink10">
            <div className="dashboard-container104">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="dashboard-image12"
              />
              <span
                className="dashboard-text102"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Schedule
              </span>
            </div>
          </Link>
          <Link to="/referral" className="dashboard-navlink11">
            <div className="dashboard-container105">
              <img
                alt="image"
                src={require("./img/link-200h.png")}
                className="dashboard-image13"
              />
              <span
                className="dashboard-text103"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Referrals
              </span>
            </div>
          </Link>
          <Link to="/reward" className="dashboard-navlink12">
            <div className="dashboard-container106">
              <img
                alt="image"
                src={require("./img/lock1-200h.png")}
                className="dashboard-image14"
              />
              <span
                className="dashboard-text104"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Rewards
              </span>
            </div>
          </Link>
          <Link to="/cleanerspass" className="dashboard-navlink13">
            <div className="dashboard-container107">
              <img
                alt="image"
                src={require("./img/key-200h.png")}
                className="dashboard-image15"
              />
              <span
                className="dashboard-text105"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Cleaner's Pass
              </span>
            </div>
          </Link>
        </div>
        <div className="dashboard-container108">
          <span className="dashboard-text106">SETTINGS</span>
          <Link to="/settings" className="dashboard-navlink14">
            <div className="dashboard-container109">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="dashboard-image16"
              />
              <span
                className="dashboard-text107"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Settings
              </span>
            </div>
          </Link>
          <div
            onClick={() => setShowLogoutPopup(true)}
            className="dashboard-container110"
          >
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="dashboard-image17"
            />
            <span className="dashboard-text108">Logout</span>
          </div>
        </div>
      </div>
      <div className="dashboard-container111">
        <div className="dashboard-container112">
          <span className="dashboard-text109">Dashboard</span>
          <div className="dashboard-container113">
            <img
              alt="image"
              src={require("./img/question-200h.png")}
              className="dashboard-image18"
            />
            <div
              className="dashboard-container114"
              onMouseEnter={(e) => SearchColorit(e.currentTarget)}
              onMouseLeave={(e) => SearchunColorit(e.currentTarget)}
            >
              <img
                alt="image"
                src={require("./img/search-200h.png")}
                className="dashboard-image19"
              />
              <span className="dashboard-text110">Search for anything...</span>
              <input type="text" className="dashboard-textinput input" />
            </div>
          </div>
          <div
            className="dashboard-container115"
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            onClick={() => setBooking(true)}
          >
            <span className="dashboard-text111">Book Now</span>
          </div>
          <Link to="/settingsroom" className="dashboard-navlink15">
            <img
              alt="image"
              src={require("./img/setting-200h.png")}
              className="dashboard-image20"
            />
          </Link>
        </div>
        <div className="dashboard-container116">
          <div className="dashboard-container117">
            <div className="dashboard-container118">
              <div className="dashboard-container119">
                <span className="dashboard-text112">
                  Upcoming: {Next ? Next.date : "No upcoming cleans"}
                </span>
                <span className="dashboard-text113">
                  <br />
                  <span>
                    Scheduled for
                    {Next && (
                      <span>
                        {" "}
                        "
                        {Next.typeOfClean == 280
                          ? "Vacant"
                          : Next.typeOfClean == 135
                          ? "Deep"
                          : Next.typeOfClean == 45
                          ? "Regular"
                          : "Unknown"}{" "}
                        Clean"
                      </span>
                    )}
                  </span>
                </span>
              </div>

              <div className="dashboard-container120">
                <button
                  type="button"
                  className="dashboard-button1 button"
                  onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  onClick={() => {
                    setCancelCleanId(Next?.id);
                    setShowCancelPopup(true);
                  }}
                >
                  Request cancellation
                </button>

                <button
                  type="button"
                  className="dashboard-button2 button"
                  onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  onClick={() => {
                    setSelectedCleanId(Next?.id);
                    setEditClean(true);
                  }}
                >
                  Edit booking
                </button>
              </div>
            </div>
            <span className="dashboard-text116">
              <span className="dashboard-text117">Cleaning History</span>
              <br></br>
            </span>
            <div className="dashboard-container121">
              <div
                id="custom-scroll"
                className="custom-scroll dashboard-container122"
              >
                {error ? (
                  <p style={{ color: "red" }}>{error}</p>
                ) : cleans.length > 0 ? (
                  <>
                    {cleans.map((clean) => (
                      // <div>
                      //   Clean ID: {clean.typeOfClean}, Bathroom: {clean.bathroom}, Kitchen: {clean.kitchen}, Bedroom: {clean.rooms},
                      // </div>
                      <div
                        key={clean.id}
                        className="dashboard-container123"
                        onMouseEnter={(e) =>
                          handleMouseEnterFade(e.currentTarget)
                        }
                        onMouseLeave={(e) =>
                          handleMouseLeaveFade(e.currentTarget)
                        }
                      >
                        <div className="dashboard-container124">
                          <div className="dashboard-container125">
                            <div className="dashboard-container126">
                              <img
                                alt="image"
                                src={require("./img/medal_x-200h.png")}
                                className="dashboard-image21"
                              />
                              <div className="dashboard-container127">
                                <div className="dashboard-container128"></div>
                              </div>
                            </div>
                            <span className="dashboard-text119">
                              {clean.typeOfClean == 280 ? "Vacant" : null}
                              {clean.typeOfClean == 135 ? "Deep" : null}
                              {clean.typeOfClean == 45 ? "Regular" : null} clean
                            </span>
                          </div>
                          <div className="dashboard-container129">
                            <span className="dashboard-text120">
                              {clean.completed ? "Completed" : "In Progress..."}
                            </span>
                            <span className="dashboard-text121">
                              <span>
                                {clean.typeOfClean == 280 ? "Vacant" : null}
                                {clean.typeOfClean == 135 ? "Deep" : null}
                                {clean.typeOfClean == 45
                                  ? "Regular"
                                  : null}{" "}
                                clean
                              </span>
                              <br></br>
                              <span>
                                {clean.bathroom}X Bathroom, {clean.kitchen}X
                                Kitchen, {clean.rooms}X Bedroom,...
                              </span>
                            </span>
                          </div>
                        </div>
                        {clean.completed ? (
                          <img
                            alt="image"
                            src={require("./img/click-400h.png")}
                            className="dashboard-image24"
                          />
                        ) : (
                          <img
                            alt="image"
                            src={require("./img/progressbadge-400h.png")}
                            className="dashboard-image22"
                          />
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div
                    className="dashboard-container123"
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  >
                    <div className="dashboard-container124">
                      <div className="dashboard-container125">
                        <div className="dashboard-container126">
                          <img
                            alt="image"
                            src={require("./img/medal_x-200h.png")}
                            className="dashboard-image21"
                          />
                          <div className="dashboard-container127">
                            <div className="dashboard-container128"></div>
                          </div>
                        </div>
                        <span className="dashboard-text119">no clean type</span>
                      </div>
                      <div className="dashboard-container129">
                        <span className="dashboard-text120">no status</span>
                        <span className="dashboard-text121">
                          <span>no booked clean</span>
                          <br></br>
                          <span>no room data</span>
                        </span>
                      </div>
                    </div>

                    <img
                      alt="image"
                      src={require("./img/progressbadge-400h.png")}
                      className="dashboard-image22"
                    />
                  </div>
                )}
                {/* <div className="dashboard-container123" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)} onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                  <div className="dashboard-container124">
                    <div className="dashboard-container125">
                      <div className="dashboard-container126">
                        <img
                          alt="image"
                          src={require("./img/medal_x-200h.png")}
                          className="dashboard-image21"
                        />
                        <div className="dashboard-container127">
                          <div className="dashboard-container128"></div>
                        </div>
                      </div>
                      <span className="dashboard-text119">Deep clean</span>
                    </div>
                    <div className="dashboard-container129">
                      <span className="dashboard-text120">In Progress...</span>
                      <span className="dashboard-text121">
                        <span>Deep clean</span>
                        <br></br>
                        <span>
                          1X Bathroom, 1X Kitchen, 3X Bedroom, 2X Toilet
                        </span>
                      </span>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/progressbadge-400h.png")}
                    className="dashboard-image22"
                  />
                </div>
                <div className="dashboard-container130"  onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)} onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                  <div className="dashboard-container131">
                    <div className="dashboard-container132">
                      <div className="dashboard-container133">
                        <img
                          alt="image"
                          src={require("./img/medal_x-200h.png")}
                          className="dashboard-image23"
                        />
                        <div className="dashboard-container134">
                          <div className="dashboard-container135"></div>
                        </div>
                      </div>
                      <span className="dashboard-text125">Vacant clean</span>
                    </div>
                    <div className="dashboard-container136">
                      <span className="dashboard-text126">Completed</span>
                      <span className="dashboard-text127">
                        <span>Vacate Clean</span>
                        <br></br>
                        <span>1X Bathroom, 1X Kitchen, 5X Bedroom</span>
                      </span>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/click-400h.png")}
                    className="dashboard-image24"
                  />
                </div>
                <div className="dashboard-container137"  onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)} onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                  <div className="dashboard-container138">
                    <div className="dashboard-container139">
                      <div className="dashboard-container140">
                        <img
                          alt="image"
                          src={require("./img/medal_x-200h.png")}
                          className="dashboard-image25"
                        />
                        <div className="dashboard-container141">
                          <div className="dashboard-container142"></div>
                        </div>
                      </div>
                      <span className="dashboard-text131">Vacant clean</span>
                    </div>
                    <div className="dashboard-container143">
                      <span className="dashboard-text132">Completed</span>
                      <span className="dashboard-text133">
                        <span>Vacate Clean</span>
                        <br></br>
                        <span>1X Bathroom, 1X Kitchen, 5X Bedroom</span>
                      </span>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/click-400h.png")}
                    className="dashboard-image26"
                  />
                </div>
                <div className="dashboard-container144"  onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)} onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                  <div className="dashboard-container145">
                    <div className="dashboard-container146">
                      <div className="dashboard-container147">
                        <img
                          alt="image"
                          src={require("./img/medal_x-200h.png")}
                          className="dashboard-image27"
                        />
                        <div className="dashboard-container148">
                          <div className="dashboard-container149"></div>
                        </div>
                      </div>
                      <span className="dashboard-text137">Vacant clean</span>
                    </div>
                    <div className="dashboard-container150">
                      <span className="dashboard-text138">Completed</span>
                      <span className="dashboard-text139">
                        <span>Vacate Clean</span>
                        <br></br>
                        <span>1X Bathroom, 1X Kitchen, 5X Bedroom</span>
                      </span>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/click-400h.png")}
                    className="dashboard-image28"
                  />
                </div>
                <div className="dashboard-container151"  onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)} onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                  <div className="dashboard-container152">
                    <div className="dashboard-container153">
                      <div className="dashboard-container154">
                        <img
                          alt="image"
                          src={require("./img/medal_x-200h.png")}
                          className="dashboard-image29"
                        />
                        <div className="dashboard-container155">
                          <div className="dashboard-container156"></div>
                        </div>
                      </div>
                      <span className="dashboard-text143">Vacant clean</span>
                    </div>
                    <div className="dashboard-container157">
                      <span className="dashboard-text144">Completed</span>
                      <span className="dashboard-text145">
                        <span>Vacate Clean</span>
                        <br></br>
                        <span>1X Bathroom, 1X Kitchen, 5X Bedroom</span>
                      </span>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/click-400h.png")}
                    className="dashboard-image30"
                  />
                </div> */}
              </div>
              <div className="dashboard-container158">
                <span className="dashboard-text149">View all</span>
              </div>
            </div>
            <div className="dashboard-container159">
              <span className="dashboard-text150">
                <span>Upcoming</span>
                <br></br>
              </span>
            </div>
            <div className="text-lg uc-text text-gray-500 font-semibold mb-1">
              Upcoming
            </div>
            <div className="dashboard-container160">
              {upcomingClean ? (
                <div className="google-style-clean-card">
                  <div className="font-medium text-slate-600 text-md mb-1">
                    {upcomingClean.date}
                  </div>
                  <div className="uc">
                    <div className="uc-border"></div>
                    {cleanType(upcomingClean.typeOfClean)}
                  </div>
                  <small className="uc-date">
                    {upcomingClean.date.split("/")[2]}
                  </small>
                </div>
              ) : (
                <div className="google-style-clean-card">
                  <div className="font-medium text-slate-600 text-md mb-1">
                    No upcoming clean
                  </div>
                  <div className="uc">
                    <div className="uc-border"></div>
                    No clean type
                  </div>
                  <small className="uc-date">No year</small>
                </div>
              )}
              <Link
                to="/schedule"
                className="dashboard-container161"
                onMouseEnter={(e) => handleMouseEnterFadeY(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadeY(e.currentTarget)}
              >
                <div className="dashboard-text153">
                  <span>View Full Calender </span>
                  <img
                    alt="image"
                    src={require("./img/arrow-200w.png")}
                    className="dashboard-image31"
                  />
                </div>
              </Link>

              <Link
                to="/schedule"
                className="dashboard-container162"
                onMouseEnter={(e) => handleMouseEnterFadeY(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadeY(e.currentTarget)}
              >
                <span className="dashboard-text155">
                  <span className="dashboard-text156">View Full Calender</span>
                  <br></br>
                </span>
              </Link>
            </div>
          </div>
          <span className="dashboard-text158">
            Invite Friends
            <span
              dangerouslySetInnerHTML={{
                __html: " ",
              }}
            />
          </span>
          <span className="dashboard-text159">
            <span className="dashboard-text160">What's New?</span>
            <br></br>
          </span>

          <div className="dashboard-container163">
            <span className="dashboard-text162">What's New</span>
            <div className="dashboard-container164">
              <span className="dashboard-text163">What's New</span>
              <div id="custom-scroll" className="dashboard-container165">
                {allCleans?.length > 0 ? (
                  allCleans.map((record) => (
                    <div
                      key={record._id}
                      className="dashboard-container166"
                      onMouseEnter={(e) =>
                        handleMouseEnterFadex(e.currentTarget)
                      }
                      onMouseLeave={(e) =>
                        handleMouseLeaveFadex(e.currentTarget)
                      }
                    >
                      <div className="dashboard-container167"></div>
                      <div className="dashboard-container168">
                        <span className="dashboard-text164">
                          New clean booked for {record.rooms} room(s) with
                          pet(s): {record.pet}
                        </span>
                        <span className="dashboard-text165">
                          {record.typeOfClean == 280 ? "Vacant" : null}
                          {record.typeOfClean == 135 ? "Deep" : null}
                          {record.typeOfClean == 45 ? "Regular" : null} Clean |
                          Status: {record.completed ? "Completed" : "Pending"}
                        </span>
                        <span className="dashboard-text166">
                          <span>{record.getinside} | </span>
                          <span className="dashboard-text168">
                            {record.date}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-slate-600">It's quiet for now.</div>
                )}
              </div>
            </div>

            <span className="dashboard-text207">
              Invite friends
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <div className="dashboard-container193">
              <div className="dashboard-container194">
                <span className="dashboard-text208">Refer a Friend</span>
                <span className="dashboard-text209">
                  And earn rewards back on all their transactions
                </span>
                <span className="dashboard-text210">How it works</span>
                <div className="dashboard-container195">
                  <div className="dashboard-container196">
                    <div className="dashboard-container197">
                      <span className="dashboard-text211">1</span>
                    </div>
                    <span className="dashboard-text212">
                      <span className="dashboard-text213">
                        Invite your friends
                      </span>
                      <br className="dashboard-text214"></br>
                      <span className="dashboard-text215">
                        share the code with them
                      </span>
                    </span>
                  </div>
                  <div className="dashboard-container198">
                    <div className="dashboard-container199">
                      <span className="dashboard-text216">2</span>
                    </div>
                    <span className="dashboard-text217">
                      <span className="dashboard-text218">
                        They initiate any transaction
                      </span>
                      <br className="dashboard-text219"></br>
                      <span className="dashboard-text220">
                        then you both get 20% OFF next 3 cleans
                      </span>
                    </span>
                  </div>
                </div>
                <Link
                  to="/referral"
                  className="dashboard-container200"
                  onMouseEnter={(e) => handleMouseEnterFadeY(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeaveFadeY(e.currentTarget)}
                >
                  <span className="dashboard-text221">Your Referral Code</span>
                  <img
                    alt="image"
                    src={require("./img/arrow-200w.png")}
                    className="dashboard-image31"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Menu />
      <div className="dashboard-container207"></div>
    </div>
  );
};

export default Dashboard;
