import React, { useEffect } from 'react'
import gsap from 'gsap';
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './dashboard.css'
import Menu from './menu';

const Dashboard = (props) => {

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

  const handleMouseEnterFade = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      background:'rgba(250,250,250,0.7)',
      // borderRadius:'100%',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveFade = (button) => {
    gsap.to(button, {
      background:'rgba(250,250,250,0)',
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };
  const handleMouseEnterFadeY = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      background:'rgba(250,250,250,0.7)',
      // borderRadius:'100%',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveFadeY = (button) => {
    gsap.to(button, {
      background:'#FFE2D0',
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

  useEffect(()=>{
    gsap.fromTo(".dashboard-container118", {y:-20, opacity:0},{y:0, opacity:1, duration:0.7, });
    gsap.fromTo(".dashboard-container121", {y:-20, opacity:0},{y:0, opacity:1, delay:0.2,duration:0.5});
    gsap.fromTo(".dashboard-container160", {y:-20, opacity:0},{y:0, opacity:1, delay:0.4,duration:0.5});
    gsap.fromTo(".dashboard-container164", {x:-20, opacity:0},{x:0, opacity:1, delay:0.5,duration:0.5});
    gsap.fromTo(".dashboard-text207", {x:-20, opacity:0},{x:0, opacity:1, delay:0.6,duration:0.5});
    gsap.fromTo(".dashboard-container193", {x:-20, opacity:0},{x:0, opacity:1, delay:0.7,duration:0.5});

    //    
    
  },[]);


  return (
    <div className="dashboard-container100">
      <Helmet>
        <title>dashboard - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="dashboard - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      <div className="dashboard-container101">
        <Link to="/"> <img
          alt="image"
          src={require("./img/logo-200h.png")}
          className="dashboard-image10"
        /></Link>
        <div className="dashboard-container102">
          <span className="dashboard-text100">OVERVIEW</span>
          <div className="dashboard-container103">
            <img
              alt="image"
              src={require("./img/homep-200h.png")}
              className="dashboard-image11"
            />
            <span className="dashboard-text101">Dashboard</span>
          </div>
          <Link to="/schedule" className="dashboard-navlink10">
            <div className="dashboard-container104">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="dashboard-image12"
              />
              <span className="dashboard-text102" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Schedule</span>
            </div>
          </Link>
          <Link to="/referral" className="dashboard-navlink11">
            <div className="dashboard-container105">
              <img
                alt="image"
                src={require("./img/link-200h.png")}
                className="dashboard-image13"
              />
              <span className="dashboard-text103" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Referrals</span>
            </div>
          </Link>
          <Link to="/reward" className="dashboard-navlink12">
            <div className="dashboard-container106">
              <img
                alt="image"
                src={require("./img/lock1-200h.png")}
                className="dashboard-image14"
              />
              <span className="dashboard-text104" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Rewards</span>
            </div>
          </Link>
          <Link to="/cleanerspass" className="dashboard-navlink13">
            <div className="dashboard-container107">
              <img
                alt="image"
                src={require("./img/key-200h.png")}
                className="dashboard-image15"
              />
              <span className="dashboard-text105" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Cleaner's Pass</span>
            </div>
          </Link>
        </div>
        <div className="dashboard-container108">
          <span className="dashboard-text106">SETTINGS</span>
          <Link to="/settings" className="dashboard-navlink14">
            <div className="dashboard-container109">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="dashboard-image16"
              />
              <span className="dashboard-text107" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Settings</span>
            </div>
          </Link>
          <div className="dashboard-container110">
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="dashboard-image17"
            />
            <span className="dashboard-text108">Logout</span>
          </div>
        </div>
      </div>
      <div className="dashboard-container111">
        <div className="dashboard-container112">
          <span className="dashboard-text109">Dashboard</span>
          <div className="dashboard-container113">
            <img
              alt="image"
              src={require("./img/question-200h.png")}
              className="dashboard-image18"
            />
            <div className="dashboard-container114" onMouseEnter={(e) => SearchColorit(e.currentTarget)}
        onMouseLeave={(e) => SearchunColorit(e.currentTarget)}>
              <img
                alt="image"
                src={require("./img/search-200h.png")}
                className="dashboard-image19"
              />
              <span className="dashboard-text110">Search for anything...</span>
              <input type="text" className="dashboard-textinput input" />
            </div>
          </div>
          <div className="dashboard-container115"  onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
            <span className="dashboard-text111">Book Now</span>
          </div>
          <Link to="/settingsroom" className="dashboard-navlink15">
            <img
              alt="image"
              src={require("./img/setting-200h.png")}
              className="dashboard-image20"
            />
          </Link>
        </div>
        <div className="dashboard-container116">
          <div className="dashboard-container117">
            <div className="dashboard-container118">
              <div className="dashboard-container119">
                <span className="dashboard-text112">Upcoming: DD/MM/YY</span>
                <span className="dashboard-text113">
                  <br></br>
                  <span>Scheduled every ‘frequency’</span>
                </span>
              </div>
              <div className="dashboard-container120">
                <button type="button" className="dashboard-button1 button" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
                  Request cancellation
                </button>
                <button type="button" className="dashboard-button2 button" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
                  Edit booking
                </button>
              </div>
            </div>
            <span className="dashboard-text116">
              <span className="dashboard-text117">Cleaning History</span>
              <br></br>
            </span>
            <div className="dashboard-container121">
              <div
                id="custom-scroll"
                className="custom-scroll dashboard-container122"
              >
                <div className="dashboard-container123" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                  <div className="dashboard-container124">
                    <div className="dashboard-container125">
                      <div className="dashboard-container126">
                        <img
                          alt="image"
                          src={require("./img/medal_x-200h.png")}
                          className="dashboard-image21"
                        />
                        <div className="dashboard-container127">
                          <div className="dashboard-container128"></div>
                        </div>
                      </div>
                      <span className="dashboard-text119">Deep clean</span>
                    </div>
                    <div className="dashboard-container129">
                      <span className="dashboard-text120">In Progress...</span>
                      <span className="dashboard-text121">
                        <span>Deep clean</span>
                        <br></br>
                        <span>
                          1X Bathroom, 1X Kitchen, 3X Bedroom, 2X Toilet
                        </span>
                      </span>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/progressbadge-400h.png")}
                    className="dashboard-image22"
                  />
                </div>
                <div className="dashboard-container130"  onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                  <div className="dashboard-container131">
                    <div className="dashboard-container132">
                      <div className="dashboard-container133">
                        <img
                          alt="image"
                          src={require("./img/medal_x-200h.png")}
                          className="dashboard-image23"
                        />
                        <div className="dashboard-container134">
                          <div className="dashboard-container135"></div>
                        </div>
                      </div>
                      <span className="dashboard-text125">Vacant clean</span>
                    </div>
                    <div className="dashboard-container136">
                      <span className="dashboard-text126">Completed</span>
                      <span className="dashboard-text127">
                        <span>Vacate Clean</span>
                        <br></br>
                        <span>1X Bathroom, 1X Kitchen, 5X Bedroom</span>
                      </span>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/click-400h.png")}
                    className="dashboard-image24"
                  />
                </div>
                <div className="dashboard-container137"  onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                  <div className="dashboard-container138">
                    <div className="dashboard-container139">
                      <div className="dashboard-container140">
                        <img
                          alt="image"
                          src={require("./img/medal_x-200h.png")}
                          className="dashboard-image25"
                        />
                        <div className="dashboard-container141">
                          <div className="dashboard-container142"></div>
                        </div>
                      </div>
                      <span className="dashboard-text131">Vacant clean</span>
                    </div>
                    <div className="dashboard-container143">
                      <span className="dashboard-text132">Completed</span>
                      <span className="dashboard-text133">
                        <span>Vacate Clean</span>
                        <br></br>
                        <span>1X Bathroom, 1X Kitchen, 5X Bedroom</span>
                      </span>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/click-400h.png")}
                    className="dashboard-image26"
                  />
                </div>
                <div className="dashboard-container144"  onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                  <div className="dashboard-container145">
                    <div className="dashboard-container146">
                      <div className="dashboard-container147">
                        <img
                          alt="image"
                          src={require("./img/medal_x-200h.png")}
                          className="dashboard-image27"
                        />
                        <div className="dashboard-container148">
                          <div className="dashboard-container149"></div>
                        </div>
                      </div>
                      <span className="dashboard-text137">Vacant clean</span>
                    </div>
                    <div className="dashboard-container150">
                      <span className="dashboard-text138">Completed</span>
                      <span className="dashboard-text139">
                        <span>Vacate Clean</span>
                        <br></br>
                        <span>1X Bathroom, 1X Kitchen, 5X Bedroom</span>
                      </span>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/click-400h.png")}
                    className="dashboard-image28"
                  />
                </div>
                <div className="dashboard-container151"  onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                  <div className="dashboard-container152">
                    <div className="dashboard-container153">
                      <div className="dashboard-container154">
                        <img
                          alt="image"
                          src={require("./img/medal_x-200h.png")}
                          className="dashboard-image29"
                        />
                        <div className="dashboard-container155">
                          <div className="dashboard-container156"></div>
                        </div>
                      </div>
                      <span className="dashboard-text143">Vacant clean</span>
                    </div>
                    <div className="dashboard-container157">
                      <span className="dashboard-text144">Completed</span>
                      <span className="dashboard-text145">
                        <span>Vacate Clean</span>
                        <br></br>
                        <span>1X Bathroom, 1X Kitchen, 5X Bedroom</span>
                      </span>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/click-400h.png")}
                    className="dashboard-image30"
                  />
                </div>
              </div>
              <div className="dashboard-container158">
                <span className="dashboard-text149">View all</span>
              </div>
            </div>
            <div className="dashboard-container159">
              <span className="dashboard-text150">
                <span>Upcoming</span>
                <br></br>
              </span>
            </div>
            <div className="dashboard-container160">
              <Link to="/schedule" className="dashboard-container161" onMouseEnter={(e) => handleMouseEnterFadeY(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFadeY(e.currentTarget)}>
                <span className="dashboard-text153">View Full Calender </span>
                <img
                    alt="image"
                    src={require("./img/arrow-200w.png")}
                    className="dashboard-image31"
                  />
              </Link>
              <Link to="/schedule"  className="dashboard-container162" onMouseEnter={(e) => handleMouseEnterFadeY(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFadeY(e.currentTarget)}>
                <span className="dashboard-text155">
                  <span className="dashboard-text156">View Full Calender</span>
                  <br></br>
                </span>
              </Link>
            </div>
          </div>
          <span className="dashboard-text158">
            Invite Friends
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <span className="dashboard-text159">
            <span className="dashboard-text160">Notifications</span>
            <br></br>
          </span>
          <div className="dashboard-container163">
            <span className="dashboard-text162">Notifications</span>
            <div className="dashboard-container164">
              <span className="dashboard-text163">Notifications</span>
              <div id="custom-scroll" className="dashboard-container165">
                <div className="dashboard-container166" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                  <div className="dashboard-container167"></div>
                  <div className="dashboard-container168">
                    <span className="dashboard-text164">
                      zvs.vonstoll@gmail.com accepted your invitation to
                      collaborate
                    </span>
                    <span className="dashboard-text165">
                      View People &amp; Roles
                    </span>
                    <span className="dashboard-text166">
                      <span>Richmond Apartment | </span>
                      <span className="dashboard-text168">
                        November 24, 2023
                      </span>
                    </span>
                  </div>
                </div>
                <div className="dashboard-container169" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                  <div className="dashboard-container170"></div>
                  <div className="dashboard-container171">
                    <span className="dashboard-text169">
                      zvs.vonstoll@gmail.com accepted your invitation to
                      collaborate
                    </span>
                    <span className="dashboard-text170">
                      View People &amp; Roles
                    </span>
                    <span className="dashboard-text171">
                      <span>Richmond Apartment | </span>
                      <span className="dashboard-text173">
                        November 24, 2023
                      </span>
                    </span>
                  </div>
                </div>
                <div className="dashboard-container172" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                  <div className="dashboard-container173"></div>
                  <div className="dashboard-container174">
                    <span className="dashboard-text174">
                      zvs.vonstoll@gmail.com accepted your invitation to
                      collaborate
                    </span>
                    <span className="dashboard-text175">
                      View People &amp; Roles
                    </span>
                    <span className="dashboard-text176">
                      <span>Richmond Apartment | </span>
                      <span className="dashboard-text178">
                        November 24, 2023
                      </span>
                    </span>
                  </div>
                </div>
                <div className="dashboard-container175" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                  <div className="dashboard-container176"></div>
                  <div className="dashboard-container177">
                    <span className="dashboard-text179">
                      zvs.vonstoll@gmail.com accepted your invitation to
                      collaborate
                    </span>
                    <span className="dashboard-text180">
                      View People &amp; Roles
                    </span>
                    <span className="dashboard-text181">
                      <span>Richmond Apartment | </span>
                      <span className="dashboard-text183">
                        November 24, 2023
                      </span>
                    </span>
                  </div>
                </div>
                <div className="dashboard-container178" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                  <div className="dashboard-container179"></div>
                  <div className="dashboard-container180">
                    <span className="dashboard-text184">
                      zvs.vonstoll@gmail.com accepted your invitation to
                      collaborate
                    </span>
                    <span className="dashboard-text185">
                      View People &amp; Roles
                    </span>
                    <span className="dashboard-text186">
                      <span>Richmond Apartment | </span>
                      <span className="dashboard-text188">
                        November 24, 2023
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <span className="dashboard-text189">
              Invite Friends
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <div className="dashboard-container181">
              <div className="dashboard-container182">
                <div className="dashboard-container183">
                  <span className="dashboard-text190">Notifications</span>
                  <span className="dashboard-text191">Mark all as read</span>
                </div>
                <div className="dashboard-container184">
                  <div className="dashboard-container185"></div>
                  <div className="dashboard-container186">
                    <span className="dashboard-text192">
                      zvs.vonstoll@gmail.com accepted your invitation to
                      collaborate
                    </span>
                    <span className="dashboard-text193">
                      View People &amp; Roles
                    </span>
                    <span className="dashboard-text194">
                      <span>Richmond Apartment | </span>
                      <span className="dashboard-text196">
                        November 24, 2023
                      </span>
                    </span>
                  </div>
                </div>
                <div className="dashboard-container187">
                  <div className="dashboard-container188"></div>
                  <div className="dashboard-container189">
                    <span className="dashboard-text197">
                      zvs.vonstoll@gmail.com accepted your invitation to
                      collaborate
                    </span>
                    <span className="dashboard-text198">
                      View People &amp; Roles
                    </span>
                    <span className="dashboard-text199">
                      <span>Richmond Apartment | </span>
                      <span className="dashboard-text201">
                        November 24, 2023
                      </span>
                    </span>
                  </div>
                </div>
                <div className="dashboard-container190">
                  <div className="dashboard-container191"></div>
                  <div className="dashboard-container192">
                    <span className="dashboard-text202">
                      zvs.vonstoll@gmail.com accepted your invitation to
                      collaborate
                    </span>
                    <span className="dashboard-text203">
                      View People &amp; Roles
                    </span>
                    <span className="dashboard-text204">
                      <span>Richmond Apartment | </span>
                      <span className="dashboard-text206">
                        November 24, 2023
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <span className="dashboard-text207">
              Invite friends
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <div className="dashboard-container193">
              <div className="dashboard-container194">
                <span className="dashboard-text208">Refer a Friend</span>
                <span className="dashboard-text209">
                  And earn rewards back on all their transactions
                </span>
                <span className="dashboard-text210">How it works</span>
                <div className="dashboard-container195">
                  <div className="dashboard-container196">
                    <div className="dashboard-container197">
                      <span className="dashboard-text211">1</span>
                    </div>
                    <span className="dashboard-text212">
                      <span className="dashboard-text213">
                        Invite your friends
                      </span>
                      <br className="dashboard-text214"></br>
                      <span className="dashboard-text215">
                        share the code with them
                      </span>
                    </span>
                  </div>
                  <div className="dashboard-container198">
                    <div className="dashboard-container199">
                      <span className="dashboard-text216">2</span>
                    </div>
                    <span className="dashboard-text217">
                      <span className="dashboard-text218">
                        They initiate any transaction
                      </span>
                      <br className="dashboard-text219"></br>
                      <span className="dashboard-text220">
                        then you both get 20% OFF next 3 cleans
                      </span>
                    </span>
                  </div>
                </div>
                <Link to="/referral" className="dashboard-container200" onMouseEnter={(e) => handleMouseEnterFadeY(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeaveFadeY(e.currentTarget)}>
                  <span className="dashboard-text221">Your Referral Code</span>
                  <img
                    alt="image"
                    src={require("./img/arrow-200w.png")}
                    className="dashboard-image31"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Menu />
      <div className="dashboard-container207"></div>
    </div>
  )
}

export default Dashboard
