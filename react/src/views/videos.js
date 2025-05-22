// VideoBackground.js
import React from 'react';
import './VideoBackground.css';

const VideoBackground = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="video">
        <source src={require("./img/Final.mp4")} type="video/mp4" />
        {/* Add additional source elements for different video formats if needed */}
        Transforming Spaces, One <br/>Clean at a Time
      </video>
      <div className="content">
        {/* Your content goes here */}
        <h1>Transforming Spaces, One <br/>Clean at a Time</h1>
        <p className='exploreX'>Explore our range of cleaning solutions and experience the difference of a pristine space today</p>
      </div>
    </div>
  );
};

export default VideoBackground;
