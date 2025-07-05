import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loadStripe } from "@stripe/stripe-js";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Helmet } from "react-helmet";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FullScreenVideo.css";
import { useHistory } from "react-router-dom";
import { UserIcon, X } from "@phosphor-icons/react";
import Slider from "rc-slider";
import { Link, useNavigate } from "react-router-dom";
import customCursorImage from "./fb-200h.png"; // Replace with the path to your custom cursor image
import "rc-slider/assets/index.css";
import gsap from "gsap";
import Dropdownx from "./dropdown";
import "./SpriteAnimation.css";
import LottieAnimation from "./sliderAnimation";
import axios from "axios";
import moment from "moment";

import windowOn from "./Extras/window_on.png";
import windowOff from "./Extras/window_off.png";
import brickOn from "./Extras/brick_on.png";
import brickOff from "./Extras/brick_off.png";
import cabinetsOn from "./Extras/cabinets_on.png";
import cabinetsOff from "./Extras/cabinets_off.png";
import organisationOn from "./Extras/organisation_on.png";
import organisationOff from "./Extras/organisation_off.png";
import blindOn from "./Extras/blind_on.png";
import blindOff from "./Extras/blind_off.png";
import stovetopOn from "./Extras/stovetop_on.png";
import stovetopOff from "./Extras/stovetop_off.png";
import fridgeOn from "./Extras/fridge_on.png";
import fridgeOff from "./Extras/fridge_off.png";
import dishwasherOn from "./Extras/dishwasher_on.png";
import dishwasherOff from "./Extras/dishwasher_off.png";
import garageOn from "./Extras/garage_on.png";
import garageOff from "./Extras/garage_off.png";
import microwaveOn from "./Extras/microwave_on.png";
import microwaveOff from "./Extras/microwave_off.png";
import laundryOn from "./Extras/laundry_on.png";
import laundryOff from "./Extras/laundry_off.png";
import tilesOn from "./Extras/Tiles_on.png";
import tilesOff from "./Extras/Tiles_off.png";

import "./home.css";
import VideoBackground from "./videos";
import Calendar from "./calender";
import Select from "react-select";
// import { SpriteAnimator } from 'react-sequence-animator';
import { SpriteAnimator } from "react-sprite-animator";
import Mobilex from "./mobile";
import CalenSchedule from "./calendSchedule";
import Login from "./login";
import RegisterPopup from "../components/RegisterPopup";
import CleaningSwiper from "../components/cleaningSwiper";
import Footer from "../components/Footer";

let defValue = 1;
let direction = 1;

const CustomOption = ({ innerProps, label, data }) => (
  <div {...innerProps} className="arrangementX">
    {label} <span className="coloredStyle">{data?.LoginX}</span>
  </div>
);

const CustomOptionX = ({ innerProps, label, data }) => (
  <div {...innerProps} className="arrangementXY">
    {label} <span className="coloredStyle">{data?.LoginX}</span>
  </div>
);

const options = [
  { value: "weekly", label: "Week", LoginX: "15% Off" },
  { value: "fortnightly", label: "Fortnight", LoginX: "10% Off" },
  { value: "monthly", label: "Month", LoginX: "5% Off" },
];

const optionsX = [
  { value: "sunday", label: "Sunday", LoginX: "" },
  { value: "monday", label: "Monday", LoginX: "" },
  { value: "tuesday", label: "Tuesday", LoginX: "" },
  { value: "wednesday", label: "Wednesday", LoginX: "" },
  { value: "thursday", label: "Thursday", LoginX: "" },
  { value: "friday", label: "Friday", LoginX: "" },
  { value: "saturday", label: "Saturday", LoginX: "" },
];

// optionsX
const opts = {
  playerVars: {
    controls: 0, // 0 disables player controls
    modestbranding: 1, // Hides the YouTube logo in the control bar
  },
};

