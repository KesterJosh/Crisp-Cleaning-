import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './settingsroom.css'
import Menu from './menu'

const Settingsroom = (props) => {
  return (
    <div className="settingsroom-container10">
      <Helmet>
        <title>settingsroom - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="settingsroom - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      <div className="settingsroom-container11">
        <div className="settingsroom-container12">
          <span className="settingsroom-text10">Settings</span>
          <span className="settingsroom-text11">Account information</span>
        </div>
        <div className="settingsroom-container13">
          <img
            alt="image"
            src={require("./img/question-300h.png")}
            className="settingsroom-image10"
          />
          <div className="settingsroom-container14">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="settingsroom-image11"
            />
            <span className="settingsroom-text12">Search for anything...</span>
            <input type="text" className="settingsroom-textinput input" />
          </div>
        </div>
        <img
          alt="image"
          src={require("./img/close-300h.png")}
          className="settingsroom-image12"
        />
        <div className="settingsroom-container15">
          <span className="settingsroom-text13">Book Now</span>
        </div>
      </div>
      <Menu/>
      <div className="settingsroom-container22">
        <Link to="/settings" style={{width:'100%'}}>
          <div className="settingsroom-container23">
            <img
              alt="image"
              src={require("./img/fullperson-200w.png")}
              className="settingsroom-image18"
            />
            <div className="settingsroom-container24">
              <div className="settingsroom-container25">
                <span className="settingsroom-text19">Account Centre</span>
                <span className="settingsroom-text20">
                  Personal information, password, memberships
                </span>
              </div>
              <img
                alt="image"
                src={require("./img/rightarrow-200w.png")}
                className="settingsroom-image19"
              />
            </div>
          </div>
        </Link>
        <Link to="/transaction" style={{width:'100%'}}>
          <div className="settingsroom-container26">
            <div className="settingsroom-container27">
              <div className="settingsroom-container28">
                <span className="settingsroom-text21">Transactions</span>
                <span className="settingsroom-text22">
                  History, payment method, reviews, tips
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </div>
              <img
                alt="image"
                src={require("./img/rightarrow-200w.png")}
                className="settingsroom-image20"
              />
            </div>
          </div>
        </Link>
        <div className="settingsroom-container29">
          <div className="settingsroom-container30">
            <div className="settingsroom-container31">
              <span className="settingsroom-text23">Help &amp; Support</span>
              <span className="settingsroom-text24">
                FAQ’s, contact us
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </div>
            <img
              alt="image"
              src={require("./img/rightarrow-200w.png")}
              className="settingsroom-image21"
            />
          </div>
        </div>
      </div>
      <div className="settingsroom-container32"></div>
    </div>
  )
}

export default Settingsroom
