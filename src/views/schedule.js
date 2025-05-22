import React from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

import { Helmet } from 'react-helmet'

import './schedule.css'

const Schedule = (props) => {
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

  return (
    <div className="schedule-container100">
      <Helmet>
        <title>Schedule - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="Schedule - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      <div className="schedule-container101">
        <img
          alt="image"
          src={require("./img/logo-200h.png")}
          className="schedule-image10"
        />
        <div className="schedule-container102">
          <span className="schedule-text100">OVERVIEW</span>
          <Link to="/dashboard" className="schedule-navlink10">
            <div className="schedule-container103">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="schedule-image11"
              />
              <span className="schedule-text101">Dashboard</span>
            </div>
          </Link>
          <Link to="/schedule1" className="schedule-navlink11">
            <div className="schedule-container104">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="schedule-image12"
              />
              <span className="schedule-text102">Schedule</span>
            </div>
          </Link>
          <Link to="/referral" className="schedule-navlink12">
            <div className="schedule-container105">
              <img
                alt="image"
                src={require("./img/link-200h.png")}
                className="schedule-image13"
              />
              <span className="schedule-text103">Referrals</span>
            </div>
          </Link>
          <Link to="/reward" className="schedule-navlink13">
            <div className="schedule-container106">
              <img
                alt="image"
                src={require("./img/lock1-200h.png")}
                className="schedule-image14"
              />
              <span className="schedule-text104">Rewards</span>
            </div>
          </Link>
          <Link to="/cleanerspass" className="schedule-navlink14">
            <div className="schedule-container107">
              <img
                alt="image"
                src={require("./img/key-200h.png")}
                className="schedule-image15"
              />
              <span className="schedule-text105">Cleaner's Pass</span>
            </div>
          </Link>
        </div>
        <div className="schedule-container108">
          <span className="schedule-text106">SETTINGS</span>
          <Link to="/settings" className="schedule-navlink15">
            <div className="schedule-container109">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="schedule-image16"
              />
              <span className="schedule-text107">Settings</span>
            </div>
          </Link>
          <div className="schedule-container110">
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="schedule-image17"
            />
            <span className="schedule-text108">Logout</span>
          </div>
        </div>
      </div>
      <div className="schedule-container111">
        <span className="schedule-text109">Schedule</span>
        <div className="schedule-container112">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="schedule-image18"
          />
          <div className="schedule-container113">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="schedule-image19"
            />
            <span className="schedule-text110">Search for anything...</span>
            <input type="text" className="schedule-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="schedule-image20"
          />
        </Link>
        <div className="schedule-container114">
          <span className="schedule-text111">Book Now</span>
        </div>
      </div>
      <div className="schedule-container115">
        <div className="schedule-container116">
          <span className="schedule-text112">Schedule</span>
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="schedule-image21"
          />
          <div className="schedule-container117">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="schedule-image22"
            />
            <span className="schedule-text113">Search for anything...</span>
            <input type="text" className="schedule-textinput2 input" />
          </div>
          <div className="schedule-container118">
            <span className="schedule-text114">Book Now</span>
          </div>
        </div>
        <div className="schedule-container119">
          <div className="schedule-container120">
            <div className="schedule-container121">
              <div className="schedule-container122">
                <Link to="/schedule1" className="schedule-navlink17">
                  Fortnightly
                </Link>
                <span className="schedule-text115">Monthly</span>
              </div>
              <div className="schedule-container123">
                <span className="schedule-text116">January 2024</span>
                <div className="schedule-container124">
                  <div className="schedule-container125">
                    <img
                      alt="image"
                      src={require("./img/left-200w.png")}
                      className="schedule-image23"
                    />
                  </div>
                  <div className="schedule-container126">
                    <img
                      alt="image"
                      src={require("./img/right-200w.png")}
                      className="schedule-image24"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="schedule-container127">
              <div className="schedule-container128">
                <span className="schedule-text117">MON</span>
              </div>
              <div className="schedule-container129">
                <span className="schedule-text118">TUE</span>
              </div>
              <div className="schedule-container130">
                <span className="schedule-text119">WED</span>
              </div>
              <div className="schedule-container131">
                <span className="schedule-text120">THU</span>
              </div>
              <div className="schedule-container132">
                <span className="schedule-text121">FRI</span>
              </div>
              <div className="schedule-container133">
                <span className="schedule-text122">SAT</span>
              </div>
              <div className="schedule-container134">
                <span className="schedule-text123">SUN</span>
              </div>
            </div>
            <div className="schedule-container135">
              <div className="schedule-container136">
                <div className="schedule-container137">
                  <span className="schedule-text124">1</span>
                  <div className="schedule-container138">
                    <span className="schedule-text125">1</span>
                  </div>
                  <div className="schedule-container139">
                    <span className="schedule-text126">1</span>
                  </div>
                  <div className="schedule-container140">
                    <span className="schedule-text127">1</span>
                  </div>
                </div>
                <div className="schedule-container141">
                  <span className="schedule-text128">Deep Clean</span>
                  <div className="schedule-container142"></div>
                </div>
                <div className="schedule-container143">
                  <span className="schedule-text129">Regular Clean</span>
                  <div className="schedule-container144"></div>
                </div>
                <div className="schedule-container145">
                  <span className="schedule-text130">Vacate Clean</span>
                  <div className="schedule-container146"></div>
                </div>
                <div className="schedule-container147">
                  <span className="schedule-text131">Book Now</span>
                </div>
              </div>
              <div className="schedule-container148">
                <div className="schedule-container149">
                  <span className="schedule-text132">2</span>
                  <div className="schedule-container150">
                    <span className="schedule-text133">1</span>
                  </div>
                  <div className="schedule-container151">
                    <span className="schedule-text134">1</span>
                  </div>
                  <div className="schedule-container152">
                    <span className="schedule-text135">1</span>
                  </div>
                </div>
                <div className="schedule-container153">
                  <span className="schedule-text136">Deep Clean</span>
                  <div className="schedule-container154"></div>
                </div>
                <div className="schedule-container155">
                  <span className="schedule-text137">Regular Clean</span>
                  <div className="schedule-container156"></div>
                </div>
                <div className="schedule-container157">
                  <span className="schedule-text138">Vacate Clean</span>
                  <div className="schedule-container158"></div>
                </div>
                <div className="schedule-container159">
                  <span className="schedule-text139">Book Now</span>
                </div>
              </div>
              <div className="schedule-container160">
                <div className="schedule-container161">
                  <span className="schedule-text140">3</span>
                  <div className="schedule-container162">
                    <span className="schedule-text141">1</span>
                  </div>
                  <div className="schedule-container163">
                    <span className="schedule-text142">1</span>
                  </div>
                  <div className="schedule-container164">
                    <span className="schedule-text143">1</span>
                  </div>
                </div>
                <div className="schedule-container165">
                  <span className="schedule-text144">Deep Clean</span>
                  <div className="schedule-container166"></div>
                </div>
                <div className="schedule-container167">
                  <span className="schedule-text145">Regular Clean</span>
                  <div className="schedule-container168"></div>
                </div>
                <div className="schedule-container169">
                  <span className="schedule-text146">Vacate Clean</span>
                  <div className="schedule-container170"></div>
                </div>
                <div className="schedule-container171">
                  <span className="schedule-text147">Book Now</span>
                </div>
              </div>
              <div className="schedule-container172">
                <div className="schedule-container173">
                  <span className="schedule-text148">4</span>
                  <div className="schedule-container174">
                    <span className="schedule-text149">1</span>
                  </div>
                  <div className="schedule-container175">
                    <span className="schedule-text150">1</span>
                  </div>
                  <div className="schedule-container176">
                    <span className="schedule-text151">1</span>
                  </div>
                </div>
                <div className="schedule-container177">
                  <span className="schedule-text152">Deep Clean</span>
                  <div className="schedule-container178"></div>
                </div>
                <div className="schedule-container179">
                  <span className="schedule-text153">Regular Clean</span>
                  <div className="schedule-container180"></div>
                </div>
                <div className="schedule-container181">
                  <span className="schedule-text154">Vacate Clean</span>
                  <div className="schedule-container182"></div>
                </div>
                <div className="schedule-container183">
                  <span className="schedule-text155">Book Now</span>
                </div>
              </div>
              <div className="schedule-container184">
                <div className="schedule-container185">
                  <span className="schedule-text156">5</span>
                  <div className="schedule-container186">
                    <span className="schedule-text157">1</span>
                  </div>
                  <div className="schedule-container187">
                    <span className="schedule-text158">1</span>
                  </div>
                  <div className="schedule-container188">
                    <span className="schedule-text159">1</span>
                  </div>
                </div>
                <div className="schedule-container189">
                  <span className="schedule-text160">Deep Clean</span>
                  <div className="schedule-container190"></div>
                </div>
                <div className="schedule-container191">
                  <span className="schedule-text161">Regular Clean</span>
                  <div className="schedule-container192"></div>
                </div>
                <div className="schedule-container193">
                  <span className="schedule-text162">Vacate Clean</span>
                  <div className="schedule-container194"></div>
                </div>
                <div className="schedule-container195">
                  <span className="schedule-text163">Book Now</span>
                </div>
              </div>
              <div className="schedule-container196">
                <div className="schedule-container197">
                  <span className="schedule-text164">6</span>
                  <div className="schedule-container198">
                    <span className="schedule-text165">1</span>
                  </div>
                  <div className="schedule-container199">
                    <span className="schedule-text166">1</span>
                  </div>
                  <div className="schedule-container200">
                    <span className="schedule-text167">1</span>
                  </div>
                </div>
                <div className="schedule-container201">
                  <span className="schedule-text168">Deep Clean</span>
                  <div className="schedule-container202"></div>
                </div>
                <div className="schedule-container203">
                  <span className="schedule-text169">Regular Clean</span>
                  <div className="schedule-container204"></div>
                </div>
                <div className="schedule-container205">
                  <span className="schedule-text170">Vacate Clean</span>
                  <div className="schedule-container206"></div>
                </div>
                <div className="schedule-container207">
                  <span className="schedule-text171">Book Now</span>
                </div>
              </div>
              <div className="schedule-container208">
                <div className="schedule-container209">
                  <span className="schedule-text172">7</span>
                  <div className="schedule-container210">
                    <span className="schedule-text173">1</span>
                  </div>
                  <div className="schedule-container211">
                    <span className="schedule-text174">1</span>
                  </div>
                  <div className="schedule-container212">
                    <span className="schedule-text175">1</span>
                  </div>
                </div>
                <div className="schedule-container213">
                  <span className="schedule-text176">Deep Clean</span>
                  <div className="schedule-container214"></div>
                </div>
                <div className="schedule-container215">
                  <span className="schedule-text177">Regular Clean</span>
                  <div className="schedule-container216"></div>
                </div>
                <div className="schedule-container217">
                  <span className="schedule-text178">Vacate Clean</span>
                  <div className="schedule-container218"></div>
                </div>
                <div className="schedule-container219">
                  <span className="schedule-text179">Book Now</span>
                </div>
              </div>
            </div>
            <div className="schedule-container220">
              <div className="schedule-container221">
                <div className="schedule-container222">
                  <span className="schedule-text180">8</span>
                  <div className="schedule-container223">
                    <span className="schedule-text181">1</span>
                  </div>
                  <div className="schedule-container224">
                    <span className="schedule-text182">1</span>
                  </div>
                  <div className="schedule-container225">
                    <span className="schedule-text183">1</span>
                  </div>
                </div>
                <div className="schedule-container226">
                  <span className="schedule-text184">Deep Clean</span>
                  <div className="schedule-container227"></div>
                </div>
                <div className="schedule-container228">
                  <span className="schedule-text185">Regular Clean</span>
                  <div className="schedule-container229"></div>
                </div>
                <div className="schedule-container230">
                  <span className="schedule-text186">Vacate Clean</span>
                  <div className="schedule-container231"></div>
                </div>
                <div className="schedule-container232">
                  <span className="schedule-text187">Book Now</span>
                </div>
              </div>
              <div className="schedule-container233">
                <div className="schedule-container234">
                  <span className="schedule-text188">9</span>
                  <div className="schedule-container235">
                    <span className="schedule-text189">1</span>
                  </div>
                  <div className="schedule-container236">
                    <span className="schedule-text190">1</span>
                  </div>
                  <div className="schedule-container237">
                    <span className="schedule-text191">1</span>
                  </div>
                </div>
                <div className="schedule-container238">
                  <span className="schedule-text192">Deep Clean</span>
                  <div className="schedule-container239"></div>
                </div>
                <div className="schedule-container240">
                  <span className="schedule-text193">Regular Clean</span>
                  <div className="schedule-container241"></div>
                </div>
                <div className="schedule-container242">
                  <span className="schedule-text194">Vacate Clean</span>
                  <div className="schedule-container243"></div>
                </div>
                <div className="schedule-container244">
                  <span className="schedule-text195">Book Now</span>
                </div>
              </div>
              <div className="schedule-container245">
                <div className="schedule-container246">
                  <span className="schedule-text196">10</span>
                  <div className="schedule-container247">
                    <span className="schedule-text197">1</span>
                  </div>
                  <div className="schedule-container248">
                    <span className="schedule-text198">1</span>
                  </div>
                  <div className="schedule-container249">
                    <span className="schedule-text199">1</span>
                  </div>
                </div>
                <div className="schedule-container250">
                  <span className="schedule-text200">Deep Clean</span>
                  <div className="schedule-container251"></div>
                </div>
                <div className="schedule-container252">
                  <span className="schedule-text201">Regular Clean</span>
                  <div className="schedule-container253"></div>
                </div>
                <div className="schedule-container254">
                  <span className="schedule-text202">Vacate Clean</span>
                  <div className="schedule-container255"></div>
                </div>
                <div className="schedule-container256">
                  <span className="schedule-text203">Book Now</span>
                </div>
              </div>
              <div className="schedule-container257">
                <div className="schedule-container258">
                  <span className="schedule-text204">11</span>
                  <div className="schedule-container259">
                    <span className="schedule-text205">1</span>
                  </div>
                  <div className="schedule-container260">
                    <span className="schedule-text206">1</span>
                  </div>
                  <div className="schedule-container261">
                    <span className="schedule-text207">1</span>
                  </div>
                </div>
                <div className="schedule-container262">
                  <span className="schedule-text208">Deep Clean</span>
                  <div className="schedule-container263"></div>
                </div>
                <div className="schedule-container264">
                  <span className="schedule-text209">Regular Clean</span>
                  <div className="schedule-container265"></div>
                </div>
                <div className="schedule-container266">
                  <span className="schedule-text210">Vacate Clean</span>
                  <div className="schedule-container267"></div>
                </div>
                <div className="schedule-container268">
                  <span className="schedule-text211">Book Now</span>
                </div>
              </div>
              <div className="schedule-container269">
                <div className="schedule-container270">
                  <span className="schedule-text212">12</span>
                  <div className="schedule-container271">
                    <span className="schedule-text213">1</span>
                  </div>
                  <div className="schedule-container272">
                    <span className="schedule-text214">1</span>
                  </div>
                  <div className="schedule-container273">
                    <span className="schedule-text215">12</span>
                  </div>
                </div>
                <div className="schedule-container274">
                  <span className="schedule-text216">Deep Clean</span>
                  <div className="schedule-container275"></div>
                </div>
                <div className="schedule-container276">
                  <span className="schedule-text217">Regular Clean</span>
                  <div className="schedule-container277"></div>
                </div>
                <div className="schedule-container278">
                  <span className="schedule-text218">Vacate Clean</span>
                  <div className="schedule-container279"></div>
                </div>
                <div className="schedule-container280">
                  <span className="schedule-text219">Book Now</span>
                </div>
              </div>
              <div className="schedule-container281">
                <div className="schedule-container282">
                  <span className="schedule-text220">13</span>
                  <div className="schedule-container283">
                    <span className="schedule-text221">1</span>
                  </div>
                  <div className="schedule-container284">
                    <span className="schedule-text222">1</span>
                  </div>
                  <div className="schedule-container285">
                    <span className="schedule-text223">1</span>
                  </div>
                </div>
                <div className="schedule-container286">
                  <span className="schedule-text224">Deep Clean</span>
                  <div className="schedule-container287"></div>
                </div>
                <div className="schedule-container288">
                  <span className="schedule-text225">Regular Clean</span>
                  <div className="schedule-container289"></div>
                </div>
                <div className="schedule-container290">
                  <span className="schedule-text226">Vacate Clean</span>
                  <div className="schedule-container291"></div>
                </div>
                <div className="schedule-container292">
                  <span className="schedule-text227">Book Now</span>
                </div>
              </div>
              <div className="schedule-container293">
                <div className="schedule-container294">
                  <span className="schedule-text228">14</span>
                  <div className="schedule-container295">
                    <span className="schedule-text229">1</span>
                  </div>
                  <div className="schedule-container296">
                    <span className="schedule-text230">1</span>
                  </div>
                  <div className="schedule-container297">
                    <span className="schedule-text231">1</span>
                  </div>
                </div>
                <div className="schedule-container298">
                  <span className="schedule-text232">Deep Clean</span>
                  <div className="schedule-container299"></div>
                </div>
                <div className="schedule-container300">
                  <span className="schedule-text233">Regular Clean</span>
                  <div className="schedule-container301"></div>
                </div>
                <div className="schedule-container302">
                  <span className="schedule-text234">Vacate Clean</span>
                  <div className="schedule-container303"></div>
                </div>
                <div className="schedule-container304">
                  <span className="schedule-text235">Book Now</span>
                </div>
              </div>
            </div>
            <div className="schedule-container305">
              <div className="schedule-container306">
                <div className="schedule-container307">
                  <span className="schedule-text236">15</span>
                  <div className="schedule-container308">
                    <span className="schedule-text237">1</span>
                  </div>
                  <div className="schedule-container309">
                    <span className="schedule-text238">1</span>
                  </div>
                  <div className="schedule-container310">
                    <span className="schedule-text239">1</span>
                  </div>
                </div>
                <div className="schedule-container311">
                  <span className="schedule-text240">Deep Clean</span>
                  <div className="schedule-container312"></div>
                </div>
                <div className="schedule-container313">
                  <span className="schedule-text241">Regular Clean</span>
                  <div className="schedule-container314"></div>
                </div>
                <div className="schedule-container315">
                  <span className="schedule-text242">Vacate Clean</span>
                  <div className="schedule-container316"></div>
                </div>
                <div className="schedule-container317">
                  <span className="schedule-text243">Book Now</span>
                </div>
              </div>
              <div className="schedule-container318">
                <div className="schedule-container319">
                  <span className="schedule-text244">16</span>
                  <div className="schedule-container320">
                    <span className="schedule-text245">1</span>
                  </div>
                  <div className="schedule-container321">
                    <span className="schedule-text246">1</span>
                  </div>
                  <div className="schedule-container322">
                    <span className="schedule-text247">1</span>
                  </div>
                </div>
                <div className="schedule-container323">
                  <span className="schedule-text248">Deep Clean</span>
                  <div className="schedule-container324"></div>
                </div>
                <div className="schedule-container325">
                  <span className="schedule-text249">Regular Clean</span>
                  <div className="schedule-container326"></div>
                </div>
                <div className="schedule-container327">
                  <span className="schedule-text250">Vacate Clean</span>
                  <div className="schedule-container328"></div>
                </div>
                <div className="schedule-container329">
                  <span className="schedule-text251">Book Now</span>
                </div>
              </div>
              <div className="schedule-container330">
                <div className="schedule-container331">
                  <span className="schedule-text252">17</span>
                  <div className="schedule-container332">
                    <span className="schedule-text253">1</span>
                  </div>
                  <div className="schedule-container333">
                    <span className="schedule-text254">1</span>
                  </div>
                  <div className="schedule-container334">
                    <span className="schedule-text255">1</span>
                  </div>
                </div>
                <div className="schedule-container335">
                  <span className="schedule-text256">Deep Clean</span>
                  <div className="schedule-container336"></div>
                </div>
                <div className="schedule-container337">
                  <span className="schedule-text257">Regular Clean</span>
                  <div className="schedule-container338"></div>
                </div>
                <div className="schedule-container339">
                  <span className="schedule-text258">Vacate Clean</span>
                  <div className="schedule-container340"></div>
                </div>
                <div className="schedule-container341">
                  <span className="schedule-text259">Book Now</span>
                </div>
              </div>
              <div className="schedule-container342">
                <div className="schedule-container343">
                  <span className="schedule-text260">18</span>
                  <div className="schedule-container344">
                    <span className="schedule-text261">1</span>
                  </div>
                  <div className="schedule-container345">
                    <span className="schedule-text262">1</span>
                  </div>
                  <div className="schedule-container346">
                    <span className="schedule-text263">1</span>
                  </div>
                </div>
                <div className="schedule-container347">
                  <span className="schedule-text264">Deep Clean</span>
                  <div className="schedule-container348"></div>
                </div>
                <div className="schedule-container349">
                  <span className="schedule-text265">Regular Clean</span>
                  <div className="schedule-container350"></div>
                </div>
                <div className="schedule-container351">
                  <span className="schedule-text266">Vacate Clean</span>
                  <div className="schedule-container352"></div>
                </div>
                <div className="schedule-container353">
                  <span className="schedule-text267">Book Now</span>
                </div>
              </div>
              <div className="schedule-container354">
                <div className="schedule-container355">
                  <span className="schedule-text268">19</span>
                  <div className="schedule-container356">
                    <span className="schedule-text269">1</span>
                  </div>
                  <div className="schedule-container357">
                    <span className="schedule-text270">1</span>
                  </div>
                  <div className="schedule-container358">
                    <span className="schedule-text271">1</span>
                  </div>
                </div>
                <div className="schedule-container359">
                  <span className="schedule-text272">Deep Clean</span>
                  <div className="schedule-container360"></div>
                </div>
                <div className="schedule-container361">
                  <span className="schedule-text273">Regular Clean</span>
                  <div className="schedule-container362"></div>
                </div>
                <div className="schedule-container363">
                  <span className="schedule-text274">Vacate Clean</span>
                  <div className="schedule-container364"></div>
                </div>
                <div className="schedule-container365">
                  <span className="schedule-text275">Book Now</span>
                </div>
              </div>
              <div className="schedule-container366">
                <div className="schedule-container367">
                  <span className="schedule-text276">20</span>
                  <div className="schedule-container368">
                    <span className="schedule-text277">1</span>
                  </div>
                  <div className="schedule-container369">
                    <span className="schedule-text278">1</span>
                  </div>
                  <div className="schedule-container370">
                    <span className="schedule-text279">1</span>
                  </div>
                </div>
                <div className="schedule-container371">
                  <span className="schedule-text280">Deep Clean</span>
                  <div className="schedule-container372"></div>
                </div>
                <div className="schedule-container373">
                  <span className="schedule-text281">Regular Clean</span>
                  <div className="schedule-container374"></div>
                </div>
                <div className="schedule-container375">
                  <span className="schedule-text282">Vacate Clean</span>
                  <div className="schedule-container376"></div>
                </div>
                <div className="schedule-container377">
                  <span className="schedule-text283">Book Now</span>
                </div>
              </div>
              <div className="schedule-container378">
                <div className="schedule-container379">
                  <span className="schedule-text284">21</span>
                  <div className="schedule-container380">
                    <span className="schedule-text285">1</span>
                  </div>
                  <div className="schedule-container381">
                    <span className="schedule-text286">1</span>
                  </div>
                  <div className="schedule-container382">
                    <span className="schedule-text287">1</span>
                  </div>
                </div>
                <div className="schedule-container383">
                  <span className="schedule-text288">Deep Clean</span>
                  <div className="schedule-container384"></div>
                </div>
                <div className="schedule-container385">
                  <span className="schedule-text289">Regular Clean</span>
                  <div className="schedule-container386"></div>
                </div>
                <div className="schedule-container387">
                  <span className="schedule-text290">Vacate Clean</span>
                  <div className="schedule-container388"></div>
                </div>
                <div className="schedule-container389">
                  <span className="schedule-text291">Book Now</span>
                </div>
              </div>
            </div>
            <div className="schedule-container390">
              <div className="schedule-container391">
                <div className="schedule-container392">
                  <span className="schedule-text292">22</span>
                  <div className="schedule-container393">
                    <span className="schedule-text293">1</span>
                  </div>
                  <div className="schedule-container394">
                    <span className="schedule-text294">1</span>
                  </div>
                  <div className="schedule-container395">
                    <span className="schedule-text295">1</span>
                  </div>
                </div>
                <div className="schedule-container396">
                  <span className="schedule-text296">Deep Clean</span>
                  <div className="schedule-container397"></div>
                </div>
                <div className="schedule-container398">
                  <span className="schedule-text297">Regular Clean</span>
                  <div className="schedule-container399"></div>
                </div>
                <div className="schedule-container400">
                  <span className="schedule-text298">Vacate Clean</span>
                  <div className="schedule-container401"></div>
                </div>
                <div className="schedule-container402">
                  <span className="schedule-text299">Book Now</span>
                </div>
              </div>
              <div className="schedule-container403">
                <div className="schedule-container404">
                  <span className="schedule-text300">23</span>
                  <div className="schedule-container405">
                    <span className="schedule-text301">1</span>
                  </div>
                  <div className="schedule-container406">
                    <span className="schedule-text302">1</span>
                  </div>
                  <div className="schedule-container407">
                    <span className="schedule-text303">1</span>
                  </div>
                </div>
                <div className="schedule-container408">
                  <span className="schedule-text304">Deep Clean</span>
                  <div className="schedule-container409"></div>
                </div>
                <div className="schedule-container410">
                  <span className="schedule-text305">Regular Clean</span>
                  <div className="schedule-container411"></div>
                </div>
                <div className="schedule-container412">
                  <span className="schedule-text306">Vacate Clean</span>
                  <div className="schedule-container413"></div>
                </div>
                <div className="schedule-container414">
                  <span className="schedule-text307">Book Now</span>
                </div>
              </div>
              <div className="schedule-container415">
                <div className="schedule-container416">
                  <span className="schedule-text308">24</span>
                  <div className="schedule-container417">
                    <span className="schedule-text309">1</span>
                  </div>
                  <div className="schedule-container418">
                    <span className="schedule-text310">1</span>
                  </div>
                  <div className="schedule-container419">
                    <span className="schedule-text311">1</span>
                  </div>
                </div>
                <div className="schedule-container420">
                  <span className="schedule-text312">Deep Clean</span>
                  <div className="schedule-container421"></div>
                </div>
                <div className="schedule-container422">
                  <span className="schedule-text313">Regular Clean</span>
                  <div className="schedule-container423"></div>
                </div>
                <div className="schedule-container424">
                  <span className="schedule-text314">Vacate Clean</span>
                  <div className="schedule-container425"></div>
                </div>
                <div className="schedule-container426">
                  <span className="schedule-text315">Book Now</span>
                </div>
              </div>
              <div className="schedule-container427">
                <div className="schedule-container428">
                  <span className="schedule-text316">25</span>
                  <div className="schedule-container429">
                    <span className="schedule-text317">1</span>
                  </div>
                  <div className="schedule-container430">
                    <span className="schedule-text318">1</span>
                  </div>
                  <div className="schedule-container431">
                    <span className="schedule-text319">1</span>
                  </div>
                </div>
                <div className="schedule-container432">
                  <span className="schedule-text320">Deep Clean</span>
                  <div className="schedule-container433"></div>
                </div>
                <div className="schedule-container434">
                  <span className="schedule-text321">Regular Clean</span>
                  <div className="schedule-container435"></div>
                </div>
                <div className="schedule-container436">
                  <span className="schedule-text322">Vacate Clean</span>
                  <div className="schedule-container437"></div>
                </div>
                <div className="schedule-container438">
                  <span className="schedule-text323">Book Now</span>
                </div>
              </div>
              <div className="schedule-container439">
                <div className="schedule-container440">
                  <span className="schedule-text324">26</span>
                  <div className="schedule-container441">
                    <span className="schedule-text325">1</span>
                  </div>
                  <div className="schedule-container442">
                    <span className="schedule-text326">1</span>
                  </div>
                  <div className="schedule-container443">
                    <span className="schedule-text327">1</span>
                  </div>
                </div>
                <div className="schedule-container444">
                  <span className="schedule-text328">Deep Clean</span>
                  <div className="schedule-container445"></div>
                </div>
                <div className="schedule-container446">
                  <span className="schedule-text329">Regular Clean</span>
                  <div className="schedule-container447"></div>
                </div>
                <div className="schedule-container448">
                  <span className="schedule-text330">Vacate Clean</span>
                  <div className="schedule-container449"></div>
                </div>
                <div className="schedule-container450">
                  <span className="schedule-text331">Book Now</span>
                </div>
              </div>
              <div className="schedule-container451">
                <div className="schedule-container452">
                  <span className="schedule-text332">27</span>
                  <div className="schedule-container453">
                    <span className="schedule-text333">1</span>
                  </div>
                  <div className="schedule-container454">
                    <span className="schedule-text334">1</span>
                  </div>
                  <div className="schedule-container455">
                    <span className="schedule-text335">1</span>
                  </div>
                </div>
                <div className="schedule-container456">
                  <span className="schedule-text336">Deep Clean</span>
                  <div className="schedule-container457"></div>
                </div>
                <div className="schedule-container458">
                  <span className="schedule-text337">Regular Clean</span>
                  <div className="schedule-container459"></div>
                </div>
                <div className="schedule-container460">
                  <span className="schedule-text338">Vacate Clean</span>
                  <div className="schedule-container461"></div>
                </div>
                <div className="schedule-container462">
                  <span className="schedule-text339">Book Now</span>
                </div>
              </div>
              <div className="schedule-container463">
                <div className="schedule-container464">
                  <span className="schedule-text340">28</span>
                  <div className="schedule-container465">
                    <span className="schedule-text341">1</span>
                  </div>
                  <div className="schedule-container466">
                    <span className="schedule-text342">1</span>
                  </div>
                  <div className="schedule-container467">
                    <span className="schedule-text343">1</span>
                  </div>
                </div>
                <div className="schedule-container468">
                  <span className="schedule-text344">Deep Clean</span>
                  <div className="schedule-container469"></div>
                </div>
                <div className="schedule-container470">
                  <span className="schedule-text345">Regular Clean</span>
                  <div className="schedule-container471"></div>
                </div>
                <div className="schedule-container472">
                  <span className="schedule-text346">Vacate Clean</span>
                  <div className="schedule-container473"></div>
                </div>
                <div className="schedule-container474">
                  <span className="schedule-text347">Book Now</span>
                </div>
              </div>
            </div>
            <div className="schedule-container475">
              <div className="schedule-container476">
                <div className="schedule-container477">
                  <span className="schedule-text348">29</span>
                  <div className="schedule-container478">
                    <span className="schedule-text349">1</span>
                  </div>
                  <div className="schedule-container479">
                    <span className="schedule-text350">1</span>
                  </div>
                  <div className="schedule-container480">
                    <span className="schedule-text351">1</span>
                  </div>
                </div>
                <div className="schedule-container481">
                  <span className="schedule-text352">Deep Clean</span>
                  <div className="schedule-container482"></div>
                </div>
                <div className="schedule-container483">
                  <span className="schedule-text353">Regular Clean</span>
                  <div className="schedule-container484"></div>
                </div>
                <div className="schedule-container485">
                  <span className="schedule-text354">Vacate Clean</span>
                  <div className="schedule-container486"></div>
                </div>
                <div className="schedule-container487">
                  <span className="schedule-text355">Book Now</span>
                </div>
              </div>
              <div className="schedule-container488">
                <div className="schedule-container489">
                  <span className="schedule-text356">30</span>
                  <div className="schedule-container490">
                    <span className="schedule-text357">1</span>
                  </div>
                  <div className="schedule-container491">
                    <span className="schedule-text358">1</span>
                  </div>
                  <div className="schedule-container492">
                    <span className="schedule-text359">1</span>
                  </div>
                </div>
                <div className="schedule-container493">
                  <span className="schedule-text360">Deep Clean</span>
                  <div className="schedule-container494"></div>
                </div>
                <div className="schedule-container495">
                  <span className="schedule-text361">Regular Clean</span>
                  <div className="schedule-container496"></div>
                </div>
                <div className="schedule-container497">
                  <span className="schedule-text362">Vacate Clean</span>
                  <div className="schedule-container498"></div>
                </div>
                <div className="schedule-container499">
                  <span className="schedule-text363">Book Now</span>
                </div>
              </div>
              <div className="schedule-container500">
                <div className="schedule-container501">
                  <span className="schedule-text364">31</span>
                  <div className="schedule-container502">
                    <span className="schedule-text365">1</span>
                  </div>
                  <div className="schedule-container503">
                    <span className="schedule-text366">1</span>
                  </div>
                  <div className="schedule-container504">
                    <span className="schedule-text367">1</span>
                  </div>
                </div>
                <div className="schedule-container505">
                  <span className="schedule-text368">Deep Clean</span>
                  <div className="schedule-container506"></div>
                </div>
                <div className="schedule-container507">
                  <span className="schedule-text369">Regular Clean</span>
                  <div className="schedule-container508"></div>
                </div>
                <div className="schedule-container509">
                  <span className="schedule-text370">Vacate Clean</span>
                  <div className="schedule-container510"></div>
                </div>
                <div className="schedule-container511">
                  <span className="schedule-text371">Book Now</span>
                </div>
              </div>
              <div className="schedule-container512">
                <div className="schedule-container513">
                  <span className="schedule-text372">1</span>
                  <div className="schedule-container514">
                    <span className="schedule-text373">1</span>
                  </div>
                  <div className="schedule-container515">
                    <span className="schedule-text374">1</span>
                  </div>
                  <div className="schedule-container516">
                    <span className="schedule-text375">1</span>
                  </div>
                </div>
                <div className="schedule-container517">
                  <span className="schedule-text376">Deep Clean</span>
                  <div className="schedule-container518"></div>
                </div>
                <div className="schedule-container519">
                  <span className="schedule-text377">Regular Clean</span>
                  <div className="schedule-container520"></div>
                </div>
                <div className="schedule-container521">
                  <span className="schedule-text378">Vacate Clean</span>
                  <div className="schedule-container522"></div>
                </div>
                <div className="schedule-container523">
                  <span className="schedule-text379">Book Now</span>
                </div>
              </div>
              <div className="schedule-container524">
                <div className="schedule-container525">
                  <span className="schedule-text380">2</span>
                  <div className="schedule-container526">
                    <span className="schedule-text381">1</span>
                  </div>
                  <div className="schedule-container527">
                    <span className="schedule-text382">1</span>
                  </div>
                  <div className="schedule-container528">
                    <span className="schedule-text383">1</span>
                  </div>
                </div>
                <div className="schedule-container529">
                  <span className="schedule-text384">Deep Clean</span>
                  <div className="schedule-container530"></div>
                </div>
                <div className="schedule-container531">
                  <span className="schedule-text385">Regular Clean</span>
                  <div className="schedule-container532"></div>
                </div>
                <div className="schedule-container533">
                  <span className="schedule-text386">Vacate Clean</span>
                  <div className="schedule-container534"></div>
                </div>
                <div className="schedule-container535">
                  <span className="schedule-text387">Book Now</span>
                </div>
              </div>
              <div className="schedule-container536">
                <div className="schedule-container537">
                  <span className="schedule-text388">3</span>
                  <div className="schedule-container538">
                    <span className="schedule-text389">1</span>
                  </div>
                  <div className="schedule-container539">
                    <span className="schedule-text390">1</span>
                  </div>
                  <div className="schedule-container540">
                    <span className="schedule-text391">1</span>
                  </div>
                </div>
                <div className="schedule-container541">
                  <span className="schedule-text392">Deep Clean</span>
                  <div className="schedule-container542"></div>
                </div>
                <div className="schedule-container543">
                  <span className="schedule-text393">Regular Clean</span>
                  <div className="schedule-container544"></div>
                </div>
                <div className="schedule-container545">
                  <span className="schedule-text394">Vacate Clean</span>
                  <div className="schedule-container546"></div>
                </div>
                <div className="schedule-container547">
                  <span className="schedule-text395">Book Now</span>
                </div>
              </div>
              <div className="schedule-container548">
                <div className="schedule-container549">
                  <span className="schedule-text396">4</span>
                  <div className="schedule-container550">
                    <span className="schedule-text397">1</span>
                  </div>
                  <div className="schedule-container551">
                    <span className="schedule-text398">1</span>
                  </div>
                  <div className="schedule-container552">
                    <span className="schedule-text399">1</span>
                  </div>
                </div>
                <div className="schedule-container553">
                  <span className="schedule-text400">Deep Clean</span>
                  <div className="schedule-container554"></div>
                </div>
                <div className="schedule-container555">
                  <span className="schedule-text401">Regular Clean</span>
                  <div className="schedule-container556"></div>
                </div>
                <div className="schedule-container557">
                  <span className="schedule-text402">Vacate Clean</span>
                  <div className="schedule-container558"></div>
                </div>
                <div className="schedule-container559">
                  <span className="schedule-text403">Book Now</span>
                </div>
              </div>
            </div>
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
                  <div className="schedule-container573">
                    <span className="schedule-text411">Reschedule</span>
                  </div>
                  <div className="schedule-container574">
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
                  <div className="schedule-container587">
                    <span className="schedule-text420">Reschedule</span>
                  </div>
                  <div className="schedule-container588">
                    <span className="schedule-text421">Cancel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="schedule-container589">
        <Link to="/dashboard">
          <div className="schedule-container590">
            <img
              alt="image"
              src={require("./img/homep-200h.png")}
              className="schedule-image27"
            />
            <span className="schedule-text422">Dashboard</span>
          </div>
        </Link>
        <Link to="/schedule1">
          <div className="schedule-container591">
            <img
              alt="image"
              src={require("./img/calenderx-200h.png")}
              className="schedule-image28"
            />
            <span className="schedule-text423">Schedule</span>
          </div>
        </Link>
        <Link to="/cleanerspass">
          <div className="schedule-container592">
            <img
              alt="image"
              src={require("./img/key-200h.png")}
              className="schedule-image29"
            />
            <span className="schedule-text424">Cleaners Pass</span>
          </div>
        </Link>
        <Link to="/reward">
          <div className="schedule-container593">
            <img
              alt="image"
              src={require("./img/lock1-200h.png")}
              className="schedule-image30"
            />
            <span className="schedule-text425">Rewards</span>
          </div>
        </Link>
        <Link to="/referral">
          <div className="schedule-container594">
            <img
              alt="image"
              src={require("./img/link-200h.png")}
              className="schedule-image31"
            />
            <span className="schedule-text426">Referrals</span>
          </div>
        </Link>
      </div>
      <div className="schedule-container595"></div>
    </div>
  )
}

export default Schedule
