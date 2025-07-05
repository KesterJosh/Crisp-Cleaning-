import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import axios from "axios";

import { Helmet } from "react-helmet";

import Slider from "rc-slider";

import "./settings.css";
import Menu from "./menu";
import Popsave from "../components/popsave";
import Popclearn from "../components/popclearn";
import GlobalSearch from "../components/GlobalSearch";
import { useCallback } from "react";
import CleanersPass from "../components/CleanersPass";
import HouseAnimation from "../components/HouseAnimation";
let defValue = 1;
let direction = 1;

const Settings = (props) => {
  const [originalData, setOriginalData] = useState({});
  const [cleans, setCleans] = useState([]);

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

  const [TotalSwitch, setTotalSwitch] = useState(1);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/#/";
  };

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

  // Sliders
  const [sliderValueO, setSliderValueO] = useState(1);
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValueK, setSliderValueK] = useState(0);
  const [sliderValueOX, setSliderValueOX] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    left: "Week",
    right: "15% OFF",
  });

  const [totalSliders, setTotalSliders] = useState(0); // Add this state

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = [
    { left: "Week", right: "15% OFF" },
    { left: "Forthnight", right: "10% OFF" },
    { left: "Month", right: "5% OFF" },
  ];

  const handleMouseEnterFade = (button) => {
    gsap.to(button, {
      scale: 1.1,
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveFade = (button) => {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = (button) => {
    gsap.to(button, {
      scale: 1.05,
      opacity: 0.9,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (button) => {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnterFadexy = (button) => {
    gsap.to(button, {
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveFadexy = (button) => {
    gsap.to(button, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnterFadex = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      background: "rgba(0,0,0,0.1)",
      // borderRadius:'100%',
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveFadex = (button) => {
    gsap.to(button, {
      background: "rgba(250,250,250,0)",
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnterZ = (button) => {
    gsap.to(button, {
      borderColor: "#FF914D",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveZ = (button) => {
    gsap.to(button, {
      borderColor: "#515151",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const Colorit = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      color: "#ff914d",
      // borderRadius:'100%',
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const unColorit = (button) => {
    gsap.to(button, {
      color: "#1F3042",
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const SearchColorit = (button) => {
    gsap.to(button, {
      // opacity: 0.8,
      borderColor: "#ff914d",
      // borderRadius:'100%',
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const SearchunColorit = (button) => {
    gsap.to(button, {
      borderColor: "#C3C3C3",
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const [saveScreen, setSaveScreen] = useState(false);
  const [cancelScreen, setCancelScreen] = useState(false);

  const GoBack = () => {
    resetFields();
    setSaveScreen(false); // or any other state to close the popup
  };

  const Save = () => {
    Update();
  };

  const CancelScreen = () => {
    setCancelScreen(true);
  };

  const CloseCancelScreen = () => {
    setCancelScreen(false);
  };

  var userId;

  useEffect(() => {
    gsap.fromTo(
      ".settings-container30",
      { opacity: 0 },
      { opacity: 1, duration: 0.7 }
    );
    gsap.fromTo(
      ".settings-text28",
      { opacity: 0 },
      { opacity: 1, delay: 0.7, duration: 0.5 }
    );
    gsap.fromTo(
      ".settings-text40",
      { opacity: 0 },
      { opacity: 1, delay: 1, duration: 0.5 }
    );
    gsap.fromTo(
      ".settings-container33",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, delay: 1.2, duration: 0.5 }
    );

    gsap.fromTo(
      ".settings-container40",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, delay: 1.3, duration: 0.5 }
    );
    gsap.fromTo(
      ".settings-container52",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, delay: 1.4, duration: 0.5 }
    );

    userId = sessionStorage.getItem("userId");

    console.log(userId);
  }, [userId]);

  const SummaryRef = useRef(null);
  const [Total, setTotal] = useState(172);
  const [intervalValue, setIntervalValue] = useState(0);

  const [MyDate, setMyDate] = useState("12/08/2023");

  const setSelectedDate = (formattedDate) => {
    setMyDate(formattedDate);
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

  const [CleanType, setCleanType] = useState(true);
  const [windows, setWindows] = useState(0);
  const [walls, setwalls] = useState(0);
  const [Cabinets, setCabinets] = useState(0);
  const [blind, setblind] = useState(0);
  const [organization, setorganization] = useState(0);
  const [stovetop, setstovetop] = useState(0);
  const [fridge, setfridge] = useState(0);
  const [Dishwasher, setDishwasher] = useState(0);
  const [garage, setgarage] = useState(0);
  const [microwave, setmicrowave] = useState(0);
  const [Laundry, setLaundry] = useState(0);
  const [tiles, settiles] = useState(0);
  const [discount, setDiscount] = useState(Total);
  const [CleanP, setCleanP] = useState(false);

  const [discountAmount, setDiscountAmount] = useState(0);
  const inputTextRef = useRef(null);
  const [discountNew, setDiscountNew] = useState(discount);

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

  const [sum, setSum] = useState(false);

  const sumUp = (value) => {
    setTotalSwitch(value);
    defValue = value;
  };

  const sumAllSliders = useCallback(() => {
    const sum =
      Number(sliderValue) +
      Number(sliderValueK) +
      Number(sliderValueO) +
      Number(sliderValueOX);
    setTotalSliders(sum);
    sumUp(sum);
  }, [sliderValue, sliderValueK, sliderValueO, sliderValueOX]);

  useEffect(() => {
    if (sum === true) {
      gsap.to(".home-container209Set", {
        display: "block",
        bottom: "8%",
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
      gsap.to(".home-container209Set", {
        display: "block",
        bottom: "-81%",
        ease: "power1",
        duration: 1,
      });
      gsap.to(".home-container210x", {
        opacity: 1,
        ease: "power1.out",
        duration: 1,
      });
    }
  }, [sum]);

  useEffect(() => {
    let bathrom = 30 * Number(sliderValue);
    let kitch = 45 * Number(sliderValueK);
    let oth = 20 * Number(sliderValueO);
    let rooms = 20 * Number(sliderValueOX);
    let total = bathrom + kitch + oth + rooms;
    total = ((100 - intervalValue) / 100) * total;
    setDiscount(total);
    setDiscountNew(total);
    total = total.toFixed(2);
    setTotal(total);
  }, [
    setTotal,
    intervalValue,
    Total,
    sliderValue,
    sliderValueK,
    sliderValueO,
    sliderValueOX,
  ]);

  const [data, setData] = useState([]);
  const [cleanerPass, setcleanerPass] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState();

  useEffect(() => {
    if (localStorage.getItem("upgraded") === "true") {
      setcleanerPass(false);
    }
  }, []);

  const resetFields = () => {
    if (!originalData) return;

    setEmail(originalData.email || "");
    setPhone(originalData.phone || "");
    setAddress(originalData.address || "");
    setName(
      [originalData.first_name, originalData.last_name]
        .filter(Boolean)
        .join(" ") || ""
    );
    setPassword("");
  };

  const fetchUserData = () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      window.location.href = "/#/"; // Full page redirect
      return;
    }
    setId(userId);

    axios
      .post("https://api-crisp-cleaning.onrender.com/data", { userId })
      .then((result) => {
        console.log("User Data:", result.data);
        const user = result.data;
        setData(user);
        setOriginalData(user);
        setEmail(result.data.email);
        setPhone(result.data.phone);
        setAddress(result.data.address);
        setName(result.data.first_name + " " + result.data.last_name);
        // You can now use result.data to display or process the user data
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const fetchCleans = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.userId;

    if (!userId) return;
    console.log("fetching");
    try {
      const response = await axios.get(
        `https://api-crisp-cleaning.onrender.com/user-clean/${userId}`
      );
      if (response.data && response.data.cleanRecords) {
        const cleanList = response.data.cleanRecords;
        const firstClean = cleanList[0];
        setCleans(firstClean);
        console.log("fetched", cleanList[0]);

        if (firstClean) {
          // Ensured numerical conversion from fetched data
          setSliderValue(Number(firstClean.bathroom) || 0);
          setSliderValueK(Number(firstClean.kitchen) || 0);
          setSliderValueO(Number(firstClean.others) || 0);
          setSliderValueOX(Number(firstClean.rooms) || 0);

          const total =
            (Number(firstClean.bathroom) || 0) +
            (Number(firstClean.kitchen) || 0) +
            (Number(firstClean.others) || 0) +
            (Number(firstClean.rooms) || 0);

          setTotalSliders(total);
          sumUp(total);

          if (firstClean.clean_date) {
            setMyDate(firstClean.clean_date);
          }
          if (firstClean.time_frame) {
            settimeFrame(firstClean.time_frame);
          }
        }
      } else {
        throw new Error("No clean records found.");
      }
    } catch (error) {
      console.error("Error fetching cleans:", error);
      setCleans([]);
    }
  };

  // Button handlers for room counts
  const incrementRooms = () => {
    if (sliderValueO < 8) {
      setSliderValueO(sliderValueO + 1);
    }
  };

  const decrementRooms = () => {
    if (sliderValueO > 1) {
      setSliderValueO(sliderValueO - 1);
    }
  };

  const incrementBathrooms = () => {
    if (sliderValue < 8) {
      setSliderValue(sliderValue + 1);
    }
  };

  const decrementBathrooms = () => {
    if (sliderValue > 0) {
      setSliderValue(sliderValue - 1);
    }
  };

  const incrementKitchens = () => {
    if (sliderValueK < 8) {
      setSliderValueK(sliderValueK + 1);
    }
  };

  const decrementKitchens = () => {
    if (sliderValueK > 0) {
      setSliderValueK(sliderValueK - 1);
    }
  };

  const incrementOther = () => {
    if (sliderValueOX < 8) {
      setSliderValueOX(sliderValueOX + 1);
    }
  };

  const decrementOther = () => {
    if (sliderValueOX > 0) {
      setSliderValueOX(sliderValueOX - 1);
    }
  };

  // Handle slider changes with validation (these methods are now handled directly by increment/decrement)
  // const handleSliderChangeO = (value) => setSliderValueO(value);
  // const handleSliderChange = (value) => setSliderValue(value);
  // const handleSliderChangeK = (value) => setSliderValueK(value);
  // const handleSliderChangeOX = (value) => setSliderValueOX(value);

  useEffect(() => {
    fetchUserData();
    fetchCleans();
  }, []);

  useEffect(() => {
    sumAllSliders(); // Recalculate sum whenever any slider value changes
  }, [sliderValue, sliderValueK, sliderValueO, sliderValueOX, sumAllSliders]);

  const Update = () => {
    let firstName;
    let lastName;
    const fullName = name; // Example input value
    const firstSpaceIndex = fullName.indexOf(" "); // Find the index of the first space

    if (firstSpaceIndex !== -1) {
      firstName = fullName.slice(0, firstSpaceIndex); // Extract the first name
      lastName = fullName.slice(firstSpaceIndex + 1); // Extract the remaining part as last name

      // console.log("First Name:", firstName); // Output: "Alexander"
      // console.log("Last Name:", "Gabriel John");
    } else {
      // console.log("First Name:", fullName);  // If no spaces, entire name is the first name
      // console.log("Last Name:", "");         // No last name
    }

    axios
      .put("https://api-crisp-cleaning.onrender.com/update", {
        id: id,
        first_name: firstName,
        last_name: lastName,
        email: email, // New email
        phone: phone,
        password: password, // Optional new password
        address: address,
      })
      .then((response) => {
        console.log("User updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating user:", error.response.data);
      });

    setSaveScreen(false);
  };

  const [errors, setErrors] = useState({});

  const handleBlur = () => {
    const newErrors = {};

    // Full Name
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    // Phone number
    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    // Password
    // if (!password.trim()) {
    //   newErrors.password = "Password is required";
    // } else if (password.length < 6) {
    //   newErrors.password = "Minimum 6 characters";
    // }

    // Address
    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSaveScreen(true); // open popup
    }
  };

  return (
    <div className="settings-container10">
      {showLogoutPopup && (
        <div className="logout-popup-overlay">
          <div className="logout-popup">
            <p>Are you sure you want to logout?</p>
            <div className="logout-popup-buttons">
              <button onClick={handleLogout}>Yes</button>
              <button onClick={() => setShowLogoutPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <Helmet>
        <title>settings - Crips Cleaning</title>
        <meta
          name="description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
        <meta property="og:title" content="settings - Crips Cleaning" />
        <meta
          property="og:description"
          content="We bring out the beauty in your environment. Eliminating every dirt and stains in your residence"
        />
      </Helmet>
      {saveScreen ? <Popsave saveX={Save} GoBack={GoBack} /> : null}
      {cancelScreen ? (
        <Popclearn CloseCancelScreen={CloseCancelScreen} />
      ) : null}
      <div className="settings-container11">
        <Link to="/">
          {" "}
          <img
            alt="image"
            src={require("./img/logo-200h.png")}
            className="settings-image10"
          />
        </Link>
        <div className="settings-container12">
          <span className="settings-text10">OVERVIEW</span>
          <Link to="/dashboard" className="settings-navlink1">
            <div className="settings-container13">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="settings-image11"
              />
              <span
                className="settings-text11"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Dashboard
              </span>
            </div>
          </Link>
          <span className="settings-text12">SETTINGS</span>
          <div className="settings-container14">
            <img
              alt="image"
              src={require("./img/homep-200h.png")}
              className="settings-image12"
            />
            <span className="settings-text13">Profile</span>
          </div>
          <Link to="/transaction" className="settings-navlink2">
            <div className="settings-container15">
              <img
                alt="image"
                src={require("./img/calenderx-200h.png")}
                className="settings-image13"
              />
              <span
                className="settings-text14"
                onMouseEnter={(e) => Colorit(e.currentTarget)}
                onMouseLeave={(e) => unColorit(e.currentTarget)}
              >
                Transactions
              </span>
            </div>
          </Link>
          <div className="settings-container16">
            <img
              alt="image"
              src={require("./img/key-200h.png")}
              className="settings-image14"
            />
            <div className="settings-container17">
              <Link to="/contact" target="_blank">
                <span
                  className="settings-text15"
                  onMouseEnter={(e) => Colorit(e.currentTarget)}
                  onMouseLeave={(e) => unColorit(e.currentTarget)}
                >
                  Support
                </span>
              </Link>
              <div className="settings-container18">
                <Link to="/contact" target="_blank">
                  <span className="settings-text16">Contact us</span>
                </Link>
                <Link to="/faqs" target="_blank">
                  <span className="settings-text17">FAQs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="settings-container19">
          <span className="settings-text18">SETTINGS</span>
          <div className="settings-container20">
            <img
              alt="image"
              src={require("./img/settings_x-200h.png")}
              className="settings-image15"
            />
            <span className="settings-text19">Settings</span>
          </div>
          <div
            onClick={() => setShowLogoutPopup(true)}
            className="settings-container21"
          >
            <img
              alt="image"
              src={require("./img/exitx-200h.png")}
              className="settings-image16"
            />
            <span className="settings-text20">Logout</span>
          </div>
        </div>
      </div>
      <div className="settings-container22">
        <span className="settings-text21">Settings</span>
        <div className="settings-container23">
          <img
            alt="image"
            src={require("./img/question-200h.png")}
            className="settings-image17"
          />
          <div className="settings-container24">
            <img
              alt="image"
              src={require("./img/search-200h.png")}
              className="settings-image18"
            />
            <span className="settings-text22">Search for anything...</span>
            <input type="text" className="settings-textinput1 input" />
          </div>
        </div>
        <Link to="/settingsroom">
          <img
            alt="image"
            src={require("./img/setting-200h.png")}
            className="settings-image19"
          />
        </Link>
        <div className="settings-container25">
          <span className="settings-text23">Book Now</span>
        </div>
      </div>
      <div className="settings-container26">
        <div className="settings-container27">
          <span className="settings-text24">Settings</span>
          {/* <GlobalSearch /> */}
          <Link to="/settings" className="settings-navlink4">
            <img
              alt="image"
              src={require("./img/setting-200h.png")}
              className="settings-image22"
            />
          </Link>
        </div>
        <div className="settings-container30">
          <span className="settings-text26">
            {data ? `${data.first_name} ${data.last_name}` : "John Doe"}
          </span>
          <span className="settings-text27">
            Individual Account / Premium Account
          </span>
        </div>
        <div className="settings-container31">
          <div className="settings-container32">
            <span className="settings-text28">Personal Details</span>
            <div className="settings-container33">
              <div className="settings-container34">
                <div className="settings-container35">
                  <span className="settings-text29">Full name</span>
                  <input
                    type="text"
                    onBlur={handleBlur}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="John Doe"
                    className="settings-textinput3 input"
                    onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="settings-container36">
                  <span className="settings-text30">Email Address</span>
                  <input
                    type="text"
                    onBlur={handleBlur}
                    placeholder="yourmail@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="settings-textinput4 input"
                    onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
              </div>
              <div className="settings-container37">
                <div className="settings-container38">
                  <span className="settings-text31">Mobile number</span>
                  <input
                    type="number"
                    placeholder="0423 18..."
                    onBlur={handleBlur}
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    className="settings-textinput5 input"
                    onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
                <div className="settings-container39">
                  <span className="settings-text32">Password</span>
                  <input
                    type="password"
                    placeholder="****"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    onBlur={handleBlur}
                    className="settings-textinput6 input"
                    onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                  />
                  {/* {errors.password && (
                    <p className="form-error">{errors.password}</p>
                  )} */}
                </div>
              </div>
            </div>
            <div className="settings-container40">
              <div className="settings-container41">
                <span className="settings-text33">Address</span>
                <input
                  type="text"
                  onBlur={handleBlur}
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  placeholder="126 Church Hill Road, Melbourne, Victoria, 2816"
                  className="settings-textinput7 input"
                  onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                />
                {errors.address && (
                  <p className="form-error">{errors.address}</p>
                )}
              </div>
              <div className="settings-container42">
                <div className="settings-container43">
                  <HouseAnimation cleans={cleans} />
                </div>
              </div>
            </div>
          </div>
          <div className="settings-container51Set">
            <span className="settings-text40">Membership Details</span>
            <CleanersPass
              cleanerPass={cleanerPass}
              setcleanerPass={setcleanerPass}
            />
          </div>
        </div>
      </div>
      <Menu />
      <div className="settings-container68"></div>
    </div>
  );
};

export default Settings;
