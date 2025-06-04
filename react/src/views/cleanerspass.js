import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import { Helmet } from "react-helmet";

import "./cleanerspass.css";
import Menu from "./menu";
import Popclearn from "../components/popclearn";
import BookingPopup from "../components/BookingPopup";
import UpdateClean from "../components/UpdateClean";

const Cleanerspass = (props) => {
  // Sliders
  const [sliderValue, setSliderValue] = useState(0);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const handleSliderChange = (value) => {
    setSliderValue(value);
    setTotalSliders(value + sliderValueO + sliderValueOX + sliderValueK);
    sumUp(value + sliderValueO + sliderValueOX + sliderValueK);
  };

  const [sliderValueK, setSliderValueK] = useState(0);

  const handleSliderChangeK = (value) => {
    setSliderValueK(value);
    setTotalSliders(value + sliderValueO + sliderValueOX + sliderValue);
    sumUp(value + sliderValueO + sliderValueOX + sliderValue);
  };

  const [sliderValueO, setSliderValueO] = useState(0);

  const handleSliderChangeO = (value) => {
    setSliderValueO(value);
    setTotalSliders(value + sliderValueK + sliderValueOX + sliderValue);
    sumUp(value + sliderValueK + sliderValueOX + sliderValue);
  };

  const [sliderValueOX, setSliderValueOX] = useState(1);
  const [totalSliders, setTotalSliders] = useState(0);

  const handleSliderChangeOX = (value) => {
    setSliderValueOX(value);
    setTotalSliders(value + sliderValueK + sliderValueO + sliderValue);
    sumUp(value + sliderValueK + sliderValueO + sliderValue);
  };

  const sumUp = (value) => {
    setTotalSwitch(value);
    defValue = value;
  };

  const [cleanerPass, setcleanerPass] = useState(true);
  const changeClean = () => {
    setcleanerPass(!cleanerPass);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    left: "Week",
    right: "15% OFF",
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = [
    { left: "Week", right: "15% OFF" },
    { left: "Forthnight", right: "10% OFF" },
    { left: "Month", right: "5% OFF" },
  ];

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

  const handleMouseEnterFadexy = (button) => {
    gsap.to(button, {
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveFadexy = (button) => {
    gsap.to(button, {
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

  const handleMouseEnterZ = (button) => {
    gsap.to(button, {
      borderColor: "#FF914D",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveZ = (button) => {
    gsap.to(button, {
      borderColor: "#515151",
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

  const [cancelScreen, setCancelScreen] = useState(false);
  const CancelScreen = () => {
    setCancelScreen(true);
  };

  const CloseCancelScreen = () => {
    setCancelScreen(false);
  };

  useEffect(() => {
    gsap.fromTo(
      ".cleanerspass-container32",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );
    gsap.fromTo(
      ".cleanerspass-container33",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5, duration: 0.5 }
    );
    gsap.fromTo(
      ".cleanerspass-text30",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.6, duration: 0.5 }
    );
    gsap.fromTo(
      ".cleanerspass-container51",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.8, duration: 0.5 }
    );

    gsap.fromTo(
      ".cleanerspass-container40",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, delay: 1, duration: 0.5 }
    );
    gsap.fromTo(
      ".cleanerspass-container42",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, delay: 1.2, duration: 0.5 }
    );
    gsap.fromTo(
      ".cleanerspass-container44",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, delay: 1.4, duration: 0.5 }
    );
    gsap.fromTo(
      ".cleanerspass-container47",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, delay: 1.6, duration: 0.5 }
    );
    gsap.fromTo(
      ".cleanerspass-container49",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, delay: 1.8, duration: 0.5 }
    );

    //    cleanerspass-container40
  }, []);

  const SummaryRef = useRef(null);
  const [Total, setTotal] = useState(172);
  const [intervalValue, setIntervalValue] = useState(0);

  const [MyDate, setMyDate] = useState("12/08/2023");

  const setSelectedDate = (formattedDate) => {
    setMyDate(formattedDate);
  };

  const [timeFrame, settimeFrame] = useState(8);

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

  const [CleanType, setCleanType] = useState(true);
  const [windows, setWindows] = useState(0);
  const [walls, setwalls] = useState(0);
  const [Cabinets, setCabinets] = useState(0);
  const [blind, setblind] = useState(0);
  const [organization, setorganization] = useState(0);
  const [stovetop, setstovetop] = useState(0);
  const [fridge, setfridge] = useState(0);
  const [Dishwasher, setDishwasher] = useState(0);
  const [garage, setgarage] = useState(0);
  const [microwave, setmicrowave] = useState(0);
  const [Laundry, setLaundry] = useState(0);
  const [tiles, settiles] = useState(0);
  const [discount, setDiscount] = useState(Total);
  const [CleanP, setCleanP] = useState(false);

  const [discountAmount, setDiscountAmount] = useState(0);
  const inputTextRef = useRef(null);
  const [discountNew, setDiscountNew] = useState(discount);

  const handleApplyClick = () => {
    // Get the value from the text input
    const inputValue = inputTextRef.current.value.toUpperCase(); // Using ref to access the input value// Convert to uppercase for case-insensitivity

    // Check if the input value is "PERCENT20"
    if (inputValue === "PERCENT20") {
      // Divide the total by 20%
      const result = ((100 - 20) / 100) * discount; // 20% is equivalent to 0.2
      setDiscountAmount(20);
      setDiscountNew(result.toFixed(2));
      console.log(`Result after dividing by 20%: ${result}`);
    } else {
      // Reset the state if the input value is not "PERCENT20"
      setDiscountAmount(0);
      setDiscount(0);
      console.log('Input value is not "PERCENT20".');
    }
  };

  let disPerAmount = (discountAmount / 100) * discount;
  disPerAmount = disPerAmount.toFixed(2);

  let discountTotal = discount;
  // discountTotal = discountTotal.toFixed(2);

  const handleMouseEnterAX = (button) => {
    gsap.to(button, {
      scale: 1.05,
      opacity: 0.9,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveAX = (button) => {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnterAXY = (button) => {
    gsap.to(button, {
      borderColor: "#BABABA",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveAXY = (button) => {
    gsap.to(button, {
      borderColor: "#FF914D",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const [sum, setSum] = useState(false);

  useEffect(() => {
    if (sum == true) {
      // SummaryRef.current.style.display = "block";
      // SummaryRef.current.style.bottom = "-0%";
      gsap.to(".home-container209Set", {
        display: "block",
        bottom: "8%",
        borderWidth: 0,
        ease: "power1",
        duration: 1,
      });
      gsap.to(".home-container210x", {
        opacity: 0,
        ease: "power1",
        duration: 1,
      });
    } else {
      // SummaryRef.current.style.display = "block";
      // SummaryRef.current.style.bottom = "-0%";
      // gsap.to(".home-container209Set",{
      //   display:'block',
      //   bottom:"0%",
      //   borderWidth:0
      // });
      // home-container210
      gsap.to(".home-container209Set", {
        display: "block",
        bottom: "-77%",
        ease: "power1",
        duration: 1,
      });
      gsap.to(".home-container210x", {
        opacity: 1,
        ease: "power1.out",
        duration: 1,
      });
    }
  }, [[setSum, sum]]);

  useEffect(() => {
    let bathrom = 30 * sliderValue;
    let kitch = 45 * sliderValueK;
    let oth = 20 * sliderValueO;
    let rooms = 20 * sliderValueOX;
    let total = bathrom + kitch + oth + rooms;
    total = ((100 - intervalValue) / 100) * total;
    setDiscount(total);
    setDiscountNew(total);
    total = total.toFixed(2);
    setTotal(total);
  }, [
    setTotal,
    intervalValue,
    Total,
    sliderValue,
    sliderValueK,
    sliderValueO,
    sliderValueOX,
  ]);

  return (
    <div className="cleanerspass-container10">
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

      {showBooking && <BookingPopup onClose={() => setShowBooking(false)} />}
      {showUpdate && <UpdateClean onClose={() => setShowUpdate(false)} />}
      <Helmet>
        <title>cleanerspass - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="cleanerspass - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      {cancelScreen ? (
        <Popclearn CloseCancelScreen={CloseCancelScreen} />
      ) : null}
      <div className="cleanerspass-container11">
        <Link to="/">
          <img
            alt="image"
            src={require("./img/logo-200h.png")}
            className="cleanerspass-image10"
          />
        </Link>
        <div className="cleanerspass-container12">
          <span className="cleanerspass-text10">OVERVIEW</span>
          <Link to="/dashboard" className="cleanerspass-navlink10">
            <div className="cleanerspass-container13">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="cleanerspass-image11"
              />
              <span
                className="cleanerspass-text11"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Dashboard
              </span>
            </div>
          </Link>
          <Link to="/schedule" className="cleanerspass-navlink11">
            <div className="cleanerspass-container14">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="cleanerspass-image12"
              />
              <span
                className="cleanerspass-text12"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Schedule
              </span>
            </div>
          </Link>
          <Link to="/referral" className="cleanerspass-navlink12">
            <div className="cleanerspass-container15">
              <img
                alt="image"
                src={require("./img/link-200h.png")}
                className="cleanerspass-image13"
              />
              <span
                className="cleanerspass-text13"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Referrals
              </span>
            </div>
          </Link>
          <Link to="/reward" className="cleanerspass-navlink13">
            <div className="cleanerspass-container16">
              <img
                alt="image"
                src={require("./img/lock1-200h.png")}
                className="cleanerspass-image14"
              />
              <span
                className="cleanerspass-text14"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Rewards
              </span>
            </div>
          </Link>
          <div className="cleanerspass-container17">
            <img
              alt="image"
              src={require("./img/key-200h.png")}
              className="cleanerspass-image15"
            />
            <span className="cleanerspass-text15">Cleaner's Pass</span>
          </div>
        </div>
        <div className="cleanerspass-container18">
          <span className="cleanerspass-text16">SETTINGS</span>
          <Link to="/settings" className="cleanerspass-navlink14">
            <div className="cleanerspass-container19">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="cleanerspass-image16"
              />
              <span
                className="cleanerspass-text17"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Settings
              </span>
            </div>
          </Link>
          <div
            onClick={() => setShowLogoutPopup(true)}
            className="cleanerspass-container20"
          >
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="cleanerspass-image17"
            />
            <span className="cleanerspass-text18">Logout</span>
          </div>
        </div>
      </div>
      <div className="cleanerspass-container21">
        <span className="cleanerspass-text19">Cleaner&apos;s Pass</span>
        <div className="cleanerspass-container22">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="cleanerspass-image18"
          />
          <div className="cleanerspass-container23">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="cleanerspass-image19"
            />
            <span className="cleanerspass-text20">Search for anything...</span>
            <input type="text" className="cleanerspass-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="cleanerspass-image20"
          />
        </Link>
        <div
          className="cleanerspass-container24"
          onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          onClick={() => setShowBooking(true)}
        >
          <span className="cleanerspass-text21">Book Now</span>
        </div>
      </div>
      <div className="cleanerspass-container25">
        <div className="cleanerspass-container26">
          <span className="cleanerspass-text22">Cleaner&apos;s Pass</span>
          <div className="cleanerspass-container27">
            <img
              alt="image"
              src={require("./img/question-200h.png")}
              className="cleanerspass-image21"
            />
            <div
              className="cleanerspass-container28"
              onMouseEnter={(e) => SearchColorit(e.currentTarget)}
              onMouseLeave={(e) => SearchunColorit(e.currentTarget)}
            >
              <img
                alt="image"
                src={require("./img/search-200h.png")}
                className="cleanerspass-image22"
              />
              <span className="cleanerspass-text23">
                Search for anything...
              </span>
              <input type="text" className="cleanerspass-textinput2 input" />
            </div>
          </div>
          <div
            className="cleanerspass-container29"
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            onClick={() => setShowBooking(true)}
          >
            <span className="cleanerspass-text24">Book Now</span>
          </div>
          <Link to="/settings" className="cleanerspass-navlink16">
            <img
              alt="image"
              src={require("./img/setting-200h.png")}
              className="cleanerspass-image23"
            />
          </Link>
        </div>
        <div className="cleanerspass-container30">
          <div className="cleanerspass-container31">
            <div className="cleanerspass-container32">
              <span className="cleanerspass-text25">
                Earn rewards. Save more. Cancel anytime.
              </span>
              <span className="cleanerspass-text26">
                Upgrade to our Cleaner’s Pass to gain access to more features
              </span>
            </div>
            <div className="cleanerspass-container33">
              <div className="cleanerspass-container34">
                <span className="cleanerspass-text27">
                  Level up your cleaning experience with the Cleaners Pass
                </span>
                <span className="cleanerspass-text28">
                  Exclusive access to premium features across your cleaning
                  experience.
                </span>
              </div>
              {cleanerPass ? (
                <span className="cleanerspass-navlink17" onClick={changeClean}>
                  <div
                    className="cleanerspass-container35"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <span className="cleanerspass-text29">Upgrade</span>
                  </div>
                </span>
              ) : (
                <span onClick={changeClean} className="cleanerspass2-navlink18">
                  <div
                    className="cleanerspass2-container35"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <span className="cleanerspass2-text29">
                      <span>View</span>
                      <br></br>
                    </span>
                  </div>
                </span>
              )}
            </div>
            <div className="cleanerspass-container36">
              <div className="cleanerspass-container37">
                <span className="cleanerspass-text30">
                  Why schedule regular cleans?
                </span>
                <div className="cleanerspass-container38">
                  <div className="cleanerspass-container39">
                    <div className="cleanerspass-container40">
                      <div className="cleanerspass-container41"></div>
                      <span className="cleanerspass-text31">
                        <span className="cleanerspass-text32">
                          Massive Savings
                        </span>
                        <br className="cleanerspass-text33"></br>
                        <span>
                          Maintain a clean home, for cheaper!
                          <span
                            dangerouslySetInnerHTML={{
                              __html: " ",
                            }}
                          />
                        </span>
                      </span>
                    </div>
                    <div className="cleanerspass-container42">
                      <div className="cleanerspass-container43"></div>
                      <span className="cleanerspass-text35">
                        <span className="cleanerspass-text36">
                          Earn Rewards
                        </span>
                        <br className="cleanerspass-text37"></br>
                        <span>
                          Reach milestones and earn greater discounts...for
                          life!
                          <span
                            dangerouslySetInnerHTML={{
                              __html: " ",
                            }}
                          />
                        </span>
                      </span>
                    </div>
                    <div className="cleanerspass-container44">
                      <div className="cleanerspass-container45"></div>
                      <span className="cleanerspass-text39">
                        <span className="cleanerspass-text40">
                          Maintain Cleanliness
                        </span>
                        <br className="cleanerspass-text41"></br>
                        <span>
                          We’ll take it from here! Our ongoing service allows
                          you to forget about cleaning, and ensure your home is
                          always pristine.
                          <span
                            dangerouslySetInnerHTML={{
                              __html: " ",
                            }}
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="cleanerspass-container46">
                    <div className="cleanerspass-container47">
                      <div className="cleanerspass-container48"></div>
                      <span className="cleanerspass-text43">
                        <span className="cleanerspass-text44">No Lock In</span>
                        <br className="cleanerspass-text45"></br>
                        <span>
                          We understand when circumstances change. Cancel at any
                          time!
                        </span>
                      </span>
                    </div>
                    <div className="cleanerspass-container49">
                      <div className="cleanerspass-container50"></div>
                      <span className="cleanerspass-text47">
                        <span className="cleanerspass-text48">Flexibility</span>
                        <br className="cleanerspass-text49"></br>
                        <span>
                          We will get to know you, and adjust accordingly!
                          Reschedule at your convenience.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {cleanerPass ? (
                <div className="cleanerspass-container51">
                  <div className="cleanerspass-container52">
                    <div className="cleanerspass-container53">
                      <div className="cleanerspass-container54">
                        <span className="cleanerspass-text51">Inactive</span>
                      </div>
                    </div>
                  </div>
                  <div className="cleanerspass-container55">
                    <div className="cleanerspass-container56">
                      <span className="cleanerspass-text52">Every:</span>
                      {/* <select className="cleanerspass-select1">
                      <option value="Week">Week</option>
                      <option value="Fortnight">Fortnight</option>
                      <option value="Month">Month</option>
                    </select> */}
                      <div
                        className="cleanerspass2-select1x"
                        onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                        onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                      >
                        <button
                          onClick={toggleDropdown}
                          className="dropdown-toggle"
                        >
                          <span className="dropdown-left">
                            {selectedOption.left}
                          </span>
                          <span className="dropdown-right">
                            <span>{selectedOption.right}</span>
                            <span
                              className="dropdown-arrow"
                              style={{ marginLeft: "10px" }}
                            >
                              {/* ▼ */}
                              <img
                                alt="drop"
                                src={require("./img/down-chevron.png")}
                                style={{ width: "10px" }}
                              />
                              {/* down-chevron.png */}
                            </span>
                          </span>
                        </button>
                        {isOpen && (
                          <ul className="dropdown-menu">
                            {options.map((option, index) => (
                              <li
                                key={index}
                                onClick={() => selectOption(option)}
                                className="dropdown-item"
                              >
                                <span className="dropdown-left">
                                  {option.left}
                                </span>
                                <span className="dropdown-right">
                                  {option.right}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="cleanerspass-container57">
                      <span className="cleanerspass-text53">On:</span>
                      <select
                        className="cleanerspass-select2"
                        onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                        onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                      >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                    <button
                      onClick={() => setShowBooking(true)}
                      type="button"
                      className="cleanerspass-button button"
                      onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                      Schedule
                    </button>
                  </div>
                  {/* <div className="cleanerspass-container58">
                  <div className="cleanerspass-container59">
                    <div className="cleanerspass-container60">
                      <span className="cleanerspass-text54">
                        Cleaning Summary
                      </span>
                      <img
                        alt="image"
                        src={require("./img/down arrow-200h.png")}
                        className="cleanerspass-image24"
                      />
                    </div>
                    <span className="cleanerspass-text55">
                      Have a discount code?
                    </span>
                  </div>
                  <span className="cleanerspass-text56">
                    <span>
                      Total
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <span className="cleanerspass-text58">$172.99</span>
                  </span>
                </div> */}
                  <div className="home-container209Set" ref={SummaryRef}>
                    <div className="home-container210x">
                      <div
                        className="home-container211"
                        // onClick={() => setSum(true)}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        <span className="home-text132Set">
                          Cleaning Summary{" "}
                          <img
                            src="/img/UPARROW.png"
                            style={{
                              width: "12px",
                              height: "7px",
                              marginLeft: "10px",
                            }}
                          />
                        </span>
                        <span className="home-text133Set">
                          Have a Discount Code?
                        </span>
                      </div>
                      <div className="home-text134Set">
                        <span className="home-text135">Total </span>
                        <span>
                          {" "}
                          $0.00
                          {intervalValue > 0 ? (
                            <span>
                              {"(-"}
                              {intervalValue}%{")"}
                            </span>
                          ) : null}
                        </span>
                      </div>
                    </div>

                    <div className="home-container212">
                      <div
                        className="home-container213"
                        onClick={() => setSum(false)}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        <span className="home-text137Set">
                          Booking Summary{" "}
                          <img
                            src="/img/downArrow.png"
                            style={{
                              width: "12px",
                              height: "7px",
                              marginLeft: "10px",
                            }}
                          />
                        </span>
                        <span className="home-text138">
                          Have a Discount Code?
                        </span>
                      </div>
                      <span className="home-text139">
                        <span className="home-text140">Total </span>
                        <span> $134.98</span>
                      </span>
                    </div>
                    <div className="home-container214Set">
                      <img
                        src="/img/home-icon.png"
                        style={{
                          width: "35px",
                          height: "25px",
                          marginRight: "4px",
                        }}
                      />
                      <div className="home-container215">
                        <li className="home-liSet list-item">
                          <span className="home-text142">
                            {sliderValueO} Bedroom
                          </span>
                          <span className="home-text143">
                            ${(sliderValue * 20).toFixed(2)}
                          </span>
                        </li>
                        <li className="home-liSet list-item">
                          <span>{sliderValue} Bathroom</span>
                          <span className="home-text145">
                            ${(sliderValue * 30).toFixed(2)}
                          </span>
                        </li>
                        <li className="home-liSet list-item">
                          <span>{sliderValueK} Kitchen</span>
                          <span className="home-text147">
                            ${(sliderValueK * 45).toFixed(2)}
                          </span>
                        </li>
                      </div>
                    </div>
                    <div className="home-container216Clean">
                      <img
                        src="/img/calendar.png"
                        style={{ width: "25px", marginRight: "8px" }}
                      />
                      <div className="home-container217">
                        <span className="home-text148Set">{MyDate}</span>
                        <span className="home-text149Set">
                          {timeFrame == 8 ? "8:00 AM - 10:00 AM" : null}
                          {timeFrame == 10 ? "10:00 AM - 12:00 PM" : null}
                          {timeFrame == 12 ? "12:00 PM - 2:00 PM" : null}
                          {timeFrame == 14 ? "2:00 PM - 4:00 PM" : null}
                          {timeFrame == 16 ? "4:00 PM - 6:00 PM" : null}
                          {timeFrame == 18 ? "6:00 PM - 8:00 PM" : null}
                        </span>
                      </div>
                    </div>
                    <div className="home-container218Clean">
                      <img
                        src="/img/refresh.png"
                        style={{ width: "25px", marginRight: "8px" }}
                      />
                      <div className="home-container219">
                        <span className="home-text150Set">
                          {CleanType ? "Repeated" : "One Time"}
                        </span>
                      </div>
                    </div>
                    {/* <div className="home-container218">
                <img src='/img/extra.png' style={{width:'25px', marginRight:'8px'}}/>
                  <div className="home-container219">
                    <div className="home-text150Set">{(windows)?"Windows":null}</div>
                    <div className="home-text150Set">{(walls)?"Walls":null}</div>
                    <div className="home-text150Set">{(Cabinets)?"Cabinets":null}</div>
                    <div className="home-text150Set">{(organization)?"Organization":null}</div>
                    <div className="home-text150Set">{(blind)?"Blinds":null}</div>
                    <div className="home-text150Set">{(stovetop)?"Stovetop/oven":null}</div>
                    <div className="home-text150Set">{(fridge)?"Fridge":null}</div>
                    <div className="home-text150Set">{(Dishwasher)?"Dishwasher":null}</div>
                    <div className="home-text150Set">{(garage)?"Garage":null}</div>
                    <div className="home-text150Set">{(microwave)?"Microwave":null}</div>
                    <div className="home-text150Set">{(Laundry)?"Laundry":null}</div>
                    <div className="home-text150Set">{(tiles)?"Tiles/Flooring":null}</div>
                  </div>
                </div> */}
                    <div className="home-container220Set">
                      <div className="home-container221">
                        <span className="home-text151Set">Discount Code</span>
                        <span className="home-text152Set">(optional)</span>
                      </div>
                      <div className="buttonHost">
                        <input
                          type="text"
                          className="home-textinput06Set input"
                          ref={inputTextRef}
                          onMouseEnter={(e) =>
                            handleMouseEnterAXY(e.currentTarget)
                          }
                          onMouseLeave={(e) =>
                            handleMouseLeaveAXY(e.currentTarget)
                          }
                        />
                        <input
                          type="button"
                          className="home-textinput06xSet input"
                          value="Apply"
                          onClick={handleApplyClick}
                          onMouseEnter={(e) =>
                            handleMouseEnterAX(e.currentTarget)
                          }
                          onMouseLeave={(e) =>
                            handleMouseLeaveAX(e.currentTarget)
                          }
                        />
                      </div>
                    </div>
                    <div className="home-container222">
                      <div className="home-container223">
                        <span className="home-text153Set">Sub-Total</span>
                        <span className="home-text154Set">${Total}</span>
                      </div>
                      {/* <div className="home-container224">
                    <span className="home-text155">Sales - Tax(5%)</span>
                    <span className="home-text156">${(5/100)*Total}</span>
                  </div> */}
                      <div className="home-container225Clean">
                        <span className="home-text157Set">Discount Code</span>
                        <span className="home-text158Set">
                          -${disPerAmount}
                        </span>
                      </div>
                      <div className="home-container226Clean">
                        <span className="home-text159Set">Total</span>
                        <span className="home-text160Set">${discountNew}</span>
                      </div>
                    </div>
                    <button
                      onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                      type="button"
                      className="home-button13Clean button"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="cleanerspass2-container51">
                  <div className="cleanerspass2-container52">
                    <div className="cleanerspass2-container53">
                      <div className="cleanerspass2-container54">
                        <span className="cleanerspass2-text53">
                          Cleaner’s Pass
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="cleanerspass2-container55">
                    <div className="cleanerspass2-container56">
                      <span className="cleanerspass2-text54">Every:</span>
                      {/* <select className="cleanerspass2-select1">
                  <option value="Week">Week</option>
                  <option value="Fortnight">Fortnight</option>
                  <option value="Month">Month</option>
                </select> */}

                      <div
                        className="cleanerspass2-select1x"
                        onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                        onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                      >
                        <button
                          onClick={toggleDropdown}
                          className="dropdown-toggle"
                        >
                          <span className="dropdown-left">
                            {selectedOption.left}
                          </span>
                          <span className="dropdown-right">
                            <span>{selectedOption.right}</span>
                            <span
                              className="dropdown-arrow"
                              style={{ marginLeft: "10px" }}
                            >
                              {/* ▼ */}
                              <img
                                alt="drop"
                                src={require("./img/down-chevron.png")}
                                style={{ width: "10px" }}
                              />
                              {/* down-chevron.png */}
                            </span>
                          </span>
                        </button>
                        {isOpen && (
                          <ul
                            className="dropdown-menu"
                            onMouseEnter={(e) =>
                              handleMouseEnterZ(e.currentTarget)
                            }
                            onMouseLeave={(e) =>
                              handleMouseLeaveZ(e.currentTarget)
                            }
                          >
                            {options.map((option, index) => (
                              <li
                                key={index}
                                onClick={() => selectOption(option)}
                                className="dropdown-item"
                              >
                                <span className="dropdown-left">
                                  {option.left}
                                </span>
                                <span className="dropdown-right">
                                  {option.right}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className="cleanerspass2-container57">
                      <span className="cleanerspass2-text55">On:</span>
                      <select
                        className="cleanerspass2-select2"
                        onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                        onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                      >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      className="cleanerspass2-button1 button"
                      onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                      // onClick={() => setShowUpdate(true)}
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => {
                        CancelScreen();
                      }}
                      type="button"
                      className="cleanerspass2-button2 button"
                      onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                      Cancel Membership
                    </button>
                  </div>
                  {/* <div className="cleanerspass2-container58">
              <div className="cleanerspass2-container59">
                <div className="cleanerspass2-container60">
                  <span className="cleanerspass2-text56">
                    Cleaning Summary
                  </span>
                  <img
                    alt="image"
                    src={require("./img/down arrow-200h.png")}
                    className="cleanerspass2-image24"
                  />
                </div>
                <span className="cleanerspass2-text57">
                  Have a discount code?
                </span>
              </div>
              <span className="cleanerspass2-text58">
                <span>
                  Total
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span className="cleanerspass2-text60">$172.99</span>
              </span>
            </div> */}
                  <div className="home-container209Set" ref={SummaryRef}>
                    <div className="home-container210x">
                      <div
                        className="home-container211"
                        // onClick={() => setSum(true)}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        <span className="home-text132Set">
                          Cleaning Summary{" "}
                          <img
                            src="/img/UPARROW.png"
                            style={{
                              width: "12px",
                              height: "7px",
                              marginLeft: "10px",
                            }}
                          />
                        </span>
                        <span className="home-text133Set">
                          Have a Discount Code?
                        </span>
                      </div>
                      <div className="home-text134Set">
                        <span className="home-text135">Total </span>
                        <span>
                          {" "}
                          ${Total}
                          {intervalValue > 0 ? (
                            <span>
                              {"(-"}
                              {intervalValue}%{")"}
                            </span>
                          ) : null}
                        </span>
                      </div>
                    </div>

                    <div className="home-container212">
                      <div
                        className="home-container213"
                        onClick={() => setSum(false)}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        <span className="home-text137Set">
                          Booking Summary{" "}
                          <img
                            src="/img/downArrow.png"
                            style={{
                              width: "12px",
                              height: "7px",
                              marginLeft: "10px",
                            }}
                          />
                        </span>
                        <span className="home-text138">
                          Have a Discount Code?
                        </span>
                      </div>
                      <span className="home-text139">
                        <span className="home-text140">Total </span>
                        <span> $134.98</span>
                      </span>
                    </div>
                    <div className="home-container214Set">
                      <img
                        src="/img/home-icon.png"
                        style={{
                          width: "35px",
                          height: "25px",
                          marginRight: "4px",
                        }}
                      />
                      <div className="home-container215">
                        <li className="home-liSet list-item">
                          <span className="home-text142">
                            {sliderValueO} Bedroom
                          </span>
                          <span className="home-text143">
                            ${(sliderValue * 20).toFixed(2)}
                          </span>
                        </li>
                        <li className="home-liSet list-item">
                          <span>{sliderValue} Bathroom</span>
                          <span className="home-text145">
                            ${(sliderValue * 30).toFixed(2)}
                          </span>
                        </li>
                        <li className="home-liSet list-item">
                          <span>{sliderValueK} Kitchen</span>
                          <span className="home-text147">
                            ${(sliderValueK * 45).toFixed(2)}
                          </span>
                        </li>
                      </div>
                    </div>
                    <div className="home-container216Clean">
                      <img
                        src="/img/calendar.png"
                        style={{ width: "25px", marginRight: "8px" }}
                      />
                      <div className="home-container217">
                        <span className="home-text148Set">{MyDate}</span>
                        <span className="home-text149Set">
                          {timeFrame == 8 ? "8:00 AM - 10:00 AM" : null}
                          {timeFrame == 10 ? "10:00 AM - 12:00 PM" : null}
                          {timeFrame == 12 ? "12:00 PM - 2:00 PM" : null}
                          {timeFrame == 14 ? "2:00 PM - 4:00 PM" : null}
                          {timeFrame == 16 ? "4:00 PM - 6:00 PM" : null}
                          {timeFrame == 18 ? "6:00 PM - 8:00 PM" : null}
                        </span>
                      </div>
                    </div>
                    <div className="home-container218Clean">
                      <img
                        src="/img/refresh.png"
                        style={{ width: "25px", marginRight: "8px" }}
                      />
                      <div className="home-container219">
                        <span className="home-text150Set">
                          {CleanType ? "Repeated" : "One Time"}
                        </span>
                      </div>
                    </div>
                    {/* <div className="home-container218">
                <img src='/img/extra.png' style={{width:'25px', marginRight:'8px'}}/>
                  <div className="home-container219">
                    <div className="home-text150Set">{(windows)?"Windows":null}</div>
                    <div className="home-text150Set">{(walls)?"Walls":null}</div>
                    <div className="home-text150Set">{(Cabinets)?"Cabinets":null}</div>
                    <div className="home-text150Set">{(organization)?"Organization":null}</div>
                    <div className="home-text150Set">{(blind)?"Blinds":null}</div>
                    <div className="home-text150Set">{(stovetop)?"Stovetop/oven":null}</div>
                    <div className="home-text150Set">{(fridge)?"Fridge":null}</div>
                    <div className="home-text150Set">{(Dishwasher)?"Dishwasher":null}</div>
                    <div className="home-text150Set">{(garage)?"Garage":null}</div>
                    <div className="home-text150Set">{(microwave)?"Microwave":null}</div>
                    <div className="home-text150Set">{(Laundry)?"Laundry":null}</div>
                    <div className="home-text150Set">{(tiles)?"Tiles/Flooring":null}</div>
                  </div>
                </div> */}
                    <div className="home-container220Set">
                      <div className="home-container221">
                        <span className="home-text151Set">Discount Code</span>
                        <span className="home-text152Set">(optional)</span>
                      </div>
                      <div className="buttonHost">
                        <input
                          type="text"
                          className="home-textinput06Set input"
                          ref={inputTextRef}
                          onMouseEnter={(e) =>
                            handleMouseEnterAXY(e.currentTarget)
                          }
                          onMouseLeave={(e) =>
                            handleMouseLeaveAXY(e.currentTarget)
                          }
                        />
                        <input
                          type="button"
                          className="home-textinput06xSet input"
                          value="Apply"
                          onClick={handleApplyClick}
                          onMouseEnter={(e) =>
                            handleMouseEnterAX(e.currentTarget)
                          }
                          onMouseLeave={(e) =>
                            handleMouseLeaveAX(e.currentTarget)
                          }
                        />
                      </div>
                    </div>
                    <div className="home-container222">
                      <div className="home-container223">
                        <span className="home-text153Set">Sub-Total</span>
                        <span className="home-text154Set">${Total}</span>
                      </div>
                      {/* <div className="home-container224">
                    <span className="home-text155">Sales - Tax(5%)</span>
                    <span className="home-text156">${(5/100)*Total}</span>
                  </div> */}
                      <div className="home-container225Clean">
                        <span className="home-text157Set">Discount Code</span>
                        <span className="home-text158Set">-$0</span>
                      </div>
                      <div className="home-container226Clean">
                        <span className="home-text159Set">Total</span>
                        <span className="home-text160Set">${discountNew}</span>
                      </div>
                    </div>
                    <button
                      onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                      type="button"
                      className="home-button13Clean button"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Menu />
      <div className="cleanerspass-container67"></div>
    </div>
  );
};

export default Cleanerspass;
