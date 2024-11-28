import React, { useEffect, useRef } from "react";
import gsap from 'gsap'

import './popschedule1.css'

const Popschedule1 = ({CloseCancelScreenY}) => {

  useEffect(() => {
    gsap.fromTo(
      ".popschedule1-container2",
      { y: 50, opacity: 0.7 },
      { y: 0, opacity: 1, duration: 1 }
    );
  }, []);

  const handleMouseEnter = (button) => {
    gsap.to(button, {
      scale: 1.05,
      opacity: 0.9,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (button) => {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div className="popschedule1-container1">
      <div className="popschedule1-container2">
        <span className="popschedule1-text1">Warning</span>
        <div className="popschedule1-line"></div>
        <span className="popschedule1-text2">
          As there are less than 24 hours until your clean, you are not eligible
          for a refund
        </span>
        <span className="popschedule1-text3">Learn more on our FAQs</span>
        <div className="popschedule1-container3">
          <button type="button" className="popschedule1-button1 button" onClick={CloseCancelScreenY} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
            <span className="popschedule1-text4">Go Back</span>
          </button>
          <button type="button" className="popschedule1-button2 button" onClick={CloseCancelScreenY} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
            <span className="popschedule1-text5">Proceed to cancel</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popschedule1
