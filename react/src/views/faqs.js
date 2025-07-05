import { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import gsap from "gsap";

import { Helmet } from "react-helmet";

import "./faqs.css";
import Mobilex from "./mobile";
import Login from "./login";
import RegisterPopup from "../components/RegisterPopup";
import Footer from "../components/Footer";

const FAQs = (props) => {
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

  const left = () => {
    gsap.to(".fa-qs-container09", { background: "white" });
    gsap.to(".fa-qs-container07", { background: "rgb(255, 145, 77)" });
    gsap.to(".fa-qs-heading1", { color: "black" });
    gsap.to(".fa-qs-heading", { color: "rgb(255, 145, 77)" });
    gsap.to(".fa-qs-container12", { marginLeft: "0%", position: "relative" });
    gsap.to(".fa-qs-container18", { marginLeft: "100%", position: "absolute" });
  };

  const right = () => {
    gsap.to(".fa-qs-container07", { background: "white" });
    gsap.to(".fa-qs-container09", { background: "rgb(255, 145, 77)" });
    gsap.to(".fa-qs-heading1", { color: "rgb(255, 145, 77)" });
    gsap.to(".fa-qs-heading", { color: "black" });
    gsap.to(".fa-qs-container12", {
      marginLeft: "-100%",
      position: "absolute",
    });
    gsap.to(".fa-qs-container18", { marginLeft: "-0%", position: "relative" });
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
        });
      }
    }
  };

  const offX = (event) => {
    const container = event.currentTarget;
    gsap.to(container, { scale: 1, duration: 0.3 });
  };

  const [op1, setop1] = useState(false);
  const oprnX = (event) => {
    // const container = event.currentTarget;
    if (!op1) {
      gsap.fromTo(
        ".oprn1X",
        { opacity: 0, y: -40 },
        { opacity: 1, height: "auto", y: 0 }
      );
      gsap.to(".fa-qs-image", { rotationZ: "225%" });
    } else {
      gsap.to(".oprn1X", { opacity: 0, height: 0, y: -40 });
      gsap.to(".fa-qs-image", { rotationZ: "0%" });
    }
    setop1(!op1);
  };

  const [op2, setop2] = useState(false);
  const oprn2X = (event) => {
    // const container = event.currentTarget;
    if (!op2) {
      gsap.fromTo(
        ".oprn2X",
        { opacity: 0, y: -40 },
        { opacity: 1, height: "auto", y: 0 }
      );
      gsap.to(".fa-qs-image2", { rotationZ: "225%" });
    } else {
      gsap.to(".oprn2X", { opacity: 0, height: 0, y: -40 });
      gsap.to(".fa-qs-image2", { rotationZ: "0%" });
    }
    setop2(!op2);
  };
  const [op3, setop3] = useState(false);
  const oprn3X = (event) => {
    // const container = event.currentTarget;
    if (!op3) {
      gsap.fromTo(
        ".oprn3X",
        { opacity: 0, y: -40 },
        { opacity: 1, height: "auto", y: 0 }
      );
      gsap.to(".fa-qs-image3", { rotationZ: "225%" });
    } else {
      gsap.to(".oprn3X", { opacity: 0, height: 0, y: -40 });
      gsap.to(".fa-qs-image3", { rotationZ: "0%" });
    }
    setop3(!op3);
  };

  const [op4, setop4] = useState(false);
  const oprn4X = (event) => {
    // const container = event.currentTarget;
    if (!op4) {
      gsap.fromTo(
        ".oprn4X",
        { opacity: 0, y: -40 },
        { opacity: 1, height: "auto", y: 0 }
      );
      gsap.to(".fa-qs-image4", { rotationZ: "225%" });
    } else {
      gsap.to(".oprn4X", { opacity: 0, height: 0, y: -40 });
      gsap.to(".fa-qs-image4", { rotationZ: "0%" });
    }
    setop4(!op4);
  };

  const [op5, setop5] = useState(false);
  const oprn5X = (event) => {
    // const container = event.currentTarget;
    if (!op5) {
      gsap.fromTo(
        ".oprn5X",
        { opacity: 0, y: -40 },
        { opacity: 1, height: "auto", y: 0 }
      );
      gsap.to(".fa-qs-image5", { rotationZ: "225%" });
    } else {
      gsap.to(".oprn5X", { opacity: 0, height: 0, y: -40 });
      gsap.to(".fa-qs-image5", { rotationZ: "0%" });
    }
    setop5(!op5);
  };

  const [op6, setop6] = useState(false);
  const oprn6X = (event) => {
    // const container = event.currentTarget;
    if (!op6) {
      gsap.fromTo(
        ".oprn6X",
        { opacity: 0, y: -40 },
        { opacity: 1, height: "auto", y: 0 }
      );
      gsap.to(".fa-qs-image6", { rotationZ: "225%" });
    } else {
      gsap.to(".oprn6X", { opacity: 0, height: 0, y: -40 });
      gsap.to(".fa-qs-image6", { rotationZ: "0%" });
    }
    setop6(!op6);
  };

  const [op7, setop7] = useState(false);
  const oprn7X = (event) => {
    // const container = event.currentTarget;
    if (!op7) {
      gsap.fromTo(
        ".oprn7X",
        { opacity: 0, y: -40 },
        { opacity: 1, height: "auto", y: 0 }
      );
      gsap.to(".fa-qs-image7", { rotationZ: "225%" });
    } else {
      gsap.to(".oprn7X", { opacity: 0, height: 0, y: -40 });
      gsap.to(".fa-qs-image7", { rotationZ: "0%" });
    }
    setop7(!op7);
  };

  const [op8, setop8] = useState(false);
  const oprn8X = (event) => {
    // const container = event.currentTarget;
    if (!op8) {
      gsap.fromTo(
        ".oprn8X",
        { opacity: 0, y: -40 },
        { opacity: 1, height: "auto", y: 0 }
      );
      gsap.to(".fa-qs-image8", { rotationZ: "225%" });
    } else {
      gsap.to(".oprn8X", { opacity: 0, height: 0, y: -40 });
      gsap.to(".fa-qs-image8", { rotationZ: "0%" });
    }
    setop8(!op8);
  };

  const [op9, setop9] = useState(false);
  const oprn9X = (event) => {
    // const container = event.currentTarget;
    if (!op9) {
      gsap.fromTo(
        ".oprn9X",
        { opacity: 0, y: -40 },
        { opacity: 1, height: "auto", y: 0 }
      );
      gsap.to(".fa-qs-image9", { rotationZ: "225%" });
    } else {
      gsap.to(".oprn9X", { opacity: 0, height: 0, y: -40 });
      gsap.to(".fa-qs-image9", { rotationZ: "0%" });
    }
    setop9(!op9);
  };

  const [op10, setop10] = useState(false);
  const oprn10X = (event) => {
    // const container = event.currentTarget;
    if (!op10) {
      gsap.fromTo(
        ".oprn10X",
        { opacity: 0, y: -40 },
        { opacity: 1, height: "auto", y: 0 }
      );
      gsap.to(".fa-qs-image10", { rotationZ: "225%" });
    } else {
      gsap.to(".oprn10X", { opacity: 0, height: 0, y: -40 });
      gsap.to(".fa-qs-image10", { rotationZ: "0%" });
    }
    setop10(!op10);
  };

  const [op11, setop11] = useState(false);
  const oprn11X = (event) => {
    // const container = event.currentTarget;
    if (!op11) {
      gsap.fromTo(
        ".oprn11X",
        { opacity: 0, y: -40 },
        { opacity: 1, height: "auto", y: 0 }
      );
      gsap.to(".fa-qs-image11", { rotationZ: "225%" });
    } else {
      gsap.to(".oprn11X", { opacity: 0, height: 0, y: -40 });
      gsap.to(".fa-qs-image11", { rotationZ: "0%" });
    }
    setop11(!op11);
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
    <div className="fa-qs-container">
      {login && (
        <Login CloseLogin={() => setLogin(false)} navigateS={navigateS} />
      )}
      <Helmet>
        <title>FAQs - Crisp Cleaning</title>
        <meta property="og:title" content="FAQs - Crisp Cleaning" />
      </Helmet>
      <div className="fa-qs-container01">
        {/* Header Region  */}

        <div className="home-container001" ref={MobileMenu} style={{}}>
          <div className="home-container002">
            <img
              alt="image"
              src={require("./img/logowhite-200h.png")}
              className="home-image"
            />
          </div>
          <Link to="/" className="home-container003">
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
              <Link to="/faqs" className="home-container013">
                <span className="home-text005">FAQs</span>
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
              onMouseLeave={handleMouseLeave}
              onClick={() => setLogin(true)}
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

        {/* End Header Region  */}
        <div className="fa-qs-container02">
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
              <h2 className="appointed">FAQs</h2>
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
          <div
            className="fa-qs-container03"
            onMouseEnter={activateX}
            onMouseLeave={offX}
            style={{ cursor: "pointer" }}
          >
            <h1 className="fa-qs-text01">Have a Question?</h1>
          </div>
          <h1 className="fa-qs-text02">
            <span>Frequently </span>
            <span className="fa-qs-text04">Ask Questions</span>
          </h1>
          <span className="fa-qs-text05">
            <span>
              Explore the answers to these frequently asked questions to learn
              more about
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <br></br>
            <span>
              how we can make your cleaning experience smooth and hassle-free.
            </span>
          </span>
        </div>
      </div>
      <div className="fa-qs-container04">
        <div className="fa-qs-container05">
          <div className="fa-qs-container06" onClick={left}>
            <h1 className="fa-qs-heading">Booking &amp; Services</h1>
            <p></p>
            <div className="fa-qs-container07"></div>
          </div>
          <div className="fa-qs-container08" onClick={right}>
            <h1 className="fa-qs-heading1">Safety &amp; Satisfaction</h1>
            <div
              className="fa-qs-container09"
              style={{ background: "white" }}
            ></div>
          </div>
        </div>
        <div className="fa-qs-container10">
          <div className="fa-qs-container11">
            <div className="fa-qs-container12" style={{ position: "relative" }}>
              <div
                className="fa-qs-container13x"
                onClick={oprnX}
                style={{ cursor: "pointer" }}
              >
                <div className="fa-qs-container13">
                  <span className="fa-qs-text09">
                    How do I book your cleaning services?
                  </span>
                  <img
                    src={require("./img/plus-200h.png")}
                    alt="image"
                    className="fa-qs-image"
                  />
                </div>
                <div className="oprn1X sbm" style={{ height: 0, opacity: 0 }}>
                  <p
                    style={{
                      width: "90%",
                      marginBottom: "10px",
                      marginTop: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    Booking our services is easy! Simply visit our website or
                    give us a call. You can choose from our range of services,
                    specify your preferences, and schedule a convenient time for
                    our team to visit your location. We'll take care of the
                    rest, ensuring your space shines with cleanliness
                  </p>
                </div>
              </div>
              <div
                className="fa-qs-container13x"
                onClick={oprn2X}
                style={{ cursor: "pointer" }}
              >
                <div className="fa-qs-container13">
                  <span className="fa-qs-text09">
                    How do I get a quote from your services?
                  </span>
                  <img
                    src={require("./img/plus-200h.png")}
                    alt="image"
                    className="fa-qs-image2 fa_image"
                  />
                </div>
                <div className="oprn2X sbm" style={{ height: 0, opacity: 0 }}>
                  <p
                    style={{
                      width: "90%",
                      marginBottom: "10px",
                      marginTop: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    Getting a quote is easy. You can request a quote directly
                    through our website, or you can give us a call to discuss
                    your cleaning needs. We'll provide you with a detailed and
                    transparent estimate based on the services you require.
                  </p>
                </div>
              </div>
              <div
                className="fa-qs-container13x"
                onClick={oprn3X}
                style={{ cursor: "pointer" }}
              >
                <div className="fa-qs-container13">
                  <span className="fa-qs-text09">
                    What is the difference between regular and deep clean?
                  </span>
                  <img
                    src={require("./img/plus-200h.png")}
                    alt="image"
                    className="fa-qs-image3 fa_image"
                  />
                </div>
                <div className="oprn3X sbm" style={{ height: 0, opacity: 0 }}>
                  <p
                    style={{
                      width: "90%",
                      marginBottom: "10px",
                      marginTop: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    Our deep clean option ensures we can reach those extra nooks
                    and crannies, with an additional 30-60 minutes of cleaning
                    allocated for your home! We only recommend this for very
                    dirty homes, to ensure you’re getting the best bang for your
                    buck. Additionally, our deep clean offers:
                    <ul>
                      <li>Light organization</li>
                      <li>Detailed dusting</li>
                      <li>Bedding</li>
                      <li>Polishing</li>
                      <li>Cleaning home accessories/gadgets</li>
                      <li>Extra hour for high detailed areas</li>
                    </ul>
                  </p>
                </div>
              </div>
              <div
                className="fa-qs-container13x"
                onClick={oprn4X}
                style={{ cursor: "pointer" }}
              >
                <div className="fa-qs-container13">
                  <span className="fa-qs-text09">
                    How often should I schedule cleaning services?
                  </span>
                  <img
                    src={require("./img/plus-200h.png")}
                    alt="image"
                    className="fa-qs-image4 fa_image"
                  />
                </div>
                <div className="oprn4X sbm" style={{ height: 0, opacity: 0 }}>
                  <p
                    style={{
                      width: "90%",
                      marginBottom: "10px",
                      marginTop: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    The frequency of cleaning depends on your lifestyle and
                    preferences. We offer flexible scheduling options, including
                    one-time, weekly, bi-weekly, and monthly services. Our team
                    can help you determine the ideal cleaning frequency based on
                    the size of your space and your cleaning needs.
                  </p>
                </div>
              </div>

              <div
                className="fa-qs-container13x"
                onClick={oprn5X}
                style={{ cursor: "pointer" }}
              >
                <div className="fa-qs-container13">
                  <span className="fa-qs-text09">
                    Do I need to be present during the cleaning services?
                  </span>
                  <img
                    src={require("./img/plus-200h.png")}
                    alt="image"
                    className="fa-qs-image5 fa_image"
                  />
                </div>
                <div className="oprn5X sbm" style={{ height: 0, opacity: 0 }}>
                  <p
                    style={{
                      width: "90%",
                      marginBottom: "10px",
                      marginTop: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    It's entirely up to you. Many of our clients prefer to
                    provide access to their space and continue with their daily
                    activities. Rest assured, our team is professional and
                    trustworthy, and we'll treat your space with the utmost
                    respect and care.
                  </p>
                </div>
              </div>
            </div>
            <div className="fa-qs-container18" style={{ position: "absolute" }}>
              <div
                className="fa-qs-container13x"
                onClick={oprn6X}
                style={{ cursor: "pointer" }}
              >
                <div className="fa-qs-container13">
                  <span className="fa-qs-text09">
                    Are your cleaning products safe for my family and pets?
                  </span>
                  <img
                    src={require("./img/plus-200h.png")}
                    alt="image"
                    className="fa-qs-image6 fa_image"
                  />
                </div>
                <div className="oprn6X sbm" style={{ height: 0, opacity: 0 }}>
                  <p
                    style={{
                      width: "90%",
                      marginBottom: "10px",
                      marginTop: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    Absolutely. We prioritise the health and well-being of your
                    loved ones, including pets. We use eco-friendly and
                    non-toxic cleaning products that are safe for both humans
                    and animals. Our cleaning methods ensure a thorough clean
                    without compromising on safety.
                  </p>
                </div>
              </div>
              <div
                className="fa-qs-container13x"
                onClick={oprn7X}
                style={{ cursor: "pointer" }}
              >
                <div className="fa-qs-container13">
                  <span className="fa-qs-text09">
                    What is our policy on cancellations and refunds?
                  </span>
                  <img
                    src={require("./img/plus-200h.png")}
                    alt="image"
                    className="fa-qs-image7 fa_image"
                  />
                </div>
                <div className="oprn7X sbm" style={{ height: 0, opacity: 0 }}>
                  <p
                    style={{
                      width: "90%",
                      marginBottom: "10px",
                      marginTop: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    We understand if you ever need to cancel or reschedule,
                    that’s why If you cancel within 72 hours of your booking,
                    you will receive a 100% refund! Unfortunately, if you cancel
                    within 24-48 hours of your booking, we can only offer a 50%
                    refund, as our cleaners have already been assigned to your
                    home.
                  </p>
                </div>
              </div>
              <div
                className="fa-qs-container13x"
                onClick={oprn8X}
                style={{ cursor: "pointer" }}
              >
                <div className="fa-qs-container13">
                  <span className="fa-qs-text09">
                    What happens if I'm not satisfied with the cleaning results?
                  </span>
                  <img
                    src={require("./img/plus-200h.png")}
                    alt="image"
                    className="fa-qs-image8 fa_image"
                  />
                </div>
                <div className="oprn8X sbm" style={{ height: 0, opacity: 0 }}>
                  <p
                    style={{
                      width: "90%",
                      marginBottom: "10px",
                      marginTop: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    Your satisfaction is our top priority. If you're not
                    completely satisfied with our service, please let us know
                    within 24 hours, and we'll promptly address any concerns. We
                    strive for excellence and will make every effort to ensure
                    your expectations are met.
                  </p>
                </div>
              </div>
              <div
                className="fa-qs-container13x"
                onClick={oprn9X}
                style={{ cursor: "pointer" }}
              >
                <div className="fa-qs-container13">
                  <span className="fa-qs-text09">
                    Are you insured and licensed?
                  </span>
                  <img
                    src={require("./img/plus-200h.png")}
                    alt="image"
                    className="fa-qs-image9 fa_image"
                  />
                </div>
                <div className="oprn9X sbm" style={{ height: 0, opacity: 0 }}>
                  <p
                    style={{
                      width: "90%",
                      marginBottom: "10px",
                      marginTop: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    Yes, we are fully insured and licensed. Our company is
                    committed to operating with the highest standards of
                    professionalism and integrity. You can have peace of mind
                    knowing that you're working with a reputable and reliable
                    cleaning service.
                  </p>
                </div>
              </div>
              <div
                className="fa-qs-container13x"
                onClick={oprn10X}
                style={{ cursor: "pointer" }}
              >
                <div className="fa-qs-container13">
                  <span className="fa-qs-text09">
                    How do you ensure the security of my property?
                  </span>
                  <img
                    src={require("./img/plus-200h.png")}
                    alt="image"
                    className="fa-qs-image10 fa_image"
                  />
                </div>
                <div className="oprn10X sbm" style={{ height: 0, opacity: 0 }}>
                  <p
                    style={{
                      width: "90%",
                      marginBottom: "10px",
                      marginTop: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    We take security seriously. Our team members undergo
                    thorough background checks, and we have stringent protocols
                    in place to safeguard your property. Additionally, our focus
                    is on providing exceptional cleaning services, and we
                    prioritize maintaining your privacy and security.
                  </p>
                </div>
              </div>
              <div
                className="fa-qs-container13x"
                onClick={oprn11X}
                style={{ cursor: "pointer" }}
              >
                <div className="fa-qs-container13">
                  <span className="fa-qs-text09">
                    Cancelling your cleaners pass?
                  </span>
                  <img
                    src={require("./img/plus-200h.png")}
                    alt="image"
                    className="fa-qs-image11 fa_image"
                  />
                </div>
                <div className="oprn11X sbm" style={{ height: 0, opacity: 0 }}>
                  <p
                    style={{
                      width: "90%",
                      marginBottom: "10px",
                      marginTop: "10px",
                      lineHeight: "25px",
                    }}
                  >
                    We understand when circumstances change, and you may not be
                    ready for our regular cleaning services. Please note, if you
                    opt to cancel your cleaners pass within your first 3 home
                    cleans, a cancellation fee will apply. This will be equal to
                    the discount amount you received from the cleaners pass.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="review-container48">
        <div className="review-container49">
          <div className="review-container50">
            <h1 className="review-text75">Seeking Further Assistance?</h1>
            <span className="review-text76">
              <span>
                Click on the links below to explore additional resources or to
                get in touch with us directly.
              </span>
              <br />
            </span>
            <div className="review-container51">
              <button
                type="button"
                className="review-button button"
                onMouseEnter={activateX}
                onClick={handleClick}
                onMouseLeave={offX}
              >
                Receive a Quote
              </button>
              <Link
                to="/contact"
                type="button"
                className="review-button1 button"
                onMouseEnter={activateX}
                onMouseLeave={offX}
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQs;
