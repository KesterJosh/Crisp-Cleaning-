import React, { useEffect, useState } from "react";
import gsap from "gsap";

import "./popclearn.css";

const Popclearn = ({ CloseCancelScreen, handleCancel, message }) => {
  useEffect(() => {
    gsap.fromTo(
      ".popclearn-container2",
      { y: 50 },
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

  const cancelUpgrade = () => {
    handleCancel();
    CloseCancelScreen();
  };

  return (
    <div className="popclearn-container1">
      <div className="popclearn-container2">
        <span className="popclearn-text1">Are you sure?</span>
        <div className="popclearn-line"></div>
        <span className="popclearn-text4">{message}</span>
        <div className="popclearn-container3">
          <button
            type="button"
            className="popclearn-button1 button"
            onClick={CloseCancelScreen}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            Go Back
          </button>
          <button
            type="button"
            className="popclearn-button2 button"
            onClick={cancelUpgrade}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            Proceed to cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popclearn;
