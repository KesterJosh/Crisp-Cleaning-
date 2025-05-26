import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";

import { Helmet } from "react-helmet";

import "./transaction.css";
import "./popupReview.css";
import Poptip from "../components/poptip";
import Popreview from "../components/popreview";
import Poppayment from "../components/poppayment";
import stripeCheckoutButton from "../components/stripeCheckoutButton";
import { useCallback } from "react";
import axios from "axios";
import { useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";

const Transaction = (props) => {
  const [cleans, setCleans] = useState([]);

  const [Total, setTotal] = useState(0);

  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
  const user = JSON.parse(localStorage.getItem("user"));

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

  useEffect(() => {
    if (cleans.length > 0) {
      const total = cleans.reduce((sum, clean) => sum + (clean.total || 0), 0);
      setTotal(total); // You must declare Total using useState
    }
  }, [cleans]);

  // Effect to fetch cleans when userId changes
  useEffect(() => {
    if (userId) {
      fetchCleans();
    }
  }, [userId, fetchCleans]);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51ROhYnH9E7pqq95xLp67muP87yzw3XmN9BdV5ZbF2ZoAQuFJPBDYN0HgbnPfaYiN0Z9scDimOVICuZ7iD5kvBaq900M6capXFd"
    );

    const body = {
      items: [
        {
          name: "Crisp Cleaning Service",
          price: Math.round(Total * 100), // In cents
        },
      ],
    };

    const response = await fetch(
      "http://localhost:4000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error);
    }
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

  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState("text");
  const popupRef = useRef();
  const [reviewText, setReviewText] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  useEffect(() => {
    if (showPopup) {
      gsap.from(popupRef.current, {
        duration: 0.4,
        scale: 0.8,
        opacity: 0,
        ease: "power2.out",
      });
    }
  }, [showPopup]);

  // useEffect(() => {
  //   fetch(`localhost:4000/payments/${sessionId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Payment data:", data);
  //       setCardInfo(data.card);
  //     });
  // }, [sessionId]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSizeInBytes = 10 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        alert("Video size exceeds 10MB limit. Please choose a smaller file.");
        e.target.value = null;
        setVideoFile(null);
        setVideoURL(null);
        return;
      }

      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("User information is missing. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("reviewType", mode);
    formData.append("userId", user.userId);
    formData.append("userName", `${user.first_name} ${user.last_name}`);

    if (mode === "text") {
      formData.append("text", reviewText);
    } else {
      formData.append("video", videoFile);
    }

    try {
      const res = await fetch("http://localhost:4000/api/reviews", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Review submitted!");
      } else {
        alert(data.message || "Submission failed.");
      }

      setShowPopup(false);
      setReviewText("");
      setVideoFile(null);
      setVideoURL(null);
      setMode("text");
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the review.");
    }
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

  const [popTip, setpopTip] = useState(false);
  const [popReview, setpopReview] = useState(false);
  const [popPayment, setpopPayment] = useState(false);

  const CloseTip = () => {
    setpopTip(false);
  };

  const setTip = () => {
    setpopTip(true);
  };

  const CloseReview = () => {
    setpopReview(false);
  };

  const setReview = () => {
    setpopReview(true);
  };

  const ClosePayment = () => {
    setpopPayment(false);
  };

  const setPayment = () => {
    setpopPayment(true);
  };

  useEffect(() => {
    gsap.fromTo(
      ".transaction-container30",
      { opacity: 0, y: -30 },
      { y: 0, opacity: 1, duration: 0.7 }
    );
    // gsap.fromTo(".settings-text28", {opacity:0},{ opacity:1, delay:0.7,duration:0.5});
    // gsap.fromTo(".settings-text40", {opacity:0},{ opacity:1, delay:1,duration:0.5});
    // gsap.fromTo(".settings-container33", {y:20, opacity:0},{y:0, opacity:1, delay:1.2,duration:0.5});

    // gsap.fromTo(".settings-container40", {y:20, opacity:0},{y:0, opacity:1, delay:1.3,duration:0.5});
    // gsap.fromTo(".settings-container52", {x:-20, opacity:0},{x:0, opacity:1, delay:1.4,duration:0.5});
  }, []);

  return (
    <div className="transaction-container10">
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content" ref={popupRef}>
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              ×
            </button>
            <h2>Add Your Review</h2>

            <div className="mode-switch">
              <button
                className={mode === "text" ? "active" : ""}
                onClick={() => setMode("text")}
              >
                Text Review
              </button>
              <button
                className={mode === "video" ? "active" : ""}
                onClick={() => setMode("video")}
              >
                Video Review
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {mode === "text" ? (
                <textarea
                  className="text-input"
                  placeholder="Write your review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
              ) : (
                <>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    required
                  />
                  {videoURL && (
                    <video controls className="video-preview" src={videoURL} />
                  )}
                </>
              )}

              <button type="submit" className="submit-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
      <Helmet>
        <title>transaction - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="transaction - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      {popTip ? <Poptip CloseTip={CloseTip} /> : null}
      {popReview ? <Popreview CloseReview={CloseReview} /> : null}
      {popPayment ? <Poppayment ClosePayment={ClosePayment} /> : null}
      <div className="transaction-container11">
        <span className="transaction-text10">Transactions</span>
        <div className="transaction-container12">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="transaction-image10"
          />
          <div className="transaction-container13">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="transaction-image11"
            />
            <span className="transaction-text11">Search for anything...</span>
            <input type="text" className="transaction-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="transaction-image12"
          />
        </Link>
        <div
          className="transaction-container14"
          onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
        >
          <span className="transaction-text12">Book Now</span>
        </div>
      </div>
      <div className="transaction-container15">
        <img
          alt="image"
          src={require("./img/logo-200h.png")}
          className="transaction-image13"
        />
        <div className="transaction-container16">
          <span className="transaction-text13">OVERVIEW</span>
          <Link to="/dashboard" className="transaction-navlink11">
            <div className="transaction-container17">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="transaction-image14"
              />
              <span className="transaction-text14">Dashboard</span>
            </div>
          </Link>
          <Link to="/schedule" className="transaction-navlink12">
            <div className="transaction-container18">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="transaction-image15"
              />
              <span className="transaction-text15">Schedule</span>
            </div>
          </Link>
          <Link to="/referral" className="transaction-navlink13">
            <div className="transaction-container19">
              <img
                alt="image"
                src={require("./img/link-200h.png")}
                className="transaction-image16"
              />
              <span className="transaction-text16">Referrals</span>
            </div>
          </Link>
          <Link to="/reward" className="transaction-navlink14">
            <div className="transaction-container20">
              <img
                alt="image"
                src={require("./img/lock1-200h.png")}
                className="transaction-image17"
              />
              <span className="transaction-text17">Rewards</span>
            </div>
          </Link>
          <Link to="/cleanerspass" className="transaction-navlink15">
            <div className="transaction-container21">
              <img
                alt="image"
                src={require("./img/key-200h.png")}
                className="transaction-image18"
              />
              <span className="transaction-text18">Cleaner's Pass</span>
            </div>
          </Link>
        </div>
        <div className="transaction-container22">
          <span className="transaction-text19">SETTINGS</span>
          <Link to="/settings" className="transaction-navlink16">
            <div className="transaction-container23">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="transaction-image19"
              />
              <span className="transaction-text20">Settings</span>
            </div>
          </Link>
          <div className="transaction-container24">
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="transaction-image20"
            />
            <span className="transaction-text21">Logout</span>
          </div>
        </div>
      </div>
      <div className="transaction-container25">
        <div className="transaction-container26">
          <span className="transaction-text22">Transactions</span>
          <div className="transaction-container27">
            <img
              alt="image"
              src={require("./img/question-200h.png")}
              className="transaction-image21"
            />
            <div
              className="transaction-container28"
              onMouseEnter={(e) => SearchColorit(e.currentTarget)}
              onMouseLeave={(e) => SearchunColorit(e.currentTarget)}
            >
              <img
                alt="image"
                src={require("./img/search-200h.png")}
                className="transaction-image22"
              />
              <span className="transaction-text23">Search for anything...</span>
              <input type="text" className="transaction-textinput2 input" />
            </div>
          </div>
          <div
            className="transaction-container29"
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <span className="transaction-text24">Book Now</span>
          </div>
          <Link to="/settings" className="transaction-navlink17">
            <img
              alt="image"
              src={require("./img/setting-200h.png")}
              className="transaction-image23"
            />
          </Link>
        </div>
        <div className="transaction-container30">
          <div className="transaction-container31">
            <span className="transaction-text25">
              <span>
                View and manage all the tranactions for your account
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </span>
              <span className="transaction-text27">
                {user.last_name} {user.first_name}.
              </span>
            </span>
          </div>
          <div className="transaction-container43">
            {/* {cardInfo && (
              <>
                <img
                  alt="image"
                  src={require(`./img/${cardInfo.brand.toLowerCase()}-200h.png`)}
                  className="transaction-image24"
                />
                <span className="transaction-text42">••••{cardInfo.last4}</span>
              </>
            )} */}
          </div>

          <span className="transaction-text45">Cleaning History</span>
          <div className="transaction-container46">
            <div className="transaction-container47">
              <span className="transaction-text46">Date of clean</span>
            </div>
            <div className="transaction-container48">
              <span className="transaction-text47">Price</span>
            </div>
            <div className="transaction-container49">
              <span className="transaction-text48">Type of clean</span>
            </div>
            <div className="transaction-container50">
              <span className="transaction-text49">Clean details</span>
            </div>
          </div>

          <div className="transaction-container51">
            {cleans.map((clean, index) => (
              <div
                key={index}
                className="transaction-container80"
                onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}
              >
                <div className="transaction-container81">
                  <span className="transaction-text74">{clean.date}</span>
                </div>
                <div className="transaction-container82">
                  <span className="transaction-text75">${clean.total}</span>
                </div>
                <div className="transaction-container83">
                  <span className="transaction-text76">
                    {clean.typeOfClean == 280 ? "Vacant" : null}
                    {clean.typeOfClean == 135 ? "Deep" : null}
                    {clean.typeOfClean == 45 ? "Regular" : null}{" "}
                  </span>
                </div>
                <div className="transaction-container84">
                  <div className="transaction-text77">
                    {clean.bathroom !== "0" && (
                      <span>{clean.bathroom}X Bathroom</span>
                    )}{" "}
                    {clean.kitchen !== "0" && (
                      <span>{clean.kitchen}X Kitchen</span>
                    )}{" "}
                    {clean.rooms !== "0" && <span>{clean.rooms}X Rooms</span>}{" "}
                    {clean.microwave !== "0" && (
                      <span>{clean.microwave}X Microwave</span>
                    )}{" "}
                    {clean.blinds !== "0" && (
                      <span>{clean.blinds}X Blinds</span>
                    )}{" "}
                    {clean.cabinets !== "0" && (
                      <span>{clean.cabinets}X Cabinets</span>
                    )}{" "}
                    {clean.dishwasher !== "0" && (
                      <span>{clean.dishwasher}X Dishwasher</span>
                    )}{" "}
                    {clean.fridge !== "0" && (
                      <span>{clean.fridge}X Fridge</span>
                    )}{" "}
                    {clean.garage !== "0" && (
                      <span>{clean.garage}X Garage</span>
                    )}{" "}
                    {clean.laundry !== "0" && (
                      <span>{clean.laundry}X Laundry</span>
                    )}{" "}
                    {clean.stove !== "0" && <span>{clean.stove}X Stove</span>}{" "}
                    {clean.tiles !== "0" && <span>{clean.tiles}X Tiles</span>}{" "}
                    {clean.walls !== "0" && <span>{clean.walls}X Walls</span>}{" "}
                    {clean.windows !== "0" && (
                      <span>{clean.windows}X Windows</span>
                    )}
                  </div>
                </div>
                <div className="transaction-container85">
                  <span
                    className="transaction-text78"
                    onMouseEnter={(e) =>
                      handleMouseEnterFadexy(e.currentTarget)
                    }
                    onMouseLeave={(e) =>
                      handleMouseLeaveFadexy(e.currentTarget)
                    }
                    onClick={() => setShowPopup(true)}
                  >
                    Leave a review
                  </span>
                </div>
                <div className="transaction-container86">
                  <span
                    className="transaction-text79"
                    onMouseEnter={(e) =>
                      handleMouseEnterFadexy(e.currentTarget)
                    }
                    onMouseLeave={(e) =>
                      handleMouseLeaveFadexy(e.currentTarget)
                    }
                    onClick={setTip}
                  >
                    Tip the cleaner
                  </span>
                </div>
                <button className="payment-button" onClick={makePayment}>
                  Pay
                </button>
              </div>
            ))}
            <div className="transaction-container94">
              <div
                className="transaction-container95"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <span className="transaction-text86">Go Back</span>
              </div>
              <div
                className="transaction-container96"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <span className="transaction-text87">View More</span>
                <img
                  alt="image"
                  src={require("./img/arrow1-1500w.png")}
                  className="transaction-image25"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="transaction-container97">
        <Link to="/dashboard">
          <div className="transaction-container98">
            <img
              alt="image"
              src={require("./img/homep-200h.png")}
              className="transaction-image26"
            />
            <span className="transaction-text88">Dashboard</span>
          </div>
        </Link>
        <Link to="/schedule">
          <div className="transaction-container99">
            <img
              alt="image"
              src={require("./img/calenderx-200h.png")}
              className="transaction-image27"
            />
            <span className="transaction-text89">Schedule</span>
          </div>
        </Link>
        <Link to="/cleanerspass">
          <div className="transaction-container100">
            <img
              alt="image"
              src={require("./img/key-200h.png")}
              className="transaction-image28"
            />
            <span className="transaction-text90">Cleaners Pass</span>
          </div>
        </Link>
        <Link to="/reward">
          <div className="transaction-container101">
            <img
              alt="image"
              src={require("./img/lock1-200h.png")}
              className="transaction-image29"
            />
            <span className="transaction-text91">Rewards</span>
          </div>
        </Link>
        <Link to="/referral">
          <div className="transaction-container102">
            <img
              alt="image"
              src={require("./img/link-200h.png")}
              className="transaction-image30"
            />
            <span className="transaction-text92">Referrals</span>
          </div>
        </Link>
      </div>
      <div className="transaction-container103"></div>
    </div>
  );
};

export default Transaction;
