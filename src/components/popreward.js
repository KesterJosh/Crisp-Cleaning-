import React from 'react'

import './popreward.css'

const Popreward = ({CloseRewardScreen}) => {
  return ( 
    <div className="popreward-container10">
      <div className="popreward-container11">
        <div className="popreward-container12">
          <img
          onClick={CloseRewardScreen}
            alt="image"
            src={require("./img/closer-800h.png")}
            className="popreward-image"
          />
        </div>
        <div className="popreward-container13">
          <div className="popreward-container14">
            <div className="popreward-container15">
              <span className="popreward-text10">Clean Challenges</span>
              <div className="popreward-container16">
                <span className="popreward-text11">Complete 5 cleans</span>
                <div className="popreward-container17">
                  <span className="popreward-text12">0 / 1</span>
                </div>
              </div>
              <div className="popreward-container18">
                <span className="popreward-text13">Complete 20 cleans</span>
                <div className="popreward-container19">
                  <span className="popreward-text14">0 / 1</span>
                </div>
              </div>
              <div className="popreward-container20">
                <span className="popreward-text15">Complete 50 cleans</span>
                <div className="popreward-container21">
                  <span className="popreward-text16">0 / 1</span>
                </div>
              </div>
            </div>
            <div className="popreward-container22">
              <span className="popreward-text17">Referral Challenges</span>
              <div className="popreward-container23">
                <span className="popreward-text18">Refer 1 friend</span>
                <div className="popreward-container24">
                  <span className="popreward-text19">0 / 1</span>
                </div>
              </div>
              <div className="popreward-container25">
                <span className="popreward-text20">Refer 5 friends</span>
                <div className="popreward-container26">
                  <span className="popreward-text21">0 / 1</span>
                </div>
              </div>
              <div className="popreward-container27">
                <span className="popreward-text22">Refer 10 friends</span>
                <div className="popreward-container28">
                  <span className="popreward-text23">0 / 1</span>
                </div>
              </div>
            </div>
          </div>
          <div className="popreward-container29">
            <span className="popreward-text24">Miscellaneous</span>
            <div className="popreward-container30">
              <div className="popreward-container31">
                <div className="popreward-container32">
                  <span className="popreward-text25">
                    Leave a positive review
                  </span>
                  <div className="popreward-container33">
                    <span className="popreward-text26">0 / 1</span>
                  </div>
                </div>
                <div className="popreward-container34">
                  <span className="popreward-text27">Tip a cleaner</span>
                  <div className="popreward-container35">
                    <span className="popreward-text28">0 / 1</span>
                  </div>
                </div>
              </div>
              <div className="popreward-container36">
                <span className="popreward-text29">
                  Send a positive video testimonial
                </span>
                <div className="popreward-container37">
                  <span className="popreward-text30">0 / 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popreward
