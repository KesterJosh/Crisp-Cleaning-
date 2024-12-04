import React,{useEffect, useState} from 'react'
import gsap from 'gsap'

import './popclearn.css' 

const Popclearn = ({CloseCancelScreen}) => {

  
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
    <div className="popclearn-container1">
      <div className="popclearn-container2">
        <span className="popclearn-text1">
          <span>Are you sure?</span>
          <br></br>
        </span>
        <div className="popclearn-line"></div>
        <span className="popclearn-text4">
          All cleans scheduled in 48 hours or later will be cancelled. You will
          also lose any unclaimed rewards, and full access to the rewards system
        </span>
        <div className="popclearn-container3">
          <button type="button" className="popclearn-button1 button" onClick={CloseCancelScreen} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
            <span className="popclearn-text5">Go Back</span>
          </button>
          <button type="button" className="popclearn-button2 button" onClick={CloseCancelScreen} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
            <span className="popclearn-text6">Proceed to cancel</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popclearn
