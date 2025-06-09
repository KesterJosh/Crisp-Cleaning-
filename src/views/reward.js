import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./popupReview.css";

import { Helmet } from "react-helmet";

import "./reward.css";
import Menu from "./menu";
import Popreward from "../components/popreward";
import { useCallback } from "react";
import axios from "axios";
import { useRef } from "react";
import BookingPopup from "../components/BookingPopup";
import GlobalSearch from "../components/GlobalSearch";
import TimelineContainer from "../components/TimelineContainer";

const Reward = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState("text");
  const popupRef = useRef();
  const [reviewText, setReviewText] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [booking, setBooking] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/#/";
  };

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
      const res = await fetch("https://api-crisp-cleaning.onrender.com/reviews", {
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

  const RewardScreen = () => {
    setCancelScreenX(true);
  };
  const CloseRewardScreen = () => {
    setCancelScreenX(false);
  };

  useEffect(() => {
    gsap.fromTo(
      ".reward-container31",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );
    gsap.fromTo(
      ".reward-container47",
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, delay: 0.5, duration: 0.5 }
    );
    gsap.fromTo(
      ".reward-container63",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, delay: 0.6, duration: 0.5 }
    );

    //
  }, []);

  const [rewards, setRewards] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
  const [referrals, setReferrals] = useState([]);
  const [misc, setMisc] = useState([]); // Only if you plan to track "misc" too

  const getRewardProgress = (type) => {
    if (type === "referrals") return `${referrals.length} referrals`;
    if (type === "cleans") return `${cleans.length} cleans`;
    if (type === "misc") return `${misc.length || 0} tasks`; // Customize this
    return "0";
  };

  const getRewardPercentage = (type) => {
    if (type === "referrals")
      return Math.min((referrals.length / 5) * 100, 100);
    if (type === "cleans") return Math.min((cleans.length / 10) * 100, 100);
    if (type === "misc") return Math.min((misc.length / 3) * 100, 100);
    return 0;
  };

  const [cleans, setCleans] = useState([]);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState(null);
  const [cleanCount, setCleanCount] = useState(0);

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
    if (!userId) return;

    fetch(`https://api-crisp-cleaning.onrender.com/api/rewards/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setRewards(data))
      .catch((err) => console.error("Error fetching rewards", err));
  }, []);

  const claimReward = (rewardId) => {
    fetch(`https://api-crisp-cleaning.onrender.com/api/rewards/claim/${rewardId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Reward claimed!");
        // Optionally reload rewards
        return fetch(`/api/rewards/${userId}`);
      })
      .then((res) => res.json())
      .then((data) => setRewards(data))
      .catch((err) => console.error("Claim error", err));
  };

  return (
    <div className="reward-container10">
      {booking && <BookingPopup onClose={() => setBooking(false)} />}
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
        <title>reward - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="reward - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      {cancelScreenX ? (
        <Popreward CloseRewardScreen={CloseRewardScreen} />
      ) : null}
      <div className="reward-container11">
        <Link to="/">
          <img
            alt="image"
            src={require("./img/logo-200h.png")}
            className="reward-image10"
          />
        </Link>
        <div className="reward-container12">
          <span className="reward-text10">OVERVIEW</span>
          <Link to="/dashboard" className="reward-navlink10">
            <div className="reward-container13">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="reward-image11"
              />
              <span
                className="reward-text11"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Dashboard
              </span>
            </div>
          </Link>
          <Link to="/schedule" className="reward-navlink11">
            <div className="reward-container14">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="reward-image12"
              />
              <span
                className="reward-text12"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Schedule
              </span>
            </div>
          </Link>
          <Link to="/referral" className="reward-navlink12">
            <div className="reward-container15">
              <img
                alt="image"
                src={require("./img/link-200h.png")}
                className="reward-image13"
              />
              <span
                className="reward-text13"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Referrals
              </span>
            </div>
          </Link>
          <div className="reward-container16">
            <img
              alt="image"
              src={require("./img/lock1-200h.png")}
              className="reward-image14"
            />
            <span className="reward-text14">Rewards</span>
          </div>
          <Link to="/cleanerspass" className="reward-navlink13">
            <div className="reward-container17">
              <img
                alt="image"
                src={require("./img/key-200h.png")}
                className="reward-image15"
              />
              <span
                className="reward-text15"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Cleaner's Pass
              </span>
            </div>
          </Link>
        </div>
        <div className="reward-container18">
          <span className="reward-text16">SETTINGS</span>
          <Link to="/settings" className="reward-navlink14">
            <div className="reward-container19">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="reward-image16"
              />
              <span
                className="reward-text17"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Settings
              </span>
            </div>
          </Link>
          <div
            onClick={() => setShowLogoutPopup(true)}
            className="reward-container20"
          >
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="reward-image17"
            />
            <span className="reward-text18">Logout</span>
          </div>
        </div>
      </div>
      <div className="reward-container21">
        <span className="reward-text19">Rewards</span>
        <div className="reward-container22">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="reward-image18"
          />
          <div className="reward-container23">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="reward-image19"
            />
            <span className="reward-text20">Search for anything...</span>
            <input type="text" className="reward-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="reward-image20"
          />
        </Link>
        <div
          className="reward-container24"
          onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
        >
          <span className="reward-text21">Book Now</span>
        </div>
      </div>
      <div className="reward-container25">
        <div className="reward-container26">
          <span className="reward-text22">Rewards</span>
          <GlobalSearch />
          <div
            className="reward-container28"
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            onClick={() => setBooking(true)}
          >
            <span className="reward-text24">Book Now</span>
          </div>
        </div>

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
                      <video
                        controls
                        className="video-preview"
                        src={videoURL}
                      />
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

        <div className="reward-container29">
          <div className="reward-container30">
            <div className="reward-container31">
              <div className="review-cover">
                <span
                  className="reward-text25"
                  onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                >
                  Challenges
                </span>
              </div>

              <span className="reward-text26">
                Complete challenges for lifetime rewards
              </span>
              <div className="reward-container32">
                <div className="reward-container33">
                  <span
                    className="reward-text27"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    Your Progress
                  </span>
                  <span
                    className="reward-text28"
                    onMouseEnter={(e) =>
                      handleMouseEnterFadexy(e.currentTarget)
                    }
                    onMouseLeave={(e) =>
                      handleMouseLeaveFadexy(e.currentTarget)
                    }
                    onClick={RewardScreen}
                  >
                    View challenges
                  </span>
                </div>
                <TimelineContainer />
              </div>
            </div>
            <div className="reward-container44">
              <div className="reward-container45">
                <img
                  alt="image"
                  src={require("./img/lock-200w.png")}
                  className="reward-image25"
                />
                <span className="reward-text35">To be completed</span>
              </div>
              <div className="reward-container46">
                <img
                  alt="image"
                  src={require("./img/lock-200w.png")}
                  className="reward-image26"
                />
                <span className="reward-text36">To be completed</span>
              </div>
              <div className="reward-container47">
                <div className="reward-container48">
                  <img
                    alt="image"
                    src={require("./img/lock-200w.png")}
                    className="reward-image27"
                  />
                  <span className="reward-text37">To be completed</span>
                </div>
                <div className="reward-container49">
                  <div className="reward-container50">
                    <span className="reward-text38">Refferals</span>
                    <span className="reward-text39">
                      {getRewardProgress("referrals")}
                    </span>
                  </div>
                  <div className="reward-container51">
                    <div className="reward-container51">
                      <div
                        className="reward-container52"
                        style={{
                          width: `${getRewardPercentage("referrals")}%`,
                          background: "#ff914d",
                          height: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="reward-container53">
                  <div className="reward-container54">
                    <span className="reward-text40">Cleans</span>
                    <span className="reward-text41">
                      {getRewardProgress("cleans")}
                    </span>
                  </div>
                  <div className="reward-container55">
                    <div className="reward-container51">
                      <div
                        className="reward-container52"
                        style={{
                          width: `${getRewardPercentage("cleans")}%`,
                          background: "#ff914d",
                          height: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="reward-container57">
                  <div className="reward-container58">
                    <span className="reward-text42">Miscellaneous</span>
                    <span className="reward-text43">
                      {getRewardProgress("misc")}
                    </span>
                  </div>
                  <div className="reward-container59">
                    <div className="reward-container51">
                      <div
                        className="reward-container52"
                        style={{
                          width: `${getRewardPercentage("misc")}%`,
                          background: "#ff914d",
                          height: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  className="reward-container61"
                  onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)}
                >
                  <span className="reward-text44" onClick={RewardScreen}>
                    View challenges
                  </span>
                </div>
              </div>
              <div className="reward-container63">
                <div className="reward-container65">
                  <div className="reward-container602">
                    <img
                      alt="image"
                      src={require("./img/reward-200w.png")}
                      className="reward-image28"
                    />
                    <span className="reward-text45">Rewards</span>
                  </div>
                  {rewards.length > 0 ? (
                    rewards.map((reward) => (
                      <div key={reward._id} className="reward-container67">
                        <div className="reward-container70">
                          <span className="reward-text48">
                            <strong>{reward.rewardDescription}</strong>
                            <br />
                            {reward.completed} of {reward.required}{" "}
                            {reward.challengeType}
                          </span>
                        </div>

                        {/* Modified section for the claim button */}
                        <div
                          className={`reward-container71 ${
                            reward.claimed
                              ? "claimed"
                              : reward.completed < reward.required
                              ? "disabled"
                              : ""
                          }`}
                          onClick={() =>
                            !reward.claimed &&
                            reward.completed >= reward.required &&
                            claimReward(reward._id)
                          }
                          onMouseEnter={(e) =>
                            !reward.claimed &&
                            reward.completed >= reward.required &&
                            handleMouseEnterFade(e.currentTarget)
                          }
                          onMouseLeave={(e) =>
                            !reward.claimed &&
                            reward.completed >= reward.required &&
                            handleMouseLeaveFade(e.currentTarget)
                          }
                        >
                          <span className="reward-text52">
                            {reward.claimed ? (
                              "Claimed"
                            ) : reward.completed >= reward.required ? (
                              "Claim reward"
                            ) : (
                              <img src="/img/lock.png" className="not-ready" />
                            )}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="reward-no-reward-message">
                      <p>
                        No rewards available at the moment. Complete some
                        challenges to earn rewards!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Menu />
      <div className="reward-container86"></div>
    </div>
  );
};

export default Reward;
