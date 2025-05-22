import React, { useState, useEffect } from 'react'
import gsap from 'gsap'
import './poppayment.css'

const Poppayment = ({ClosePayment}) => {
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
      ".poppayment-container2",
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

const [credit, setCredit] = useState(false);

const unsetCred = ()=>{
    setCredit(false);
}
const setCred = ()=>{
    setCredit(true);
}

  return (
    <div className="popreview-container1">
      
      <div className="poppayment-container2">
        {/* <img
          onClick={CloseReview}
            alt="image"
            src={require("./img/closer-800h.png")}
          onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            className="popreward-imageCorrect"
          /> */}
        <span className="poppayment-text1">Update Payment Method</span>
        <div className='backgroundGrey'>
            <p className='textabovePayment'>Choose how you want to pay for your future renewals:</p>
            <div className='paymentBox'>
                <p className='paymentmethodP'>Payment Method</p>
                <div className='holderPayment'>
                    <div className='topHolderX'>
                        <div className='holdcardPayment'>
                            <nav className='roundCircle' onClick={setCred}>
                                <nav className={(credit)?'roundCircleinner':'roundCircleinnerx'}>
                                </nav>
                            </nav>
                            <p className='credPayment'>Credit Card</p>
                        </div>
                        <div className='boxesPayment'>
                            <div className='boxX'></div>
                            <div className='boxX'></div>
                            <div className='boxX'></div>
                            <div className='boxX'></div>
                            <div className='boxX'></div>
                        </div>
                    </div>
                    <input placeholder='Card number' className='textInputX'/>
                    <div className='boxesPayment'>
                        <input placeholder='Expiration date' className='textInputXL'/>
                        <input placeholder='CVV' className='textInputXR'/>
                    </div>
                    <div className='boxesPayment'>
                        <input placeholder='First name' className='textInputXL'/>
                        <input placeholder='Last name' className='textInputXR'/>
                    </div>
                    <div className='LinePayment'></div>
                    <div className='topHolderX'>
                        <div className='holdcardPayment'>
                            <nav className='roundCircle' onClick={unsetCred}>
                                <nav className={(credit)?'roundCircleinnerx':'roundCircleinner'}>
                                </nav>
                            </nav>
                            <p className='credPayment'>PayPal</p>
                        </div>
                        <div className='boxesPayment'>
                            <div className='boxX'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='boxesPaymentBottom'>
            <p className='credPayment' onClick={ClosePayment} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>Back</p>
            <div>
                <button className='credPaymentButton' onClick={ClosePayment} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>Cancel</button>
                <button className='credPaymentButtonFull' onClick={ClosePayment} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>Update</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Poppayment
