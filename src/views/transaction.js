import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import gsap from 'gsap'

import { Helmet } from 'react-helmet'

import './transaction.css'
import Poptip from '../components/poptip'
import Popreview from '../components/popreview'
import Poppayment from '../components/poppayment'

const Transaction = (props) => {

  const handleMouseEnterFade = (button) => {
    gsap.to(button, {
      scale:1.1,
      opacity: 0.8,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveFade = (button) => {
    gsap.to(button, {
      scale:1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

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

  const handleMouseEnterFadexy = (button) => {
    gsap.to(button, {
      opacity: 0.8,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveFadexy = (button) => {
    gsap.to(button, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseEnterFadex = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      background:'rgba(0,0,0,0.1)',
      // borderRadius:'100%',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveFadex = (button) => {
    gsap.to(button, {
      background:'rgba(250,250,250,0)',
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseEnterZ = (button) => {
    gsap.to(button, {
      borderColor:'#FF914D',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveZ = (button) => {
    gsap.to(button, {
      borderColor:'#515151',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const SearchColorit = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      borderColor:'#ff914d',
      // borderRadius:'100%',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const SearchunColorit = (button) => {
    gsap.to(button, {
      borderColor:'#C3C3C3',
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const [popTip, setpopTip] = useState(false);
  const [popReview, setpopReview] = useState(false);
  const [popPayment, setpopPayment] = useState(false);

  const CloseTip = () =>{
    setpopTip(false);
  }

  const setTip = () =>{
    setpopTip(true);
  }

  const CloseReview = () =>{
    setpopReview(false);
  }

  const setReview = () =>{
    setpopReview(true);
  }

  const ClosePayment = () =>{
    setpopPayment(false);
  }

  const setPayment = () =>{
    setpopPayment(true);
  }

  useEffect(()=>{
    gsap.fromTo(".transaction-container30", {opacity:0, y:-30},{y:0, opacity:1, duration:0.7, });
    // gsap.fromTo(".settings-text28", {opacity:0},{ opacity:1, delay:0.7,duration:0.5});
    // gsap.fromTo(".settings-text40", {opacity:0},{ opacity:1, delay:1,duration:0.5});
    // gsap.fromTo(".settings-container33", {y:20, opacity:0},{y:0, opacity:1, delay:1.2,duration:0.5});

    // gsap.fromTo(".settings-container40", {y:20, opacity:0},{y:0, opacity:1, delay:1.3,duration:0.5});
    // gsap.fromTo(".settings-container52", {x:-20, opacity:0},{x:0, opacity:1, delay:1.4,duration:0.5});
    
  },[]);

  return (
    <div className="transaction-container10">
      <Helmet>
        <title>transaction - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="transaction - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      {(popTip)?<Poptip CloseTip={CloseTip} />:null}
      {(popReview)?<Popreview CloseReview={CloseReview} />:null}
      {(popPayment)?<Poppayment ClosePayment={ClosePayment} />:null}
      <div className="transaction-container11">
        <span className="transaction-text10">Transactions</span>
        <div className="transaction-container12">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="transaction-image10"
          />
          <div className="transaction-container13">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="transaction-image11"
            />
            <span className="transaction-text11">Search for anything...</span>
            <input type="text" className="transaction-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="transaction-image12"
          />
        </Link>
        <div className="transaction-container14" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
          <span className="transaction-text12">Book Now</span>
        </div>
      </div>
      <div className="transaction-container15">
        <img
          alt="image"
          src={require("./img/logo-200h.png")}
          className="transaction-image13"
        />
        <div className="transaction-container16">
          <span className="transaction-text13">OVERVIEW</span>
          <Link to="/dashboard" className="transaction-navlink11">
            <div className="transaction-container17">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="transaction-image14"
              />
              <span className="transaction-text14">Dashboard</span>
            </div>
          </Link>
          <Link to="/schedule" className="transaction-navlink12">
            <div className="transaction-container18">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="transaction-image15"
              />
              <span className="transaction-text15">Schedule</span>
            </div>
          </Link>
          <Link to="/referral" className="transaction-navlink13">
            <div className="transaction-container19">
              <img
                alt="image"
                src={require("./img/link-200h.png")}
                className="transaction-image16"
              />
              <span className="transaction-text16">Referrals</span>
            </div>
          </Link>
          <Link to="/reward" className="transaction-navlink14">
            <div className="transaction-container20">
              <img
                alt="image"
                src={require("./img/lock1-200h.png")}
                className="transaction-image17"
              />
              <span className="transaction-text17">Rewards</span>
            </div>
          </Link>
          <Link to="/cleanerspass" className="transaction-navlink15">
            <div className="transaction-container21">
              <img
                alt="image"
                src={require("./img/key-200h.png")}
                className="transaction-image18"
              />
              <span className="transaction-text18">Cleaner's Pass</span>
            </div>
          </Link>
        </div>
        <div className="transaction-container22">
          <span className="transaction-text19">SETTINGS</span>
          <Link to="/settings" className="transaction-navlink16">
            <div className="transaction-container23">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="transaction-image19"
              />
              <span className="transaction-text20">Settings</span>
            </div>
          </Link>
          <div className="transaction-container24">
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="transaction-image20"
            />
            <span className="transaction-text21">Logout</span>
          </div>
        </div>
      </div>
      <div className="transaction-container25">
        <div className="transaction-container26">
          <span className="transaction-text22">Transactions</span>
          <div className="transaction-container27">
            <img
              alt="image"
              src={require("./img/question-200h.png")}
              className="transaction-image21"
            />
            <div className="transaction-container28" onMouseEnter={(e) => SearchColorit(e.currentTarget)}
        onMouseLeave={(e) => SearchunColorit(e.currentTarget)}>
              <img
                alt="image"
                src={require("./img/search-200h.png")}
                className="transaction-image22"
              />
              <span className="transaction-text23">Search for anything...</span>
              <input type="text" className="transaction-textinput2 input" />
            </div>
          </div>
          <div className="transaction-container29" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
            <span className="transaction-text24">Book Now</span>
          </div>
          <Link to="/settings" className="transaction-navlink17">
            <img
              alt="image"
              src={require("./img/setting-200h.png")}
              className="transaction-image23"
            />
          </Link>
        </div>
        <div className="transaction-container30">
          <div className="transaction-container31">
            <span className="transaction-text25">
              <span>
                View and manage all the tranactions for your account
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="transaction-text27">(account name).</span>
            </span>
          </div>
          <div className="transaction-container32">
            <div className="transaction-container33">
              <span className="transaction-text28">Subscription</span>
            </div>
            <div className="transaction-container34">
              <span className="transaction-text29">Last Payment</span>
            </div>
            <div className="transaction-container35">
              <span className="transaction-text30">Upcoming Payment</span>
            </div>
            <div className="transaction-container36">
              <span className="transaction-text31">Payment Method</span>
            </div>
            <div className="transaction-container37">
              <span className="transaction-text32">Status</span>
            </div>
            <div className="transaction-container38"></div>
          </div>
          <div className="transaction-container39">
            <div className="transaction-container40">
              <span className="transaction-text33">Cleaner’s Pass</span>
            </div>
            <div className="transaction-container41">
              <span className="transaction-text34">
                <span>Apr 29, 2024</span>
                <br></br>
                <span className="transaction-text37">view invoice</span>
              </span>
            </div>
            <div className="transaction-container42">
              <span className="transaction-text38">
                <span>May 29, 2024</span>
                <br></br>
                <span className="transaction-text41">view payment details</span>
              </span>
            </div>
            <div className="transaction-container43">
              <img
                alt="image"
                src={require("./img/mastercard-200h.png")}
                className="transaction-image24"
              />
              <span className="transaction-text42">••••8642</span>
            </div>
            <div className="transaction-container44">
              <span className="transaction-text43">active</span>
            </div>
            <div className="transaction-container45">
              <span className="transaction-text44"  onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setPayment}>Update Payment Method</span>
            </div>
          </div>
          <span className="transaction-text45">Cleaning History</span>
          <div className="transaction-container46">
            <div className="transaction-container47">
              <span className="transaction-text46">Date of clean</span>
            </div>
            <div className="transaction-container48">
              <span className="transaction-text47">Price</span>
            </div>
            <div className="transaction-container49">
              <span className="transaction-text48">Type of clean</span>
            </div>
            <div className="transaction-container50">
              <span className="transaction-text49">Clean details</span>
            </div>
          </div>
          <div className="transaction-container51">
            <div className="transaction-container52" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
              <div className="transaction-container53">
                <span className="transaction-text50">21st Sep 2024</span>
              </div>
              <div className="transaction-container54">
                <span className="transaction-text51">$120.99</span>
              </div>
              <div className="transaction-container55">
                <span className="transaction-text52">Vacate clean</span>
              </div>
              <div className="transaction-container56">
                <span className="transaction-text53">
                  Rooms = (1x bathroom, 2x kitchen, 1x bedroom)
                </span>
              </div>
              <div className="transaction-container57">
                <span className="transaction-text54"  onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setReview}>Leave a review</span>
              </div>
              <div className="transaction-container58">
                <span className="transaction-text55" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setTip}>Tip the cleaner</span>
              </div>
            </div>
            <div className="transaction-container59" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
              <div className="transaction-container60">
                <span className="transaction-text56">21st Sep 2024</span>
              </div>
              <div className="transaction-container61">
                <span className="transaction-text57">$120.99</span>
              </div>
              <div className="transaction-container62">
                <span className="transaction-text58">Vacate clean</span>
              </div>
              <div className="transaction-container63">
                <span className="transaction-text59">
                  Rooms = (1x bathroom, 2x kitchen, 1x bedroom)
                </span>
              </div>
              <div className="transaction-container64">
                <span className="transaction-text60" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setReview}>Leave a review</span>
              </div>
              <div className="transaction-container65">
                <span className="transaction-text61" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setTip}>Tip the cleaner</span>
              </div>
            </div>
            <div className="transaction-container66" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
              <div className="transaction-container67">
                <span className="transaction-text62">21st Sep 2024</span>
              </div>
              <div className="transaction-container68">
                <span className="transaction-text63">$120.99</span>
              </div>
              <div className="transaction-container69">
                <span className="transaction-text64">Vacate clean</span>
              </div>
              <div className="transaction-container70">
                <span className="transaction-text65">
                  Rooms = (1x bathroom, 2x kitchen, 1x bedroom)
                </span>
              </div>
              <div className="transaction-container71">
                <span className="transaction-text66" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setReview}>Leave a review</span>
              </div>
              <div className="transaction-container72">
                <span className="transaction-text67" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setTip}>Tip the cleaner</span>
              </div>
            </div>
            <div className="transaction-container73" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
              <div className="transaction-container74">
                <span className="transaction-text68">21st Sep 2024</span>
              </div>
              <div className="transaction-container75">
                <span className="transaction-text69">$120.99</span>
              </div>
              <div className="transaction-container76">
                <span className="transaction-text70">Vacate clean</span>
              </div>
              <div className="transaction-container77">
                <span className="transaction-text71">
                  Rooms = (1x bathroom, 2x kitchen, 1x bedroom)
                </span>
              </div>
              <div className="transaction-container78">
                <span className="transaction-text72" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setReview}>Leave a review</span>
              </div>
              <div className="transaction-container79">
                <span className="transaction-text73" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setTip}>Tip the cleaner</span>
              </div>
            </div>
            <div className="transaction-container80" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
              <div className="transaction-container81">
                <span className="transaction-text74">21st Sep 2024</span>
              </div>
              <div className="transaction-container82">
                <span className="transaction-text75">$120.99</span>
              </div>
              <div className="transaction-container83">
                <span className="transaction-text76">Vacate clean</span>
              </div>
              <div className="transaction-container84">
                <span className="transaction-text77">
                  Rooms = (1x bathroom, 2x kitchen, 1x bedroom)
                </span>
              </div>
              <div className="transaction-container85">
                <span className="transaction-text78" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setReview}>Leave a review</span>
              </div>
              <div className="transaction-container86">
                <span className="transaction-text79" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setTip}>Tip the cleaner</span>
              </div>
            </div>
            <div className="transaction-container87" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
              <div className="transaction-container88">
                <span className="transaction-text80">21st Sep 2024</span>
              </div>
              <div className="transaction-container89">
                <span className="transaction-text81">$120.99</span>
              </div>
              <div className="transaction-container90">
                <span className="transaction-text82">Vacate clean</span>
              </div>
              <div className="transaction-container91">
                <span className="transaction-text83">
                  Rooms = (1x bathroom, 2x kitchen, 1x bedroom)
                </span>
              </div>
              <div className="transaction-container92">
                <span className="transaction-text84" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setReview}>Leave a review</span>
              </div>
              <div className="transaction-container93">
                <span className="transaction-text85" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={setTip}>Tip the cleaner</span>
              </div>
            </div>
            <div className="transaction-container94">
              <div className="transaction-container95" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
                <span className="transaction-text86">Go Back</span>
              </div>
              <div className="transaction-container96" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
                <span className="transaction-text87">View More</span>
                <img
                  alt="image"
                  src={require("./img/arrow1-1500w.png")}
                  className="transaction-image25"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="transaction-container97">
        <Link to="/dashboard">
          <div className="transaction-container98">
            <img
              alt="image"
              src={require("./img/homep-200h.png")}
              className="transaction-image26"
            />
            <span className="transaction-text88">Dashboard</span>
          </div>
        </Link>
        <Link to="/schedule">
          <div className="transaction-container99">
            <img
              alt="image"
              src={require("./img/calenderx-200h.png")}
              className="transaction-image27"
            />
            <span className="transaction-text89">Schedule</span>
          </div>
        </Link>
        <Link to="/cleanerspass">
          <div className="transaction-container100">
            <img
              alt="image"
              src={require("./img/key-200h.png")}
              className="transaction-image28"
            />
            <span className="transaction-text90">Cleaners Pass</span>
          </div>
        </Link>
        <Link to="/reward">
          <div className="transaction-container101">
            <img
              alt="image"
              src={require("./img/lock1-200h.png")}
              className="transaction-image29"
            />
            <span className="transaction-text91">Rewards</span>
          </div>
        </Link>
        <Link to="/referral">
          <div className="transaction-container102">
            <img
              alt="image"
              src={require("./img/link-200h.png")}
              className="transaction-image30"
            />
            <span className="transaction-text92">Referrals</span>
          </div>
        </Link>
      </div>
      <div className="transaction-container103"></div>
    </div>
  )
}

export default Transaction
