import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './cleanerspass2.css'

const Cleanerspass2 = (props) => {
  return (
    <div className="cleanerspass2-container10">
      <Helmet>
        <title>cleanerspass2 - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="cleanerspass2 - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      <div className="cleanerspass2-container11">
      <Link to="/"><img
          alt="image"
          src={require("./img/logo-200h.png")}
          className="cleanerspass2-image10"
        /></Link>
        <div className="cleanerspass2-container12">
          <span className="cleanerspass2-text10">OVERVIEW</span>
          <Link to="/dashboard" className="cleanerspass2-navlink10">
            <div className="cleanerspass2-container13">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="cleanerspass2-image11"
              />
              <span className="cleanerspass2-text11">Dashboard</span>
            </div>
          </Link>
          <Link to="/schedule1" className="cleanerspass2-navlink11">
            <div className="cleanerspass2-container14">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="cleanerspass2-image12"
              />
              <span className="cleanerspass2-text12">Schedule</span>
            </div>
          </Link>
          <Link to="/referral" className="cleanerspass2-navlink12">
            <div className="cleanerspass2-container15">
              <img
                alt="image"
                src={require("./img/link-200h.png")}
                className="cleanerspass2-image13"
              />
              <span className="cleanerspass2-text13">Referrals</span>
            </div>
          </Link>
          <Link to="/reward" className="cleanerspass2-navlink13">
            <div className="cleanerspass2-container16">
              <img
                alt="image"
                src={require("./img/lock1-200h.png")}
                className="cleanerspass2-image14"
              />
              <span className="cleanerspass2-text14">Rewards</span>
            </div>
          </Link>
          <Link to="/cleanerspass" className="cleanerspass2-navlink14">
            <div className="cleanerspass2-container17">
              <img
                alt="image"
                src={require("./img/key-200h.png")}
                className="cleanerspass2-image15"
              />
              <span className="cleanerspass2-text15">Cleaner's Pass</span>
            </div>
          </Link>
        </div>
        <div className="cleanerspass2-container18">
          <span className="cleanerspass2-text16">SETTINGS</span>
          <Link to="/settings" className="cleanerspass2-navlink15">
            <div className="cleanerspass2-container19">
              <img
                alt="image"
                src={require("./img/settings_x-200h.png")}
                className="cleanerspass2-image16"
              />
              <span className="cleanerspass2-text17">Settings</span>
            </div>
          </Link>
          <div className="cleanerspass2-container20">
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="cleanerspass2-image17"
            />
            <span className="cleanerspass2-text18">Logout</span>
          </div>
        </div>
      </div>
      <div className="cleanerspass2-container21">
        <span className="cleanerspass2-text19">Cleaner&apos;s Pass</span>
        <div className="cleanerspass2-container22">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="cleanerspass2-image18"
          />
          <div className="cleanerspass2-container23">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="cleanerspass2-image19"
            />
            <span className="cleanerspass2-text20">Search for anything...</span>
            <input type="text" className="cleanerspass2-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="cleanerspass2-image20"
          />
        </Link>
        <div className="cleanerspass2-container24">
          <span className="cleanerspass2-text21">Book Now</span>
        </div>
      </div>
      <div className="cleanerspass2-container25">
        <div className="cleanerspass2-container26">
          <span className="cleanerspass2-text22">Cleaner&apos;s Pass</span>
          <div className="cleanerspass2-container27">
            <img
              alt="image"
              src={require("./img/question-200h.png")}
              className="cleanerspass2-image21"
            />
            <div className="cleanerspass2-container28">
              <img
                alt="image"
                src={require("./img/search-200h.png")}
                className="cleanerspass2-image22"
              />
              <span className="cleanerspass2-text23">
                Search for anything...
              </span>
              <input type="text" className="cleanerspass2-textinput2 input" />
            </div>
          </div>
          <Link to="/settings" className="cleanerspass2-navlink17">
            <img
              alt="image"
              src={require("./img/setting-200h.png")}
              className="cleanerspass2-image23"
            />
          </Link>
          <div className="cleanerspass2-container29">
            <span className="cleanerspass2-text24">Book Now</span>
          </div>
        </div>
        <div className="cleanerspass2-container30">
          <div className="cleanerspass2-container31">
            <div className="cleanerspass2-container32">
              <span className="cleanerspass2-text25">
                Earn rewards. Save more. Cancel anytime.
              </span>
              <span className="cleanerspass2-text26">
                Upgrade to our Cleaner’s Pass to gain access to more features
              </span>
            </div>
            <div className="cleanerspass2-container33">
              <div className="cleanerspass2-container34">
                <span className="cleanerspass2-text27">
                  Level up your cleaning experience with the Cleaners Pass
                </span>
                <span className="cleanerspass2-text28">
                  Exclusive access to premium features across your cleaning
                  experience.
                </span>
              </div>
              <Link to="/cleanerspass" className="cleanerspass2-navlink18">
                <div className="cleanerspass2-container35">
                  <span className="cleanerspass2-text29">
                    <span>View</span>
                    <br></br>
                  </span>
                </div>
              </Link>
            </div>
            <div className="cleanerspass2-container36">
              <div className="cleanerspass2-container37">
                <span className="cleanerspass2-text32">
                  Why schedule regular cleans?
                </span>
                <div className="cleanerspass2-container38">
                  <div className="cleanerspass2-container39">
                    <div className="cleanerspass2-container40">
                      <div className="cleanerspass2-container41"></div>
                      <span className="cleanerspass2-text33">
                        <span className="cleanerspass2-text34">
                          Massive Savings
                        </span>
                        <br className="cleanerspass2-text35"></br>
                        <span>
                          Maintain a clean home, for cheaper!
                          <span
                            dangerouslySetInnerHTML={{
                              __html: ' ',
                            }}
                          />
                        </span>
                      </span>
                    </div>
                    <div className="cleanerspass2-container42">
                      <div className="cleanerspass2-container43"></div>
                      <span className="cleanerspass2-text37">
                        <span className="cleanerspass2-text38">
                          Earn Rewards
                        </span>
                        <br className="cleanerspass2-text39"></br>
                        <span>
                          Reach milestones and earn greater discounts...for
                          life!
                          <span
                            dangerouslySetInnerHTML={{
                              __html: ' ',
                            }}
                          />
                        </span>
                      </span>
                    </div>
                    <div className="cleanerspass2-container44">
                      <div className="cleanerspass2-container45"></div>
                      <span className="cleanerspass2-text41">
                        <span className="cleanerspass2-text42">
                          Maintain Cleanliness
                        </span>
                        <br className="cleanerspass2-text43"></br>
                        <span>
                          We’ll take it from here! Our ongoing service allows
                          you to forget about cleaning, and ensure your home is
                          always pristine.
                          <span
                            dangerouslySetInnerHTML={{
                              __html: ' ',
                            }}
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="cleanerspass2-container46">
                    <div className="cleanerspass2-container47">
                      <div className="cleanerspass2-container48"></div>
                      <span className="cleanerspass2-text45">
                        <span className="cleanerspass2-text46">No Lock In</span>
                        <br className="cleanerspass2-text47"></br>
                        <span>
                          We understand when circumstances change. Cancel at any
                          time!
                        </span>
                      </span>
                    </div>
                    <div className="cleanerspass2-container49">
                      <div className="cleanerspass2-container50"></div>
                      <span className="cleanerspass2-text49">
                        <span className="cleanerspass2-text50">
                          Flexibility
                        </span>
                        <br className="cleanerspass2-text51"></br>
                        <span>
                          We will get to know you, and adjust accordingly!
                          Reschedule at your convenience.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cleanerspass2-container51">
                <div className="cleanerspass2-container52">
                  <div className="cleanerspass2-container53">
                    <div className="cleanerspass2-container54">
                      <span className="cleanerspass2-text53">
                        Cleaner’s Pass
                      </span>
                    </div>
                  </div>
                </div>
                <div className="cleanerspass2-container55">
                  <div className="cleanerspass2-container56">
                    <span className="cleanerspass2-text54">Every:</span>
                    <select className="cleanerspass2-select1">
                      <option value="Week">Week</option>
                      <option value="Fortnight">Fortnight</option>
                      <option value="Month">Month</option>
                    </select>
                  </div>
                  <div className="cleanerspass2-container57">
                    <span className="cleanerspass2-text55">On:</span>
                    <select className="cleanerspass2-select2">
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="cleanerspass2-button1 button"
                  >
                    Reschedule
                  </button>
                  <button
                    type="button"
                    className="cleanerspass2-button2 button"
                  >
                    Cancel Membership
                  </button>
                </div>
                <div className="cleanerspass2-container58">
                  <div className="cleanerspass2-container59">
                    <div className="cleanerspass2-container60">
                      <span className="cleanerspass2-text56">
                        Cleaning Summary
                      </span>
                      <img
                        alt="image"
                        src={require("./img/down arrow-200h.png")}
                        className="cleanerspass2-image24"
                      />
                    </div>
                    <span className="cleanerspass2-text57">
                      Have a discount code?
                    </span>
                  </div>
                  <span className="cleanerspass2-text58">
                    <span>
                      Total
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <span className="cleanerspass2-text60">$172.99</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cleanerspass2-container61">
        <Link to="/dashboard">
          <div className="cleanerspass2-container62">
            <img
              alt="image"
              src={require("./img/homep-200h.png")}
              className="cleanerspass2-image25"
            />
            <span className="cleanerspass2-text61">Dashboard</span>
          </div>
        </Link>
        <Link to="/schedule1">
          <div className="cleanerspass2-container63">
            <img
              alt="image"
              src={require("./img/calenderx-200h.png")}
              className="cleanerspass2-image26"
            />
            <span className="cleanerspass2-text62">Schedule</span>
          </div>
        </Link>
        <Link to="/cleanerspass">
          <div className="cleanerspass2-container64">
            <img
              alt="image"
              src={require("./img/key-200h.png")}
              className="cleanerspass2-image27"
            />
            <span className="cleanerspass2-text63">Cleaners Pass</span>
          </div>
        </Link>
        <Link to="/reward">
          <div className="cleanerspass2-container65">
            <img
              alt="image"
              src={require("./img/lock1-200h.png")}
              className="cleanerspass2-image28"
            />
            <span className="cleanerspass2-text64">Rewards</span>
          </div>
        </Link>
        <Link to="/referral">
          <div className="cleanerspass2-container66">
            <img
              alt="image"
              src={require("./img/link-200h.png")}
              className="cleanerspass2-image29"
            />
            <span className="cleanerspass2-text65">Referrals</span>
          </div>
        </Link>
      </div>
      <div className="cleanerspass2-container67"></div>
    </div>
  )
}

export default Cleanerspass2
