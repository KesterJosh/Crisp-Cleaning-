import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

import { Helmet } from 'react-helmet'

import './reward.css'
import Menu from './menu'
import Popreward from '../components/popreward'

const Reward = (props) => {
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

  const RewardScreen = () =>{
    setCancelScreenX(true);
  }
  const CloseRewardScreen = () =>{
    setCancelScreenX(false);
  }

  useEffect(()=>{
    gsap.fromTo(".reward-container31", {y:-20, opacity:0},{y:0, opacity:1, duration:0.7, });
    gsap.fromTo(".reward-container47", {x:20, opacity:0},{x:0, opacity:1, delay:0.5,duration:0.5});
    gsap.fromTo(".reward-container63", {x:-20, opacity:0},{x:0, opacity:1, delay:0.6,duration:0.5});

    //    
    
  },[]);

  return (
    <div className="reward-container10">
      <Helmet>
        <title>reward - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="reward - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      {(cancelScreenX)?<Popreward CloseRewardScreen={CloseRewardScreen} />:null}
      <div className="reward-container11">
      <Link to="/"><img alt="image" src={require("./img/logo-200h.png")} className="reward-image10" /></Link>
        <div className="reward-container12">
          <span className="reward-text10">OVERVIEW</span>
          <Link to="/dashboard" className="reward-navlink10">
            <div className="reward-container13">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="reward-image11"
              />
              <span className="reward-text11" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Dashboard</span>
            </div>
          </Link>
          <Link to="/schedule" className="reward-navlink11">
            <div className="reward-container14">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="reward-image12"
              />
              <span className="reward-text12" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Schedule</span>
            </div>
          </Link>
          <Link to="/referral" className="reward-navlink12">
            <div className="reward-container15">
              <img
                alt="image"
                src={require("./img/link-200h.png")}
                className="reward-image13"
              />
              <span className="reward-text13" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Referrals</span>
            </div>
          </Link>
          <div className="reward-container16">
            <img
              alt="image"
              src={require("./img/lock1-200h.png")}
              className="reward-image14"
            />
            <span className="reward-text14" >Rewards</span>
          </div>
          <Link to="/cleanerspass" className="reward-navlink13">
            <div className="reward-container17">
              <img
                alt="image"
                src={require("./img/key-200h.png")}
                className="reward-image15"
              />
              <span className="reward-text15" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Cleaner's Pass</span>
            </div>
          </Link>
        </div>
        <div className="reward-container18">
          <span className="reward-text16">SETTINGS</span>
          <Link to="/settings" className="reward-navlink14">
            <div className="reward-container19">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="reward-image16"
              />
              <span className="reward-text17" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Settings</span>
            </div>
          </Link>
          <div className="reward-container20">
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="reward-image17"
            />
            <span className="reward-text18">Logout</span>
          </div>
        </div>
      </div>
      <div className="reward-container21">
        <span className="reward-text19">Rewards</span>
        <div className="reward-container22">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="reward-image18"
          />
          <div className="reward-container23">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="reward-image19"
            />
            <span className="reward-text20">Search for anything...</span>
            <input type="text" className="reward-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="reward-image20"
          />
        </Link>
        <div className="reward-container24" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
          <span className="reward-text21">Book Now</span>
        </div>
      </div>
      <div className="reward-container25">
        <div className="reward-container26">
          <span className="reward-text22">Rewards</span>
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="reward-image21"
          />
          <div className="reward-container27" onMouseEnter={(e) => SearchColorit(e.currentTarget)}
        onMouseLeave={(e) => SearchunColorit(e.currentTarget)}>
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="reward-image22"
            />
            <span className="reward-text23">Search for anything...</span>
            <input type="text" className="reward-textinput2 input" />
          </div>
          <div className="reward-container28" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
            <span className="reward-text24">Book Now</span>
          </div>
        </div>
        <div className="reward-container29">
          <div className="reward-container30">
            <div className="reward-container31">
              <span className="reward-text25" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>Challenges</span>
              <span className="reward-text26">
                Complete challenges for lifetime rewards
              </span>
              <div className="reward-container32">
                <div className="reward-container33">
                  <span className="reward-text27" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>Your Progress</span>
                  <span className="reward-text28" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)} onClick={RewardScreen}>View challenges</span>
                </div>
                <div className="reward-container34">
                  <div className="reward-container35" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                    <img
                      alt="image"
                      src={require("./img/arrowleft-200h.png")}
                      className="reward-image23"
                    />
                  </div>
                  <div className="reward-container36">
                    <div className="reward-container37">
                      <div className="reward-container38"></div>
                    </div>
                    <div className="reward-container39">
                      <span className="reward-text29">1</span>
                    </div>
                    <div className="reward-container40">
                      <p className="reward-text30">
                        <span>2</span>
                        <br></br>
                      </p>
                    </div>
                    <div className="reward-container41">
                      <p className="reward-text33">3</p>
                    </div>
                    <div className="reward-container42">
                      <span className="reward-text34">4</span>
                    </div>
                  </div>
                  <div className="reward-container43" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                    <img
                      alt="image"
                      src={require("./img/arrowright-200h.png")}
                      className="reward-image24"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="reward-container44">
              <div className="reward-container45">
                <img
                  alt="image"
                  src={require("./img/lock-200w.png")}
                  className="reward-image25"
                />
                <span className="reward-text35">To be completed</span>
              </div>
              <div className="reward-container46">
                <img
                  alt="image"
                  src={require("./img/lock-200w.png")}
                  className="reward-image26"
                />
                <span className="reward-text36">To be completed</span>
              </div>
              <div className="reward-container47">
                <div className="reward-container48">
                  <img
                    alt="image"
                    src={require("./img/lock-200w.png")}
                    className="reward-image27"
                  />
                  <span className="reward-text37">To be completed</span>
                </div>
                <div className="reward-container49">
                  <div className="reward-container50">
                    <span className="reward-text38">Refferals</span>
                    <span className="reward-text39">3 of 4</span>
                  </div>
                  <div className="reward-container51">
                    <div className="reward-container52"></div>
                  </div>
                </div>
                <div className="reward-container53">
                  <div className="reward-container54">
                    <span className="reward-text40">Cleans</span>
                    <span className="reward-text41">3 of 3</span>
                  </div>
                  <div className="reward-container55">
                    <div className="reward-container56"></div>
                  </div>
                </div>
                <div className="reward-container57">
                  <div className="reward-container58">
                    <span className="reward-text42">Miscellaneous</span>
                    <span className="reward-text43">1 of 3</span>
                  </div>
                  <div className="reward-container59">
                    <div className="reward-container60"></div>
                  </div>
                </div>
                <div className="reward-container61" onMouseEnter={(e) => handleMouseEnterFadexy(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadexy(e.currentTarget)}>
                  <span className="reward-text44" onClick={RewardScreen}>View challenges</span>
                </div>
              </div>
              <div className="reward-container62">
                <img
                  alt="image"
                  src={require("./img/reward-200w.png")}
                  className="reward-image28"
                />
                <span className="reward-text45">Rewards</span>
              </div>
              <div className="reward-container63">
                <div className="reward-container64">
                  <img
                    alt="image"
                    src={require("./img/reward-200w.png")}
                    className="reward-image29"
                  />
                  <span className="reward-text46">Rewards</span>
                </div>
                <div className="reward-container65">
                  <div className="reward-container66">
                    <img
                      alt="image"
                      src={require("./img/reward-200w.png")}
                      className="reward-image30"
                    />
                    <span className="reward-text47">Rewards</span>
                  </div>
                  <div className="reward-container67">
                    <div className="reward-container68">
                      <div className="reward-container69"></div>
                      <div className="reward-container70">
                        <span className="reward-text48">
                          <span className="reward-text49">
                            Next 3 cleans for FREE
                          </span>
                          <br className="reward-text50"></br>
                          <span className="reward-text51">
                            Complete 1 challenge
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="reward-container71" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                      <span className="reward-text52">Claim reward</span>
                    </div>
                  </div>
                  <div className="reward-container72">
                    <div className="reward-container73">
                      <div className="reward-container74"></div>
                      <div className="reward-container75">
                        <span className="reward-text53">
                          <span className="reward-text54">
                            Lifetime discount!
                          </span>
                          <br className="reward-text55"></br>
                          <span className="reward-text56">
                            Complete 3 challenges.
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="reward-container76" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                      <span className="reward-text57">Finish task</span>
                    </div>
                  </div>
                  <div className="reward-container77">
                    <div className="reward-container78" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                      <img
                        alt="image"
                        src={require("./img/arrowleft-200h.png")}
                        className="reward-image31"
                      />
                    </div>
                    <div className="reward-container79" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                      <img
                        alt="image"
                        src={require("./img/arrowright-200h.png")}
                        className="reward-image32"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Menu/>
      <div className="reward-container86"></div>
    </div>
  )
}

export default Reward
