import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ImgComparisonSlider } from "@img-comparison-slider/react";
import gsap from "gsap";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Helmet } from "react-helmet";
import aboutImage from "./img/about_2.jpg";

import "./home1.css";
import "./home.css";
import BeforeAfterImage from "./BeforeAfterImage";
import Mobilex from "./mobile";
import Login from "./login";
import RegisterPopup from "../components/RegisterPopup";
import Footer from "../components/Footer";

const About = (props) => {
  const [login, setLogin] = useState(false);

  const handleClick = () => {
    sessionStorage.setItem("scrollToRef", "about");
    window.location.href = "/";
  };
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
  const activateX = (event) => {
    const container = event.currentTarget;
    gsap.to(container, { scale: 1.1, duration: 0.3 });

    const child2 = container.querySelector(":nth-child(2)");

    if (child2) {
      gsap.set(child2, { display: "block" });

      // Check if child2 has Lottie animation
      const lottieAnimation = child2.querySelector(".lottie-animation");

      if (lottieAnimation) {
        // Load and play the Lottie animation
        const animationData =
          "https://storage.googleapis.com/playground-bucket-v2.teleporthq.io/cad0702d-5435-40c7-a994-fccf199a4d48/4b26453b-12e2-4817-ad79-1d5c7d726003";
        const lottieInstance = Lottie.loadAnimation({
          container: lottieAnimation,
          renderer: "svg",
          loop: false,
          autoplay: true,
          animationData: animationData,
        });

        // Optionally, you can listen for animation complete event
        lottieInstance.addEventListener("complete", () => {
          console.log("Lottie animation completed");
        });
      }
    }
  };

  const offX = (event) => {
    const container = event.currentTarget;
    gsap.to(container, { scale: 1, duration: 0.3 });

    // Accessing and animating children
    const child2 = container.querySelector(":nth-child(2)");

    // Set display to 'none' using GSAP
    gsap.set(child2, { display: "none" });
  };

  const numberRef = useRef(null);
  const [sliderIn, setSliderIn] = useState(-100);
  const [sliderInx, setSliderInx] = useState(-100);

  const [number, setNumber] = useState(0);

  const [numberx, setNumberx] = useState(0);
  const [numbery, setNumbery] = useState(0);
  const [numberz, setNumberz] = useState(0);
  //
  useEffect(() => {
    // gsap.to(numberRef.current, {
    //   scrollTrigger: {
    //     trigger: numberRef.current,
    //     start: 'top bottom', // start when the top of the element is at the bottom of the viewport
    //     end: 'bottom center', // end when the bottom of the element is at the top of the viewport
    //     scrub: true, // smooth scrubbing
    //     onUpdate: (self) => {
    //       setNumber(Math.floor(self.progress * 10)); // Change 100 to the maximum number you want
    //       setNumberx(Math.floor(self.progress * 10)); // Change 100 to the maximum number you want
    //       setNumbery(Math.floor(self.progress * 300)); // Change 100 to the maximum number you want
    //       setNumberz(Math.floor(self.progress * 100)); // Change 100 to the maximum number you want
    //     },
    //     // markers:true
    //   },
    // });

    const duration = 2; // duration in seconds

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: numberRef.current,
        start: "top bottom", // start when the top of the element is at the bottom of the viewport
        once: true, // run the animation only once
        onEnter: () => {
          tl.play(); // play the timeline on scroll
        },
      },
      onUpdate: function () {
        const progress = tl.progress();
        setNumber(Math.floor(progress * 10));
        setNumberx(Math.floor(progress * 10));
        setNumbery(Math.floor(progress * 300));
        setNumberz(Math.floor(progress * 100));
      },
    });

    tl.fromTo(
      { progress: 0 },
      { progress: 1 },
      {
        duration: duration,
        ease: "none",
      }
    );

    // Prevent the animation from playing immediately
    tl.pause();

    gsap.fromTo(
      ".home1-image01y",
      { transform: `translate3d( -100, 0, 0)` },
      {
        transform: `translate3d( 0px, 0, 0)`,
        duration: 1,

        scrollTrigger: {
          trigger: ".home1-image01y",
          start: "top bottom-=100px", // start when the top of the element is at the bottom of the viewport
          end: "bottom top+=350px", // end when the bottom of the element is at the top of the viewport
          // markers:true
        },
      }
    );

    gsap.fromTo(
      ".home1-image06x",
      { transform: `translate3d( -100, 0, 0)` },
      {
        transform: `translate3d( 0px, 0, 0)`,
        duration: 1,
        scrollTrigger: {
          trigger: ".home1-image06x",
          start: "top bottom-=100px", // start when the top of the element is at the bottom of the viewport
          end: "bottom top+=350px", // end when the bottom of the element is at the top of the viewport
          // markers:true
        },
      }
    );
  }, []);

  const [Cleaner, setCleaner] = useState(false);
  const [back1, setback1] = useState("white");
  const [col1, setcol1] = useState("black");
  const [back2, setback2] = useState("white");
  const [col2, setcol2] = useState("black");
  const [back3, setback3] = useState("white");
  const [col3, setcol3] = useState("black");

  const [Raise1, setRaise1] = useState(false);
  const [Raise2, setRaise2] = useState(false);
  const [Raise3, setRaise3] = useState(false);

  //////
  const overlayA1 = () => {
    gsap.to(".overlay", {
      marginTop: "0px",
    });
  };
  const overlayB1 = () => {
    gsap.to(".overlay", {
      marginTop: "500px",
    });
  };

  ///////
  const overlayA2 = () => {
    gsap.to(".overlay2", {
      marginTop: "0px",
    });
  };
  const overlayB2 = () => {
    gsap.to(".overlay2", {
      marginTop: "500px",
    });
  };

  ///////
  const overlayA3 = () => {
    gsap.to(".overlay3", {
      marginTop: "0px",
    });
  };
  const overlayB3 = () => {
    gsap.to(".overlay3", {
      marginTop: "500px",
    });
  };

  ///////
  const overlayA4 = () => {
    gsap.to(".overlay4", {
      marginTop: "0px",
    });
  };
  const overlayB4 = () => {
    gsap.to(".overlay4", {
      marginTop: "500px",
    });
  };

  ///////
  const overlayA5 = () => {
    gsap.to(".overlay5", {
      marginTop: "0px",
    });
  };
  const overlayB5 = () => {
    gsap.to(".overlay5", {
      marginTop: "500px",
    });
  };

  // const parent = document.querySelector('.home1-image04');
  // const topPanel = parent.querySelector('.top');
  // const handle = parent.querySelector('.handle');

  // const onMouseMove = (event) => {
  //   let delta = (event.clientX - window.innerWidth / 2) * 0.5;
  //   handle.style.left = `${event.clientX + delta}px`;
  //   topPanel.style.width = `${event.clientX + skewHack + delta}px`;
  // };

  // parent.addEventListener('mousemove', onMouseMove);

  const [position, setPosition] = useState(50);
  const sliderRef = useRef(null);

  const handleMouseMove = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const newPosition = (x / width) * 100;
      setPosition(newPosition);
    }
  };

  const scrollToSection = (ref) => {
    if (window.location.pathname === "/") {
      if (ref?.current) {
        targetRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      sessionStorage.setItem("scrollToRef", "true");
      window.location.href = "/";
    }
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

  const navigateS = () => {
    window.location.href = "/#/dashboard"; // Full page reload
  };

  return (
    <div className="home1-container">
      {login && (
        <Login CloseLogin={() => setLogin(false)} navigateS={navigateS} />
      )}

      <Helmet>
        <title>About - Crisp Cleaning</title>
        <meta property="og:title" content="About Crisp Cleaning" />
      </Helmet>
      <div className="home1-container01">
        <div className="home-container001" ref={MobileMenu} style={{}}>
          <div className="home-container002">
            <img
              alt="image"
              src={require("./img/logowhite-200h.png")}
              className="home-image"
            />
          </div>
          <Link to="/" className="home-container003" onClick={closemenu}>
            <span className="home-text">Home</span>
          </Link>
          <Link className="home-container004">
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

              <Link to="/about" className="home-container013">
                <span className="home-text005">About</span>
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
              <Link
                to="/contact"
                className="home-container013"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="home-text006">Contact</span>
                <div className="underLine"></div>
              </Link>
            </div>

            {/* Mobile Menu  */}
          </div>

          <div className="home-container017">
            <div
              className="home-container013"
              onMouseEnter={handleMouseEnter}
              onClick={() => setLogin(true)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="home-text010">Login</span>
            </div>
            <span
              className="home-text011"
              onMouseEnter={handleMouseEnterX}
              onMouseLeave={handleMouseLeaveX}
              onClick={handleClick}
            >
              Get Started Now
            </span>
          </div>
        </div>
        <Mobilex mobileM={mobileMenu} />
        <div className="home1-container03">
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
              <h2 className="appointed">About</h2>
            </Link>
            <Link to="/review">
              <h2>Reviews</h2>
            </Link>
            <Link to="/faqs">
              <h2>FAQs</h2>
            </Link>
            <Link to="/contact">
              <h2>Contact</h2>
            </Link>
            <h2
              onClick={() => {
                setLogin(true);
              }}
            >
              Login
            </h2>
          </div>
          <div className="home1-container04">
            <div className="home1-container05">
              <Link
                to="/about"
                className="home1-navlink button"
                onMouseEnter={activateX}
                onMouseLeave={offX}
              >
                About us
              </Link>
              <h1 className="home1-text01">
                <span>
                  Our mission is to
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span className="home1-text03">
                  help people
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <br className="home1-text04"></br>
                <span className="home1-text05">everywhere</span>
                <span className="home1-text06">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>to have a clean</span>
                <br></br>
                <span>space</span>
              </h1>
              <span className="home1-text10">
                <span>
                  At the core of our commitment lies a simple yet profound
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  mission: to empower individuals worldwide in achieving
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  and maintaining a clean and organized living or working
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  environment.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <br></br>
                <br></br>
                <span>
                  Recognizing the transformative impact of cleanliness on
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  overall well-being, productivity, and peace of mind, we
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  have dedicated ourselves to providing accessible solutions 
                </span>
                <span>for people everywhere.</span>
              </span>
            </div>
            <img
              alt="image"
              src={require("./img/cleaning021500w.png")}
              className="home1-image"
            />
          </div>
        </div>
        <div className="home1-container06">
          <div className="home1-container07" ref={numberRef}>
            <div className="home1-container08">
              <h1 className="home1-text21">{number}+</h1>
              <span className="home1-text22">Years of experience</span>
            </div>
            <div className="home1-container09">
              <h1 className="home1-text23">{numberx}+</h1>
              <span className="home1-text24">Amazing customers</span>
            </div>
          </div>
          <div className="home1-container10">
            <div className="home1-container11">
              <h1 className="home1-text25">{numbery}+</h1>
              <span className="home1-text26">Hours of cleaning</span>
            </div>
            <div className="home1-container12">
              <h1 className="home1-text27">{numberz}+</h1>
              <span className="home1-text28">Projects done</span>
            </div>
          </div>
        </div>
      </div>
      <div className="home1-container13">
        <div className="home1-container14">
          <h1 className="home1-heading">
            <span>
              Our
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="home1-text30">Story</span>
          </h1>
          <span className="home1-text31">
            <span>
              Established with a passion for making life easier and spaces more
              beautiful, The Cleaning Corporation
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <br></br>
            <span>
              was founded in 2023. What began as a vision to redefine the
              cleaning industry has evolved into a
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <br></br>
            <span>
              pioneering force that integrates exceptional cleaning services
              with unmatched convenience.
            </span>
          </span>
        </div>
      </div>
      <div className="home1-container28">
        <div className="home1-container29">
          <div className="home1-container30">
            <img
              alt="image"
              src={require("./img/group281-200h.png")}
              className="home1-image02"
            />
            <h1 className="home1-text43">
              <span className="home1-text44">Beyond Cleaning,</span>
              <br className="home1-text45"></br>
              <span className="home1-text46">Becoming Your Partner </span>
              <br></br>
              <span className="home1-text48">
                <span> </span> in Pristine Living and
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </span>
              <br className="home1-text49"></br>
              <span className="home1-text50">Working Spaces</span>
            </h1>
            <h1 className="home1-text43x">
              <span className="home1-text44">Beyond Cleaning,</span>
              <span className="home1-text46">
                Becoming
                <br className="home1-text45"></br>Your Partner
              </span>
              <span className="home1-text48">
                in Pristine Living
                <br></br> and
              </span>

              <span className="home1-text50"> Working Spaces</span>
            </h1>
            <span className="home1-text51">
              <span>
                Our mission is simple yet powerful: to be your all-in-one
                cleaning solution, taking the weight of cleaning
                responsibilities off your shoulders so you can focus on what
                truly matters.
              </span>
              <br></br>
              <br></br>
              <span>
                We&apos;re not just a cleaning company; we&apos;re your partners
                in maintaining a pristine and harmonious living and working
                environment.
              </span>
            </span>
          </div>
          <img
            alt="image"
            src={require("./img/cln2-1400w.png")}
            className="home1-image03"
          />
        </div>
      </div>
      <div className="home1-container31">
        <div className="home1-container32">
          <div className="home1-container33 skewed">
            <div
              className="home1-image04x"
              style={{ width: "-100px" }}
              ref={sliderRef}
              onMouseMove={handleMouseMove}
            >
              <ImgComparisonSlider value={position}>
                <img slot="first" src={aboutImage} className="containX" />
                <img slot="second" src={aboutImage} className="containX" />
              </ImgComparisonSlider>
            </div>
            <div className="home1-container34">
              <img
                alt="image"
                src={require("./img/group_282-200h.png")}
                className="home1-image05"
              />
              <h1 className="home1-text56">
                <span>We aim to</span>
                <br></br>
                <span className="home1-text59">liberate you</span>
                <span> from</span>
                <br></br>
                <span>the burden of </span>
                <br></br>
                <span>cleaning</span>
              </h1>
              <span className="home1-text65">
                <span>
                  Our mission is simple yet powerful: to be your all-in-one
                  cleaning solution, taking the weight of cleaning
                  responsibilities off your shoulders so you can focus on what
                  truly matters.
                </span>
                <br></br>
                <br></br>
                <span>
                  We&apos;re not just a cleaning company; we&apos;re your
                  partners in maintaining a pristine and harmonious living and
                  working environment.
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="home1-container35">
        <div className="home1-container36">
          <div className="home1-header">
            <div className="home1-container37">
              <div className="home1-image06" style={{ borderRadius: "30px" }}>
                <img
                  alt="image"
                  src={require("./img/vector300w.png")}
                  className="home1-image06x"
                  style={{
                    transform: `translate3d( ${sliderInx - 100}px, 0, 0)`,
                  }}
                />
              </div>
              <h1 className="home1-heading2">Our Senior Crew</h1>
            </div>
            <h1 className="home1-text70">Behind Crisp Cleaning</h1>
          </div>
          <span className="home1-text71">
            <span>
              Each member of our team brings a unique set of skills and
              expertise to the table,
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <br></br>
            <span>
              ensuring that every nook and cranny of your space receives the
              attention it deserves.
            </span>
          </span>
        </div>
        <div className="home1-container38">
          <div className="home1-container39">
            <div
              className="teamView"
              onMouseOver={overlayA1}
              onMouseLeave={overlayB1}
            >
              <div className="overlay">
                <h1 className="nameC1">Jonny Rein</h1>
                <h3
                  className={Cleaner ? "typeC1On" : "typeC1"}
                  onMouseOver={() => {
                    setCleaner(true);
                  }}
                  onMouseLeave={() => {
                    setCleaner(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Cleaner
                </h3>
                <div className="socials">
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      background: back1,
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback1("black");
                      setcol1("white");
                    }}
                    onMouseLeave={() => {
                      setback1("white");
                      setcol1("black");
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "18px",
                        color: col1,
                      }}
                    >
                      f
                    </p>
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      background: back2,
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback2("black");
                      setcol2("white");
                    }}
                    onMouseLeave={() => {
                      setback2("white");
                      setcol2("black");
                    }}
                  >
                    {back2 == "white" ? (
                      <img
                        src={require("./img/twitter_Black.png")}
                        style={{ width: "25%" }}
                      />
                    ) : (
                      <img
                        src={require("./img/twitter_white.png")}
                        style={{ width: "25%" }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: back3,
                      borderRadius: "100%",
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback3("black");
                      setcol3("white");
                    }}
                    onMouseLeave={() => {
                      setback3("white");
                      setcol3("black");
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "18px",
                        color: col3,
                      }}
                    >
                      in
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="teamView2"
              onMouseOver={overlayA2}
              onMouseLeave={overlayB2}
            >
              <div className="overlay2">
                <h1 className="nameC1">Jonny Rein</h1>
                <h3
                  className={Cleaner ? "typeC1On" : "typeC1"}
                  onMouseOver={() => {
                    setCleaner(true);
                  }}
                  onMouseLeave={() => {
                    setCleaner(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Cleaner
                </h3>
                <div className="socials">
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      background: back1,
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback1("black");
                      setcol1("white");
                    }}
                    onMouseLeave={() => {
                      setback1("white");
                      setcol1("black");
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "18px",
                        color: col1,
                      }}
                    >
                      f
                    </p>
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      background: back2,
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback2("black");
                      setcol2("white");
                    }}
                    onMouseLeave={() => {
                      setback2("white");
                      setcol2("black");
                    }}
                  >
                    {back2 == "white" ? (
                      <img
                        src={require("./img/twitter_Black.png")}
                        style={{ width: "25%" }}
                      />
                    ) : (
                      <img
                        src={require("./img/twitter_white.png")}
                        style={{ width: "25%" }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: back3,
                      borderRadius: "100%",
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback3("black");
                      setcol3("white");
                    }}
                    onMouseLeave={() => {
                      setback3("white");
                      setcol3("black");
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "18px",
                        color: col3,
                      }}
                    >
                      in
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="teamView3"
              onMouseOver={overlayA3}
              onMouseLeave={overlayB3}
            >
              <div className="overlay3">
                <h1 className="nameC1">Jonny Rein</h1>
                <h3
                  className={Cleaner ? "typeC1On" : "typeC1"}
                  onMouseOver={() => {
                    setCleaner(true);
                  }}
                  onMouseLeave={() => {
                    setCleaner(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Cleaner
                </h3>
                <div className="socials">
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      background: back1,
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback1("black");
                      setcol1("white");
                    }}
                    onMouseLeave={() => {
                      setback1("white");
                      setcol1("black");
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "18px",
                        color: col1,
                      }}
                    >
                      f
                    </p>
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      background: back2,
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback2("black");
                      setcol2("white");
                    }}
                    onMouseLeave={() => {
                      setback2("white");
                      setcol2("black");
                    }}
                  >
                    {back2 == "white" ? (
                      <img
                        src={require("./img/twitter_Black.png")}
                        style={{ width: "25%" }}
                      />
                    ) : (
                      <img
                        src={require("./img/twitter_white.png")}
                        style={{ width: "25%" }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: back3,
                      borderRadius: "100%",
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback3("black");
                      setcol3("white");
                    }}
                    onMouseLeave={() => {
                      setback3("white");
                      setcol3("black");
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "18px",
                        color: col3,
                      }}
                    >
                      in
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home1-container40">
            <div
              className="teamView4"
              onMouseOver={overlayA4}
              onMouseLeave={overlayB4}
            >
              <div className="overlay4">
                <h1 className="nameC1">Jonny Rein</h1>
                <h3
                  className={Cleaner ? "typeC1On" : "typeC1"}
                  onMouseOver={() => {
                    setCleaner(true);
                  }}
                  onMouseLeave={() => {
                    setCleaner(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Cleaner
                </h3>
                <div className="socials">
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      background: back1,
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback1("black");
                      setcol1("white");
                    }}
                    onMouseLeave={() => {
                      setback1("white");
                      setcol1("black");
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "18px",
                        color: col1,
                      }}
                    >
                      f
                    </p>
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      background: back2,
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback2("black");
                      setcol2("white");
                    }}
                    onMouseLeave={() => {
                      setback2("white");
                      setcol2("black");
                    }}
                  >
                    {back2 == "white" ? (
                      <img
                        src={require("./img/twitter_Black.png")}
                        style={{ width: "25%" }}
                      />
                    ) : (
                      <img
                        src={require("./img/twitter_white.png")}
                        style={{ width: "25%" }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: back3,
                      borderRadius: "100%",
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback3("black");
                      setcol3("white");
                    }}
                    onMouseLeave={() => {
                      setback3("white");
                      setcol3("black");
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "18px",
                        color: col3,
                      }}
                    >
                      in
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="teamView5"
              onMouseOver={overlayA5}
              onMouseLeave={overlayB5}
            >
              <div className="overlay5">
                <h1 className="nameC1">Jonny Rein</h1>
                <h3
                  className={Cleaner ? "typeC1On" : "typeC1"}
                  onMouseOver={() => {
                    setCleaner(true);
                  }}
                  onMouseLeave={() => {
                    setCleaner(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Cleaner
                </h3>
                <div className="socials">
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      background: back1,
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback1("black");
                      setcol1("white");
                    }}
                    onMouseLeave={() => {
                      setback1("white");
                      setcol1("black");
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "18px",
                        color: col1,
                      }}
                    >
                      f
                    </p>
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      background: back2,
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback2("black");
                      setcol2("white");
                    }}
                    onMouseLeave={() => {
                      setback2("white");
                      setcol2("black");
                    }}
                  >
                    {back2 == "white" ? (
                      <img
                        src={require("./img/twitter_Black.png")}
                        style={{ width: "25%" }}
                      />
                    ) : (
                      <img
                        src={require("./img/twitter_white.png")}
                        style={{ width: "25%" }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: back3,
                      borderRadius: "100%",
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseOver={() => {
                      setback3("black");
                      setcol3("white");
                    }}
                    onMouseLeave={() => {
                      setback3("white");
                      setcol3("black");
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "18px",
                        color: col3,
                      }}
                    >
                      in
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="home1-container41">
        <div className="home1-container42">
          <div className="home1-container43"></div>
          <div className="home1-container44"></div>
          <div className="home1-container45"></div>
          <div className="home1-container46"></div>
          <div className="home1-container47"></div>
        </div>
      </div> */}
      <div className="home1-container48">
        <div className="home1-container49">
          <div className="home1-container50">
            <h1 className="home1-text75">Empower Your Space</h1>
            <span className="home1-text76">
              <span>
                Each member of our team brings a unique set of skills and
                expertise to the table,
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </span>
              <br></br>
              <span>
                ensuring that every nook and cranny of your space receives the
                attention it deserves.
              </span>
            </span>
            <div className="home1-container51">
              <button
                type="button"
                onClick={handleClick}
                className="home1-button button"
                onMouseEnter={activateX}
                onMouseLeave={offX}
                style={{ cursor: "pointer" }}
              >
                Take Action
              </button>
              <Link to="/faqs">
                <button
                  type="button"
                  className="home1-button1 button"
                  onMouseEnter={activateX}
                  onMouseLeave={offX}
                  style={{ cursor: "pointer" }}
                >
                  Have a Question?
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
