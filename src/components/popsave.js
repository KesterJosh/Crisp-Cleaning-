import React, {useEffect, useState} from 'react'

import './popsave.css'
import gsap from 'gsap';

const Popsave = ({saveX, GoBack}) => {

  useEffect(() => {
    gsap.fromTo(
      ".popsave-container2",
      { y: 50, opacity: 0.7 },
      { y: 0, opacity: 1, duration: 1 }
    );
  }, []);
  
  return (
    <div className="popsave-container1">
      <div className="popsave-container2">
        <span className="popsave-text1">Save changes?</span>
        <div className="popsave-line"></div>
        <span className="popsave-text2">
          You have made changes to your profile. Would you like to save these
          changes?
        </span>
        <div className="popsave-container3">
          <button type="button" className="popsave-button1 button" onClick={GoBack}>
            <span className="popsave-text3">Go Back</span>
          </button>
          <button type="button" className="popsave-button2 button"onClick={saveX}>
            <span className="popsave-text4">Save</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popsave
