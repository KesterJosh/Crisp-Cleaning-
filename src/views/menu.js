import React from 'react';

import { Link } from 'react-router-dom'

const Menu = () =>{
    return(
    <div className="dashboard-container201">
        <Link to="/dashboard" className='submenu'>
          <div className="dashboard-container202">
            <img
              alt="image"
              src={require("./img/homep-200h.png")}
              className="dashboard-image32"
            />
            <span className="dashboard-text222">Dashboard</span>
          </div>
        </Link>
        <Link to="/schedule" className='submenu'>
          <div className="dashboard-container203">
            <img
              alt="image"
              src={require("./img/calenderx-200h.png")}
              className="dashboard-image33"
            />
            <span className="dashboard-text223">Schedule</span>
          </div>
        </Link>
        <Link to="/cleanerspass" className='submenu'>
          <div className="dashboard-container204">
            <img
              alt="image"
              src={require("./img/key-200h.png")}
              className="dashboard-image34"
            />
            <span className="dashboard-text224">Cleaners Pass</span>
          </div>
        </Link>
        <Link to="/reward" className='submenu'>
          <div className="dashboard-container205">
            <img
              alt="image"
              src={require("./img/lock1-200h.png")}
              className="dashboard-image35"
            />
            <span className="dashboard-text225">Rewards</span>
          </div>
        </Link>
        <Link to="/referral" className='submenu'>
          <div className="dashboard-container206">
            <img
              alt="image"
              src={require("./img/link-200h.png")}
              className="dashboard-image36"
            />
            <span className="dashboard-text226">Referrals</span>
          </div>
        </Link>
      </div>
      );
}

export default Menu;