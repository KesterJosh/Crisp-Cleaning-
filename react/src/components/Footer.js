import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Footer = () => {
  return (
    <>
      {" "}
      <div className="home-container303">
        <div className="home-container304">
          <img
            alt="image"
            src={require("../views/img/crisp.png")}
            className="home-image52"
          />
        </div>
        <div className="home-container305">
          <span className="home-text396">Sitemap</span>
          <Link className="home-text397" to="/">
            <h6>Home</h6>
          </Link>
          <Link className="home-text399" to="/about">
            <h6>About</h6>
          </Link>
          <Link className="home-text400" to="/review">
            <h6>Reviews</h6>
          </Link>
          <Link className="home-text401" to="/faqs">
            <h6>FAQs</h6>
          </Link>
          <Link className="home-text402" to="/contact">
            <h6>Contact</h6>
          </Link>
        </div>
        <div className="home-container306">
          <span className="home-text403">Help &amp; Support</span>
          <p className="home-text404">crispcleaningmelbourne@outlook.com</p>
        </div>
        <div className="home-container307">
          <span className="home-text405">Contact us</span>
          <div className="home-container308">
            <div className="home-container309">
              <p className="home-text406">First Name</p>
              <input type="text" className="home-textinput07 input" />
            </div>
            <div className="home-container310">
              <p className="home-text407">Last Name</p>
              <input type="text" className="home-textinput08 input" />
            </div>
          </div>
          <div className="home-container311">
            <div className="home-container312">
              <p className="home-text408">Email</p>
              <input type="email" className="home-textinput09 input" />
            </div>
            <div className="home-container313">
              <p className="home-text409">Phone Number</p>
              <input type="tel" className="home-textinput10 input" />
            </div>
          </div>
          <div className="home-container314">
            <div className="home-container315">
              <p className="home-text410">Message</p>
              <textarea
                placeholder="placeholder"
                className="home-textarea textarea"
              ></textarea>
              <button className="sendMButton">Send Message</button>
            </div>
          </div>
        </div>
      </div>
      <div className="CrispUnder">
        <h3>crispcleaningmelbourne@outlook.com</h3>
        <h3>Terms & Conditions</h3>
      </div>
    </>
  );
};

export default Footer;
