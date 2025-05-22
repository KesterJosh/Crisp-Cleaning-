import React from 'react';
import './stylex.css'; // Assuming the styles are in stylex.css

const HouseFlip = () => {
  return (
    <div className="Container">
      <div className="house" id="house" data-rooms="8" style={{ width: '50px', height: '50px' }}>
        <div className="house-wings" data-flip-key="wings">
          <div className="house-left-wing">
            <div className="house-window"></div>
            <div className="house-window"></div>
            <div className="house-sparkle">
              <div className="house-sparkle-dots"></div>
            </div>
          </div>
          <div className="house-right-wing">      
            <div className="house-window"></div>
            <div className="house-window"></div>
            <div className="house-sparkle">
              <div className="house-sparkle-dots"></div>
            </div>
          </div>
          <div className="house-roof">
            <div className="house-ledge"></div>
          </div>
        </div>
        <div className="house-front" data-flip-key="front">
          <div className="house-chimney"></div>
          <div className="house-facade"></div>
          <div className="house-window">
            <div className="house-sparkle">
              <div className="house-sparkle-dots"></div>
            </div>
          </div>
          <div className="house-doorway">
            <div className="house-stairs"></div>
            <div className="house-door"></div>
          </div>
          <div className="house-gable">      
            <div className="house-roof">
              <div className="house-ledge"></div>
            </div>
          </div>
        </div>
      </div>

      <label className="house-label" htmlFor="range" id="label">Rooms</label>
      <input type="range" min="3" max="8" step="1" value="8" id="range" />

      {/* External scripts */}
      <script src='https://unpkg.com/flipping@0.5.3/dist/flipping.animationFrame.js'></script>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.5.3/rxjs.umd.min.js'></script>
      <script src="./script.js"></script>
    </div>
  );
};

export default HouseFlip;
