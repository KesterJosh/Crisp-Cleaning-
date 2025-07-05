import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";

import { Helmet } from "react-helmet";

import "./referral.css";
import Menu from "./menu";
import BookingPopup from "../components/BookingPopup";
import GlobalSearch from "../components/GlobalSearch";
import { reward_data } from "./data";

const Referral = (props) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [booking, setBooking] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/#/";
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

  useEffect(() => {
    gsap.fromTo(
      ".referral-container32",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );
    gsap.fromTo(
      ".referral-container37",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.2, duration: 0.5 }
    );
    gsap.fromTo(
      ".referral-container42",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, delay: 0.5, duration: 0.5 }
    );
    gsap.fromTo(
      ".referral-container79",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, delay: 0.6, duration: 0.5 }
    );

    //
  }, []);

  const [referralCode, setRef] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [referralLink, setRefLink] = useState([]);

  const fetchUserData = () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      window.location.href = "/#/"; // Full page redirect
      return;
    }
    setRef(userId);
    setRefLink("https://crisp-frontend.onrender.com/#/ref?ref=" + userId);
  };

  const fetchUserReferrals = () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      window.location.href = "/#/"; // Full page redirect
      return;
    }

    axios
      .post("https://api-crisp-cleaning.onrender.com/referrals", { userId })
      .then((result) => {
        setReferrals(result.data.referrals);
        // setEmail(result.data.email)
        // setPhone(result.data.phone)
        // setAddress(result.data.address)
        // setName(result.data.first_name+" "+result.data.last_name)
        // You can now use result.data to display or process the user data
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
    fetchUserReferrals();
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(referralCode)
      .then(() => {
        alert("Referral code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        alert("Referral Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const shareMessage =
    "Experience next level cleaning service with Crisp Cleaning!";
  const fullMessage = `${shareMessage} ${referralLink}`;

  const handleShare = (platform) => {
    const encodedMessage = encodeURIComponent(fullMessage);

    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
        break;

      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            referralLink
          )}&text=${encodedMessage}`,
          "_blank"
        );
        break;

      case "messages":
        window.location.href = `sms:?&body=${encodedMessage}`;
        break;

      case "discord":
        alert(
          "Copying the message to clipboard. Paste it manually into Discord."
        );
        navigator.clipboard.writeText(fullMessage);
        break;

      case "instagram":
        alert(
          "Instagram does not support direct sharing via browser. You can copy and paste this manually."
        );
        navigator.clipboard.writeText(fullMessage);
        break;

      case "notes":
        navigator.clipboard.writeText(fullMessage);
        alert(
          "Copied to clipboard. You can now paste it into Notes or any app."
        );
        break;

      default:
        console.warn("Unsupported share platform:", platform);
        break;
    }
  };

  return (
    <div className="referral-container10">
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
        <title>referral - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="referral - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      <div className="referral-container11">
        <Link to="/">
          <img
            alt="image"
            src={require("./img/logo-200h.png")}
            className="referral-image10"
          />
        </Link>
        <div className="referral-container12">
          <span className="referral-text10">OVERVIEW</span>
          <Link to="/dashboard" className="referral-navlink10">
            <div className="referral-container13">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="referral-image11"
              />
              <span
                className="referral-text11"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Dashboard
              </span>
            </div>
          </Link>
          <Link to="/schedule" className="referral-navlink11">
            <div className="referral-container14">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="referral-image12"
              />
              <span
                className="referral-text12"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Schedule
              </span>
            </div>
          </Link>
          <div className="referral-container15">
            <img
              alt="image"
              src={require("./img/link-300w.png")}
              className="referral-image13"
            />
            <span className="referral-text13">Referrals</span>
          </div>
          <Link to="/reward" className="referral-navlink12">
            <div className="referral-container16">
              <img
                alt="image"
                src={require("./img/lock1-200h.png")}
                className="referral-image14"
              />
              <span
                className="referral-text14"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Rewards
              </span>
            </div>
          </Link>
          <Link to="/cleanerspass" className="referral-navlink13">
            <div className="referral-container17">
              <img
                alt="image"
                src={require("./img/key-300w.png")}
                className="referral-image15"
              />
              <span
                className="referral-text15"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Cleaner's Pass
              </span>
            </div>
          </Link>
        </div>
        <div className="referral-container18">
          <span className="referral-text16">SETTINGS</span>
          <Link to="/settings" className="referral-navlink14">
            <div className="referral-container19">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="referral-image16"
              />
              <span
                className="referral-text17"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Settings
              </span>
            </div>
          </Link>
          <div
            onClick={() => setShowLogoutPopup(true)}
            className="referral-container20"
          >
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="referral-image17"
            />
            <span className="referral-text18">Logout</span>
          </div>
        </div>
      </div>
      <div className="referral-container21">
        <span className="referral-text19">Referrals</span>
        <div className="referral-container22">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="referral-image18"
          />
          <div className="referral-container23">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="referral-image19"
            />
            <span className="referral-text20">Search for anything...</span>
            <input type="text" className="referral-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="referral-image20"
          />
        </Link>
        <div className="referral-container24">
          <span className="referral-text21">Book Now</span>
        </div>
      </div>
      <div className="referral-container25">
        <div className="referral-container26">
          <span className="referral-text22">Referrals</span>
          {/* <GlobalSearch /> */}
          <Link to="/settings" className="referral-navlink16">
            <img
              alt="image"
              src={require("./img/setting-200h.png")}
              className="referral-image23"
            />
          </Link>
          <div
            className="referral-container29"
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            onClick={() => setBooking(true)}
          >
            <span className="referral-text24">Book Now</span>
          </div>
        </div>
        <div className="referral-container30">
          <div className="referral-container31">
            <div className="referral-container32">
              <span className="referral-text25">Earn with Crisp Cleaning</span>
              <span className="referral-text26">
                Invite your friends to Crisp Cleaning, if they sign up, you and
                your friend will gain 30% OFF your next 2 cleans!
              </span>
              <div className="referral-container33">
                <div className="referral-container34">
                  <img
                    alt="image"
                    src={require("./img/sendinv-200h.png")}
                    className="referral-image24"
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  />
                  <span className="referral-text27">Send Invitation</span>
                  <span className="referral-text28">
                    <span>
                      Send referral link to friends and tell
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                    <br></br>
                    <span>
                      them how useful Crisp Cleaning is!
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                  </span>
                </div>
                <img
                  alt="image"
                  src={require("./img/vector69-200h.png")}
                  className="referral-image25"
                />
                <div className="referral-container35">
                  <img
                    alt="image"
                    src={require("./img/addinv-200h.png")}
                    className="referral-image26"
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  />
                  <span className="referral-text32">Send Invitation</span>
                  <span className="referral-text33">
                    <span>Let your friends register to our services</span>
                    <br></br>
                    <span>using your personal referral code!</span>
                  </span>
                </div>
                <img
                  alt="image"
                  src={require("./img/vector70-200h.png")}
                  className="referral-image27"
                />
                <div className="referral-container36">
                  <img
                    alt="image"
                    src={require("./img/doneinv-200h.png")}
                    className="referral-image28"
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  />
                  <span className="referral-text37">Send Invitation</span>
                  <span className="referral-text38">
                    <span>You and your friends gain 30% OFF</span>
                    <br></br>
                    <span>your next 2 cleans!</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="referral-container37">
              <span className="referral-text42">Invite your friends!</span>
              <span className="referral-text43">
                Add your friends email addresses and send them invitations to
                join!
              </span>
              <div className="referral-container38">
                <input
                  type="text"
                  placeholder="Email addresses..."
                  className="referral-textinput3 input"
                />
                <img
                  alt="image"
                  src={require("./img/send-1500w.png")}
                  className="referral-image29"
                  onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                />
              </div>
              <span className="referral-text44">Share the referral link</span>
              <span className="referral-text45">
                You can also share your referral link by copying it and sending
                it to your friends.
              </span>
              <div className="sideBarz">
                <div className="referral-container39">
                  <input
                    type="text"
                    value={referralCode}
                    placeholder="ReferralLink..."
                    className="referral-textinput4 input"
                  />
                  <img
                    alt="image"
                    src={require("./img/copy-1500w.png")}
                    className="referral-image30"
                    onClick={handleCopy}
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  />
                </div>
                <div className="referral-container39">
                  <input
                    type="text"
                    value={referralLink}
                    placeholder="ReferralLink..."
                    className="referral-textinput4 input"
                  />
                  <img
                    alt="image"
                    src={require("./img/copy-1500w.png")}
                    className="referral-image30"
                    onClick={handleCopyLink}
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="referral-container40">
            <div className="referral-container41">
              <div className="referral-container42">
                <div className="referral-container43">
                  <div className="referral-container44">
                    <div className="referral-container45">
                      <span className="referral-text46">
                        <span>Rewards</span>
                        <br></br>
                      </span>
                    </div>
                    <div className="referral-container46">
                      {/* <span className="referral-text49">Date they joined</span> */}
                    </div>
                    <div className="referral-container47">
                      {/* <span className="referral-text50">Membership</span> */}
                    </div>
                  </div>
                  {reward_data.map((item, index) => (
                    <div key={index} className="reward-in-ref">
                      <h5>{item.name}</h5>
                      {item.id == 1 ? (
                        <button className="two">
                          <img src="/img/lock.png" />
                        </button>
                      ) : (
                        <button className="two">
                          <img src="/img/lock.png" />
                        </button>
                      )}
                    </div>
                  ))}
                  <Link to="/reward" className="ref-rewards-container">
                    <div className="ref-rewards">
                      <span>View all rewards</span>
                      <img
                        alt="image"
                        src={require("./img/arrow-200w.png")}
                        className="dashboard-image31"
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="referral-container76">
                <span className="referral-text72">Invite your friends!</span>
                <span className="referral-text73">
                  Add your friends email addresses and send them invitations to
                  join!
                </span>
                <div className="referral-container77">
                  <input
                    type="text"
                    placeholder="Email addresses..."
                    className="referral-textinput5 input"
                  />
                  <img
                    alt="image"
                    src={require("./img/send-1500w.png")}
                    className="referral-image38"
                  />
                </div>
                <span className="referral-text74">Share the referral link</span>
                <span className="referral-text75">
                  You can also share your referral link by copying it and
                  sending it to your friends.
                </span>
                <div className="referral-container78">
                  <input
                    type="text"
                    value="HS7WN29AJ29MQ9s9uU28N"
                    placeholder="Email addresses..."
                    className="referral-textinput6 input"
                  />
                  <img
                    alt="image"
                    src={require("./img/copy-1500w.png")}
                    className="referral-image39"
                  />
                </div>
              </div>
            </div>
            <div className="referral-container79">
              <div className="referral-container80">
                <span className="referral-text76">Share to other apps</span>
                <span className="referral-text77">
                  Share through your most used media channels!
                </span>
                <div className="referral-container81">
                  <div
                    className="referral-container82"
                    onClick={() => handleShare("instagram")}
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  >
                    <img
                      alt="image"
                      src={require("./img/instagram-800w.png")}
                      className="referral-image40"
                    />
                    <span className="referral-text78">Instagram</span>
                  </div>

                  <div
                    className="referral-container83"
                    onClick={() => handleShare("messages")}
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  >
                    <img
                      alt="image"
                      src={require("./img/message1-800w.png")}
                      className="referral-image41"
                    />
                    <span className="referral-text79">Messages</span>
                  </div>

                  <div
                    className="referral-container84"
                    onClick={() => handleShare("discord")}
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  >
                    <img
                      alt="image"
                      src={require("./img/discord-800w.png")}
                      className="referral-image42"
                    />
                    <span className="referral-text82">Discord</span>
                  </div>

                  <div
                    className="referral-container85"
                    onClick={() => handleShare("whatsapp")}
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  >
                    <img
                      alt="image"
                      src={require("./img/whatsapp-800w.png")}
                      className="referral-image43"
                    />
                    <span className="referral-text85">Whatsapp</span>
                  </div>

                  <div
                    className="referral-container86"
                    onClick={() => handleShare("notes")}
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  >
                    <img
                      alt="image"
                      src={require("./img/notebook-800w.png")}
                      className="referral-image44"
                    />
                    <span className="referral-text88">Notes</span>
                  </div>

                  <div
                    className="referral-container87"
                    onClick={() => handleShare("telegram")}
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  >
                    <img
                      alt="image"
                      src={require("./img/telegram-800w.png")}
                      className="referral-image45"
                    />
                    <span className="referral-text89">Telegram</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="referral-container88">
              <span className="referral-text90">View Rewards</span>
              <img
                alt="image"
                src={require("./img/arrow-200w.png")}
                className="referral-image46"
              />
            </div>
          </div>
        </div>
      </div>
      <Menu />
      <div className="referral-container95"></div>
    </div>
  );
};

export default Referral;
