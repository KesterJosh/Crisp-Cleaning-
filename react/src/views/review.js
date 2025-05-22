import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Helmet } from "react-helmet";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./review.css";
import "./home.css";
import Mobilex from "./mobile";

const Review = (props) => {
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

  const containerRef = useRef(null);
  const [isHovered, setHovered] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const contentHeight = container.scrollHeight;
    const mixedHeight = contentHeight - 1200;

    // Scroll animation
    animation.current = gsap.fromTo(
      container,
      { y: -20 },
      {
        y: () => -mixedHeight,
        duration: 22,
        repeat: -1, // Set repeat to -1 for infinite loop
        ease: "linear",
        paused: true,
      }
    );

    // Cleanup animation on component unmount
    return () => {
      animation.current.kill();
    };
  }, []);

  useEffect(() => {
    if (animation.current) {
      if (isHovered) {
        animation.current.pause(); // Pause the animation when hovered
      } else {
        animation.current.play(); // Resume the animation when not hovered
      }
    }
  }, [isHovered]);

  // Toggle hover state on mouse enter/leave
  const handleMouseEnterY = () => {
    setHovered(true);
  };

  const handleMouseLeaveY = () => {
    setHovered(false);
  };

  //Middle Scroller
  const containerRefGG = useRef(null);
  const [isHoveredGG, setHoveredGG] = useState(false);
  const animationGG = useRef(null);

  useEffect(() => {
    const containerGG = containerRefGG.current;
    const contentHeightGG = containerGG.scrollHeight;
    const mixedHeightGG = contentHeightGG - 1200;

    // Scroll animation
    animationGG.current = gsap.fromTo(
      containerGG,
      { y: () => -mixedHeightGG },
      {
        y: -20,
        duration: 22,
        repeat: -1, // Set repeat to -1 for infinite loop
        ease: "linear",
        paused: true,
      }
    );

    // animationGG.current = gsap.fromTo(
    //   ".Zef",
    //   { y: () => -(mixedHeightGG) },
    //   {
    //     y: -20,
    //     duration: 22,
    //     repeat: -1, // Set repeat to -1 for infinite loop
    //     ease: 'linear',
    //     paused: true,
    //   }
    // );

    //

    // Cleanup animation on component unmount
    return () => {
      animationGG.current.kill();
    };
  }, []);

  const numberRef = useRef(null);
  const [number, setNumber] = useState(0);

  const [sliderIn, setSliderIn] = useState(0);
  //
  useEffect(() => {
    // gsap.to(numberRef.current, {
    //   scrollTrigger: {
    //     trigger: numberRef.current,
    //     start: 'top bottom-=150px', // start when the top of the element is at the bottom of the viewport
    //     end: 'bottom top+=250px', // end when the bottom of the element is at the top of the viewport
    //     scrub: true, // smooth scrubbing
    //     onUpdate: (self) => {
    //       setNumber(Math.floor(self.progress * 200)); // Change 100 to the maximum number you want
    //     },
    //     // markers:true
    //   },
    // });

    gsap.fromTo(
      ".review-image01xy",
      { marginRight: 0 },
      {
        marginRight: 100,
        duration: 1,
        scrollTrigger: {
          trigger: ".review-image01xy",
          start: "top bottom-=100px", // start when the top of the element is at the bottom of the viewport
          end: "bottom top+=350px", // end when the bottom of the element is at the top of the viewport

          // markers:true
        },
      }
    );

    gsap.fromTo(
      ".review-image01xyf",
      { marginRight: 0 },
      {
        marginRight: 100,
        duration: 1,
        scrollTrigger: {
          trigger: ".review-image01xyf",
          start: "top bottom-=100px", // start when the top of the element is at the bottom of the viewport
          end: "bottom top+=350px", // end when the bottom of the element is at the top of the viewport

          // markers:true
        },
      }
    );

    // gsap.fromTo(".home1-image06x", {transform: `translate3d( -100, 0, 0)`},{
    //   transform: `translate3d( 0px, 0, 0)`, duration:1,
    //   scrollTrigger: {
    //     trigger: '.home1-image06x',
    //     start: 'top bottom-=100px', // start when the top of the element is at the bottom of the viewport
    //     end: 'bottom top+=350px', // end when the bottom of the element is at the top of the viewport
    //     // markers:true
    //   },
    // });
  }, []);

  useEffect(() => {
    if (animationGG.current) {
      if (isHoveredGG) {
        animationGG.current.pause(); // Pause the animationGG when hovered
      } else {
        animationGG.current.play(); // Resume the animation when not hovered
      }
    }
  }, [isHoveredGG]);

  // Toggle hover state on mouse enter/leave
  const handleMouseEnterGG = () => {
    setHoveredGG(true);
  };

  const handleMouseLeaveGG = () => {
    setHoveredGG(false);
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

  useEffect(() => {
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
        setNumber(Math.floor(progress * 200));
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

  return (
    <div className="review-container">
      <Helmet>
        <title>Review - Crisp Cleaning</title>
        <meta
          property="og:title"
          content="review - Courteous Automatic Nightingale"
        />
      </Helmet>
      <div className="review-container01">
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
          <div className="home-container005">
            <span className="home-text002">Reviews</span>
          </div>
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

              <Link to="/review" className="home-container013">
                <span className="home-text005">Review</span>
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
          </div>

          <div className="home-container017">
            <div
              className="home-container013"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="home-text010">Login</span>
            </div>
            <span
              className="home-text011"
              onMouseEnter={handleMouseEnterX}
              onMouseLeave={handleMouseLeaveX}
            >
              Get Started Now
            </span>
          </div>
        </div>
        <Mobilex mobileM={mobileMenu} />
        <div className="review-container03">
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
              <h2 className="appointed">Reviews</h2>
            </Link>
            <Link to="/faqs">
              <h2>FAQs</h2>
            </Link>
            <Link to="/contact">
              <h2>Contact</h2>
            </Link>
          </div>
          <div className="home-container231xy">
            <div
              className="home-container249xf"
              ref={containerRef}
              onMouseEnter={handleMouseEnterY}
              onMouseLeave={handleMouseLeaveY}
            >
              <div className="home-container250">
                <div className="home-container251">
                  <div className="home-container252">
                    <img
                      alt="image"
                      src={require("./img/user5-200h.png")}
                      className="home-image28"
                    />
                    <div className="home-container253">
                      <p className="home-text234">Jonathan Kim</p>
                      <p className="home-text235">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image29"
                  />
                </div>
                <p className="home-text236">
                  <span>
                    Hats off to the Clean Team! They tackled the toughest
                  </span>
                  <span>
                    stains with ease, leaving my office looking pristine.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Their attention to detail and friendly staff make them
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>my go-to cleaning company</span>
                </p>

                <p className="home-text241">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container254">
                <div className="home-container255">
                  <div className="home-container256">
                    <img
                      alt="image"
                      src={require("./img/user3-200h.png")}
                      className="home-image30"
                    />
                    <div className="home-container257">
                      <p className="home-text242">Emily Johnson</p>
                      <p className="home-text243">Manager @ Nike</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r5-200h.png")}
                    className="home-image31"
                  />
                </div>
                <p className="home-text244">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text255">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container258">
                <div className="home-container259">
                  <div className="home-container260">
                    <img
                      alt="image"
                      src={require("./img/user8-200h.png")}
                      className="home-image32"
                    />
                    <div className="home-container261">
                      <p className="home-text256">James Rodriguez</p>
                      <p className="home-text257">Manager @ Adidas</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r2-200h.png")}
                    className="home-image33"
                  />
                </div>
                <p className="home-text258">
                  <span>
                    Hats off to the Clean Team! They tackled the toughest
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <br></br>
                  <span>
                    stains with ease, leaving my office looking pristine.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <br></br>
                  <span>
                    Their attention to detail and friendly staff make them
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <br></br>
                  <span>my go-to cleaning company</span>
                </p>

                <p className="home-text266">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container262">
                <div className="home-container263">
                  <div className="home-container264">
                    <img
                      alt="image"
                      src={require("./img/user11-200h.png")}
                      className="home-image34"
                    />
                    <div className="home-container265">
                      <p className="home-text267">Jonathan Kim</p>
                      <p className="home-text268">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image35"
                  />
                </div>
                <p className="home-text269">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text280">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container250">
                <div className="home-container251">
                  <div className="home-container252">
                    <img
                      alt="image"
                      src={require("./img/user5-200h.png")}
                      className="home-image28"
                    />
                    <div className="home-container253">
                      <p className="home-text234">Jonathan Kim</p>
                      <p className="home-text235">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image29"
                  />
                </div>
                <p className="home-text236">
                  <span>
                    Hats off to the Clean Team! They tackled the toughest
                  </span>
                  <span>
                    stains with ease, leaving my office looking pristine.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Their attention to detail and friendly staff make them
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>my go-to cleaning company</span>
                </p>

                <p className="home-text241">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container254">
                <div className="home-container255">
                  <div className="home-container256">
                    <img
                      alt="image"
                      src={require("./img/user3-200h.png")}
                      className="home-image30"
                    />
                    <div className="home-container257">
                      <p className="home-text242">Emily Johnson</p>
                      <p className="home-text243">Manager @ Nike</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r5-200h.png")}
                    className="home-image31"
                  />
                </div>
                <p className="home-text244">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text255">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container258">
                <div className="home-container259">
                  <div className="home-container260">
                    <img
                      alt="image"
                      src={require("./img/user8-200h.png")}
                      className="home-image32"
                    />
                    <div className="home-container261">
                      <p className="home-text256">James Rodriguez</p>
                      <p className="home-text257">Manager @ Adidas</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r2-200h.png")}
                    className="home-image33"
                  />
                </div>
                <p className="home-text258">
                  <span>
                    Hats off to the Clean Team! They tackled the toughest
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <br></br>
                  <span>
                    stains with ease, leaving my office looking pristine.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <br></br>
                  <span>
                    Their attention to detail and friendly staff make them
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <br></br>
                  <span>my go-to cleaning company</span>
                </p>

                <p className="home-text266">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container262">
                <div className="home-container263">
                  <div className="home-container264">
                    <img
                      alt="image"
                      src={require("./img/user11-200h.png")}
                      className="home-image34"
                    />
                    <div className="home-container265">
                      <p className="home-text267">Jonathan Kim</p>
                      <p className="home-text268">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image35"
                  />
                </div>
                <p className="home-text269">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text280">4:22 AM - Nov 29,2023</p>
              </div>
            </div>
            <div
              className="home-container266x"
              ref={containerRefGG}
              onMouseEnter={handleMouseEnterGG}
              onMouseLeave={handleMouseLeaveGG}
            >
              <div className="home-container267">
                <div className="home-container268">
                  <div className="home-container269">
                    <div className="home-container270">
                      <p className="home-text281">Jonathan Kim</p>
                      <p className="home-text282">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image37"
                  />
                </div>
                <p className="home-text283">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text294">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container271">
                <div className="home-container272">
                  <div className="home-container273">
                    <img
                      alt="image"
                      src={require("./img/user9-200h.png")}
                      className="home-image38"
                    />
                    <div className="home-container274">
                      <p className="home-text295">Emily Johnson</p>
                      <p className="home-text296">Manager @ Nike</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r5-200h.png")}
                    className="home-image39"
                  />
                </div>
                <p className="home-text297">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text308">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container275">
                <div className="home-container276">
                  <div className="home-container277">
                    <img
                      alt="image"
                      src={require("./img/user4-200h.png")}
                      className="home-image40"
                    />
                    <div className="home-container278">
                      <p className="home-text309">James Rodriguez</p>
                      <p className="home-text310">Manager @ Adidas</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r2-200h.png")}
                    className="home-image41"
                  />
                </div>
                <p className="home-text311">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text322">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container279">
                <div className="home-container280">
                  <div className="home-container281">
                    <img
                      alt="image"
                      src={require("./img/user10-200h.png")}
                      className="home-image42"
                    />
                    <div className="home-container282">
                      <p className="home-text323">Jonathan Kim</p>
                      <p className="home-text324">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image43"
                  />
                </div>
                <p className="home-text325">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text336">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container267">
                <div className="home-container268">
                  <div className="home-container269">
                    <img
                      alt="image"
                      src={require("./img/user12-200h.png")}
                      className="home-image36"
                    />
                    <div className="home-container270">
                      <p className="home-text281">Jonathan Kim</p>
                      <p className="home-text282">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image37"
                  />
                </div>
                <p className="home-text283">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text294">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container271">
                <div className="home-container272">
                  <div className="home-container273">
                    <img
                      alt="image"
                      src={require("./img/user9-200h.png")}
                      className="home-image38"
                    />
                    <div className="home-container274">
                      <p className="home-text295">Emily Johnson</p>
                      <p className="home-text296">Manager @ Nike</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r5-200h.png")}
                    className="home-image39"
                  />
                </div>
                <p className="home-text297">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text308">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container275">
                <div className="home-container276">
                  <div className="home-container277">
                    <img
                      alt="image"
                      src={require("./img/user4-200h.png")}
                      className="home-image40"
                    />
                    <div className="home-container278">
                      <p className="home-text309">James Rodriguez</p>
                      <p className="home-text310">Manager @ Adidas</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r2-200h.png")}
                    className="home-image41"
                  />
                </div>
                <p className="home-text311">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text322">4:22 AM - Nov 29,2023</p>
              </div>
              <div className="home-container279">
                <div className="home-container280">
                  <div className="home-container281">
                    <img
                      alt="image"
                      src={require("./img/user10-200h.png")}
                      className="home-image42"
                    />
                    <div className="home-container282">
                      <p className="home-text323">Jonathan Kim</p>
                      <p className="home-text324">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image43"
                  />
                </div>
                <p className="home-text325">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>

                <p className="home-text336">4:22 AM - Nov 29,2023</p>
              </div>
            </div>
          </div>
          <div className="review-container04x">
            <div className="review-container05">
              <Link
                to="/review"
                className="review-navlink button"
                onMouseEnter={activateX}
                onMouseLeave={offX}
              >
                Crisp Cleaning is for you
              </Link>
              <h1 className="review-text01">
                <span className="review-text03">
                  Success stories{" "}
                  <span style={{ color: "black" }}>from real </span>
                </span>
                <br className="review-text04"></br>
                <span className="review-text05"></span>
                <span className="review-text06">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  Crisp Cleaning <br />
                  customers
                </span>
                <br />
              </h1>
              <span className="review-text10">
                <p>
                  As we showcase the results achieved through these
                  partnerships, we invite you to explore the success stories
                  that have unfolded across various industries.
                </p>

                <br></br>
                <p>
                  We take pride in the trust they've placed in our expertise and
                  look forward to continuing to deliver exceptional results for
                  our existing and future clients alike.
                </p>
              </span>

              {/* Video Place  */}

              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-videoXys"
              ></video>
            </div>
          </div>
        </div>
      </div>
      <div className="review-container13">
        <div className="review-container14">
          <h1 className="review-heading">
            <span>
              Honoured to be the trusted choice for over <br />
              <span className="review-text30">
                <span className="Zef" ref={numberRef}>
                  {number}
                </span>
                +
              </span>{" "}
              businesses and individuals
            </span>
          </h1>
        </div>
      </div>
      <div className="review-container15">
        <div className="review-container16">
          <div className="review-container17">
            <div className="review-container18">
              <div className="review-image01x">
                <img
                  alt="image"
                  src={require("./img/vector300w.png")}
                  className="review-image01xy"
                  // style={{marginRight:sliderIn}}
                />
              </div>
              <h1 className="review-heading1x">
                <span>Popular Customer Stories</span>
              </h1>
            </div>
            <span className="review-text40">
              <span>
                Learn how Crisp Cleaning customers{" "}
                <span style={{ color: "#FF914D" }}>
                  save time, effort and money
                </span>
              </span>
            </span>
          </div>

          <div className="home-container283xZ">
            <div style={{ display: "flex" }}>
              <div className="home-container285x">
                <div className="home-container286">
                  <div className="home-container287">
                    <img
                      alt="image"
                      src={require("./img/user1-200h.png")}
                      className="home-image46"
                    />
                    <div className="home-container288">
                      <p className="home-text342">Jonathan Kim</p>
                      <p className="home-text343">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image47"
                  />
                </div>
                <p className="home-text344">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>
              </div>
              <div className="home-container285x">
                <div className="home-container290">
                  <div className="home-container291">
                    <img
                      alt="image"
                      src={require("./img/user6-200h.png")}
                      className="home-image48"
                    />
                    <div className="home-container292">
                      <p className="home-text355">Emily Rose</p>
                      <p className="home-text356">Manager @ Nike</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r5-200h.png")}
                    className="home-image49"
                  />
                </div>
                <p className="home-text357">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>
              </div>
              <div className="home-container285x">
                <div className="home-container294">
                  <div className="home-container295">
                    <img
                      alt="image"
                      src={require("./img/user12-200h.png")}
                      className="home-image50"
                    />
                    <div className="home-container296">
                      <p className="home-text368">Jonathan Kong</p>
                      <p className="home-text369">Manager @ Adidas</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r2-200h.png")}
                    className="home-image51"
                  />
                </div>
                <p className="home-text370">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>
              </div>
            </div>
          </div>

          <div className="home-container283xZy">
            <div style={{ display: "flex" }}>
              <div className="home-container285x">
                <div className="home-container286">
                  <div className="home-container287">
                    <img
                      alt="image"
                      src={require("./img/user1-200h.png")}
                      className="home-image46"
                    />
                    <div className="home-container288">
                      <p className="home-text342">Jonathan Kim</p>
                      <p className="home-text343">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image47"
                  />
                </div>
                <p className="home-text344">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>
              </div>
              <div className="home-container285x">
                <div className="home-container290">
                  <div className="home-container291">
                    <img
                      alt="image"
                      src={require("./img/user6-200h.png")}
                      className="home-image48"
                    />
                    <div className="home-container292">
                      <p className="home-text355">Emily Rose</p>
                      <p className="home-text356">Manager @ Nike</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r5-200h.png")}
                    className="home-image49"
                  />
                </div>
                <p className="home-text357">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>
              </div>
              <div className="home-container285x">
                <div className="home-container294">
                  <div className="home-container295">
                    <img
                      alt="image"
                      src={require("./img/user12-200h.png")}
                      className="home-image50"
                    />
                    <div className="home-container296">
                      <p className="home-text368">Jonathan Kong</p>
                      <p className="home-text369">Manager @ Adidas</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r2-200h.png")}
                    className="home-image51"
                  />
                </div>
                <p className="home-text370">
                  <span>
                    I&apos;ve used several cleaning services in the past, but
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Crisp Cleaning Corp truly stands out. The attention to
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    detail is impeccable, and my home has never looked
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    this clean and organized. The team went above and
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    beyond to ensure every nook and cranny was
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>spotless.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Moreover, the customer service was outstanding. The staff
                    was friendly, responsive, and accommodating to my schedule.
                    It&apos;s rare to find a company that values its customers
                    as much as Sparkle Clean Corp does
                  </span>
                  <br></br>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="review-container17">
        <div className="review-container18">
          <div className="review-image01x">
            <img
              alt="image"
              src={require("./img/vector300w.png")}
              className="review-image01xyf"
              // style={{marginRight:sliderIn}}
            />
          </div>
          <h1 className="review-heading1x">
            <span>Popular Customer Videos</span>
          </h1>
        </div>
      </div>

      <div className="review-container31">
        <h1 className="review-heading1">
          <span>Customer videos</span>
        </h1>

        <div className="home-container230">
          <div className="home-container231y">
            <div className="home-container249s">
              <div className="home-container250">
                <div className="home-container251">
                  <div className="home-container252">
                    <img
                      alt="image"
                      src={require("./img/user5-200h.png")}
                      className="home-image28"
                    />
                    <div className="home-container253">
                      <p className="home-text234">Jonathan Kim</p>
                      <p className="home-text235">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image29"
                  />
                </div>
                <p className="home-text236">
                  <span>
                    Hats off to the Clean Team! They tackled the toughest
                  </span>
                  <span>
                    stains with ease, leaving my office looking pristine.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Their attention to detail and friendly staff make them
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>my go-to cleaning company</span>

                  <br></br>
                  <br></br>
                </p>
                <video
                  src={require("./img/samplex.mp4")}
                  poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                  preload="auto"
                  controls
                  className="home-video"
                ></video>
                <p className="home-text241">4:22 AM - Nov 29,2023</p>
              </div>
            </div>
            <div className="home-container249s">
              <div className="home-container250">
                <div className="home-container251">
                  <div className="home-container252">
                    <img
                      alt="image"
                      src={require("./img/user5-200h.png")}
                      className="home-image28"
                    />
                    <div className="home-container253">
                      <p className="home-text234">Jonathan Kim</p>
                      <p className="home-text235">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image29"
                  />
                </div>
                <p className="home-text236">
                  <span>
                    Hats off to the Clean Team! They tackled the toughest
                  </span>
                  <span>
                    stains with ease, leaving my office looking pristine.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Their attention to detail and friendly staff make them
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>my go-to cleaning company</span>

                  <br></br>
                  <br></br>
                </p>
                <video
                  src={require("./img/samplex.mp4")}
                  poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                  preload="auto"
                  controls
                  className="home-video"
                ></video>
                <p className="home-text241">4:22 AM - Nov 29,2023</p>
              </div>
            </div>
            <div className="home-container249s">
              <div className="home-container250">
                <div className="home-container251">
                  <div className="home-container252">
                    <img
                      alt="image"
                      src={require("./img/user5-200h.png")}
                      className="home-image28"
                    />
                    <div className="home-container253">
                      <p className="home-text234">Jonathan Kim</p>
                      <p className="home-text235">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image29"
                  />
                </div>
                <p className="home-text236">
                  <span>
                    Hats off to the Clean Team! They tackled the toughest
                  </span>
                  <span>
                    stains with ease, leaving my office looking pristine.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Their attention to detail and friendly staff make them
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>my go-to cleaning company</span>

                  <br></br>
                  <br></br>
                </p>
                <video
                  src={require("./img/samplex.mp4")}
                  poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                  preload="auto"
                  controls
                  className="home-video"
                ></video>
                <p className="home-text241">4:22 AM - Nov 29,2023</p>
              </div>
            </div>
          </div>
          <div className="home-container231yx">
            <div className="home-container249s">
              <div className="home-container250">
                <div className="home-container251">
                  <div className="home-container252">
                    <img
                      alt="image"
                      src={require("./img/user5-200h.png")}
                      className="home-image28"
                    />
                    <div className="home-container253">
                      <p className="home-text234">Jonathan Kim</p>
                      <p className="home-text235">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image29"
                  />
                </div>
                <p className="home-text236">
                  <span>
                    Hats off to the Clean Team! They tackled the toughest
                  </span>
                  <span>
                    stains with ease, leaving my office looking pristine.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Their attention to detail and friendly staff make them
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>my go-to cleaning company</span>

                  <br></br>
                  <br></br>
                </p>
                <video
                  src={require("./img/samplex.mp4")}
                  poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                  preload="auto"
                  controls
                  className="home-video"
                ></video>
                <p className="home-text241">4:22 AM - Nov 29,2023</p>
              </div>
            </div>
            <div className="home-container249s">
              <div className="home-container250">
                <div className="home-container251">
                  <div className="home-container252">
                    <img
                      alt="image"
                      src={require("./img/user5-200h.png")}
                      className="home-image28"
                    />
                    <div className="home-container253">
                      <p className="home-text234">Jonathan Kim</p>
                      <p className="home-text235">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image29"
                  />
                </div>
                <p className="home-text236">
                  <span>
                    Hats off to the Clean Team! They tackled the toughest
                  </span>
                  <span>
                    stains with ease, leaving my office looking pristine.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Their attention to detail and friendly staff make them
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>my go-to cleaning company</span>

                  <br></br>
                  <br></br>
                </p>
                <video
                  src={require("./img/samplex.mp4")}
                  poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                  preload="auto"
                  controls
                  className="home-video"
                ></video>
                <p className="home-text241">4:22 AM - Nov 29,2023</p>
              </div>
            </div>
            <div className="home-container249s">
              <div className="home-container250">
                <div className="home-container251">
                  <div className="home-container252">
                    <img
                      alt="image"
                      src={require("./img/user5-200h.png")}
                      className="home-image28"
                    />
                    <div className="home-container253">
                      <p className="home-text234">Jonathan Kim</p>
                      <p className="home-text235">Manager @ Samsung</p>
                    </div>
                  </div>
                  <img
                    alt="image"
                    src={require("./img/r1-200h.png")}
                    className="home-image29"
                  />
                </div>
                <p className="home-text236">
                  <span>
                    Hats off to the Clean Team! They tackled the toughest
                  </span>
                  <span>
                    stains with ease, leaving my office looking pristine.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    Their attention to detail and friendly staff make them
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>my go-to cleaning company</span>

                  <br></br>
                  <br></br>
                </p>
                <video
                  src={require("./img/samplex.mp4")}
                  poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                  preload="auto"
                  controls
                  className="home-video"
                ></video>
                <p className="home-text241">4:22 AM - Nov 29,2023</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="home-button15f button"
            onMouseEnter={activateX}
            onMouseLeave={offX}
          >
            <span>Load More</span>
          </button>
        </div>
      </div>

      <div className="review-container41">
        {/* <div className="review-container42">
          <div className="review-container43"></div>
          <div className="review-container44"></div>
          <div className="review-container45"></div>
          <div className="review-container46"></div>
          <div className="review-container47"></div>
        </div> */}
      </div>
      <div className="review-container48">
        <div className="review-container49">
          <div className="review-container50">
            <h1 className="review-text75">
              Streamline your cleaning experience
            </h1>
            <span className="review-text76">
              <span>
                Your cleaning solutions are just a click away, making it
                convenient for you to maintain a<br /> pristine and comfortable
                environment for your home or business.
              </span>
              <br />
            </span>
            <div className="review-container51">
              <button
                type="button"
                className="review-button button"
                onMouseEnter={activateX}
                onMouseLeave={offX}
                style={{ cursor: "pointer" }}
              >
                Take Action
              </button>
              <Link
                to="/contact"
                type="button"
                className="review-button1 button"
                onMouseEnter={activateX}
                onMouseLeave={offX}
                style={{ cursor: "pointer" }}
              >
                Contact us
              </Link>
            </div>
          </div>
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

export default Review;
