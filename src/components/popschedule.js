import React, { useEffect, useState } from "react";
import "./popschedule.css";
import gsap from "gsap";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Popschedule = ({ CloseCancelScreen, cleanId }) => {
  const [cleanDate, setCleanDate] = useState(null);
  const [cancelMessage, setCancelMessage] = useState("");
  const [canReschedule, setCanReschedule] = useState(true);
  const [canBookNow, setCanBookNow] = useState(true);

  useEffect(() => {
    // Animate modal entrance
    gsap.fromTo(
      ".popschedule-container2",
      { y: 50, opacity: 0.7 },
      { y: 0, opacity: 1, duration: 1 }
    );

    // Fetch clean data
    const fetchClean = async () => {
      try {
        const res = await axios.get(`https://api-crisp-cleaning.onrender.com/clean/${cleanId}`);
        const clean = res.data;
        const cleanDateTime = new Date(clean.date); // use correct field name from your API
        setCleanDate(cleanDateTime);

        const now = new Date();
        const diffInHours = (cleanDateTime - now) / (1000 * 60 * 60);

        // Set message logic
        if (diffInHours < 24) {
          setCancelMessage("As there are less than 24 hours until your clean, this is not eligible for a refund.");
        } else if (diffInHours < 48) {
          setCancelMessage("As there are less than 48 hours until your clean, you are only eligible for a 50% refund.");
        } else {
          setCancelMessage("You are cancelling more than 48 hours in advance. You will receive a full refund minus a processing fee.");
        }

        // Set other flags
        setCanReschedule(diffInHours >= 48);
        setCanBookNow(diffInHours >= 48); // 2 days = 48 hours

      } catch (error) {
        console.error("Failed to fetch clean info:", error);
      }
    };

    fetchClean();
  }, [cleanId]);

  const handleCancelBooking = async () => {
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

  const handleMouseEnter = (button) => {
    gsap.to(button, { scale: 1.05, opacity: 0.9, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (button) => {
    gsap.to(button, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div className="popschedule-container1">
      <div className="popschedule-container2">
        <span className="popschedule-text1">Warning</span>
        <div className="popschedule-line"></div>
        <span className="popschedule-text2">{cancelMessage}</span>

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
