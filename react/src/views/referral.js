import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

import { Helmet } from 'react-helmet'

import './referral.css'
import Menu from './menu'

const Referral = (props) => {

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

  useEffect(()=>{
    gsap.fromTo(".referral-container32", {y:-20, opacity:0},{y:0, opacity:1, duration:0.7, });
    gsap.fromTo(".referral-container37", {y:-20, opacity:0},{y:0, opacity:1, delay:0.2,duration:0.5});
    gsap.fromTo(".referral-container42", {x:-20, opacity:0},{x:0, opacity:1, delay:0.5,duration:0.5});
    gsap.fromTo(".referral-container79", {x:-20, opacity:0},{x:0, opacity:1, delay:0.6,duration:0.5});

    //    
    
  },[]);

  return (
    <div className="referral-container10">
      <Helmet>
        <title>referral - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="referral - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      <div className="referral-container11">
        <Link to="/"><img
          alt="image"
          src={require("./img/logo-200h.png")}
          className="referral-image10"
        /></Link>
        <div className="referral-container12">
          <span className="referral-text10">OVERVIEW</span>
          <Link to="/dashboard" className="referral-navlink10">
            <div className="referral-container13">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="referral-image11"
              />
              <span className="referral-text11" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Dashboard</span>
            </div>
          </Link>
          <Link to="/schedule" className="referral-navlink11">
            <div className="referral-container14">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="referral-image12"
              />
              <span className="referral-text12" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Schedule</span>
            </div>
          </Link>
          <div className="referral-container15">
            <img
              alt="image"
              src={require("./img/link-300w.png")}
              className="referral-image13"
            />
            <span className="referral-text13" >Referrals</span>
          </div>
          <Link to="/reward" className="referral-navlink12">
            <div className="referral-container16">
              <img
                alt="image"
                src={require("./img/lock1-200h.png")}
                className="referral-image14"
              />
              <span className="referral-text14" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Rewards</span>
            </div>
          </Link>
          <Link to="/cleanerspass" className="referral-navlink13">
            <div className="referral-container17">
              <img
                alt="image"
                src={require("./img/key-300w.png")}
                className="referral-image15"
              />
              <span className="referral-text15" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Cleaner's Pass</span>
            </div>
          </Link>
        </div>
        <div className="referral-container18">
          <span className="referral-text16">SETTINGS</span>
          <Link to="/settings" className="referral-navlink14">
            <div className="referral-container19">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="referral-image16"
              />
              <span className="referral-text17" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Settings</span>
            </div>
          </Link>
          <div className="referral-container20">
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="referral-image17"
            />
            <span className="referral-text18">Logout</span>
          </div>
        </div>
      </div>
      <div className="referral-container21">
        <span className="referral-text19">Referrals</span>
        <div className="referral-container22">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="referral-image18"
          />
          <div className="referral-container23">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="referral-image19"
            />
            <span className="referral-text20">Search for anything...</span>
            <input type="text" className="referral-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="referral-image20"
          />
        </Link>
        <div className="referral-container24">
          <span className="referral-text21">Book Now</span>
        </div>
      </div>
      <div className="referral-container25">
        <div className="referral-container26">
          <span className="referral-text22">Referrals</span>
          <div className="referral-container27">
            <img
              alt="image"
              src={require("./img/question-200h.png")}
              className="referral-image21"
            />
            <div className="referral-container28" onMouseEnter={(e) => SearchColorit(e.currentTarget)}
        onMouseLeave={(e) => SearchunColorit(e.currentTarget)}>
              <img
                alt="image"
                src={require("./img/search-200h.png")}
                className="referral-image22"
              />
              <span className="referral-text23">Search for anything...</span>
              <input type="text" className="referral-textinput2 input" />
            </div>
          </div>
          <Link to="/settings" className="referral-navlink16">
            <img
              alt="image"
              src={require("./img/setting-200h.png")}
              className="referral-image23"
            />
          </Link>
          <div className="referral-container29" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
            <span className="referral-text24">Book Now</span>
          </div>
        </div>
        <div className="referral-container30">
          <div className="referral-container31">
            <div className="referral-container32">
              <span className="referral-text25">Earn with Crisp Cleaning</span>
              <span className="referral-text26">
                Invite your friends to Crisp Cleaning, if they sign up, you and
                your friend will gain 30% OFF your next 2 cleans!
              </span>
              <div className="referral-container33">
                <div className="referral-container34">
                  <img
                    alt="image"
                    src={require("./img/sendinv-200h.png")}
                    className="referral-image24"
                    
                onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  />
                  <span className="referral-text27">Send Invitation</span>
                  <span className="referral-text28">
                    <span>
                      Send referral link to friends and tell
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <br></br>
                    <span>
                      them how useful Crisp Cleaning is!
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </span>
                </div>
                <img
                  alt="image"
                  src={require("./img/vector69-200h.png")}
                  className="referral-image25"
                />
                <div className="referral-container35">
                  <img
                    alt="image"
                    src={require("./img/addinv-200h.png")}
                    className="referral-image26"
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  />
                  <span className="referral-text32">Send Invitation</span>
                  <span className="referral-text33">
                    <span>Let your friends register to our services</span>
                    <br></br>
                    <span>using your personal referral code!</span>
                  </span>
                </div>
                <img
                  alt="image"
                  src={require("./img/vector70-200h.png")}
                  className="referral-image27"
                />
                <div className="referral-container36">
                  <img
                    alt="image"
                    src={require("./img/doneinv-200h.png")}
                    className="referral-image28"
                    onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                  />
                  <span className="referral-text37">Send Invitation</span>
                  <span className="referral-text38">
                    <span>You and your friends gain 30% OFF</span>
                    <br></br>
                    <span>your next 2 cleans!</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="referral-container37">
              <span className="referral-text42">Invite your friends!</span>
              <span className="referral-text43">
                Add your friends email addresses and send them invitations to
                join!
              </span>
              <div className="referral-container38">
                <input
                  type="text"
                  placeholder="Email addresses..."
                  className="referral-textinput3 input"
                />
                <img
                  alt="image"
                  src={require("./img/send-1500w.png")}
                  className="referral-image29"
                  onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                />
              </div>
              <span className="referral-text44">Share the referral link</span>
              <span className="referral-text45">
                You can also share your referral link by copying it and sending
                it to your friends.
              </span>
              <div className="referral-container39">
                <input
                  type="text"
                  value="HS7WN29AJ29MQ9s9uU28N"
                  placeholder="Email addresses..."
                  className="referral-textinput4 input"
                />
                <img
                  alt="image"
                  src={require("./img/copy-1500w.png")}
                  className="referral-image30"
                  onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}
                />
              </div>
            </div>
          </div>
          <div className="referral-container40">
            <div className="referral-container41">
              <div className="referral-container42">
                <div className="referral-container43">
                  <div className="referral-container44">
                    <div className="referral-container45">
                      <span className="referral-text46">
                        <span>People you have reffered</span>
                        <br></br>
                      </span>
                    </div>
                    <div className="referral-container46">
                      <span className="referral-text49">Date they joined</span>
                    </div>
                    <div className="referral-container47">
                      <span className="referral-text50">Membership</span>
                    </div>
                  </div>
                  <div className="referral-container48" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                    <div className="referral-container49">
                      <img
                        alt="image"
                        src={require("./img/fullperson-200w.png")}
                        className="referral-image31"
                      />
                      <span className="referral-text51">Alex Johnson</span>
                    </div>
                    <div className="referral-container50">
                      <span className="referral-text52">121/01/2024</span>
                    </div>
                    <div className="referral-container51">
                      <span className="referral-text53">Cleaners Pass</span>
                    </div>
                  </div>
                  <div className="referral-container52" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                    <div className="referral-container53">
                      <img
                        alt="image"
                        src={require("./img/fullperson-200w.png")}
                        className="referral-image32"
                      />
                      <span className="referral-text54">Alex Johnson</span>
                    </div>
                    <div className="referral-container54">
                      <span className="referral-text55">121/01/2024</span>
                    </div>
                    <div className="referral-container55">
                      <span className="referral-text56">Cleaners Pass</span>
                    </div>
                  </div>
                  <div className="referral-container56" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                    <div className="referral-container57">
                      <img
                        alt="image"
                        src={require("./img/fullperson-200w.png")}
                        className="referral-image33"
                      />
                      <span className="referral-text57">Alex Johnson</span>
                    </div>
                    <div className="referral-container58">
                      <span className="referral-text58">121/01/2024</span>
                    </div>
                    <div className="referral-container59">
                      <span className="referral-text59">Cleaners Pass</span>
                    </div>
                  </div>
                  <div className="referral-container60" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                    <div className="referral-container61">
                      <img
                        alt="image"
                        src={require("./img/fullperson-200w.png")}
                        className="referral-image34"
                      />
                      <span className="referral-text60">Alex Johnson</span>
                    </div>
                    <div className="referral-container62">
                      <span className="referral-text61">121/01/2024</span>
                    </div>
                    <div className="referral-container63">
                      <span className="referral-text62">Cleaners Pass</span>
                    </div>
                  </div>
                  <div className="referral-container64" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                    <div className="referral-container65">
                      <img
                        alt="image"
                        src={require("./img/fullperson-200w.png")}
                        className="referral-image35"
                      />
                      <span className="referral-text63">Alex Johnson</span>
                    </div>
                    <div className="referral-container66">
                      <span className="referral-text64">121/01/2024</span>
                    </div>
                    <div className="referral-container67">
                      <span className="referral-text65">Cleaners Pass</span>
                    </div>
                  </div>
                  <div className="referral-container68" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                    <div className="referral-container69">
                      <img
                        alt="image"
                        src={require("./img/fullperson-200w.png")}
                        className="referral-image36"
                      />
                      <span className="referral-text66">Alex Johnson</span>
                    </div>
                    <div className="referral-container70">
                      <span className="referral-text67">121/01/2024</span>
                    </div>
                    <div className="referral-container71">
                      <span className="referral-text68">Cleaners Pass</span>
                    </div>
                  </div>
                  <div className="referral-container72" onMouseEnter={(e) => handleMouseEnterFadex(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFadex(e.currentTarget)}>
                    <div className="referral-container73">
                      <img
                        alt="image"
                        src={require("./img/fullperson-200w.png")}
                        className="referral-image37"
                      />
                      <span className="referral-text69">Alex Johnson</span>
                    </div>
                    <div className="referral-container74">
                      <span className="referral-text70">121/01/2024</span>
                    </div>
                    <div className="referral-container75">
                      <span className="referral-text71">Cleaners Pass</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="referral-container76">
                <span className="referral-text72">Invite your friends!</span>
                <span className="referral-text73">
                  Add your friends email addresses and send them invitations to
                  join!
                </span>
                <div className="referral-container77">
                  <input
                    type="text"
                    placeholder="Email addresses..."
                    className="referral-textinput5 input"
                  />
                  <img
                    alt="image"
                    src={require("./img/send-1500w.png")}
                    className="referral-image38"
                  />
                </div>
                <span className="referral-text74">Share the referral link</span>
                <span className="referral-text75">
                  You can also share your referral link by copying it and
                  sending it to your friends.
                </span>
                <div className="referral-container78">
                  <input
                    type="text"
                    value="HS7WN29AJ29MQ9s9uU28N"
                    placeholder="Email addresses..."
                    className="referral-textinput6 input"
                  />
                  <img
                    alt="image"
                    src={require("./img/copy-1500w.png")}
                    className="referral-image39"
                  />
                </div>
              </div>
            </div>
            <div className="referral-container79">
              <div className="referral-container80">
                <span className="referral-text76">Share to other apps</span>
                <span className="referral-text77">
                  Share through your most used media channels!
                </span>
                <div className="referral-container81">
                  <div className="referral-container82" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                    <img
                      alt="image"
                      src={require("./img/instagram-800w.png")}
                      className="referral-image40"
                    />
                    <span className="referral-text78">Instagram</span>
                  </div>
                  <div className="referral-container83" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                    <img
                      alt="image"
                      src={require("./img/message1-800w.png")}
                      className="referral-image41"
                    />
                    <span className="referral-text79">
                      <span>Messages</span>
                      <br></br>
                    </span>
                  </div>
                  <div className="referral-container84" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                    <img
                      alt="image"
                      src={require("./img/discord-800w.png")}
                      className="referral-image42"
                    />
                    <span className="referral-text82">
                      <span>Discord</span>
                      <br></br>
                    </span>
                  </div>
                  <div className="referral-container85" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                    <img
                      alt="image"
                      src={require("./img/whatsapp-800w.png")}
                      className="referral-image43"
                    />
                    <span className="referral-text85">
                      <span>Whatsapp</span>
                      <br></br>
                    </span>
                  </div>
                  <div className="referral-container86" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                    <img
                      alt="image"
                      src={require("./img/notebook-800w.png")}
                      className="referral-image44"
                    />
                    <span className="referral-text88">Notes</span>
                  </div>
                  <div className="referral-container87" onMouseEnter={(e) => handleMouseEnterFade(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveFade(e.currentTarget)}>
                    <img
                      alt="image"
                      src={require("./img/telegram-800w.png")}
                      className="referral-image45"
                    />
                    <span className="referral-text89">Notes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="referral-container88">
              <span className="referral-text90">View Rewards</span>
              <img
                alt="image"
                src={require("./img/arrow-200w.png")}
                className="referral-image46"
              />
            </div>
          </div>
        </div>
      </div>
      <Menu/>
      <div className="referral-container95"></div>
    </div>
  )
}

export default Referral
