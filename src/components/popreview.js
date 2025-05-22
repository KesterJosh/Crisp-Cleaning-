import React, { useState, useEffect } from 'react'
import gsap from 'gsap'
import './popreview.css'
import './popreview1.css'

const Popreview = ({CloseReview}) => {
  const [Reviewsx, setReviewsx] =  useState(0);

  const Forward = () =>{
    setReviewsx(1);
  }

  const [selectedRating, setSelectedRating] = useState(0);

  // Function to set the rating based on clicked div
  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const [selectedRatingX, setSelectedRatingX] = useState(0);

  // Function to set the rating based on clicked div
  const handleRatingClickX = (rating) => {
    setSelectedRatingX(rating);
  };

  useEffect(() => {

    gsap.fromTo(
      ".popreview-container2",
      { y: 50, opacity: 1 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      ".popreview1-container10",
      { y: 50, opacity: 1 },
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
    <div className="popreview-container1">
      
      {(Reviewsx==0)?<div className="popreview-container2">
        <img
          onClick={CloseReview}
            alt="image"
            src={require("./img/closer-800h.png")}
          onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            className="popreward-imageCorrect"
          />
        <span className="popreview-text1">Leave a Review</span>
        <span className="popreview-text2">
          <span>How was your overall experience? What’s that one thing </span>
          <span>you won’t forget Crisp Cleaning for?</span>
        </span>
        <textarea
          placeholder="Come on, you know the drill."
          className="popreview-textarea textarea"
        ></textarea>
        <div className="popreview-line"></div>
        <div className="popreview-container3">
          <button type="button" className="popreview-button button" onClick={Forward} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
            <span className="popreview-text5">Proceed to next</span>
          </button>
        </div>
      </div>:<div className="popreview1-container10">
      <div className="popreview1-container11">
        <div className="popreview1-container12">
        <img
          onClick={CloseReview}
            alt="image"
            src={require("./img/closer-800h.png")}
           onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            className="popreward-imageCorrect"
          />
          <span className="popreview1-text1">Care to Share More?</span>
          <span className="popreview1-text2">Safety?</span>
          <span className="popreview1-text3">
            How safe did you feel with Crisp Cleaning?
          </span>
          <div className="popreview1-containerX">
      {[1, 2, 3, 4, 5].map((starX) => (
        <div
          key={starX}
          className={`popreview1-container${19 + starX}`}
          onClick={() => handleRatingClickX(starX)}
          style={{
            transform: selectedRatingX >= starX ? "scale(1.2)" : "scale(1)", // For expansion effect
          }}
        >
          <img
            alt="image on"
            src={require("./img/review_on-700h.png")}
            className={`popreview1-image${20 + 2 * (starX - 1)}`}
            style={{ display: selectedRatingX >= starX ? "block" : "none" }}
          />
          <img
            alt="image off"
            src={require("./img/review_off-700h.png")}
            className={`popreview1-image${21 + 2 * (starX - 1)}`}
            style={{ display: selectedRatingX >= starX ? "none" : "block" }}
          />
        </div>
      ))}
    </div>
          <div className="popreview1-line1"></div>
          <span className="popreview1-text4">Communication?</span>
          <span className="popreview1-text5">
            How easy was it to communicate with Crisp Cleaning?
          </span>
          <div className="popreview1-containerX">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`popreview1-container${19 + star}`}
          onClick={() => handleRatingClick(star)}
          style={{
            transform: selectedRating >= star ? "scale(1.2)" : "scale(1)", // For expansion effect
          }}
        >
          <img
            alt="image on"
            src={require("./img/review_on-700h.png")}
            className={`popreview1-image${20 + 2 * (star - 1)}`}
            style={{ display: selectedRating >= star ? "block" : "none" }}
          />
          <img
            alt="image off"
            src={require("./img/review_off-700h.png")}
            className={`popreview1-image${21 + 2 * (star - 1)}`}
            style={{ display: selectedRating >= star ? "none" : "block" }}
          />
        </div>
      ))}
    </div>
          <div className="popreview1-line2"></div>
          <div className="popreview1-container25">
            <button type="button" className="popreview1-button button" onClick={CloseReview} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
              <span className="popreview1-text6">Publish Review</span>
            </button>
          </div>
        </div>
      </div>
    </div>}
      
      
    </div>
  )
}

export default Popreview
