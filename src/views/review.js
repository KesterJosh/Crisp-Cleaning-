import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Helmet } from "react-helmet";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "./data";

import "./review.css";
import "./home.css";
import Mobilex from "./mobile";
import Login from "./login";
import RegisterPopup from "../components/RegisterPopup";
import axios from "axios";
import Footer from "../components/Footer";

const Review = (props) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const handleClick = () => {
    sessionStorage.setItem("scrollToRef", "about");
    window.location.href = `${window.location.origin}/`;
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setLoading(false);
    }, 1000); // 1 second delay
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
  const navigateS = () => {
    window.location.href = "/#/dashboard"; // Full page reload
  };
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

  const [reviews, setReviews] = useState([]);
  const [videoReviews, setVideoReviews] = useState([]);

  useEffect(() => {
    axios
      .get("https://api-crisp-cleaning.onrender.com/api/reviews")
      .then((res) => {
        const fetchedReviews = res.data.data;
        const filteredVideos = fetchedReviews.filter(
          (review) => review.reviewType === "video"
        );
        if (filteredVideos.length > 6) {
          setVideoReviews(filteredVideos);
        }
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://api-crisp-cleaning.onrender.com/api/reviews")
      .then((res) => {
        if (res.data.success && res.data.data.length > 6) {
          setReviews(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
  }, []);

  const dummyReviews = [
    {
      id: 1,
      userName: "Jonathan Kim",
      createdAt: new Date(),
      image: require("./img/user1-200h.png"),
      ratingImage: require("./img/r1-200h.png"),
      text: "I've used several cleaning services in the past, but Crisp Cleaning Corp truly stands out...",
    },
    {
      id: 2,
      userName: "Emily Rose",
      createdAt: new Date(),
      image: require("./img/user6-200h.png"),
      ratingImage: require("./img/r5-200h.png"),
      text: "The attention to detail is impeccable. My home has never looked this clean and organized...",
    },
    {
      id: 3,
      userName: "Jonathan Kong",
      createdAt: new Date(),
      image: require("./img/user12-200h.png"),
      ratingImage: require("./img/r2-200h.png"),
      text: "The team went above and beyond to ensure every nook and cranny was spotless...",
    },
    {
      id: 4,
      userName: "Sophia Williams",
      createdAt: new Date(),
      image: require("./img/user1-200h.png"),
      ratingImage: require("./img/r1-200h.png"),
      text: "Absolutely fantastic service! The team was prompt, professional, and left my home sparkling.",
    },
    {
      id: 5,
      userName: "Michael Johnson",
      createdAt: new Date(),
      image: require("./img/user6-200h.png"),
      ratingImage: require("./img/r2-200h.png"),
      text: "Reliable and thorough. Crisp Cleaning Corp is the best cleaning service I've ever used.",
    },
    {
      id: 6,
      userName: "Isabella Martinez",
      createdAt: new Date(),
      image: require("./img/user12-200h.png"),
      ratingImage: require("./img/r2-200h.png"),
      text: "Friendly staff, attention to detail, and flawless results every time. Highly recommended!",
    },
    {
      id: 7,
      userName: "Liam Brown",
      createdAt: new Date(),
      image: require("./img/user1-200h.png"),
      ratingImage: require("./img/r1-200h.png"),
      text: "Sparkling clean! Their staff exceeded my expectations. Everything looks brand new.",
    },
    {
      id: 8,
      userName: "Olivia Davis",
      createdAt: new Date(),
      image: require("./img/user6-200h.png"),
      ratingImage: require("./img/r5-200h.png"),
      text: "Professional, quick, and efficient. They handled everything with care and precision.",
    },
    {
      id: 9,
      userName: "Noah Smith",
      createdAt: new Date(),
      image: require("./img/user12-200h.png"),
      ratingImage: require("./img/r2-200h.png"),
      text: "I couldn’t be happier with the service. My apartment looks immaculate. Thank you!",
    },
  ];

  const dummyVideoReviews = [
    {
      id: 1,
      userName: "Jonathan Kim",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
    {
      id: 2,
      userName: "Emily Johnson",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
    {
      id: 3,
      userName: "James Rodriguez",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
    {
      id: 4,
      userName: "Jonathan Kim",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
    {
      id: 5,
      userName: "Emily Johnson",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
    {
      id: 6,
      userName: "James Rodriguez",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
    {
      id: 7,
      userName: "Jonathan Kim",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
    {
      id: 8,
      userName: "Emily Johnson",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
    {
      id: 9,
      userName: "James Rodriguez",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
    {
      id: 10,
      userName: "Jonathan Kim",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
    {
      id: 11,
      userName: "Emily Johnson",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
    {
      id: 12,
      userName: "James Rodriguez",
      videoUrl: require("./img/samplex.mp4"),
      createdAt: new Date(),
    },
  ];

  const displayReviews = reviews.length > 6 ? reviews : dummyReviews;
  const displayVideoReviews =
    videoReviews.length > 6 ? videoReviews : dummyVideoReviews;

  return (
    <div className="review-container">
      {login && (
        <Login CloseLogin={() => setLogin(false)} navigateS={navigateS} />
      )}
      {register && <RegisterPopup onClose={() => setRegister(false)} />}
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
              onClick={() => setLogin(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="home-text010">Login</span>
            </div>
            <span
              className="home-text011"
              onClick={handleClick}
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
            <h2
              onClick={() => {
                setLogin(true);
              }}
            >
              Login
            </h2>
          </div>
          <div className="home-container231xy">
            <div
              className="home-container249xf"
              ref={containerRef}
              onMouseEnter={handleMouseEnterY}
              onMouseLeave={handleMouseLeaveY}
            >
              <div className="text-reviews-section-2">
                {displayReviews.map((review) => (
                  <div key={review.id} className="text-review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        {review.image ? (
                          <img
                            alt="user"
                            src={review.image}
                            className="reviewer-avatar"
                          />
                        ) : (
                          <UserIcon className="reviewer-avatar" size={28} />
                        )}
                        <div className="reviewer-details">
                          <p className="reviewer-name">{review.userName}</p>
                          <small className="review-date">
                            {new Date(review.createdAt).toLocaleDateString()} -{" "}
                            {new Date(review.createdAt).toLocaleTimeString()}
                          </small>
                        </div>
                      </div>
                    </div>
                    <p className="review-content">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="home-container266x"
              ref={containerRefGG}
              onMouseEnter={handleMouseEnterGG}
              onMouseLeave={handleMouseLeaveGG}
            >
              <div className="text-reviews-section-2">
                {displayReviews.map((review) => (
                  <div key={review.id} className="text-review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        {review.image ? (
                          <img
                            alt="user"
                            src={review.image}
                            className="reviewer-avatar"
                          />
                        ) : (
                          <UserIcon className="reviewer-avatar" size={28} />
                        )}
                        <div className="reviewer-details">
                          <p className="reviewer-name">{review.userName}</p>
                          <small className="review-date">
                            {new Date(review.createdAt).toLocaleDateString()} -{" "}
                            {new Date(review.createdAt).toLocaleTimeString()}
                          </small>
                        </div>
                      </div>
                    </div>
                    <p className="review-content">{review.text}</p>
                  </div>
                ))}
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

          <div className="text-reviews-section">
            {displayReviews.slice(0, 3).map((review) => (
              <div key={review.id} className="text-review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    {review.image ? (
                      <img
                        alt="user"
                        src={review.image}
                        className="reviewer-avatar"
                      />
                    ) : (
                      <UserIcon className="reviewer-avatar" size={28} />
                    )}
                    <div className="reviewer-details">
                      <p className="reviewer-name">{review.userName}</p>
                      <small className="review-date">
                        {new Date(review.createdAt).toLocaleDateString()} -{" "}
                        {new Date(review.createdAt).toLocaleTimeString()}
                      </small>
                    </div>
                  </div>
                </div>
                <p className="review-content">{review.text}</p>
              </div>
            ))}
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
            <span>Real Customer Experiences</span>
          </h1>
        </div>
      </div>

      <div className="video-reviews-section">
        <div className="video-reviews-grid">
          {displayVideoReviews.slice(0, visibleCount).map((review) => (
            <div key={review.id} className="video-review-card">
              <div className="review-card-header">
                <div className="reviewer-info">
                  <img
                    alt="user"
                    src={require("./img/user5-200h.png")}
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-details">
                    <p className="reviewer-name">{review.userName}</p>
                    <p className="reviewer-title">Valued Client</p>
                  </div>
                </div>
              </div>

              <video
                src={
                  review.videoUrl.startsWith("http")
                    ? review.videoUrl
                    : require("./img/samplex.mp4")
                }
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="review-video"
              ></video>

              <p className="review-date">
                {new Date(review.createdAt).toLocaleDateString()} -{" "}
                {new Date(review.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>

        {visibleCount < displayVideoReviews.length && (
          <button
            type="button"
            className="load-more-btn"
            onClick={handleLoadMore}
            onMouseEnter={activateX}
            onMouseLeave={offX}
          >
            <span>{loading ? "Loading..." : "Discover More"}</span>
          </button>
        )}
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
              <Link
                to="/"
                onClick={() => sessionStorage.setItem("scrollToRef", "about")}
              >
                <button
                  type="button"
                  className="review-button button"
                  onClick={handleClick}
                  onMouseEnter={activateX}
                  onMouseLeave={offX}
                  style={{ cursor: "pointer" }}
                >
                  Take Action
                </button>
              </Link>
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
      <Footer />
    </div>
  );
};

export default Review;
