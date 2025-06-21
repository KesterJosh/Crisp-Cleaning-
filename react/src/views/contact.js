import { useState, useEffect, useRef } from "react";

import { Helmet } from "react-helmet";
import axios from "axios";
import gsap from "gsap";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

import "./contact.css";
import "./home.css";
import Mobilex from "./mobile";
import Login from "./login";
import RegisterPopup from "../components/RegisterPopup";

const Contact = (props) => {
  const handleMouseEnter = (event) => {
    const container = event.currentTarget;

    // Animation for mouse enter
    const child1 = container.querySelector(":nth-child(1)");
    gsap.to(child1, { color: "#FF914D", scale: 1.2, duration: 0.5 });

    // Accessing and animating children
    const child2 = container.querySelector(":nth-child(2)");
    gsap.to(child2, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = (event) => {
    const container = event.currentTarget;

    // Animation for mouse leave
    const child1 = container.querySelector(":nth-child(1)");
    gsap.to(child1, { color: "#515151", scale: 1, duration: 0.5 });

    // Reverting children to their original state
    const child2 = container.querySelector(":nth-child(2)");
    gsap.to(child2, { opacity: 0, duration: 0.3 });
  };

  const MobileMenu = useRef(null);

  const openmenu = () => {
    // MobileMenu.current.style.bottom='20%';
    gsap.to(".home-image", {
      display: "block",
      duration: 0.5,
    });
    gsap.to(".home-container003", {
      display: "block",
      duration: 0.5,
    });
    gsap.to(".home-container004", {
      display: "block",
      duration: 0.5,
    });
    gsap.to(".home-container005", {
      display: "block",
      duration: 0.5,
    });
    gsap.to(".home-container006", {
      display: "block",
      duration: 0.5,
    });
    gsap.to(".home-container007", {
      display: "block",
      duration: 0.5,
    });

    gsap.to(MobileMenu.current, { bottom: "20%", duration: 0.8 });
    MobileMenu.current.style.display = "block";
  };

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const closemenu = () => {
    // MobileMenu.current.style.bottom='100%';
    gsap.to(MobileMenu.current, {
      bottom: "100%",
      duration: 0.8,
      onComplete: () => {
        MobileMenu.current.style.display = "none";
      },
    });
    gsap.to(".home-image", {
      display: "none",
      duration: 0.3,
    });
    gsap.to(".home-container003", {
      display: "none",
      duration: 0.3,
    });
    gsap.to(".home-container004", {
      display: "none",
      duration: 0.3,
    });
    gsap.to(".home-container005", {
      display: "none",
      duration: 0.3,
    });
    gsap.to(".home-container006", {
      display: "none",
      duration: 0.3,
    });
    gsap.to(".home-container007", {
      display: "none",
      duration: 0.3,
    });
  };

  const handleMouseEnterX = (event) => {
    const container = event.currentTarget;
    gsap.to(container, { scale: 1.1 });
  };

  const handleMouseLeaveX = (event) => {
    const container = event.currentTarget;
    gsap.to(container, { scale: 1 });
  };
  // contact-text36
  const clickEmail = (event) => {
    const container = event.currentTarget;
    gsap.to(container, { color: "red", fontWeight: "600" });
  };

  const unclickEmail = (event) => {
    const container = event.currentTarget;
    gsap.to(container, { color: "#ff914d", fontWeight: "400" });
  };
  const unclickEmailx = (event) => {
    const container = event.currentTarget;
    gsap.to(container, { color: "white", fontWeight: "400" });
  };

  const activateX = (event) => {
    const container = event.currentTarget;
    gsap.to(container, { scale: 1.1, duration: 0.3 });
  };

  const offX = (event) => {
    const container = event.currentTarget;
    gsap.to(container, { scale: 1, duration: 0.3 });
  };

  // Menu Section
  const [closedx, setClosedx] = useState(0);
  const mobileMenu = () => {
    gsap.fromTo(
      ".Mobilegeneral",
      { top: "-100%" },
      {
        duration: 0.01,
        top: "0%",
      }
    );
  };
  const closeMenuX = () => {
    gsap.fromTo(
      ".Mobilegeneral",
      { top: "0%" },
      {
        duration: 0.01,
        top: "-100%",
      }
    );
  };

  const [first_name, setFName] = useState("");
  const [last_name, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://api-crisp-cleaning.onrender.com/contactus", {
        first_name,
        last_name,
        email,
        phone,
        message,
      })
      .then((result) => {
        console.log(result);
        if ((result.data = "Successful")) {
          alert(
            "Your informations has been submitted successfully. We will contact you after going through the info"
          );
        } else {
          alert(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
        // alert(error.message);
        if (error.message === "Request failed with status code 400") {
          alert("This email has been registered before. Kindly Login");
        } else {
          alert("Something went wrong! Check your internet connection");
        }
      });
  };

  const navigateS = () => {
    window.location.href = "/#/dashboard"; // Full page reload
  };

  return (
    <div className="contact-container">
      {login && (
        <Login CloseLogin={() => setLogin(false)} navigateS={navigateS} />
      )}
      {register && <RegisterPopup onClose={() => setRegister(false)} />}
      <Helmet>
        <title>Contact - Crisp Cleaning</title>
        <meta property="og:title" content="Contact - Crisp Cleaning" />
      </Helmet>
      {/* <div className="contact-header">
          <div className="contact-container02">
            <div className="contact-container03">
              <img
                alt="image"
                src="/1%20no%20bg%20(1)%203-200h.png"
                className="contact-image"
              />
              <span>Home</span>
              <span>About</span>
              <span>Review</span>
              <span>FAQs</span>
              <span>Contact</span>
            </div>
            <div className="contact-container04">
              <span>Login</span>
              <button type="button" className="contact-button button">
                Get Started Now
              </button>
            </div>
          </div>
        </div> */}

      <div className="home-container001" ref={MobileMenu} style={{}}>
        <div className="home-container002">
          <img
            alt="image"
            src={require("./img/logowhite-200h.png")}
            className="home-image"
          />
        </div>
        <div className="home-container003" onClick={closemenu}>
          <span className="home-text">Home</span>
        </div>
        <Link to="/about" className="home-container004">
          <span className="home-text001">About</span>
        </Link>
        <Link to="/review" className="home-container005">
          <span className="home-text002">Reviews</span>
        </Link>
        <Link to="/faqs" className="home-container006">
          <span className="home-text003">FAQs</span>
        </Link>
        <Link to="/contact" className="home-container007">
          <span className="home-text004">Contact</span>
        </Link>
        <div className="home-container008">
          <div className="home-container009">
            <button type="button" className="button home-button">
              Login
            </button>
            <button type="button" className="button home-button01">
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      <div className="contact-container01">
        <div className="home-container010">
          <div className="MenuBug">
            <img
              alt="image"
              src={require("./img/logo-200h.png")}
              className="home-image01"
            />

            <div className="home-container011">
              {/* {Summary}/ {tabs}/{type} / {(sum)?"On":"Off"} */}
              <Link
                to="/"
                className="home-container013"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="home-text006">Home</span>
                <div className="underLine"></div>
              </Link>
              <Link
                to="/about"
                className="home-container013"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="home-text006">About</span>
                <div className="underLine"></div>
              </Link>
              <Link
                to="/review"
                className="home-container013"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="home-text006">Reviews</span>
                <div className="underLine"></div>
              </Link>
              <Link
                to="/faqs"
                className="home-container013"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="home-text006">FAQs</span>
                <div className="underLine"></div>
              </Link>
              <Link to="/contact" className="home-container013">
                <span className="home-text005">Contact</span>
              </Link>
            </div>
          </div>

          <div className="home-container017">
            <div
              className="home-container013"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => setLogin(true)}
            >
              <span className="home-text010">Login</span>
            </div>
            <span
              className="home-text011"
              onMouseEnter={handleMouseEnterX}
              onMouseLeave={handleMouseLeaveX}
              onClick={() => setRegister(true)}
            >
              Get Started Now
            </span>
          </div>
        </div>
        <Mobilex mobileM={mobileMenu} />
        {/* Menu  */}
        <div className="Mobilegeneral">
          <img
            src="https://raw.githubusercontent.com/KesterJosh/Website-SampleX/main/close.png"
            className="closeXMenu"
            onClick={() => {
              closeMenuX();
            }}
          />
          <Link to="/">
            <h2>Home</h2>
          </Link>
          <Link to="/about">
            <h2>About</h2>
          </Link>
          <Link to="/review">
            <h2>Reviews</h2>
          </Link>
          <Link to="/faqs">
            <h2>FAQs</h2>
          </Link>
          <Link to="/contact">
            <h2 className="appointed">Contact</h2>
          </Link>
        </div>

        <div className="contact-container05">
          <h1 className="contact-text06">Communication is everything</h1>
          <span className="contact-text07">
            We have a record of answering everything in 3 hours or less.
          </span>
        </div>
        {/* <div className="contact-container06">
          <div className="contact-container07">
            <div className="contact-container08">
              <div className="contact-container09"></div>
              <h1 className="contact-text08">Popular Questions</h1>
              <span className="contact-text09">
                Answers to common questions about our cleaning services and
                policies
              </span>
            </div>

            <Link to="/faqs" className="contact-text10">
              FAQs
            </Link>
          </div>
          <div className="contact-container10">
            <div className="contact-container11">
              <div className="contact-container12"></div>
              <h1 className="contact-text11">Contact Support</h1>
              <span className="contact-text12">
                Have a question or need assistance? Our dedicated support team
                is here to help.
              </span>
            </div>

            <Link className="contact-text13" to="/contact">
              Here
            </Link>
          </div>
          <div className="contact-container13">
            <div className="contact-container14">
              <div className="contact-container15"></div>
              <h1 className="contact-text14">Learn More</h1>
              <span className="contact-text15">
                If you require assistance, please visit our about page for more
                information.
              </span>
            </div>

            <Link className="contact-text16" to="/faqs">
              Visit Now
            </Link>
          </div>
        </div> */}
      </div>
      <div className="contact-container17">
        <div className="contact-container18">

          <div className="contact-container19">
            <div className="contact-container20">
              <div className="contact-container21">
                <h1 className="contact-text17">Get in touch</h1>
                <span className="contact-text18">
                  Answers to common questions about our cleaning services and
                  policies
                </span>
              </div>
              <div className="contact-container22">
                <h1 className="contact-text19">Chat to us</h1>
                <span className="contact-text20">
                  Our friendly team is here to help.
                </span>
                <a
                  href="mailto:support@crispcleaningcorp.com.au"
                  className="contact-text21"
                  onMouseOver={clickEmail}
                  onMouseLeave={unclickEmailx}
                >
                  support@crispcleaningcorp.com.au
                </a>
              </div>
              <div className="contact-container24">
                <h1 className="contact-text28">Phone</h1>
                <span className="contact-text29">Mon-Fri from 8am to 5pm.</span>
                <a
                  href="tel:+61243124112"
                  className="contact-text30"
                  onMouseOver={clickEmail}
                  onMouseLeave={unclickEmailx}
                >
                  +61 243 124 112
                </a>
              </div>
              <div className="contact-container25">
                <h1 className="contact-text31">Socials</h1>
                <span className="contact-text32">
                  Follow us on social media.
                </span>
                <div className="contact-container26">
                  <div className="contact-container27"></div>
                  <div className="contact-container28"></div>
                  <div className="contact-container29"></div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className="contact-container30">
              <div className="contact-container31">
                <div className="contact-container32">
                  <h1 className="contact-text33">Send us a message</h1>
                  <span className="contact-text34">
                    <span>You can reach out to us anytime at </span>
                    <a
                      href="mailto:support@crispcleaningcorp.com.au"
                      className="contact-text36"
                      onMouseOver={clickEmail}
                      onMouseLeave={unclickEmail}
                    >
                      support@crispcleaningcorp.com.au
                    </a>
                  </span>
                </div>
                <div className="contact-container33">
                  <div className="contact-container34">
                    <div className="contact-container35">
                      <span className="contact-text37">First Name</span>
                      <input
                        type="text"
                        name="f_name"
                        onChange={(e) => setFName(e.target.value)}
                        value={first_name}
                        placeholder="John"
                        className="contact-textinput input"
                      />
                    </div>
                    <div className="contact-container36">
                      <span className="contact-text38">Last Name</span>
                      <input
                        type="text"
                        onChange={(e) => setLName(e.target.value)}
                        value={last_name}
                        name="s_name"
                        placeholder="Doe"
                        className="contact-textinput1 input"
                      />
                    </div>
                  </div>
                  <div className="contact-container37">
                    <div className="contact-container38">
                      <span className="contact-text39">Email Address</span>
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        placeholder="jhonsmith@gmail.com"
                        className="contact-textinput2 input"
                      />
                    </div>
                    <div className="contact-container39">
                      <span className="contact-text40">Phone Number</span>
                      <input
                        type="text"
                        name="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        placeholder="0421 172 719"
                        className="contact-textinput3 input"
                      />
                    </div>
                  </div>
                  <div className="contact-container40">
                    <div className="contact-container41">
                      <span className="contact-text41">Message</span>
                      <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        className="contact-container42"
                        placeholder="Please write your message to us here..."
                      >
                        {/* <span className="contact-text42">
                          Please write your message to us here...
                        </span> */}
                      </textarea>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  onMouseEnter={activateX}
                  onMouseLeave={offX}
                  style={{ cursor: "pointer" }}
                  className="contact-button1 button"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="home-container303">
        <div className="home-container304">
          <img
            alt="image"
            src={require("./img/crisp.png")}
            className="home-image52"
          />
        </div>
        <div className="home-container305">
          <span className="home-text396">Sitemap</span>
          <p className="home-text397">Home</p>
          <p className="home-text398">Get Quote</p>
          <p className="home-text399">About</p>
          <p className="home-text400">Testimonials</p>
          <p className="home-text401">FAQs</p>
          <p className="home-text402">Contact</p>
        </div>
        <div className="home-container306">
          <span className="home-text403">Help &amp; Support</span>
          <p className="home-text404">support@crispcleaningcorp.com.au</p>
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
        <h3>CrispCleaningCorp @ 2024</h3>
        <h3>Terms & Conditions</h3>
      </div>
    </div>
  );
};

export default Contact;