gsap.registerPlugin(ScrollTrigger);
const Home = (props) => {
  const handleChange = (selectedOption) => {
    // Handle the selected option
    switch (selectedOption.value) {
      case "weekly":
        setIntervalValue(15);
        break;
      case "fortnightly":
        setIntervalValue(10);
        break;
      case "monthly":
        setIntervalValue(5);
        break;
      default:
        setIntervalValue(null); // Set a default value if needed
    }
  };

  const [GetInside, setGetInside] = useState("I will be home");
  const [Park, setPark] = useState("I will provide parking on site");
  const [Animal, setAnimal] = useState("Dog/Cat");
  const [spComments, setspComments] = useState("");

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

  // Select Cleaning Type
  const [showPopup, setShowPopup] = useState(false);
  const handleMouseEnterS = (event) => {
    const container = event.currentTarget;

    container.style.border = "2px solid #FF914D";
  };

  const handleMouseLeaveS = (event) => {
    const container = event.currentTarget;

    container.style.border = "2px solid black";
  };

  // Select Cleaning Type

  const handleMouseEnterSX = (event) => {
    const container = event.currentTarget;

    container.style.border = "2px solid #FF914D";
  };

  const handleMouseLeaveSX = (event) => {
    const container = event.currentTarget;

    container.style.border = "2px solid #CFCFCF";
  };

  const ScaleVid = (event) => {
    const container = event.currentTarget;

    // Animation for mouse enter
    const child1 = container.querySelector(":nth-child(1)");
    gsap.to(child1, { scale: 1.2, duration: 0.5 });
  };

  const ReduceVid = (event) => {
    const container = event.currentTarget;

    // Animation for mouse leave
    const child1 = container.querySelector(":nth-child(1)");
    gsap.to(child1, { scale: 1, duration: 0.5 });
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

  // Scroll Infinity

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

  //Last Scroller
  const containerRefXX = useRef(null);
  const [isHoveredXX, setHoveredXX] = useState(false);
  const animationXX = useRef(null);

  useEffect(() => {
    const containerXX = containerRefXX.current;
    const contentHeightXX = containerXX.scrollHeight;
    const mixedHeightXX = contentHeightXX - 1200;

    // Scroll animation
    animationXX.current = gsap.fromTo(
      containerXX,
      { y: -20 },
      {
        y: () => -mixedHeightXX,
        duration: 22,
        repeat: -1, // Set repeat to -1 for infinite loop
        ease: "linear",
        paused: true,
      }
    );

    // Cleanup animation on component unmount
    return () => {
      animationXX.current.kill();
    };
  }, []);

  useEffect(() => {
    if (animationXX.current) {
      if (isHoveredXX) {
        animationXX.current.pause(); // Pause the animationXX when hovered
      } else {
        animationXX.current.play(); // Resume the animation when not hovered
      }
    }
  }, [isHoveredXX]);

  // Toggle hover state on mouse enter/leave
  const handleMouseEnterXX = () => {
    setHoveredXX(true);
  };

  const handleMouseLeaveXX = () => {
    setHoveredXX(false);
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

    // Cleanup animation on component unmount
    return () => {
      animationGG.current.kill();
    };
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

  const sectionRef = useRef(null);

  const scrollToSection = () => {
    const offset = 0; // pixels
    const top = sectionRef.current.offsetTop - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Toggle hover state on mouse enter/leave
  const handleMouseEnterGG = () => {
    setHoveredGG(true);
  };

  const handleMouseLeaveGG = () => {
    setHoveredGG(false);
  };

  //// Video Controls

  const [videoId, setvideoId] = useState("9wJVmOuf_Ek");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0, // 0 disables player controls
      modestbranding: 1, // Hides the YouTube logo in the control bar
    },
  };

  // Drag Animation

  const containerRefz = useRef(null);
  const CursorRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showIcon, setShowIcon] = useState(false);

  const [isHoveredx, setIsHoveredx] = useState(false);

  const containerRefD = useRef(null);
  const [isDraggingD, setIsDraggingD] = useState(false);
  const [dragStartXD, setDragStartXD] = useState(0);
  const [scrollLeftD, setScrollLeftD] = useState(0);

  const handleMouseEnterC = (e) => {
    setIsHoveredx(true);
    document.body.style.cursor = "none";
    cursor.current.style.display = "block";
    setIsDraggingD(true);
    setDragStartXD(e.clientX);
  };

  const handleMouseLeaveC = () => {
    setIsHoveredx(false);
    document.body.style.cursor = "auto";
    console.log("false");
    cursor.current.style.display = "none";
  };

  const cursor = useRef(null);
  const changePosition = (e) => {
    cursor.current.style.top = `${e.clientY + 15}px`;
    cursor.current.style.left = `${e.clientX + 15}px`;
    if (!isDraggingD) return;

    const deltaX = e.clientX - dragStartXD;
    containerRefz.current.scrollLeft = scrollLeft - deltaX;
  };

  let divClass = "noverERX";

  useEffect(() => {
    divClass = isHoveredx ? "noverERX" : "noneER";
  }, [isHoveredx, divClass]);

  ///
  // Mobile Menu

  // const [mobileMenu, setmobileMenu] = useState(false);
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

  // Tabs

  const [tabs, setTabs] = useState(1);
  const [tabx, setTabx] = useState(1);
  const [Summary, setSummary] = useState(0);
  const [sum, setSum] = useState(false);

  const SummaryRef = useRef(null);

  useEffect(() => {
    // Ensure that SummaryRef.current exists before trying to access its style
    if (sum) {
      setSummary(2);
    } else {
      if ((tabs > 1) & (tabs < 5)) {
        setSummary(1);
      } else {
        setSummary(0);
      }
    }
    if (SummaryRef.current) {
      if (tabs == 1) {
        // SummaryRef.current.style.display = "none";
        gsap.to(".home-container209", {
          opacity: 0,
          bottom: "-100%",
          duration: 0.5,
        });
      } else if (tabs > 1) {
        // SummaryRef.current.style.display = "block";
        gsap.to(".home-container209", {
          opacity: 1,
          bottom: "-92%",
          duration: 0.5,
        });
      }

      // console.log(tabs);
    }
  }, [Summary, tabs, setTabs, setSummary]);
  // console.log(Summary);

  useEffect(() => {
    if (sum == true) {
      // SummaryRef.current.style.display = "block";
      // SummaryRef.current.style.bottom = "-0%";
      gsap.to(".home-container209", {
        display: "block",
        bottom: "0%",
        borderWidth: 0,
        ease: "power1",
        duration: 1,
      });
      gsap.to(".home-container210x", {
        opacity: 0,
        ease: "power1",
        duration: 1,
      });
    } else {
      // SummaryRef.current.style.display = "block";
      // SummaryRef.current.style.bottom = "-0%";
      // gsap.to(".home-container209",{
      //   display:'block',
      //   bottom:"0%",
      //   borderWidth:0
      // });
      // home-container210
      gsap.to(".home-container209", {
        display: "block",
        bottom: "-92%",
        ease: "power1",
        duration: 1,
      });
      gsap.to(".home-container210x", {
        opacity: 1,
        ease: "power1.out",
        duration: 1,
      });
    }
  }, [[setSum, sum]]);

  // Data Collection
  const history = useHistory();
  const [Quote, setQuote] = useState(0);

  const nextScreen = () => {
    if (Quote == 1) {
      setTabs(2);
      setLayer(1);
    } else if (Quote == 2) {
      setTabx(2);
      setLayer(2);
    }
  };

  // Types Of cleaning
  const [CleanType, setCleanType] = useState(false);

  // Sliders
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setTotalSliders(value + sliderValueO + sliderValueOX + sliderValueK);
    sumUp(value + sliderValueO + sliderValueOX + sliderValueK);
  };

  const [sliderValueK, setSliderValueK] = useState(0);

  const handleSliderChangeK = (value) => {
    setSliderValueK(value);
    setTotalSliders(value + sliderValueO + sliderValueOX + sliderValue);
    sumUp(value + sliderValueO + sliderValueOX + sliderValue);
  };

  const [sliderValueO, setSliderValueO] = useState(1);

  const handleSliderChangeO = (value) => {
    setSliderValueO(value);
    setTotalSliders(value + sliderValueK + sliderValueOX + sliderValue);
    sumUp(value + sliderValueK + sliderValueOX + sliderValue);
  };

  const [sliderValueOX, setSliderValueOX] = useState(0);
  const [totalSliders, setTotalSliders] = useState(0);

  const handleSliderChangeOX = (value) => {
    setSliderValueOX(value);
    setTotalSliders(value + sliderValueK + sliderValueO + sliderValue);
    sumUp(value + sliderValueK + sliderValueO + sliderValue);
  };
  const [TotalSwitch, setTotalSwitch] = useState(1);

  const sumUp = (value) => {
    setTotalSwitch(value);
    defValue = value;
  };

  const [intervalValue, setIntervalValue] = useState(0);

  const handleSelectChange = (selectedValue) => {
    // Set the state based on the selected value
    switch (selectedValue) {
      case "weekly":
        setIntervalValue(15);
        break;
      case "fortnightly":
        setIntervalValue(10);
        break;
      case "monthly":
        setIntervalValue(5);
        break;
      default:
        setIntervalValue(15); // Set a default value if needed
    }
  };

  const [timeFrame, settimeFrame] = useState(8);

  const handleSelectDate = (selectedValue) => {
    // Map the selected value to a time frame
    const timeFrameMap = {
      "8to10": 8,
      "10to12": 10,
      "12to2": 12,
      "2to4": 14,
      "4to6": 16,
      "6to8": 18,
    };

    // Set the state based on the selected value
    const newTimeFrame = timeFrameMap[selectedValue] || 8; // Default to 8 if not found
    settimeFrame(newTimeFrame);

    // Optional: alert for debugging
  };

  // const Total = 0;
  const [Total, setTotal] = useState(0);
  const [type, setType] = useState(45);
  // Extra's
  const [windows, setWindows] = useState(0);
  const [walls, setwalls] = useState(0);
  const [Cabinets, setCabinets] = useState(0);
  const [organization, setorganization] = useState(0);
  const [blind, setblind] = useState(0);
  const [stovetop, setstovetop] = useState(0);
  const [fridge, setfridge] = useState(0);
  const [Dishwasher, setDishwasher] = useState(0);
  const [garage, setgarage] = useState(0);
  const [microwave, setmicrowave] = useState(0);
  const [Laundry, setLaundry] = useState(0);
  const [tiles, settiles] = useState(0);

  const [discount, setDiscount] = useState(Total);
  const [CleanP, setCleanP] = useState(false);

  useEffect(() => {
    let bathrom = 30 * sliderValue;
    let kitch = 45 * sliderValueK;
    let oth = 20 * sliderValueOX;
    let rooms = 20 * sliderValueO;
    let total =
      type +
      windows +
      walls +
      Cabinets +
      organization +
      blind +
      stovetop +
      fridge +
      Dishwasher +
      garage +
      microwave +
      Laundry +
      tiles +
      bathrom +
      kitch +
      oth +
      rooms;
    total = ((100 - intervalValue) / 100) * total;
    setDiscount(total);
    setDiscountNew(total);
    total = total.toFixed(2);
    setTotal(total);
  }, [
    setTotal,
    intervalValue,
    Total,
    type,
    windows,
    walls,
    Cabinets,
    organization,
    blind,
    stovetop,
    fridge,
    Dishwasher,
    garage,
    microwave,
    Laundry,
    tiles,
    sliderValue,
    sliderValueK,
    sliderValueO,
    sliderValueOX,
  ]);

  const [daySelect1, setdaySelect1] = useState(0);
  const [daySelect2, setdaySelect2] = useState(0);
  const [daySelect3, setdaySelect3] = useState(0);
  const [daySelect4, setdaySelect4] = useState(0);
  const [daySelect5, setdaySelect5] = useState(0);
  const [daySelect6, setdaySelect6] = useState(0);
  const [daySelect7, setdaySelect7] = useState(0);

  const daySelecter1 = (e) => {
    if (daySelect1 == 1) {
      setdaySelect1(0);
    } else {
      setdaySelect1(1);
    }
  };
  const daySelecter2 = (e) => {
    if (daySelect2 == 1) {
      setdaySelect2(0);
    } else {
      setdaySelect2(e);
    }
  };
  const daySelecter3 = (e) => {
    if (daySelect3 == 1) {
      setdaySelect3(0);
    } else {
      setdaySelect3(e);
    }
  };
  const daySelecter4 = (e) => {
    if (daySelect4 == 1) {
      setdaySelect4(0);
    } else {
      setdaySelect4(e);
    }
  };
  const daySelecter5 = (e) => {
    if (daySelect5 == 1) {
      setdaySelect5(0);
    } else {
      setdaySelect5(e);
    }
  };
  const daySelecter6 = (e) => {
    if (daySelect6 == 1) {
      setdaySelect6(0);
    } else {
      setdaySelect6(e);
    }
  };
  const daySelecter7 = (e) => {
    if (daySelect7 == 1) {
      setdaySelect7(0);
    } else {
      setdaySelect7(e);
    }
  };

  useEffect(() => {
    let p1 = tabs * 100 - 100 + "%";
    let p2 = tabs * 100 - 200 + "%";
    let p3 = tabs * 100 - 300 + "%";
    let p4 = tabs * 100 - 400 + "%";
    let p5 = tabs * 100 - 500 + "%";
    let p6 = tabs * 100 - 600 + "%";
    gsap.to(".home-container021", { right: p1 });
    gsap.to(".home-container033", { right: p2 });
    gsap.to(".home-container086", { right: p3 });
    gsap.to(".home-container192", { right: p4 });
    gsap.to(".home-container192x", { right: p5 });
    gsap.to(".home-container192y", { right: p6 });

    // console.log(tabs);
  }, [tabs, setTabs, setSum, sum]);

  useEffect(() => {
    let px1 = tabx * 100 - 100 + "%";
    let px6 = tabx * 100 - 200 + "%";
    gsap.to(".home-container021", { right: px1 });
    gsap.to(".home-container192y", { right: px6, duration: 0.5 });

    console.log(tabx);
  }, [tabx, setTabx]);

  // Final Price
  // Assuming you have a variable 'total'

  const [discountAmount, setDiscountAmount] = useState(0);
  const inputTextRef = useRef(null);
  const [discountNew, setDiscountNew] = useState(discount);
  // const [total, setTotal] = useState(1000); // Replace with your actual total value

  const handleApplyClick = () => {
    // Get the value from the text input
    const inputValue = inputTextRef.current.value.toUpperCase(); // Using ref to access the input value// Convert to uppercase for case-insensitivity

    // Check if the input value is "PERCENT20"
    if (inputValue === "PERCENT20") {
      // Divide the total by 20%
      const result = ((100 - 20) / 100) * discount; // 20% is equivalent to 0.2
      setDiscountAmount(20);
      setDiscountNew(result.toFixed(2));
      console.log(`Result after dividing by 20%: ${result}`);
    } else {
      // Reset the state if the input value is not "PERCENT20"
      setDiscountAmount(0);
      setDiscount(0);
      console.log('Input value is not "PERCENT20".');
    }
  };

  let disPerAmount = (discountAmount / 100) * discount;
  disPerAmount = disPerAmount.toFixed(2);

  let discountTotal = discount;
  // discountTotal = discountTotal.toFixed(2);

  useEffect(() => {
    if (CleanType) {
      gsap.to(".home-container171", { opacity: 1, duration: 0.5 });
      gsap.to(".VisibxA", { opacity: 1, duration: 0.5 });
    } else {
      gsap.to(".home-container171", { opacity: 0, duration: 0.5 });
      gsap.to(".VisibxA", { opacity: 0, duration: 0.5 });
    }
  }, [CleanType]);

  // Rooms Sprite Animations

  // Lottie Player

  const playerRef = useRef(null);

  const playLottie = () => {
    playerRef.current.play();
  };

  const [shouldPause, setShouldPause] = useState(false);

  const handleLoopComplete = () => {
    // Set shouldPause to true on loop complete to pause the animation
    setShouldPause(true);
  };

  const handleMouseDownD = (e) => {
    setIsDraggingD(true);
    setDragStartXD(e.clientX);
  };

  const handleMouseMoveD = (e) => {
    if (!isDraggingD) return;

    const deltaX = e.clientX - dragStartXD;
    containerRefz.current.scrollLeft = scrollLeft - deltaX;
  };

  const handleMouseUpD = () => {
    setIsDraggingD(false);
    setScrollLeftD(containerRefz.current.scrollLeft);
  };

  const [Heart, setHeart] = useState(false);
  const [Heart1, setHeart1] = useState(false);
  const [Heart2, setHeart2] = useState(false);
  const [Heart3, setHeart3] = useState(false);
  const [Heart4, setHeart4] = useState(false);
  const [Heart5, setHeart5] = useState(false);
  const [Heart6, setHeart6] = useState(false);
  const [AB, setAB] = useState(0);

  const [H1, setH1] = useState(true);
  const [H2, setH2] = useState(false);
  const [H3, setH3] = useState(false);
  const [H4, setH4] = useState(false);
  const [H5, setH5] = useState(false);
  const [H6, setH6] = useState(false);
  const [H7, setH7] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (AB === 0 && TotalSwitch >= 2) {
        setTimeout(() => {
          setH1(false);
          setH2(true);
          setAB(1);
        }, 300);
        setHeart(true);
      } else if (AB === 1 && TotalSwitch < 2) {
        setHeart(false);
        setH1(true);
        setH2(false);
        setAB(0);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [AB, TotalSwitch]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (AB === 1 && TotalSwitch >= 4) {
        setHeart1(true);
        setTimeout(() => {
          setH2(false);
          setH3(true);
          setAB(2);
        }, 300);
      } else if (AB === 2 && TotalSwitch < 4) {
        setHeart1(false);
        setH2(true);
        setH3(false);
        setAB(1);
      }
    }, 200);

    return () => clearTimeout(timer1);
  }, [AB, TotalSwitch]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (AB === 2 && TotalSwitch >= 6) {
        setHeart2(true);
        setTimeout(() => {
          setH3(false);
          setH4(true);
          setAB(3);
        }, 300);
      } else if (AB === 3 && TotalSwitch < 6) {
        setHeart2(false);
        setH3(true);
        setH4(false);
        setAB(2);
      }
    }, 200);

    return () => clearTimeout(timer1);
  }, [AB, TotalSwitch]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (AB === 3 && TotalSwitch >= 8) {
        setHeart3(true);
        setTimeout(() => {
          setH4(false);
          setH5(true);
          setAB(4);
        }, 300);
      } else if (AB === 4 && TotalSwitch < 8) {
        setHeart3(false);
        setH4(true);
        setH5(false);
        setAB(3);
      }
    }, 200);

    return () => clearTimeout(timer1);
  }, [AB, TotalSwitch]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (AB === 4 && TotalSwitch >= 10) {
        setHeart4(true);
        setTimeout(() => {
          setH5(false);
          setH6(true);
          setAB(5);
        }, 300);
      } else if (AB === 5 && TotalSwitch < 10) {
        setHeart4(false);
        setH5(true);
        setH6(false);
        setAB(4);
      }
    }, 200);

    return () => clearTimeout(timer1);
  }, [AB, TotalSwitch]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (AB === 5 && TotalSwitch >= 12) {
        setHeart5(true);
        setTimeout(() => {
          setH6(false);
          setH7(true);
          setAB(6);
        }, 300);
      } else if (AB === 6 && TotalSwitch < 12) {
        setHeart5(false);
        setH6(true);
        setH7(false);
        setAB(5);
      }
    }, 200);

    return () => clearTimeout(timer1);
  }, [AB, TotalSwitch]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (AB === 6 && TotalSwitch >= 14) {
        setHeart6(true);
        setAB(7);
      } else if (AB === 7 && TotalSwitch < 14) {
        setHeart6(false);
        setH6(true);
        setH7(false);
        setAB(6);
      }
    }, 200);

    return () => clearTimeout(timer1);
  }, [AB, TotalSwitch]);

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

  const [MyDate, setMyDate] = useState(null);

  const setSelectedDate = (formattedDate) => {
    setMyDate(formattedDate);
  };

  const [hoverImageWindow, setHoverImageWindow] = useState(windowOff);
  const [hoverImageBrick, setHoverImageBrick] = useState(brickOff);
  const [hoverImageCabinets, setHoverImageCabinets] = useState(cabinetsOff);
  const [hoverImageOrganisation, setHoverImageOrganisation] =
    useState(organisationOff);
  const [hoverImageBlind, setHoverImageBlind] = useState(blindOff);
  const [hoverImageStovetop, setHoverImageStovetop] = useState(stovetopOff);
  const [hoverImageFridge, setHoverImageFridge] = useState(fridgeOff);
  const [hoverImageDishwasher, setHoverImageDishwasher] =
    useState(dishwasherOff);
  const [hoverImageGarage, setHoverImageGarage] = useState(garageOff);
  const [hoverImageMicrowave, setHoverImageMicrowave] = useState(microwaveOff);
  const [hoverImageLaundry, setHoverImageLaundry] = useState(laundryOff);
  const [hoverImageTiles, setHoverImageTiles] = useState(tilesOff);

  const handleMouseEnterAX = (button) => {
    gsap.to(button, {
      scale: 1.05,
      opacity: 0.9,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveAX = (button) => {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnterAXY = (button) => {
    gsap.to(button, {
      borderColor: "#BABABA",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveAXY = (button) => {
    gsap.to(button, {
      borderColor: "#FF914D",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnterClean = (button) => {
    gsap.to(button, {
      scale: 1.05,
      opacity: 0.9,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveClean = (button) => {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnterPaint = (button) => {
    gsap.to(button, {
      color: "#FF914D",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeavePaint = (button) => {
    gsap.to(button, {
      color: "rgb(157, 157, 157)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const [supports, setSupports] = useState(false);

  const handleMouseEnterSupport = (button) => {
    gsap.to(button, {
      color: "#FF914D",
      duration: 0.3,
      ease: "power2.out",
    });
    setSupports(true);
  };

  const handleMouseLeaveSupport = (button) => {
    gsap.to(button, {
      color: "rgb(157, 157, 157)",
      duration: 0.3,
      ease: "power2.out",
    });
    setSupports(false);
  };

  const [isLogin, setisLogin] = useState(false);
  const [first_name, setFName] = useState("");
  const [last_name, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [referral, setReferral] = useState("");

  const [layer, setLayer] = useState(1);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    referral: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = (values) => {
    const { first_name, last_name, email, phone, password, address, referral } =
      values;

    axios
      .post("https://api-crisp-cleaning.onrender.com/register", {
        first_name,
        last_name,
        email,
        phone,
        password,
        address,
        referral,
      })
      .then((result) => {
        console.log(result);
        if (result.data.message === "Successful") {
          if (layer === 2) handleSubmitCommercial();
          if (layer === 1) setSum(true);
        } else {
          alert(result.data.error || result.data);
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response?.status === 400) {
          alert("This email has been registered before. Kindly Login");
        } else {
          alert(
            "Something went wrong! Check your internet connection or try again later"
          );
        }
      });
  };

  useEffect(async () => {
    const ref = sessionStorage.getItem("referral");
    setReferral(ref);
  }, [setReferral, referral]);

  const CloseLogin = () => {
    setisLogin(false);
  };

  const OpenLogin = () => {
    setisLogin(true);
  };

  const navigateS = () => {
    window.location.href = "/#/dashboard"; // Full page reload
  };

  const [BusinessName, setBusinessName] = useState();
  const [BusinessSize, setBusinessSize] = useState();
  const [BusinessEnvironment, setBusinessEnvironment] = useState();
  const [BusinessTypeOfClean, setBusinessTypeOfClean] = useState();
  const [BusinessRoomAmount, setBusinessRoomAmount] = useState();
  const [BusinessDetail, setBusinessDetail] = useState();
  const [BusinessTimeFrame, setBusinessTimeFrame] = useState();
  const [BusinessHours, setBusinessHours] = useState();
  const [BusinessComments, setBusinessComments] = useState();

  const handleSubmitCommercial = (e) => {
    // e.preventDefault();

    axios
      .post("https://api-crisp-cleaning.onrender.com/commercial", {
        BusinessName,
        BusinessSize,
        BusinessEnvironment,
        BusinessTypeOfClean,
        BusinessRoomAmount,
        BusinessDetail,
        BusinessTimeFrame,
        BusinessHours,
        BusinessComments,
        email,
      })
      .then((result) => {
        console.log(result);
        if (result.data.status === "Pending") {
          alert("Business information submitted successfully.");
          OpenLogin();
        } else {
          alert(result.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response?.status === 400) {
          alert("A similar request already exists.");
        } else {
          alert("Something went wrong! Please check your internet connection.");
        }
      });
  };

  const handleSubmitClean = () => {
    const requestData = {
      Total,
      type,
      sliderValueO,
      sliderValueK,
      sliderValue,
      sliderValueOX,
      windows,
      walls,
      Cabinets,
      organization,
      blind,
      stovetop,
      fridge,
      Dishwasher,
      garage,
      microwave,
      Laundry,
      tiles,
      MyDate,
      timeFrame,
      email,
      CleanType,
      intervalValue,
      daySelect1,
      daySelect2,
      daySelect3,
      daySelect4,
      daySelect5,
      daySelect6,
      daySelect7,
      GetInside,
      Park,
      Animal,
      spComments,
      discountNew,
    };
    console.log(requestData);
    axios
      .post("https://api-crisp-cleaning.onrender.com/clean", requestData) // Replace with your server endpoint
      .then((response) => {
        alert("Clean record created successfully!");
        OpenLogin();
        console.log(response.data);
      })
      .catch((error) => {
        alert("Error creating clean record.");
        console.error(error);
      });
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51ROhYnH9E7pqq95xLp67muP87yzw3XmN9BdV5ZbF2ZoAQuFJPBDYN0HgbnPfaYiN0Z9scDimOVICuZ7iD5kvBaq900M6capXFd"
    );

    const body = {
      items: [
        {
          name: "Crisp Cleaning Service",
          price: Math.round(Total * 100), // In cents
        },
      ],
    };

    const response = await fetch(
      "https://api-crisp-cleaning.onrender.com/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    handleSubmitClean();

    if (result.error) {
      console.error(result.error);
    }
  };

  useEffect(() => {
    const scrollTo = sessionStorage.getItem("scrollToRef");
    if (scrollTo === "about" && sectionRef.current) {
      // Clear the flag to prevent future unintended scrolls
      sessionStorage.removeItem("scrollToRef");

      // Scroll to the ref after render
      setTimeout(() => {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const [reviews, setReviews] = useState([]);
  const [videoReviews, setVideoReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/reviews")
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
      .get("http://localhost:4000/api/reviews")
      .then((res) => {
        console.log(res.data);
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
    <div className="home-container">
      <Helmet>
        <title>Crisp Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>

      {/* Login Start  */}

      {isLogin == true ? (
        <Login CloseLogin={CloseLogin} navigateS={navigateS} />
      ) : null}

      <div className="home-container010">
        <div className="MenuBug">
          <img
            alt="image"
            src={require("./img/logo-200h.png")}
            className="home-image01"
          />

          <div className="home-container011">
            {/* {Summary}/ {tabs}/{type} / {(sum)?"On":"Off"} */}
            <div className="home-container013">
              <span className="home-text005">Home</span>
            </div>
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
          <div onClick={openmenu}></div>
        </div>

        <div className="home-container017">
          <span
            to="Dashboard"
            className="home-container013"
            onClick={OpenLogin}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="home-text010">Login</span>
          </span>
          <span
            className="home-text011"
            onMouseEnter={handleMouseEnterX}
            onMouseLeave={handleMouseLeaveX}
            onClick={scrollToSection}
          >
            Get Started Now
          </span>
        </div>
      </div>
      <Mobilex mobileM={mobileMenu} />
      <div className="hero">
        <video className="background-video" autoPlay loop muted playsInline>
          <source src="/img/Final.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-content">
          <h1>Transforming Spaces, One clean at a Time</h1>
          <h5>
            Explore our range of cleaning solutions and experience the
            difference of a pristine space today.
          </h5>
        </div>
      </div>
      <CleaningSwiper ref={sectionRef} />
      <div className="home-container019">
        {/* Menu  */}
        <div className="Mobilegeneral">
          <X size={28} className="closeXMenu" onClick={closeMenuX} />
          <Link to="/">
            <h2 className="appointed">Home</h2>
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
            <h2>Contact</h2>
          </Link>
          <h2
            onClick={() => {
              setisLogin(true);
            }}
          >
            Login
          </h2>
        </div>
      </div>
      <div className="home-container228">
        <div className="home-container229">
          <span className="home-text161">
            <span>
              Get To
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="home-text163">Know Our Story</span>
          </span>
          <p className="home-text164">
            <span>
              Curious about the heart behind our pristine services? Dive into
              the essence of
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <br />
            <span>
              Crisp Cleaning by exploring our
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="home-text167">About Page</span>
            <span>
              . Discover the
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="home-text169">
              passion, values, and
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <br />
            <span className="home-text170">
              commitment
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span>that drive us to elevate the standards of cleanliness.</span>
          </p>
          <Link to="/about">
            <button
              type="button"
              className="home-button14 button"
              onMouseEnter={activateX}
              onMouseLeave={offX}
            >
              <span>About us</span>
            </button>
          </Link>
        </div>
      </div>

      <span className="home-text173">
        <span>
          Don't take our word for it! Have a look at what
          {/* <br/> */}
        </span>
        <br></br>
        <span className="home-text176">our valued clients</span>
        <span> have to say</span>
      </span>
      <span className="home-text173x">
        <span>
          Don't take our word for it! Have
          <br /> a look at what
          {/* <br/> */}
          <span className="home-text176">
            {" "}
            our valued
            <br /> clients
          </span>
        </span>
        <span> have to say</span>
      </span>

      <div className="home-container230">
        <div className="home-container231">
          <div
            className="home-container249xy"
            ref={containerRef}
            onMouseEnter={handleMouseEnterY}
            onMouseLeave={handleMouseLeaveY}
          >
            {displayVideoReviews.map((review) => (
              <div key={review.id} className="home-container250">
                <div className="home-container251">
                  <div className="home-container252">
                    {review.image ? (
                      <UserIcon className="home-image46" size={28} />
                    ) : (
                      <img
                        alt="user"
                        src={require("./img/user5-200h.png")}
                        className="home-image28"
                      />
                    )}
                    <div className="home-container253">
                      <p className="home-text234">{review.userName}</p>
                      {review.createdAt ? (
                        <p className="home-text235">Valued Client</p>
                      ) : (
                        <p className="home-text235">
                          {new Date(review.createdAt).toLocaleDateString()} -{" "}
                          {new Date(review.createdAt).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <p className="home-text236">
                  <span>
                    Crisp Cleaning transformed my space. Highly recommend their
                    services!
                  </span>
                </p>

                <video
                  src={
                    review.videoUrl.startsWith("http")
                      ? review.videoUrl
                      : require("./img/samplex.mp4")
                  }
                  poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                  preload="auto"
                  controls
                  className="home-video"
                ></video>

                <p className="home-text241">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div
            className="home-container249xy"
            ref={containerRefXX}
            onMouseEnter={handleMouseEnterY}
            onMouseLeave={handleMouseLeaveY}
          >
            {displayVideoReviews.map((review) => (
              <div key={review.id} className="home-container250">
                <div className="home-container251">
                  <div className="home-container252">
                    {review.image ? (
                      <UserIcon className="home-image46" size={28} />
                    ) : (
                      <img
                        alt="user"
                        src={require("./img/user5-200h.png")}
                        className="home-image28"
                      />
                    )}
                    <div className="home-container253">
                      <p className="home-text234">{review.userName}</p>
                      {review.createdAt ? (
                        <p className="home-text235">Valued Client</p>
                      ) : (
                        <p className="home-text235">
                          {new Date(review.createdAt).toLocaleDateString()} -{" "}
                          {new Date(review.createdAt).toLocaleTimeString()}
                        </p>
                      )}{" "}
                    </div>
                  </div>
                </div>

                <p className="home-text236">
                  <span>
                    Crisp Cleaning transformed my space. Highly recommend their
                    services!
                  </span>
                </p>

                <video
                  src={
                    review.videoUrl.startsWith("http")
                      ? review.videoUrl
                      : require("./img/samplex.mp4")
                  }
                  poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                  preload="auto"
                  controls
                  className="home-video"
                ></video>

                <p className="home-text241">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div
            className="home-container249xy"
            ref={containerRefGG}
            onMouseEnter={handleMouseEnterY}
            onMouseLeave={handleMouseLeaveY}
          >
            {displayVideoReviews.map((review) => (
              <div key={review.id} className="home-container250">
                <div className="home-container251">
                  <div className="home-container252">
                    {review.image ? (
                      <UserIcon className="home-image46" size={28} />
                    ) : (
                      <img
                        alt="user"
                        src={require("./img/user5-200h.png")}
                        className="home-image28"
                      />
                    )}
                    <div className="home-container253">
                      <p className="home-text234">{review.userName}</p>
                      {review.createdAt ? (
                        <p className="home-text235">Valued Client</p>
                      ) : (
                        <p className="home-text235">
                          {new Date(review.createdAt).toLocaleDateString()} -{" "}
                          {new Date(review.createdAt).toLocaleTimeString()}
                        </p>
                      )}{" "}
                    </div>
                  </div>
                </div>

                <p className="home-text236">
                  <span>
                    Crisp Cleaning transformed my space. Highly recommend their
                    services!
                  </span>
                </p>

                <video
                  src={
                    review.videoUrl.startsWith("http")
                      ? review.videoUrl
                      : require("./img/samplex.mp4")
                  }
                  poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                  preload="auto"
                  controls
                  className="home-video"
                ></video>

                <p className="home-text241">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Link to="/review">
          <button
            type="button"
            className="home-button15 button"
            onMouseEnter={activateX}
            onMouseLeave={offX}
          >
            <span>Discover More</span>
          </button>
        </Link>
      </div>

      <span className="home-text337">
        <span className="home-text338">Some valued</span>
        <span>
          {" "}
          people talking about
          <span
            dangerouslySetInnerHTML={{
              __html: " ",
            }}
          />
        </span>
        <br></br>
        <span>our company</span>
      </span>
      <span className="home-text337x">
        <span className="home-text338">Some valued </span>people talking
        <span>
          <br /> about our company
        </span>
        <span></span>
      </span>

      <div className="home-container283">
        {displayReviews.slice(0, 3).map((review) => (
          <div key={review.id} className="home-container285">
            <div className="home-container286">
              <div className="home-container287">
                {review.image ? (
                  <img
                    alt="image"
                    src={review.image}
                    className="home-image46"
                  />
                ) : (
                  <UserIcon className="home-image46" size={28} />
                )}
                <div className="home-container288">
                  <p className="home-text342">{review.userName}</p>
                  <small className="">
                    {new Date(review.createdAt).toLocaleDateString()} -{" "}
                    {new Date(review.createdAt).toLocaleTimeString()}
                  </small>
                </div>
              </div>
            </div>
            <p className="home-text344">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="home-container297">
        <div className="home-container298">
          <span className="home-text381">
            <span>
              Still Have
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="home-text383">Questions To Answer?</span>
          </span>
          <span className="home-text381x">
            <span>
              Still Have
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="home-text383">Questions To Answer?</span>
          </span>
          <p className="home-text384">
            <span>
              Navigate to our
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="home-text386">FAQ page</span>
            <span>
              {" "}
              to find answers to
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="home-text388">
              common queries and gain a deeper understanding
            </span>
            <br />
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span>
              of how we can meet your cleaning needs with precision and care. We
              believe in transparency
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <br />
            <span>and want to ensure that you have</span>
            <span className="home-text392"> all the information</span>
            <span> necessary to choose us with confidence.</span>
          </p>
          <p className="home-text384x">
            <span>
              Navigate to our
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="home-text386">FAQ page</span>
            <span>
              {" "}
              to find answers to
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="home-text388">
              common queries and gain a deeper understanding
            </span>
            <br />
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span>
              of how we can meet your cleaning needs with precision and care. We
              believe in transparency
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <br />
            <span>and want to ensure that you have</span>
            <span className="home-text392"> all the information</span>
            <span> necessary to choose us with confidence.</span>
          </p>
          <Link to="/faqs">
            <button
              type="button"
              className="home-button16 button"
              onMouseEnter={activateX}
              onMouseLeave={offX}
            >
              <span>FAQs</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="home-container299">
        <div className="home-container300">
          <div className="home-container301">
            <span className="home-text394">Experience the difference</span>
            <p className="home-text395">
              Feel free to contact us to establish project details.
            </p>
          </div>
          <div className="home-container302">
            <Link to="/contact">
              <button
                type="button"
                className="home-button17 button"
                onMouseEnter={activateX}
                onMouseLeave={offX}
              >
                Contact us
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
