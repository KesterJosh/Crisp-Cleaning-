import React, { useEffect } from 'react';
import './BeforeAfterImage.css';
import beforeImage from './img/befrrImg.png';
import afterImage from './img/after.png';

const BeforeAfterImage = () => {
  useEffect(() => {
    const parent = document.querySelector('.splitview');
    const topPanel = parent.querySelector('.top');
    const handle = parent.querySelector('.handle');
    let skewHack = 0;
    let delta = 0;

    if (parent.className.indexOf('skewed') !== -1) {
      skewHack = 1000;
    }

    const onMouseMove = (event) => {
      // delta = (event.clientX - 700 / 2) * 0.5;
      handle.style.left = `${event.clientX + delta}px`;
      topPanel.style.width = `${event.clientX + skewHack + delta}px`;
    };

    parent.addEventListener('mousemove', onMouseMove);

    return () => {
      parent.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="splitview skewed">
      <div className="panel bottom">
        <div className="content">
          <img alt="Before" src={beforeImage} className="home1-image04" />
        </div>
      </div>
      <div className="panel top">
        <div className="content">
          <img alt="After" src={afterImage} className="home1-image04" />
        </div>
      </div>
      <div className="handle" role="separator" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-orientation="horizontal" tabIndex="0"></div>
    </div>
  );
};

export default BeforeAfterImage;
