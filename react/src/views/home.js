import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loadStripe } from "@stripe/stripe-js";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Helmet } from "react-helmet";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FullScreenVideo.css";
import { useHistory } from "react-router-dom";
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
      .post("http://localhost:4000/register", {
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
      .post("http://localhost:4000/commercial", {
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
      .post("http://localhost:4000/clean", requestData) // Replace with your server endpoint
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
      "http://localhost:4000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();

    handleSubmitClean();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error);
    }
  };

  return (
    <div className="home-container">
      {showPopup && <RegisterPopup onClose={() => setShowPopup(false)} />}
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

      {/* Video Section  */}

      <div
        className={`fullscreen-video-container ${
          isVideoOpen ? "open" : "closed"
        }`}
      >
        {isVideoOpen && (
          <>
            <div className="close-button" onClick={closeVideo}>
              Close
            </div>
            {/* <YouTube videoId={videoId} opts={opts} className='vidExpand'/> */}
          </>
        )}
      </div>

      {/* End Video Section  */}

      {/* Login Start  */}

      {isLogin == true ? (
        <Login CloseLogin={CloseLogin} navigateS={navigateS} />
      ) : null}

      {/* End Login  */}
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
            onClick={() => setShowPopup(true)}
            onMouseEnter={handleMouseEnterX}
            onMouseLeave={handleMouseLeaveX}
          >
            Get Started Now
          </span>
        </div>
      </div>
      <Mobilex mobileM={mobileMenu} />

      <div className="home-container019">
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
        </div>

        <div className="home-container020">
          <div className="home-container021" style={{ right: 0 }}>
            <span className="home-text012">Receive A Quote</span>
            <p className="home-text013">
              What type of project? Please provide what type of cleaning.
            </p>
            <div
              className="home-container022"
              onMouseEnter={handleMouseEnterS}
              onMouseLeave={handleMouseLeaveS}
              onClick={() => setQuote(1)}
            >
              <div className="home-container023">
                <img
                  alt="image"
                  src={require("./img/house_60156731-200h.png")}
                  className="home-image02"
                />
                <div className="home-container024">
                  {Quote == 1 ? (
                    <div className="home-container025"></div>
                  ) : null}
                </div>
              </div>
              <p className="home-text014">Residential Cleaning</p>
              <p className="home-text015">
                <span>
                  Bring a breath of fresh air and elevate your living spaces
                  with our
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  residential cleaning services, design to bring comfort and
                  hygiene to your home
                </span>
              </p>
            </div>
            <div
              className="home-container026"
              onMouseEnter={handleMouseEnterS}
              onMouseLeave={handleMouseLeaveS}
              onClick={() => setQuote(2)}
            >
              <div className="home-container027">
                <img
                  alt="image"
                  src={require("./img/building_60159951-200w.png")}
                  className="home-image03"
                />
                <div className="home-container028">
                  {/* <div className="home-container029"></div> */}
                  {Quote == 2 ? (
                    <div className="home-container025"></div>
                  ) : null}
                </div>
              </div>
              <p className="home-text018">Commercial Cleaning</p>
              <p className="home-text019">
                <span>
                  our commercial cleaning services are tailored to meet the
                  unique demands of offices, restaurants, schools, gyms.. you
                  name it!
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
              </p>
            </div>
            <div className="home-container030">
              <div className="home-container031">
                {supports ? (
                  <img
                    className="home-container191"
                    src={require("./img/supportOn.png")}
                  />
                ) : (
                  <img
                    className="home-container191"
                    src={require("./img/support.png")}
                  />
                )}
                <p
                  className="home-text108"
                  onMouseEnter={(e) => handleMouseEnterSupport(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeaveSupport(e.currentTarget)}
                >
                  Support
                </p>
                <button
                  type="button"
                  onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                  className="home-button02 button"
                  onClick={nextScreen}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
          <div className="home-container033" style={{ right: -200 + "%" }}>
            <span className="home-text024">Home Details</span>
            <p className="home-text025">Tell us about your lovely home.</p>
            <div className="home-container034">
              <div
                className="home-container035"
                onMouseEnter={handleMouseEnterSX}
                onMouseLeave={handleMouseLeaveSX}
                onClick={() => setType(45)}
              >
                <div className="home-container036">
                  <div className="home-container037">
                    <Player
                      src="https://raw.githubusercontent.com/KesterJosh/Website-SampleX/main/broomwork.json"
                      loop
                      speed="1"
                      autoplay
                      background="transparent"
                      className="home-lottie-node07"
                    ></Player>
                    <div className="home-container038">
                      {/* <div className="home-container039"></div> */}
                      {type == 45 ? (
                        <div className="home-container025"></div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <p className="home-text026">Regular Clean</p>
              </div>
              <div
                className="home-container040"
                onMouseEnter={handleMouseEnterSX}
                onMouseLeave={handleMouseLeaveSX}
                onClick={() => setType(135)}
              >
                <div className="home-container041">
                  <div className="home-container042">
                    <Player
                      src="https://raw.githubusercontent.com/KesterJosh/Website-SampleX/main/floorclean.json"
                      loop
                      speed="1"
                      autoplay
                      background="transparent"
                      className="home-lottie-node08"
                    ></Player>
                    <div className="home-container043">
                      {type == 135 ? (
                        <div className="home-container025"></div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <p className="home-text027">Deep Clean</p>
              </div>
              <div
                className="home-container045"
                onMouseEnter={handleMouseEnterSX}
                onMouseLeave={handleMouseLeaveSX}
                onClick={() => setType(280)}
              >
                <div className="home-container046">
                  <div className="home-container047">
                    <Player
                      src="https://raw.githubusercontent.com/KesterJosh/Website-SampleX/main/windowcleaner.json"
                      loop
                      speed="1"
                      autoplay
                      background="transparent"
                      className="home-lottie-node09"
                    ></Player>
                    <div className="home-container048">
                      {type == 280 ? (
                        <div className="home-container025"></div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <p class="home-text027">Vacate Clean</p>
              </div>
            </div>
            <div className="roomz">
              <div className="shot2">
                <div className="box2">
                  {/* Sprite Location  */}

                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <div className={H1 ? "visibX" : "invisib"}>
                      <div
                        className={
                          Heart ? "is-active heart" : "isNot-active heart"
                        }
                      ></div>
                    </div>
                    <div className={H2 ? "visibX" : "invisib"}>
                      <div
                        className={
                          Heart1 ? "is-activex heartx" : "isNot-activex heartx"
                        }
                      ></div>
                    </div>
                    <div className={H3 ? "visibX" : "invisib"}>
                      <div
                        className={
                          Heart2
                            ? "is-activex2 heartx2"
                            : "isNot-activex2 heartx2"
                        }
                      ></div>
                    </div>
                    <div className={H4 ? "visibX" : "invisib"}>
                      <div
                        className={
                          Heart3
                            ? "is-activex3 heartx3"
                            : "isNot-activex3 heartx3"
                        }
                      ></div>
                    </div>
                    <div className={H5 ? "visibX" : "invisib"}>
                      <div
                        className={
                          Heart4
                            ? "is-activex4 heartx4"
                            : "isNot-activex4 heartx4"
                        }
                      ></div>
                    </div>
                    <div className={H6 ? "visibX" : "invisib"}>
                      <div
                        className={
                          Heart5
                            ? "is-activex5 heartx5"
                            : "isNot-activex5 heartx5"
                        }
                      ></div>
                    </div>
                    <div className={H7 ? "visibX" : "invisib"}>
                      <div
                        className={
                          Heart6
                            ? "is-activex6 heartx6"
                            : "isNot-activex6 heartx6"
                        }
                      ></div>
                    </div>
                  </div>

                  {/* <div className='ShotSide'>
          
        </div>
        <h2 className='belowTxt'>{sliderValueOX} Rooms</h2> */}
                </div>

                <div className="rightAssets">
                  <div className="holdX">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "90%",
                      }}
                    >
                      <Slider
                        min={1}
                        max={8}
                        step={1}
                        className="slider"
                        value={sliderValueO}
                        onChange={handleSliderChangeO}
                      />
                    </div>
                    <h2
                      className="belowTxt"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      {sliderValueO} Room{sliderValueO > 1 ? "s" : null}
                    </h2>
                  </div>
                  <div className="holdX">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "90%",
                      }}
                    >
                      <Slider
                        min={0}
                        max={8}
                        step={1}
                        className="slider"
                        value={sliderValue}
                        onChange={handleSliderChange}
                      />
                    </div>
                    <h2
                      className="belowTxt"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      {sliderValue} Bathroom{sliderValue > 1 ? "s" : null}
                    </h2>
                  </div>
                  <div className="holdX">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "90%",
                      }}
                    >
                      <Slider
                        min={0}
                        max={8}
                        step={1}
                        className="slider"
                        value={sliderValueK}
                        onChange={handleSliderChangeK}
                      />
                    </div>
                    <h2
                      className="belowTxt"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      {sliderValueK} Kitchen{sliderValueK > 1 ? "s" : null}
                    </h2>
                  </div>
                  <div className="holdX">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "90%",
                      }}
                    >
                      <Slider
                        min={0}
                        max={8}
                        step={1}
                        className="slider"
                        value={sliderValueOX}
                        onChange={handleSliderChangeOX}
                      />
                    </div>
                    <h2
                      className="belowTxt"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      {sliderValueOX} Other{sliderValueOX > 1 ? "s" : null}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="sprite" style={spriteStyle}></div> */}
            {/* <LottieAnimation /> */}

            <p className="home-text035">
              Add Extra
              {/* (Total <b>{totalSliders} / AB = {AB}</b> */}
            </p>
            <div className="home-container059">
              <div
                className="home-container060"
                onClick={() => {
                  windows == 0 ? setWindows(30) : setWindows(0);
                }}
              >
                <div className="home-container061">
                  {windows == 30 ? (
                    <img
                      alt="image"
                      src={require("./Extras/window_on.png")}
                      className="home-image04"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={hoverImageWindow == windowOff ? windowOff : windowOn}
                      onMouseEnter={() => setHoverImageWindow(windowOn)}
                      onMouseLeave={() => setHoverImageWindow(windowOff)}
                      className="home-image04"
                    />
                  )}
                </div>
                <p
                  className={
                    windows == 30 ? "home-text036 orange" : "home-text036"
                  }
                >
                  Windows
                </p>
              </div>
              <div
                className="home-container062"
                onClick={() => {
                  walls == 0 ? setwalls(40) : setwalls(0);
                }}
              >
                <div className="home-container061">
                  {walls == 40 ? (
                    <img
                      alt="image"
                      src={require("./Extras/brick_on.png")}
                      className="home-image05"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={hoverImageBrick == brickOff ? brickOff : brickOn}
                      onMouseEnter={() => setHoverImageBrick(brickOn)}
                      onMouseLeave={() => setHoverImageBrick(brickOff)}
                      className="home-image05"
                    />
                  )}
                </div>
                <p
                  className={
                    walls == 40 ? "home-text037 orange" : "home-text037"
                  }
                >
                  Walls
                </p>
              </div>
              <div
                className="home-container064"
                onClick={() => {
                  Cabinets == 0 ? setCabinets(30) : setCabinets(0);
                }}
              >
                <div className="home-container061">
                  {Cabinets == 30 ? (
                    <img
                      alt="image"
                      src={require("./Extras/cabinets_on.png")}
                      className="home-image06"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={
                        hoverImageCabinets == cabinetsOff
                          ? cabinetsOff
                          : cabinetsOn
                      }
                      onMouseEnter={() => setHoverImageCabinets(cabinetsOn)}
                      onMouseLeave={() => setHoverImageCabinets(cabinetsOff)}
                      className="home-image06"
                    />
                  )}
                </div>
                <p
                  className={
                    Cabinets == 30 ? "home-text038 orange" : "home-text038"
                  }
                >
                  Cabinets
                </p>
              </div>
              <div
                className="home-container066"
                onClick={() => {
                  organization == 0 ? setorganization(50) : setorganization(0);
                }}
              >
                <div className="home-container061">
                  {organization == 50 ? (
                    <img
                      alt="image"
                      src={require("./Extras/organisation_on.png")}
                      className="home-image07"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={
                        hoverImageOrganisation == organisationOff
                          ? organisationOff
                          : organisationOn
                      }
                      onMouseEnter={() =>
                        setHoverImageOrganisation(organisationOn)
                      }
                      onMouseLeave={() =>
                        setHoverImageOrganisation(organisationOff)
                      }
                      className="home-image07"
                    />
                  )}
                </div>
                <p
                  className={
                    organization == 50 ? "home-text039 orange" : "home-text039"
                  }
                >
                  Organisation
                </p>
              </div>
              <div
                className="home-container068"
                onClick={() => {
                  blind == 0 ? setblind(35) : setblind(0);
                }}
              >
                <div className="home-container061">
                  {blind == 35 ? (
                    <img
                      alt="image"
                      src={require("./Extras/blind_on.png")}
                      className="home-image08"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={hoverImageBlind == blindOff ? blindOff : blindOn}
                      onMouseEnter={() => setHoverImageBlind(blindOn)}
                      onMouseLeave={() => setHoverImageBlind(blindOff)}
                      className="home-image08"
                    />
                  )}
                </div>
                <p
                  className={
                    blind == 35 ? "home-text040 orange" : "home-text040"
                  }
                >
                  Blinds
                </p>
              </div>
              <div
                className="home-container070"
                onClick={() => {
                  stovetop == 0 ? setstovetop(35) : setstovetop(0);
                }}
              >
                <div className="home-container061">
                  {stovetop == 35 ? (
                    <img
                      alt="image"
                      src={require("./Extras/stovetop_on.png")}
                      className="home-image09"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={
                        hoverImageStovetop == stovetopOff
                          ? stovetopOff
                          : stovetopOn
                      }
                      onMouseEnter={() => setHoverImageStovetop(stovetopOn)}
                      onMouseLeave={() => setHoverImageStovetop(stovetopOff)}
                      className="home-image09"
                    />
                  )}
                </div>
                <p
                  className={
                    stovetop == 35 ? "home-text041 orange" : "home-text041"
                  }
                >
                  Stovetop/oven
                </p>
              </div>
            </div>
            <div className="home-container059">
              <div
                className="home-container072"
                onClick={() => {
                  fridge == 0 ? setfridge(35) : setfridge(0);
                }}
              >
                <div className="home-container061">
                  {fridge == 35 ? (
                    <img
                      alt="image"
                      src={require("./Extras/fridge_on.png")}
                      className="home-image10"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={hoverImageFridge == fridgeOff ? fridgeOff : fridgeOn}
                      onMouseEnter={() => setHoverImageFridge(fridgeOn)}
                      onMouseLeave={() => setHoverImageFridge(fridgeOff)}
                      className="home-image10"
                    />
                  )}
                </div>
                <p
                  className={
                    fridge == 35 ? "home-text042 orange" : "home-text042"
                  }
                >
                  Fridge
                </p>
              </div>
              <div
                className="home-container074"
                onClick={() => {
                  Dishwasher == 0 ? setDishwasher(25) : setDishwasher(0);
                }}
              >
                <div className="home-container061">
                  {Dishwasher == 25 ? (
                    <img
                      alt="image"
                      src={require("./Extras/dishwasher_on.png")}
                      className="home-image11"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={
                        hoverImageDishwasher == dishwasherOff
                          ? dishwasherOff
                          : dishwasherOn
                      }
                      onMouseEnter={() => setHoverImageDishwasher(dishwasherOn)}
                      onMouseLeave={() =>
                        setHoverImageDishwasher(dishwasherOff)
                      }
                      className="home-image11"
                    />
                  )}
                </div>
                <p
                  className={
                    Dishwasher == 25 ? "home-text043 orange" : "home-text043"
                  }
                >
                  Dishwasher
                </p>
              </div>
              <div
                className="home-container076"
                onClick={() => {
                  garage == 0 ? setgarage(40) : setgarage(0);
                }}
              >
                <div className="home-container061">
                  {garage == 40 ? (
                    <img
                      alt="image"
                      src={require("./Extras/garage_on.png")}
                      className="home-image12"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={hoverImageGarage == garageOff ? garageOff : garageOn}
                      onMouseEnter={() => setHoverImageGarage(garageOn)}
                      onMouseLeave={() => setHoverImageGarage(garageOff)}
                      className="home-image12"
                    />
                  )}
                </div>
                <p
                  className={
                    garage == 40 ? "home-text044 orange" : "home-text044"
                  }
                >
                  Garage
                </p>
              </div>
              <div
                className="home-container078"
                onClick={() => {
                  microwave == 0 ? setmicrowave(5) : setmicrowave(0);
                }}
              >
                <div className="home-container061">
                  {microwave == 5 ? (
                    <img
                      alt="image"
                      src={require("./Extras/microwave_on.png")}
                      className="home-image13"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={
                        hoverImageMicrowave == microwaveOff
                          ? microwaveOff
                          : microwaveOn
                      }
                      onMouseEnter={() => setHoverImageMicrowave(microwaveOn)}
                      onMouseLeave={() => setHoverImageMicrowave(microwaveOff)}
                      className="home-image13"
                    />
                  )}
                </div>
                <p
                  className={
                    microwave == 5 ? "home-text045 orange" : "home-text045"
                  }
                >
                  Microwave
                </p>
              </div>
              <div
                className="home-container080"
                onClick={() => {
                  Laundry == 0 ? setLaundry(35) : setLaundry(0);
                }}
              >
                <div className="home-container061">
                  {Laundry == 35 ? (
                    <img
                      alt="image"
                      src={require("./Extras/laundry_on.png")}
                      className="home-image14"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={
                        hoverImageLaundry == laundryOff ? laundryOff : laundryOn
                      }
                      onMouseEnter={() => setHoverImageLaundry(laundryOn)}
                      onMouseLeave={() => setHoverImageLaundry(laundryOff)}
                      className="home-image14"
                    />
                  )}
                </div>
                <p
                  className={
                    Laundry == 35 ? "home-text046 orange" : "home-text046"
                  }
                >
                  Laundry
                </p>
              </div>
              <div
                className="home-container082"
                onClick={() => {
                  tiles == 0 ? settiles(20) : settiles(0);
                }}
              >
                <div className="home-container061">
                  {tiles == 20 ? (
                    <img
                      alt="image"
                      src={require("./Extras/Tiles_on.png")}
                      className="home-image15"
                    />
                  ) : (
                    <img
                      alt="image"
                      src={hoverImageTiles == tilesOff ? tilesOff : tilesOn}
                      onMouseEnter={() => setHoverImageTiles(tilesOn)}
                      onMouseLeave={() => setHoverImageTiles(tilesOff)}
                      className="home-image15"
                    />
                  )}
                </div>
                <p
                  className={
                    tiles == 20 ? "home-text047 orange" : "home-text047"
                  }
                >
                  Tiles
                </p>
              </div>
            </div>

            <div className="home-container084">
              {supports ? (
                <img
                  className="home-container191"
                  src={require("./img/supportOn.png")}
                />
              ) : (
                <img
                  className="home-container191"
                  src={require("./img/support.png")}
                />
              )}
              <p
                className="home-text108"
                onMouseEnter={(e) => handleMouseEnterSupport(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveSupport(e.currentTarget)}
              >
                Support
              </p>
              <button
                type="button"
                onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                className="home-button03 button"
                onClick={() => setTabs(1)}
              >
                <span>
                  <span>Go </span>
                  <span>back</span>
                </span>
              </button>
              <button
                onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                type="button"
                className="home-button04 button"
                onClick={() => setTabs(3)}
              >
                Proceed
              </button>
            </div>
          </div>
          <div className="home-container086" style={{ right: -300 + "%" }}>
            <span className="home-text053">Schedule a Time</span>
            <p className="home-text054">
              What time and date works best for you?
            </p>

            <Calendar
              onTimeSlotSelected={handleSelectDate}
              setSelectedDatex={setSelectedDate}
            />
            {/* <CalenSchedule onTimeSlotSelected={handleSelectDate} setSelectedDatex={setSelectedDate} /> */}
            <div className="home-container168">
              {/* <Dropdownx  /> */}
              {/* <select className="home-select" onChange={handleSelectDate}>
                <option value="8to10">8:00 AM - 10:00 AM</option>
                <option value="10to12">10:00 AM - 12:00 PM</option>
                <option value="12to2">12:00 AM - 2:00 PM</option>
                <option value="2to4">2:00 PM - 4:00 PM</option>
                <option value="4to6">4:00 PM - 6:00 PM</option>
                <option value="6to8">6:00 PM - 8:00 PM</option>
              </select> */}
              <div className="home-container169">
                <button
                  type="button"
                  className={
                    CleanType
                      ? "home-button05 button"
                      : "home-button05 button invisible"
                  }
                  onClick={() => {
                    setCleanType(true);
                    setIntervalValue(15);
                  }}
                  onMouseEnter={(e) => handleMouseEnterClean(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeaveClean(e.currentTarget)}
                >
                  <img
                    src={require(CleanType
                      ? "./img/regularOn.png"
                      : "./img/regularOff.png")}
                    className="imgshower"
                  />
                </button>
                <button
                  type="button"
                  className={
                    CleanType
                      ? "home-button06 button"
                      : "home-button06 button black"
                  }
                  onClick={() => {
                    setCleanType(false);
                    setIntervalValue(0);
                  }}
                  onMouseEnter={(e) => handleMouseEnterClean(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeaveClean(e.currentTarget)}
                >
                  <img
                    src={require(CleanType
                      ? "./img/OneTimeClean_off.png"
                      : "./img/OneTimeClean_on.png")}
                    className="imgshowerx"
                  />
                </button>
                <div style={{ height: "40px" }}>
                  <img
                    src={require("./img/notify.png")}
                    style={{
                      height: "40px",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                    onClick={() => {
                      setCleanP(!CleanP);
                    }}
                  />
                  {CleanP ? (
                    <div className="notification">
                      <h3 className="subHead">Cleaners Pass</h3>
                      <p className="subText">
                        Schedule regular cleans with us and instantly save up to
                        15% off! Also gain access to our loyalty and rewards
                        systems to earn up to 25% off for life!{" "}
                      </p>
                      <h3 className="subHead">Cancellations</h3>
                      <p className="subText">
                        Please note, cancellation fees may apply if you opt out
                        of your cleaner's pass within the first 3 cleans.{" "}
                        <span style={{ color: "#FF914D" }}>
                          Learn more on our FAQs.
                        </span>
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="VisibxA" style={{ width: "100%" }}>
                <div className="home-container171">
                  <div className="sideSelect">
                    <span className="home-text096">
                      Every:
                      {/* {intervalValue} */}
                    </span>
                  </div>
                </div>

                {/* handleSelectChange */}

                <div className="typeXc">
                  {intervalValue === 15 ? (
                    <h4
                      className="TypeH"
                      onClick={() => handleSelectChange("weekly")}
                    >
                      Week
                    </h4>
                  ) : (
                    <h4
                      className="TypeHx"
                      onClick={() => handleSelectChange("weekly")}
                      onMouseEnter={(e) =>
                        handleMouseEnterPaint(e.currentTarget)
                      }
                      onMouseLeave={(e) =>
                        handleMouseLeavePaint(e.currentTarget)
                      }
                      onBlur={(e) => handleMouseLeavePaint(e.currentTarget)}
                    >
                      Week
                    </h4>
                  )}
                  {intervalValue === 10 ? (
                    <h4
                      className={intervalValue === 10 ? "TypeH" : "TypeHx"}
                      onClick={() => handleSelectChange("fortnightly")}
                    >
                      Fortnight
                    </h4>
                  ) : (
                    <h4
                      className={intervalValue === 10 ? "TypeH" : "TypeHx"}
                      onClick={() => handleSelectChange("fortnightly")}
                      onMouseEnter={(e) =>
                        handleMouseEnterPaint(e.currentTarget)
                      }
                      onMouseLeave={(e) =>
                        handleMouseLeavePaint(e.currentTarget)
                      }
                      onBlur={(e) => handleMouseLeavePaint(e.currentTarget)}
                    >
                      Fortnight
                    </h4>
                  )}
                  {intervalValue === 5 ? (
                    <h4
                      className={intervalValue === 5 ? "TypeH" : "TypeHx"}
                      onClick={() => handleSelectChange("monthly")}
                    >
                      Month
                    </h4>
                  ) : (
                    <h4
                      className={intervalValue === 5 ? "TypeH" : "TypeHx"}
                      onClick={() => handleSelectChange("monthly")}
                      onMouseEnter={(e) =>
                        handleMouseEnterPaint(e.currentTarget)
                      }
                      onMouseLeave={(e) =>
                        handleMouseLeavePaint(e.currentTarget)
                      }
                      onBlur={(e) => handleMouseLeavePaint(e.currentTarget)}
                    >
                      Month
                    </h4>
                  )}
                </div>
                <div className="home-container171">
                  <div className="sideSelect">
                    <span className="home-text096">
                      On:
                      {/* {intervalValue} */}
                    </span>
                  </div>
                </div>
                <div className="home-container172">
                  <div className="home-container173">
                    <div
                      className="home-container174"
                      onClick={() => {
                        daySelecter1(1);
                      }}
                    >
                      <div
                        className={
                          daySelect1 == 1
                            ? "home-container175 selectedDay"
                            : "home-container175"
                        }
                      >
                        {daySelect1 == 1 ? (
                          <span
                            style={{
                              color: "white",
                              fontSize: "14px",
                              fontStyle: "normal",
                              textAlign: "center",
                              fontWeight: "500",
                            }}
                          >
                            Mon
                          </span>
                        ) : (
                          <span
                            className="home-text099"
                            onMouseEnter={(e) =>
                              handleMouseEnterPaint(e.currentTarget)
                            }
                            onMouseLeave={(e) =>
                              handleMouseLeavePaint(e.currentTarget)
                            }
                          >
                            Mon
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className="home-container176"
                      onClick={() => {
                        daySelecter2(1);
                      }}
                    >
                      <div
                        className={
                          daySelect2 == 1
                            ? "home-container175 selectedDay"
                            : "home-container175"
                        }
                      >
                        {daySelect2 == 1 ? (
                          <span
                            style={{
                              color: "white",
                              fontSize: "14px",
                              fontStyle: "normal",
                              textAlign: "center",
                              fontWeight: "500",
                            }}
                          >
                            Tue
                          </span>
                        ) : (
                          <span
                            className="home-text099"
                            onMouseEnter={(e) =>
                              handleMouseEnterPaint(e.currentTarget)
                            }
                            onMouseLeave={(e) =>
                              handleMouseLeavePaint(e.currentTarget)
                            }
                          >
                            Tue
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className="home-container178"
                      onClick={() => {
                        daySelecter3(1);
                      }}
                    >
                      <div
                        className={
                          daySelect3 == 1
                            ? "home-container175 selectedDay"
                            : "home-container175"
                        }
                      >
                        {daySelect3 == 1 ? (
                          <span
                            style={{
                              color: "white",
                              fontSize: "14px",
                              fontStyle: "normal",
                              textAlign: "center",
                              fontWeight: "500",
                            }}
                          >
                            Wed
                          </span>
                        ) : (
                          <span
                            className="home-text099"
                            onMouseEnter={(e) =>
                              handleMouseEnterPaint(e.currentTarget)
                            }
                            onMouseLeave={(e) =>
                              handleMouseLeavePaint(e.currentTarget)
                            }
                          >
                            Wed
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className="home-container180"
                      onClick={() => {
                        daySelecter4(1);
                      }}
                    >
                      <div
                        className={
                          daySelect4 == 1
                            ? "home-container175 selectedDay"
                            : "home-container175"
                        }
                      >
                        {daySelect4 == 1 ? (
                          <span
                            style={{
                              color: "white",
                              fontSize: "14px",
                              fontStyle: "normal",
                              textAlign: "center",
                              fontWeight: "500",
                            }}
                          >
                            Thur
                          </span>
                        ) : (
                          <span
                            className="home-text099"
                            onMouseEnter={(e) =>
                              handleMouseEnterPaint(e.currentTarget)
                            }
                            onMouseLeave={(e) =>
                              handleMouseLeavePaint(e.currentTarget)
                            }
                          >
                            Thur
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className="home-container182"
                      onClick={() => {
                        daySelecter5(1);
                      }}
                    >
                      <div
                        className={
                          daySelect5 == 1
                            ? "home-container175 selectedDay"
                            : "home-container175"
                        }
                      >
                        {daySelect5 == 1 ? (
                          <span
                            style={{
                              color: "white",
                              fontSize: "14px",
                              fontStyle: "normal",
                              textAlign: "center",
                              fontWeight: "500",
                            }}
                          >
                            Fri
                          </span>
                        ) : (
                          <span
                            className="home-text099"
                            onMouseEnter={(e) =>
                              handleMouseEnterPaint(e.currentTarget)
                            }
                            onMouseLeave={(e) =>
                              handleMouseLeavePaint(e.currentTarget)
                            }
                          >
                            Fri
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className="home-container184"
                      onClick={() => {
                        daySelecter6(1);
                      }}
                    >
                      <div
                        className={
                          daySelect6 == 1
                            ? "home-container175 selectedDay"
                            : "home-container175"
                        }
                      >
                        {daySelect6 == 1 ? (
                          <span
                            style={{
                              color: "white",
                              fontSize: "14px",
                              fontStyle: "normal",
                              textAlign: "center",
                              fontWeight: "500",
                            }}
                          >
                            Sat
                          </span>
                        ) : (
                          <span
                            className="home-text099"
                            onMouseEnter={(e) =>
                              handleMouseEnterPaint(e.currentTarget)
                            }
                            onMouseLeave={(e) =>
                              handleMouseLeavePaint(e.currentTarget)
                            }
                          >
                            Sat
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className="home-container186"
                      onClick={() => {
                        daySelecter7(1);
                      }}
                    >
                      <div
                        className={
                          daySelect7 == 1
                            ? "home-container175 selectedDay"
                            : "home-container175"
                        }
                      >
                        {daySelect7 == 1 ? (
                          <span
                            style={{
                              color: "white",
                              fontSize: "14px",
                              fontStyle: "normal",
                              textAlign: "center",
                              fontWeight: "500",
                            }}
                          >
                            Sun
                          </span>
                        ) : (
                          <span
                            className="home-text099"
                            onMouseEnter={(e) =>
                              handleMouseEnterPaint(e.currentTarget)
                            }
                            onMouseLeave={(e) =>
                              handleMouseLeavePaint(e.currentTarget)
                            }
                          >
                            Sun
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="home-container188">
                      <div className="home-container189">
                        <span className="home-text106">(optional)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="home-container190">
              {supports ? (
                <img
                  className="home-container191"
                  src={require("./img/supportOn.png")}
                />
              ) : (
                <img
                  className="home-container191"
                  src={require("./img/support.png")}
                />
              )}
              <p
                className="home-text108"
                onMouseEnter={(e) => handleMouseEnterSupport(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveSupport(e.currentTarget)}
              >
                Support
              </p>
              <button
                type="button"
                onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                className="home-button03 button"
                onClick={() => setTabs(2)}
              >
                <span>
                  <span>Go </span>
                  <span>back</span>
                </span>
              </button>
              <button
                type="button"
                onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                className="home-button04 button"
                onClick={() => setTabs(4)}
              >
                Proceed
              </button>
            </div>
          </div>
          <div className="home-container192" style={{ right: -400 + "%" }}>
            <span className="home-text112">Special Instructions</span>
            <p className="home-text113">
              <span>Please enter the further details below</span>
            </p>

            <div className="home-container203">
              <div className="home-container204">
                <p className="home-text122">
                  How will we get inside your home?
                </p>
                <select
                  className="home-textinput04 input"
                  onChange={(e) => setGetInside(e.target.value)}
                  value={GetInside}
                >
                  <option>I will be home</option>
                  <option>I will leave a key</option>
                  <option>I will provide a lockbox/access code</option>
                  <option style={{ color: "#B3B3B3" }}>
                    Other (please specify)
                  </option>
                </select>
              </div>
            </div>
            <div className="home-container205">
              <div className="home-container206">
                <p className="home-text123">
                  Where will we park?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </p>
                <select
                  type="text"
                  className="home-textinput05 input"
                  onChange={(e) => setPark(e.target.value)}
                  value={Park}
                >
                  <option>I will provide parking on site</option>
                  <option>There is free parking nearby/on the street</option>
                  <option>I will provide a lockbox/access code</option>
                  <option style={{ color: "#B3B3B3" }}>
                    Other (please specify)
                  </option>
                </select>
              </div>
            </div>
            <div className="home-container205">
              <div className="home-container206">
                <p className="home-text123">
                  Do you have pets?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </p>
                <select
                  type="text"
                  className="home-textinput05 input"
                  onChange={(e) => setAnimal(e.target.value)}
                  value={Animal}
                >
                  <option>Dog/Cat</option>
                  <option style={{ color: "#B3B3B3" }}>Other </option>
                </select>
              </div>
            </div>

            <div className="home-container205">
              <div className="home-container206">
                <p className="home-text123">
                  Have any comments?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </p>
                <textarea
                  type="text"
                  onChange={(e) => setspComments(e.target.value)}
                  value={spComments}
                  className="home-textinput05x input"
                  placeholder="If you have any information you would like to share, please write here..."
                ></textarea>
              </div>
            </div>

            <div className="home-container207">
              {supports ? (
                <img
                  className="home-container191"
                  src={require("./img/supportOn.png")}
                />
              ) : (
                <img
                  className="home-container191"
                  src={require("./img/support.png")}
                />
              )}
              <p
                className="home-text108"
                onMouseEnter={(e) => handleMouseEnterSupport(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveSupport(e.currentTarget)}
              >
                Support
              </p>
              <button
                type="button"
                onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                className="home-button03 button"
                onClick={() => setTabs(3)}
              >
                <span>
                  <span>Go </span>
                  <span>back</span>
                </span>
              </button>
              <button
                type="button"
                onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                className="home-button04 button"
                onClick={() => setTabs(5)}
              >
                Proceed
              </button>
            </div>
          </div>
          <div className="home-container192x" style={{ right: -500 + "%" }}>
            <span className="home-text112">Sign Up Details</span>
            <p className="home-text113">
              <span>
                Sign up to view your cleaning history, gain exclusive access to
                member benefits,
              </span>
              <span>and spoiled with gifts from our many reward systems!</span>
            </p>

            <div className="home-container193">
              <div className="home-container194">
                <button type="button" className="home-button09 button">
                  <img
                    alt="image"
                    src={require("./img/google-200h.png")}
                    className="home-image18"
                  />
                  <span className="home-text116">Continue With Google</span>
                </button>
              </div>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form style={{ width: "100%" }}>
                  <div className="home-container197">
                    <div className="home-container198">
                      <p className="home-text118">First Name</p>
                      <Field
                        name="first_name"
                        className={`home-textinput input ${
                          errors.first_name && touched.first_name
                            ? "input-error"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="home-container199">
                      <p className="home-text119">Last Name</p>
                      <Field
                        name="last_name"
                        className={`home-textinput01 input ${
                          errors.last_name && touched.last_name
                            ? "input-error"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>

                  <div className="home-container200">
                    <div className="home-container201">
                      <p className="home-text120">Email</p>
                      <Field
                        name="email"
                        type="email"
                        className={`home-textinput02 input ${
                          errors.email && touched.email ? "input-error" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="home-container202">
                      <p className="home-text121">Phone Number</p>
                      <Field
                        name="phone"
                        type="tel"
                        className={`home-textinput03 input ${
                          errors.phone && touched.phone ? "input-error" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>

                  <div className="home-container203X">
                    <div className="home-container204">
                      <p className="home-text122x">Password</p>
                      <Field
                        name="password"
                        type="password"
                        className={`home-textinput04x input ${
                          errors.password && touched.password
                            ? "input-error"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>

                  <div className="home-container203">
                    <div className="home-container204">
                      <p className="home-text122X">Address</p>
                      <Field
                        name="address"
                        className={`home-textinput04x input ${
                          errors.address && touched.address ? "input-error" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>

                  <div className="home-container205">
                    <div className="home-container206">
                      <p className="home-text123">
                        Referral Code (Not required)
                      </p>
                      <Field
                        name="referral"
                        className="home-textinput05X input"
                      />
                    </div>
                  </div>

                  <div className="extraConfirm">
                    <p className="home-text124">
                      <input type="checkbox" className="checker" /> I accept the{" "}
                      <span className="home-text126">Terms & Conditions</span>
                    </p>
                    <p className="home-text124x">
                      <span>Already have an account? </span>
                      <span className="home-text126" onClick={OpenLogin}>
                        Login
                      </span>
                    </p>
                  </div>

                  <div className="home-container207">
                    {supports ? (
                      <img
                        className="home-container191"
                        src={require("./img/supportOn.png")}
                      />
                    ) : (
                      <img
                        className="home-container191"
                        src={require("./img/support.png")}
                      />
                    )}
                    <p
                      className="home-text108"
                      onMouseEnter={(e) =>
                        handleMouseEnterSupport(e.currentTarget)
                      }
                      onMouseLeave={(e) =>
                        handleMouseLeaveSupport(e.currentTarget)
                      }
                    >
                      Support
                    </p>
                    <button
                      type="button"
                      onClick={() => setTabs(4)}
                      onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                      className="home-button03 button"
                    >
                      <span>Go back</span>
                    </button>
                    <button
                      type="submit"
                      onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                      className="home-button04 button"
                    >
                      Proceed
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="home-container192y" style={{ right: -100 + "%" }}>
            {/* <form> */}
            <span className="home-text112">Cleaning Information</span>
            <p className="home-text113">
              <span>Please enter the further details for your clean below</span>
            </p>

            <div className="home-container205">
              <div className="home-container206">
                <p className="home-text123">
                  Tell us about yourself?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </p>
                <div className="sideQ">
                  {/* {BusinessName} / {BusinessDetail} /{BusinessComments} 
                  /{BusinessEnvironment} / {BusinessHours} / {BusinessRoomAmount}
                  / {BusinessSize} / {BusinessTypeOfClean} / {BusinessTimeFrame} ...<br/> */}
                  <input
                    type="text"
                    className="home-textinput05xy input"
                    placeholder="Business Name"
                    onChange={(e) => setBusinessName(e.target.value)}
                    value={BusinessName}
                  />
                  <input
                    type="text"
                    className="home-textinput05xy input"
                    placeholder="Business Size"
                    onChange={(e) => setBusinessSize(e.target.value)}
                    value={BusinessSize}
                  />
                  <select
                    type="text"
                    className="home-textinput05xyx input"
                    placeholder="Business Type"
                    onChange={(e) => setBusinessEnvironment(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Environment
                    </option>
                    <option value="Office">Office</option>
                    <option value="Gym">Gym</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="School">School</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="home-container205">
              <div className="home-container206">
                <p className="home-text123">
                  What needs cleaning?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </p>
                <div className="sideQx">
                  <div className="s1x">
                    <select
                      type="text"
                      className="home-textinput05xyZ input"
                      onChange={(e) => setBusinessTypeOfClean(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Type of Clean
                      </option>
                      <option value="Deep Clean">Deep Clean</option>
                      <option value="Regular Clean">Regular Clean</option>
                      <option value="Other">Other</option>
                    </select>
                    <select
                      type="text"
                      className="home-textinput05xyZ input"
                      placeholder="Type of Clean"
                      onChange={(e) => setBusinessRoomAmount(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Room Amounts
                      </option>
                      <option value="1-3">1-3</option>
                      <option value="3-6">3-6</option>
                      <option value="9-12">9-12</option>
                      <option value="12+">12+</option>
                    </select>
                  </div>
                  <div className="s2x">
                    <textarea
                      type="text"
                      className="home-textinput05xyxZ input"
                      placeholder="Specifications (Size Per Room, Total Size, Clean details)"
                      onChange={(e) => setBusinessDetail(e.target.value)}
                      value={BusinessDetail}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="home-container205">
              <div className="home-container206">
                <p className="home-text123">
                  How often?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </p>
                <div className="sideQ">
                  <select
                    type="text"
                    className="home-textinput05xy input"
                    placeholder="Ideal Time Per Clean"
                    onChange={(e) => setBusinessTimeFrame(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Ideal Time Per Clean
                    </option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Bi-Monthly">Bi-Monthly</option>
                    <option value="Other (Please Specify)">
                      Other (Please Specify)
                    </option>
                  </select>
                  <select
                    type="text"
                    className="home-textinput05xyx input"
                    placeholder=""
                    onChange={(e) => setBusinessHours(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Frequency of Cleans
                    </option>
                    <option value="0-1 Hour">0-1 Hour</option>
                    <option value="1-3 Hour">1-3 Hour</option>
                    <option value="3+ Hours">3+ Hours</option>
                    <option value="Other (Please Specify)">
                      Other (Please Specify)
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="home-container205">
              <div className="home-container206">
                <p className="home-text123">
                  Have any comments?
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </p>
                <textarea
                  type="text"
                  className="home-textinput05x input"
                  placeholder="If you have any information you would like to share, please write here..."
                  onChange={(e) => setBusinessComments(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="home-container207">
              <div className="home-container208">
                <p className="home-text127">?</p>
              </div>
              <p className="home-text128">Support</p>
              <button
                onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                type="button"
                className="home-button03 button"
                onClick={() => setTabx(1)}
              >
                <span>
                  <span>Go </span>
                  <span>back</span>
                </span>
              </button>
              <button
                onClick={() => {
                  setTabx(0);
                  setTabs(5);
                }}
                onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                className="home-button04 button"
              >
                Proceed
              </button>
            </div>
            {/* </form> */}
          </div>
          <div className="home-container209" ref={SummaryRef}>
            <div className="home-container210x">
              <div
                className="home-container211"
                onClick={() => setSum(true)}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                <span className="home-text132">
                  Booking Summary{" "}
                  <img
                    src="/img/UPARROW.png"
                    style={{ width: "12px", height: "7px", marginLeft: "10px" }}
                  />
                </span>
                <span className="home-text133">Have a Discount Code?</span>
              </div>
              <div className="home-text134">
                <span className="home-text135">Total </span>
                <span>
                  {" "}
                  ${Total}
                  {intervalValue > 0 ? (
                    <span>
                      {"(-"}
                      {intervalValue}%{")"}
                    </span>
                  ) : null}
                </span>
              </div>
            </div>

            <div className="home-container212">
              <div
                className="home-container213"
                onClick={() => setSum(false)}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                <span className="home-text137">
                  Booking Summary{" "}
                  <img
                    src="/img/downArrow.png"
                    style={{ width: "12px", height: "7px", marginLeft: "10px" }}
                  />
                </span>
                <span className="home-text138">Have a Discount Code?</span>
              </div>
              <span className="home-text139">
                <span className="home-text140">Total </span>
                <span> $134.98</span>
              </span>
            </div>
            <div className="home-container214">
              <img
                src="/img/home-icon.png"
                style={{ width: "45px", height: "35px", marginRight: "4px" }}
              />
              <div className="home-container215">
                <li className="home-li list-item">
                  <span className="home-text142">{sliderValueO} Bedroom</span>
                  <span className="home-text143">
                    ${(sliderValue * 20).toFixed(2)}
                  </span>
                </li>
                <li className="home-li1 list-item">
                  <span>{sliderValue} Bathroom</span>
                  <span className="home-text145">
                    ${(sliderValue * 30).toFixed(2)}
                  </span>
                </li>
                <li className="home-li2 list-item">
                  <span>{sliderValueK} Kitchen</span>
                  <span className="home-text147">
                    ${(sliderValueK * 45).toFixed(2)}
                  </span>
                </li>
              </div>
            </div>
            <div className="home-container216">
              <img
                src="/img/calendar.png"
                style={{ width: "35px", marginRight: "8px" }}
              />
              <div className="home-container217">
                <span className="home-text148">{MyDate}</span>
                <span className="home-text149">
                  {timeFrame == 8 ? "8:00 AM - 10:00 AM" : null}
                  {timeFrame == 10 ? "10:00 AM - 12:00 PM" : null}
                  {timeFrame == 12 ? "12:00 PM - 2:00 PM" : null}
                  {timeFrame == 14 ? "2:00 PM - 4:00 PM" : null}
                  {timeFrame == 16 ? "4:00 PM - 6:00 PM" : null}
                  {timeFrame == 18 ? "6:00 PM - 8:00 PM" : null}
                </span>
              </div>
            </div>
            <div className="home-container218">
              <img
                src="/img/refresh.png"
                style={{ width: "35px", marginRight: "8px" }}
              />
              <div className="home-container219">
                <span className="home-text150">
                  {CleanType ? "Repeated" : "One Time"}
                </span>
              </div>
            </div>
            <div className="home-container218">
              <img
                src="/img/extra.png"
                style={{ width: "35px", marginRight: "8px" }}
              />
              <div className="home-container219">
                <div className="home-text150">{windows ? "Windows" : null}</div>
                <div className="home-text150">{walls ? "Walls" : null}</div>
                <div className="home-text150">
                  {Cabinets ? "Cabinets" : null}
                </div>
                <div className="home-text150">
                  {organization ? "Organization" : null}
                </div>
                <div className="home-text150">{blind ? "Blinds" : null}</div>
                <div className="home-text150">
                  {stovetop ? "Stovetop/oven" : null}
                </div>
                <div className="home-text150">{fridge ? "Fridge" : null}</div>
                <div className="home-text150">
                  {Dishwasher ? "Dishwasher" : null}
                </div>
                <div className="home-text150">{garage ? "Garage" : null}</div>
                <div className="home-text150">
                  {microwave ? "Microwave" : null}
                </div>
                <div className="home-text150">{Laundry ? "Laundry" : null}</div>
                <div className="home-text150">
                  {tiles ? "Tiles/Flooring" : null}
                </div>
              </div>
            </div>
            <div className="home-container220">
              <div className="home-container221">
                <span className="home-text151">Discount Code</span>
                <span className="home-text152">(optional)</span>
              </div>
              <div className="buttonHost">
                <input
                  type="text"
                  className="home-textinput06 input"
                  ref={inputTextRef}
                  onMouseEnter={(e) => handleMouseEnterAXY(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeaveAXY(e.currentTarget)}
                />
                <input
                  type="button"
                  className="home-textinput06x input"
                  value="Apply"
                  onClick={handleApplyClick}
                  onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
                />
              </div>
            </div>
            <div className="home-container222">
              <div className="home-container223">
                <span className="home-text153">Sub-Total</span>
                <span className="home-text154">${Total}</span>
              </div>
              {/* <div className="home-container224">
                <span className="home-text155">Sales - Tax(5%)</span>
                <span className="home-text156">${(5/100)*Total}</span>
              </div> */}
              <div className="home-container225">
                <span className="home-text157">Discount Code</span>
                <span className="home-text158">-${disPerAmount}</span>
              </div>
              <div className="home-container226">
                <span className="home-text159">Total</span>
                <span className="home-text160">${discountNew}</span>
              </div>
            </div>
            <button
              onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}
              onClick={makePayment}
              type="button"
              className="home-button13 button"
            >
              Book Now
            </button>
          </div>
        </div>
        <div className="home-container227">
          <VideoBackground />
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

      {/* <HouseFlip/> */}
      {/* <div>
                        <Player
                          src='/rooms.json'
                          className="player"
                          autoplay
                          ref={playerRef}
                          keepLastFrame
                        >
                          <Controls
                            visible={true}
                            // darkTheme={true}
                            buttons={['play', 'repeat', 'frame', 'stop']}
                          />
                        </Player>
                        <button onClick={() => playerRef.current.pause()}>Pause</button>
                        <button onClick={() => playerRef.current.play()}>Play</button>
                        <button onClick={() => playerRef.current.stop()}>Stop</button>
                        <button onClick={playLottie}>Play from frame 1 to 20</button>
                    </div> */}

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
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
              <p className="home-text280">4:22 AM - Nov 29,2023</p>
            </div>
          </div>
          <div
            className="home-container249"
            ref={containerRefGG}
            onMouseEnter={handleMouseEnterGG}
            onMouseLeave={handleMouseLeaveGG}
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
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
              <p className="home-text280">4:22 AM - Nov 29,2023</p>
            </div>
          </div>
          <div
            className="home-container266"
            ref={containerRefXX}
            onMouseEnter={handleMouseEnterXX}
            onMouseLeave={handleMouseLeaveXX}
          >
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
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
                  Moreover, the customer service was outstanding. The staff was
                  friendly, responsive, and accommodating to my schedule.
                  It&apos;s rare to find a company that values its customers as
                  much as Sparkle Clean Corp does
                </span>
                <br></br>
              </p>
              <video
                src={require("./img/samplex.mp4")}
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                preload="auto"
                controls
                className="home-video"
              ></video>
              <p className="home-text336">4:22 AM - Nov 29,2023</p>
            </div>
          </div>
          <img
            alt="image"
            src={require("./Layers/uplayer-1200h.png")}
            className="home-image44"
          />
          <img
            alt="image"
            src={require("./Layers/bottomlayer-1200h.png")}
            className="home-image45"
          />
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
      <div
        className="home-container283"
        // onMouseEnter={handleMouseEnterA}
        // onMouseLeave={handleLeaveA}
        // onMouseDown={handleMouseDownA}
        // onMouseUp={handleMouseUpA}
        // onMouseMove={handleMouseMoveA}
      >
        {showIcon && (
          <div className="icon" ref={CursorRef} style={{ cursor: "none" }}>
            <img
              alt="image"
              src={require("./img/pointer.png")}
              style={{ width: "100px", zIndex: 20 }}
            />
          </div>
        )}
        <img
          alt="image"
          src={require("./img/pointer.png")}
          style={{ width: "100px", zIndex: 20, position: "fixed" }}
          ref={cursor}
          className={divClass}
        />
        <div
          ref={containerRefz}
          // onMouseMove={changePosition}
          className="home-container284"
          // onMouseEnter={handleMouseEnterC}
          // onMouseLeave={handleMouseLeaveC}
          // onMouseDown={handleMouseDownD}
          // onMouseUp={handleMouseUpD}
        >
          <div className="home-container285">
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
                Moreover, the customer service was outstanding. The staff was
                friendly, responsive, and accommodating to my schedule.
                It&apos;s rare to find a company that values its customers as
                much as Sparkle Clean Corp does
              </span>
              <br></br>
            </p>
          </div>
          <div className="home-container289">
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
                Moreover, the customer service was outstanding. The staff was
                friendly, responsive, and accommodating to my schedule.
                It&apos;s rare to find a company that values its customers as
                much as Sparkle Clean Corp does
              </span>
              <br></br>
            </p>
          </div>
          <div className="home-container293">
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
                Moreover, the customer service was outstanding. The staff was
                friendly, responsive, and accommodating to my schedule.
                It&apos;s rare to find a company that values its customers as
                much as Sparkle Clean Corp does
              </span>
              <br></br>
            </p>
          </div>
          <div className="home-container285">
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
                Moreover, the customer service was outstanding. The staff was
                friendly, responsive, and accommodating to my schedule.
                It&apos;s rare to find a company that values its customers as
                much as Sparkle Clean Corp does
              </span>
              <br></br>
            </p>
          </div>
          <div className="home-container289">
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
                Moreover, the customer service was outstanding. The staff was
                friendly, responsive, and accommodating to my schedule.
                It&apos;s rare to find a company that values its customers as
                much as Sparkle Clean Corp does
              </span>
              <br></br>
            </p>
          </div>
          <div className="home-container293">
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
                Moreover, the customer service was outstanding. The staff was
                friendly, responsive, and accommodating to my schedule.
                It&apos;s rare to find a company that values its customers as
                much as Sparkle Clean Corp does
              </span>
              <br></br>
            </p>
          </div>
        </div>
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

export default Home;
