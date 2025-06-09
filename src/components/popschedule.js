import React, { useEffect, useRef } from "react";

import "./popschedule.css";
import gsap from "gsap";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Popschedule = ({ CloseCancelScreen, cleanId }) => {
  const handleCancelBooking = async () => {
    console.log(cleanId);
    try {
      await axios.delete(`https://api-crisp-cleaning.onrender.com/clean/${cleanId}`);
      alert("Booking cancelled successfully.");
      CloseCancelScreen();
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel the booking. Please try again.");
    }
  };

  useEffect(() => {
    gsap.fromTo(
      ".popschedule-container2",
      { y: 50, opacity: 0.7 },
      { y: 0, opacity: 1, duration: 1 }
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

  return (
    <div className="popschedule-container1">
      <div className="popschedule-container2">
        <span className="popschedule-text1">Warning</span>
        <div className="popschedule-line"></div>
        <span className="popschedule-text2">
          As there are less than 48 hours until your clean, you are only
          eligible for a 50% refund
        </span>
        <Link to="/faqs" target="_blank">
          <span className="popschedule-text3">Learn more on our FAQs</span>
        </Link>
        <div className="popschedule-container3">
          <button
            type="button"
            className="popschedule-button1 button"
            onClick={CloseCancelScreen}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <span className="popschedule-text4">Go Back</span>
          </button>
          <button
            type="button"
            className="popschedule-button2 button"
            onClick={handleCancelBooking}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <span className="popschedule-text5">Proceed to cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popschedule;
