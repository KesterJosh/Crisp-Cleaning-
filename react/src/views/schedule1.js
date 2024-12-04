import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

import { Helmet } from 'react-helmet'

import './schedule1.css'
import Menu from './menu'
import CalenSchedule from './calendSchedule'
import CalenFortnightlySchedule from './CalenFortnightlySchedule'
import Popschedule from '../components/popschedule'
import Popschedule1 from '../components/popschedule1'

const Schedule1 = (props) => {

  const [forthNightly, setforthNighly] = useState(true);

  const changeCalender = () =>{
    setforthNighly(!forthNightly);
  }

  const handleSelectDate = (selectedValue) => {
    // Map the selected value to a time frame
    const timeFrameMap = {
      '8to10': 8,
      '10to12': 10,
      '12to2': 12,
      '2to4': 14,
      '4to6': 16,
      '6to8': 18,
    };
  
    // Set the state based on the selected value
    const newTimeFrame = timeFrameMap[selectedValue] || 8; // Default to 8 if not found
    settimeFrame(newTimeFrame);
  
    // Optional: alert for debugging
  };

  const [MyDate, setMyDate] = useState('12/08/2023');

  const setSelectedDate = (formattedDate) => {
    setMyDate(formattedDate);
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

  const Colorit = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      color:'#ff914d',
      // borderRadius:'100%',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const unColorit = (button) => {
    gsap.to(button, {
      color:'#1F3042',
      opacity: 1,
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

  const [cancelScreenX, setCancelScreenX] = useState(false);
  const [cancelScreenY, setCancelScreenY] = useState(false);

  const CancelScreen = () =>{
    setCancelScreenX(true);
  }
  const CancelScreenY = () =>{
    setCancelScreenY(true);
  }

  const CloseCancelScreen = () =>{
    setCancelScreenX(false);
  }
  const CloseCancelScreenY = () =>{
    setCancelScreenY(false);
  }

  useEffect(()=>{
    // schedule1-container305
    gsap.fromTo(".schedule1-container305", {y:-20, opacity:0},{y:0, opacity:1, duration:0.7, });
  },[]);

  return (
    <div className="schedule1-container100">
      <Helmet>
        <title>Schedule1 - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="Schedule1 - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      {(cancelScreenX)?<Popschedule CloseCancelScreen={CloseCancelScreen}/>:null}
      {(cancelScreenY)?<Popschedule1 CloseCancelScreenY={CloseCancelScreenY}/>:null}
      <div className="schedule1-container101">
        <Link to="/"><img
          alt="image"
          src={require("./img/logo-200h.png")}
          className="schedule1-image10"
        /></Link>
        <div className="schedule1-container102">
          <span className="schedule1-text100">OVERVIEW</span>
          <Link to="/dashboard" className="schedule1-navlink10">
            <div className="schedule1-container103">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="schedule1-image11"
              />
              <span className="schedule1-text101" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Dashboard</span>
            </div>
          </Link>
          <div className="schedule1-container104">
            <img
              alt="image"
              src={require("./img/calenderx-200h.png")}
              className="schedule1-image12"
            />
            <span className="schedule1-text102">Schedule</span>
          </div>
          <Link to="/referral" className="schedule1-navlink11">
            <div className="schedule1-container105">
              <img
                alt="image"
                src={require("./img/link-200h.png")}
                className="schedule1-image13"
              />
              <span className="schedule1-text103" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Referrals</span>
            </div>
          </Link>
          <Link to="/reward" className="schedule1-navlink12">
            <div className="schedule1-container106">
              <img
                alt="image"
                src={require("./img/lock1-200h.png")}
                className="schedule1-image14"
              />
              <span className="schedule1-text104" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Rewards</span>
            </div>
          </Link>
          <Link to="/cleanerspass" className="schedule1-navlink13">
            <div className="schedule1-container107">
              <img
                alt="image"
                src={require("./img/key-200h.png")}
                className="schedule1-image15"
              />
              <span className="schedule1-text105" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Cleaner's Pass</span>
            </div>
          </Link>
        </div>
        <div className="schedule1-container108">
          <span className="schedule1-text106">SETTINGS</span>
          <Link to="/settings" className="schedule1-navlink14">
            <div className="schedule1-container109">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="schedule1-image16"
              />
              <span className="schedule1-text107" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Settings</span>
            </div>
          </Link>
          <div className="schedule1-container110">
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="schedule1-image17"
            />
            <span className="schedule1-text108">Logout</span>
          </div>
        </div>
      </div>
      <div className="schedule1-container111">
        <span className="schedule1-text109">Schedule</span>
        <div className="schedule1-container112">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="schedule1-image18"
          />
          <div className="schedule1-container113">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="schedule1-image19"
            />
            <span className="schedule1-text110">Search for anything...</span>
            <input type="text" className="schedule1-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="schedule1-image20"
          />
        </Link>
        <div className="schedule1-container114">
          <span className="schedule1-text111">Book Now</span>
        </div>
      </div>
      <div className="schedule1-container115">
        <div className="schedule1-container116">
          <span className="schedule1-text112">Schedule</span>
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="schedule1-image21"
          />
          <div className="schedule1-container117" onMouseEnter={(e) => SearchColorit(e.currentTarget)}
        onMouseLeave={(e) => SearchunColorit(e.currentTarget)}>
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="schedule1-image22"
            />
            <span className="schedule1-text113">Search for anything...</span>
            <input type="text" className="schedule1-textinput2 input" />
          </div>
          <div className="schedule1-container118"  onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
            <span className="schedule1-text114">Book Now</span>
          </div>
        </div>
        <div className="schedule1-container119">

          {/* Fortnight  */}
          {(forthNightly)?<div className="schedule1-container120">
            <CalenFortnightlySchedule onTimeSlotSelected={handleSelectDate} setSelectedDatex={setSelectedDate} changeCalend={changeCalender}  />
            {/* <div className="schedule1-container121">
              <div className="schedule1-container122">
                <span className="schedule1-navlink16">
                  Fortnightly
                </span>
                <span onClick={changeCalender} className="schedule1-navlink17">
                  Monthly
                </span>
              </div>
              <div className="schedule1-container123">
                <span className="schedule1-text115">January 2024</span>
                <div className="schedule1-container124">
                  <div className="schedule1-container125">
                    <img
                      alt="image"
                      src={require("./img/left-200w.png")}
                      className="schedule1-image23"
                    />
                  </div>
                  <div className="schedule1-container126">
                    <img
                      alt="image"
                      src={require("./img/right-200w.png")}
                      className="schedule1-image24"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="schedule1-container127">
              <div className="schedule1-container128">
                <span className="schedule1-text116">MON</span>
              </div>
              <div className="schedule1-container129">
                <span className="schedule1-text117">TUE</span>
              </div>
              <div className="schedule1-container130">
                <span className="schedule1-text118">WED</span>
              </div>
              <div className="schedule1-container131">
                <span className="schedule1-text119">THU</span>
              </div>
              <div className="schedule1-container132">
                <span className="schedule1-text120">FRI</span>
              </div>
              <div className="schedule1-container133">
                <span className="schedule1-text121">SAT</span>
              </div>
              <div className="schedule1-container134">
                <span className="schedule1-text122">SUN</span>
              </div>
            </div>
            <div className="schedule1-container135">
              <div className="schedule1-container136">
                <div className="schedule1-container137">
                  <span className="schedule1-text123">1</span>
                  <div className="schedule1-container138">
                    <span className="schedule1-text124">1</span>
                  </div>
                  <div className="schedule1-container139">
                    <span className="schedule1-text125">1</span>
                  </div>
                  <div className="schedule1-container140">
                    <span className="schedule1-text126">1</span>
                  </div>
                </div>
                <div className="schedule1-container141">
                  <span className="schedule1-text127">Deep Clean</span>
                  <div className="schedule1-container142"></div>
                </div>
                <div className="schedule1-container143">
                  <span className="schedule1-text128">Regular Clean</span>
                  <div className="schedule1-container144"></div>
                </div>
                <div className="schedule1-container145">
                  <span className="schedule1-text129">Vacate Clean</span>
                  <div className="schedule1-container146"></div>
                </div>
                <div className="schedule1-container147">
                  <span className="schedule1-text130">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container148">
                <div className="schedule1-container149">
                  <span className="schedule1-text131">2</span>
                  <div className="schedule1-container150">
                    <span className="schedule1-text132">1</span>
                  </div>
                  <div className="schedule1-container151">
                    <span className="schedule1-text133">1</span>
                  </div>
                  <div className="schedule1-container152">
                    <span className="schedule1-text134">1</span>
                  </div>
                </div>
                <div className="schedule1-container153">
                  <span className="schedule1-text135">Deep Clean</span>
                  <div className="schedule1-container154"></div>
                </div>
                <div className="schedule1-container155">
                  <span className="schedule1-text136">Regular Clean</span>
                  <div className="schedule1-container156"></div>
                </div>
                <div className="schedule1-container157">
                  <span className="schedule1-text137">Vacate Clean</span>
                  <div className="schedule1-container158"></div>
                </div>
                <div className="schedule1-container159">
                  <span className="schedule1-text138">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container160">
                <div className="schedule1-container161">
                  <span className="schedule1-text139">3</span>
                  <div className="schedule1-container162">
                    <span className="schedule1-text140">1</span>
                  </div>
                  <div className="schedule1-container163">
                    <span className="schedule1-text141">1</span>
                  </div>
                  <div className="schedule1-container164">
                    <span className="schedule1-text142">1</span>
                  </div>
                </div>
                <div className="schedule1-container165">
                  <span className="schedule1-text143">Deep Clean</span>
                  <div className="schedule1-container166"></div>
                </div>
                <div className="schedule1-container167">
                  <span className="schedule1-text144">Regular Clean</span>
                  <div className="schedule1-container168"></div>
                </div>
                <div className="schedule1-container169">
                  <span className="schedule1-text145">Vacate Clean</span>
                  <div className="schedule1-container170"></div>
                </div>
                <div className="schedule1-container171">
                  <span className="schedule1-text146">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container172">
                <div className="schedule1-container173">
                  <span className="schedule1-text147">4</span>
                  <div className="schedule1-container174">
                    <span className="schedule1-text148">1</span>
                  </div>
                  <div className="schedule1-container175">
                    <span className="schedule1-text149">1</span>
                  </div>
                  <div className="schedule1-container176">
                    <span className="schedule1-text150">1</span>
                  </div>
                </div>
                <div className="schedule1-container177">
                  <span className="schedule1-text151">Deep Clean</span>
                  <div className="schedule1-container178"></div>
                </div>
                <div className="schedule1-container179">
                  <span className="schedule1-text152">Regular Clean</span>
                  <div className="schedule1-container180"></div>
                </div>
                <div className="schedule1-container181">
                  <span className="schedule1-text153">Vacate Clean</span>
                  <div className="schedule1-container182"></div>
                </div>
                <div className="schedule1-container183">
                  <span className="schedule1-text154">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container184">
                <div className="schedule1-container185">
                  <span className="schedule1-text155">5</span>
                  <div className="schedule1-container186">
                    <span className="schedule1-text156">1</span>
                  </div>
                  <div className="schedule1-container187">
                    <span className="schedule1-text157">1</span>
                  </div>
                  <div className="schedule1-container188">
                    <span className="schedule1-text158">1</span>
                  </div>
                </div>
                <div className="schedule1-container189">
                  <span className="schedule1-text159">Deep Clean</span>
                  <div className="schedule1-container190"></div>
                </div>
                <div className="schedule1-container191">
                  <span className="schedule1-text160">Regular Clean</span>
                  <div className="schedule1-container192"></div>
                </div>
                <div className="schedule1-container193">
                  <span className="schedule1-text161">Vacate Clean</span>
                  <div className="schedule1-container194"></div>
                </div>
                <div className="schedule1-container195">
                  <span className="schedule1-text162">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container196">
                <div className="schedule1-container197">
                  <span className="schedule1-text163">6</span>
                  <div className="schedule1-container198">
                    <span className="schedule1-text164">1</span>
                  </div>
                  <div className="schedule1-container199">
                    <span className="schedule1-text165">1</span>
                  </div>
                  <div className="schedule1-container200">
                    <span className="schedule1-text166">1</span>
                  </div>
                </div>
                <div className="schedule1-container201">
                  <span className="schedule1-text167">Deep Clean</span>
                  <div className="schedule1-container202"></div>
                </div>
                <div className="schedule1-container203">
                  <span className="schedule1-text168">Regular Clean</span>
                  <div className="schedule1-container204"></div>
                </div>
                <div className="schedule1-container205">
                  <span className="schedule1-text169">Vacate Clean</span>
                  <div className="schedule1-container206"></div>
                </div>
                <div className="schedule1-container207">
                  <span className="schedule1-text170">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container208">
                <div className="schedule1-container209">
                  <span className="schedule1-text171">7</span>
                  <div className="schedule1-container210">
                    <span className="schedule1-text172">1</span>
                  </div>
                  <div className="schedule1-container211">
                    <span className="schedule1-text173">1</span>
                  </div>
                  <div className="schedule1-container212">
                    <span className="schedule1-text174">1</span>
                  </div>
                </div>
                <div className="schedule1-container213">
                  <span className="schedule1-text175">Deep Clean</span>
                  <div className="schedule1-container214"></div>
                </div>
                <div className="schedule1-container215">
                  <span className="schedule1-text176">Regular Clean</span>
                  <div className="schedule1-container216"></div>
                </div>
                <div className="schedule1-container217">
                  <span className="schedule1-text177">Vacate Clean</span>
                  <div className="schedule1-container218"></div>
                </div>
                <div className="schedule1-container219">
                  <span className="schedule1-text178">Book Now</span>
                </div>
              </div>
            </div>
            <div className="schedule1-container220">
              <div className="schedule1-container221">
                <div className="schedule1-container222">
                  <span className="schedule1-text179">8</span>
                  <div className="schedule1-container223">
                    <span className="schedule1-text180">1</span>
                  </div>
                  <div className="schedule1-container224">
                    <span className="schedule1-text181">1</span>
                  </div>
                  <div className="schedule1-container225">
                    <span className="schedule1-text182">1</span>
                  </div>
                </div>
                <div className="schedule1-container226">
                  <span className="schedule1-text183">Deep Clean</span>
                  <div className="schedule1-container227"></div>
                </div>
                <div className="schedule1-container228">
                  <span className="schedule1-text184">Regular Clean</span>
                  <div className="schedule1-container229"></div>
                </div>
                <div className="schedule1-container230">
                  <span className="schedule1-text185">Vacate Clean</span>
                  <div className="schedule1-container231"></div>
                </div>
                <div className="schedule1-container232">
                  <span className="schedule1-text186">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container233">
                <div className="schedule1-container234">
                  <span className="schedule1-text187">9</span>
                  <div className="schedule1-container235">
                    <span className="schedule1-text188">1</span>
                  </div>
                  <div className="schedule1-container236">
                    <span className="schedule1-text189">1</span>
                  </div>
                  <div className="schedule1-container237">
                    <span className="schedule1-text190">1</span>
                  </div>
                </div>
                <div className="schedule1-container238">
                  <span className="schedule1-text191">Deep Clean</span>
                  <div className="schedule1-container239"></div>
                </div>
                <div className="schedule1-container240">
                  <span className="schedule1-text192">Regular Clean</span>
                  <div className="schedule1-container241"></div>
                </div>
                <div className="schedule1-container242">
                  <span className="schedule1-text193">Vacate Clean</span>
                  <div className="schedule1-container243"></div>
                </div>
                <div className="schedule1-container244">
                  <span className="schedule1-text194">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container245">
                <div className="schedule1-container246">
                  <span className="schedule1-text195">10</span>
                  <div className="schedule1-container247">
                    <span className="schedule1-text196">1</span>
                  </div>
                  <div className="schedule1-container248">
                    <span className="schedule1-text197">1</span>
                  </div>
                  <div className="schedule1-container249">
                    <span className="schedule1-text198">1</span>
                  </div>
                </div>
                <div className="schedule1-container250">
                  <span className="schedule1-text199">Deep Clean</span>
                  <div className="schedule1-container251"></div>
                </div>
                <div className="schedule1-container252">
                  <span className="schedule1-text200">Regular Clean</span>
                  <div className="schedule1-container253"></div>
                </div>
                <div className="schedule1-container254">
                  <span className="schedule1-text201">Vacate Clean</span>
                  <div className="schedule1-container255"></div>
                </div>
                <div className="schedule1-container256">
                  <span className="schedule1-text202">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container257">
                <div className="schedule1-container258">
                  <span className="schedule1-text203">11</span>
                  <div className="schedule1-container259">
                    <span className="schedule1-text204">1</span>
                  </div>
                  <div className="schedule1-container260">
                    <span className="schedule1-text205">1</span>
                  </div>
                  <div className="schedule1-container261">
                    <span className="schedule1-text206">1</span>
                  </div>
                </div>
                <div className="schedule1-container262">
                  <span className="schedule1-text207">Deep Clean</span>
                  <div className="schedule1-container263"></div>
                </div>
                <div className="schedule1-container264">
                  <span className="schedule1-text208">Regular Clean</span>
                  <div className="schedule1-container265"></div>
                </div>
                <div className="schedule1-container266">
                  <span className="schedule1-text209">Vacate Clean</span>
                  <div className="schedule1-container267"></div>
                </div>
                <div className="schedule1-container268">
                  <span className="schedule1-text210">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container269">
                <div className="schedule1-container270">
                  <span className="schedule1-text211">12</span>
                  <div className="schedule1-container271">
                    <span className="schedule1-text212">1</span>
                  </div>
                  <div className="schedule1-container272">
                    <span className="schedule1-text213">1</span>
                  </div>
                  <div className="schedule1-container273">
                    <span className="schedule1-text214">12</span>
                  </div>
                </div>
                <div className="schedule1-container274">
                  <span className="schedule1-text215">Deep Clean</span>
                  <div className="schedule1-container275"></div>
                </div>
                <div className="schedule1-container276">
                  <span className="schedule1-text216">Regular Clean</span>
                  <div className="schedule1-container277"></div>
                </div>
                <div className="schedule1-container278">
                  <span className="schedule1-text217">Vacate Clean</span>
                  <div className="schedule1-container279"></div>
                </div>
                <div className="schedule1-container280">
                  <span className="schedule1-text218">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container281">
                <div className="schedule1-container282">
                  <span className="schedule1-text219">13</span>
                  <div className="schedule1-container283">
                    <span className="schedule1-text220">1</span>
                  </div>
                  <div className="schedule1-container284">
                    <span className="schedule1-text221">1</span>
                  </div>
                  <div className="schedule1-container285">
                    <span className="schedule1-text222">1</span>
                  </div>
                </div>
                <div className="schedule1-container286">
                  <span className="schedule1-text223">Deep Clean</span>
                  <div className="schedule1-container287"></div>
                </div>
                <div className="schedule1-container288">
                  <span className="schedule1-text224">Regular Clean</span>
                  <div className="schedule1-container289"></div>
                </div>
                <div className="schedule1-container290">
                  <span className="schedule1-text225">Vacate Clean</span>
                  <div className="schedule1-container291"></div>
                </div>
                <div className="schedule1-container292">
                  <span className="schedule1-text226">Book Now</span>
                </div>
              </div>
              <div className="schedule1-container293">
                <div className="schedule1-container294">
                  <span className="schedule1-text227">14</span>
                  <div className="schedule1-container295">
                    <span className="schedule1-text228">1</span>
                  </div>
                  <div className="schedule1-container296">
                    <span className="schedule1-text229">1</span>
                  </div>
                  <div className="schedule1-container297">
                    <span className="schedule1-text230">1</span>
                  </div>
                </div>
                <div className="schedule1-container298">
                  <span className="schedule1-text231">Deep Clean</span>
                  <div className="schedule1-container299"></div>
                </div>
                <div className="schedule1-container300">
                  <span className="schedule1-text232">Regular Clean</span>
                  <div className="schedule1-container301"></div>
                </div>
                <div className="schedule1-container302">
                  <span className="schedule1-text233">Vacate Clean</span>
                  <div className="schedule1-container303"></div>
                </div>
                <div className="schedule1-container304">
                  <span className="schedule1-text234">Book Now</span>
                </div>
              </div>
            </div> */}

            {/* ////Clear Up sight  */}
            <div className="schedule1-container305">
              <div className="schedule1-container306">
                <div className="schedule1-container307">
                  <div className="schedule1-container308">
                    <div className="schedule1-container309">
                      <img
                        alt="image"
                        src={require("./img/calenderx-200h.png")}
                        className="schedule1-image25"
                      />
                      <span className="schedule1-text235">
                        1st January, 2024
                      </span>
                      <div className="schedule1-container310">
                        <div className="schedule1-container311"></div>
                      </div>
                    </div>
                    <div className="schedule1-container312">
                      <div className="schedule1-container313">
                        <span className="schedule1-text236">
                          Deep Clean for apartment
                        </span>
                        <span className="schedule1-text237">
                          Completed Jan 20th
                        </span>
                        <div className="schedule1-container314">
                          <span className="schedule1-text238">1X Bathroom</span>
                          <span className="schedule1-text239">5X Kitchen</span>
                          <span className="schedule1-text240">7X Bedroom</span>
                          <span className="schedule1-text241">
                            1X Microwave
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="schedule1-container315">
                    <div className="schedule1-container316"></div>
                  </div>
                </div>
                <div className="schedule1-container317">
                  <div className="schedule1-container318" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
                    <span className="schedule1-text242">Amend</span>
                  </div>
                  <div className="schedule1-container319" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)} onClick={CancelScreen}>
                    <span className="schedule1-text243">Cancel</span>
                  </div>
                </div>
              </div>
              <div className="schedule1-container320">
                <div className="schedule1-container321">
                  <div className="schedule1-container322">
                    <div className="schedule1-container323">
                      <img
                        alt="image"
                        src={require("./img/calenderx-200h.png")}
                        className="schedule1-image26"
                      />
                      <span className="schedule1-text244">
                        1st January, 2024
                      </span>
                      <div className="schedule1-container324">
                        <div className="schedule1-container325"></div>
                      </div>
                    </div>
                    <div className="schedule1-container326">
                      <div className="schedule1-container327">
                        <span className="schedule1-text245">
                          Deep Clean for apartment
                        </span>
                        <span className="schedule1-text246">
                          Completed Jan 20th
                        </span>
                        <div className="schedule1-container328">
                          <span className="schedule1-text247">1X Bathroom</span>
                          <span className="schedule1-text248">5X Kitchen</span>
                          <span className="schedule1-text249">7X Bedroom</span>
                          <span className="schedule1-text250">
                            1X Microwave
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="schedule1-container329">
                    <div className="schedule1-container330"></div>
                  </div>
                </div>
                <div className="schedule1-container331">
                  <div className="schedule1-container332" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
                    <span className="schedule1-text251">Amend</span>
                  </div>
                  <div className="schedule1-container333" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)} onClick={CancelScreenY}>
                    <span className="schedule1-text252">Cancel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :<div className="schedule-container120">
            <CalenSchedule onTimeSlotSelected={handleSelectDate} setSelectedDatex={setSelectedDate} changeCalend={changeCalender} />
            
            <div className="schedule-container560">
              <div className="schedule-container561">
                <div className="schedule-container562">
                  <div className="schedule-container563">
                    <div className="schedule-container564">
                      <img
                        alt="image"
                        src={require("./img/calenderx-200h.png")}
                        className="schedule-image25"
                      />
                      <span className="schedule-text404">
                        1st January, 2024
                      </span>
                      <div className="schedule-container565">
                        <div className="schedule-container566"></div>
                      </div>
                    </div>
                    <div className="schedule-container567">
                      <div className="schedule-container568">
                        <span className="schedule-text405">
                          Deep Clean for apartment
                        </span>
                        <span className="schedule-text406">
                          Completed Jan 20th
                        </span>
                        <div className="schedule-container569">
                          <span className="schedule-text407">1X Bathroom</span>
                          <span className="schedule-text408">5X Kitchen</span>
                          <span className="schedule-text409">7X Bedroom</span>
                          <span className="schedule-text410">1X Microwave</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="schedule-container570">
                    <div className="schedule-container571"></div>
                  </div>
                </div>
                <div className="schedule-container572">
                  <div className="schedule-container573" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
                    <span className="schedule-text411">Reschedule</span>
                  </div>
                  <div className="schedule-container574" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)} onClick={CancelScreen}>
                    <span className="schedule-text412">Cancel</span>
                  </div>
                </div>
              </div>
              <div className="schedule-container575">
                <div className="schedule-container576">
                  <div className="schedule-container577">
                    <div className="schedule-container578">
                      <img
                        alt="image"
                        src={require("./img/calenderx-200h.png")}
                        className="schedule-image26"
                      />
                      <span className="schedule-text413">
                        1st January, 2024
                      </span>
                      <div className="schedule-container579">
                        <div className="schedule-container580"></div>
                      </div>
                    </div>
                    <div className="schedule-container581">
                      <div className="schedule-container582">
                        <span className="schedule-text414">
                          Deep Clean for apartment
                        </span>
                        <span className="schedule-text415">
                          Completed Jan 20th
                        </span>
                        <div className="schedule-container583">
                          <span className="schedule-text416">1X Bathroom</span>
                          <span className="schedule-text417">5X Kitchen</span>
                          <span className="schedule-text418">7X Bedroom</span>
                          <span className="schedule-text419">1X Microwave</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="schedule-container584">
                    <div className="schedule-container585"></div>
                  </div>
                </div>
                <div className="schedule-container586">
                  <div className="schedule-container587" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
                    <span className="schedule-text420">Reschedule</span>
                  </div>
                  <div className="schedule-container588" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)} onClick={CancelScreenY}>
                    <span className="schedule-text421">Cancel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>}

        </div>
      </div>
      <Menu/>
      <div className="schedule1-container340"></div>
    </div>
  )
}

export default Schedule1
