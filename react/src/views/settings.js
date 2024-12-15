import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import gsap from 'gsap';
import axios from 'axios';

import { Helmet } from 'react-helmet'

import Slider from 'rc-slider';

import './settings.css'
import Menu from './menu';
import Popsave from '../components/popsave';
import Popclearn from '../components/popclearn';
let defValue = 1;
let direction = 1;

const Settings = (props) => {

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (AB === 0 && TotalSwitch >= 2) {
        setTimeout(()=>{setH1(false); setH2(true);setAB(1);},300);
        setHeart(true);
      } else if (AB === 1 && TotalSwitch < 2) {
        setHeart(false);setH1(true); setH2(false);setAB(0);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [AB, TotalSwitch]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (AB === 1 && TotalSwitch >= 4) {
        setHeart1(true);
        setTimeout(()=>{setH2(false); setH3(true);setAB(2);},300);
      } else if (AB === 2 && TotalSwitch < 4) {
        setHeart1(false);setH2(true); setH3(false);setAB(1);
      }
    }, 200);

    return () => clearTimeout(timer1);
  }, [AB, TotalSwitch]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (AB === 2 && TotalSwitch >= 6) {
        setHeart2(true);
        setTimeout(()=>{setH3(false); setH4(true);setAB(3);},300);
      } else if (AB === 3 && TotalSwitch < 6) {
        setHeart2(false);setH3(true); setH4(false);setAB(2);
      }
    }, 200);

    return () => clearTimeout(timer1);
  }, [AB, TotalSwitch]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (AB === 3 && TotalSwitch >= 8) {
        setHeart3(true);
        setTimeout(()=>{setH4(false); setH5(true);setAB(4);},300);
      } else if (AB === 4 && TotalSwitch < 8) {
        setHeart3(false);setH4(true); setH5(false);setAB(3);
      }
    }, 200);

    return () => clearTimeout(timer1);
  }, [AB, TotalSwitch]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (AB === 4 && TotalSwitch >= 10) {
        setHeart4(true);
        setTimeout(()=>{setH5(false); setH6(true);setAB(5);},300);
      } else if (AB === 5 && TotalSwitch < 10) {
        setHeart4(false);setH5(true); setH6(false);setAB(4);
      }
    }, 200);

    return () => clearTimeout(timer1);
  }, [AB, TotalSwitch]);
  
  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (AB === 5 && TotalSwitch >= 12) {
        setHeart5(true);
        setTimeout(()=>{setH6(false); setH7(true);setAB(6);},300);
      } else if (AB === 6 && TotalSwitch < 12) {
        setHeart5(false);setH6(true); setH7(false);setAB(5);
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
        setHeart6(false);setH6(true); setH7(false);setAB(6);
      }
    }, 200);

    return () => clearTimeout(timer1);
  }, [AB, TotalSwitch]);

  // Sliders 
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setTotalSliders(value+sliderValueO+sliderValueOX+sliderValueK);
    sumUp(value+sliderValueO+sliderValueOX+sliderValueK);
  };

  const [sliderValueK, setSliderValueK] = useState(0);

  const handleSliderChangeK = (value) => {
    setSliderValueK(value);
    setTotalSliders(value+sliderValueO+sliderValueOX+sliderValue);
    sumUp(value+sliderValueO+sliderValueOX+sliderValue);
  };

  const [sliderValueO, setSliderValueO] = useState(0);

  const handleSliderChangeO = (value) => {
    setSliderValueO(value);
    setTotalSliders(value+sliderValueK+sliderValueOX+sliderValue);
    sumUp(value+sliderValueK+sliderValueOX+sliderValue);
  };

  const [sliderValueOX, setSliderValueOX] = useState(1);
  const [totalSliders, setTotalSliders] = useState(0);


  const handleSliderChangeOX = (value) =>{
    setSliderValueOX(value);
    setTotalSliders(value+sliderValueK+sliderValueO+sliderValue);
    sumUp(value+sliderValueK+sliderValueO+sliderValue);

  }

  const sumUp = (value) => {
    setTotalSwitch(value);
    defValue = value;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    left: "Week",
    right: "15% OFF",
  });

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

  const handleMouseEnterFadexy = (button) => {
    gsap.to(button, {
      opacity: 0.8,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveFadexy = (button) => {
    gsap.to(button, {
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

  const handleMouseEnterZ = (button) => {
    gsap.to(button, {
      borderColor:'#FF914D',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveZ = (button) => {
    gsap.to(button, {
      borderColor:'#515151',
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

  const [saveScreen, setSaveScreen] = useState(false);
  const [cancelScreen, setCancelScreen] = useState(false);

  const GoBack = () => {
    setSaveScreen(false);
  };
  
  const Save = () => {
    Update()
  };

  const handleBlur = () =>{
    setSaveScreen(true);
  }

  const CancelScreen = () =>{
    setCancelScreen(true);
  }

  const CloseCancelScreen = () =>{
    setCancelScreen(false);
  }

  var userId

  useEffect(()=>{
    gsap.fromTo(".settings-container30", {opacity:0},{ opacity:1, duration:0.7, });
    gsap.fromTo(".settings-text28", {opacity:0},{ opacity:1, delay:0.7,duration:0.5});
    gsap.fromTo(".settings-text40", {opacity:0},{ opacity:1, delay:1,duration:0.5});
    gsap.fromTo(".settings-container33", {y:20, opacity:0},{y:0, opacity:1, delay:1.2,duration:0.5});

    gsap.fromTo(".settings-container40", {y:20, opacity:0},{y:0, opacity:1, delay:1.3,duration:0.5});
    gsap.fromTo(".settings-container52", {x:-20, opacity:0},{x:0, opacity:1, delay:1.4,duration:0.5});

    userId = sessionStorage.getItem("userId");

    console.log(userId)
  },[userId]);

  const SummaryRef = useRef(null);
  const [Total, setTotal] = useState(172);
  const [intervalValue, setIntervalValue] = useState(0);

  const [MyDate, setMyDate] = useState('12/08/2023');

  const setSelectedDate = (formattedDate) => {
    setMyDate(formattedDate);
  };

  const [timeFrame, settimeFrame] = useState(8);

  const handleSelectDate = (selectedValue) => {
    // Map the selected value to a time frame
    const timeFrameMap = {
      '8to10': 8,
      '10to12': 10,
      '12to2': 12,
      '2to4': 14,
      '4to6': 16,
      '6to8': 18,
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
    if (inputValue === 'PERCENT20') {
      // Divide the total by 20%
      const result = ((100-20)/100)*discount; // 20% is equivalent to 0.2
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

  let disPerAmount =((discountAmount/100)*discount);
  disPerAmount = disPerAmount.toFixed(2);

  let discountTotal = discount;
  // discountTotal = discountTotal.toFixed(2);

  const handleMouseEnterAX = (button) => {
    gsap.to(button, {
      scale: 1.05,
      opacity: 0.9,
      duration: 0.3,
      ease: 'power2.out',
    });
  };
  
  const handleMouseLeaveAX = (button) => {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseEnterAXY = (button) => {
    gsap.to(button, {
      borderColor:'#BABABA',
      duration: 0.3,
      ease: 'power2.out',
    });
  };
  
  const handleMouseLeaveAXY = (button) => {
    gsap.to(button, {
      borderColor:'#FF914D',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const [sum, setSum] = useState(false);

  useEffect(()=>{
    if (sum==true){
      // SummaryRef.current.style.display = "block";
      // SummaryRef.current.style.bottom = "-0%";
      gsap.to(".home-container209Set",{
        display:'block',
        bottom:"8%",
        borderWidth:0,
        ease:'power1',
        duration:1
      });
      gsap.to(".home-container210x",{
        opacity:0,
        ease:'power1',
        duration:1
      });
      
    }else{
      // SummaryRef.current.style.display = "block";
      // SummaryRef.current.style.bottom = "-0%";
      // gsap.to(".home-container209Set",{
      //   display:'block',
      //   bottom:"0%",
      //   borderWidth:0
      // });
      // home-container210
      gsap.to(".home-container209Set",{
        display:'block',
        bottom:'-81%',
        ease:'power1',
        duration:1
      });
      gsap.to(".home-container210x",{
        opacity:1,
        ease:'power1.out',
        duration:1
      });
    }
  },[[setSum, sum]]);

  useEffect(()=>{
    let bathrom = 30*sliderValue;
    let kitch = 45*sliderValueK;
    let oth = 20*sliderValueO;
    let rooms = 20*sliderValueOX;
    let total = bathrom+kitch+oth+rooms;
    total = ((100-intervalValue)/100)*total;
    setDiscount(total);
    setDiscountNew(total);
    total = total.toFixed(2);
    setTotal(total);

  },[setTotal,intervalValue, Total, sliderValue, sliderValueK, sliderValueO, sliderValueOX]);

  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState();


  const fetchUserData = () => {
    const userId = sessionStorage.getItem("userId");
    
    if (!userId) {
        window.location.href = '/#/'; // Full page redirect
        return;
    }
    setId(userId);

    axios.post('http://localhost:4000/data', { userId })
        .then(result => {
            console.log("User Data:", result.data);
            setData(result.data)
            setEmail(result.data.email)
            setPhone(result.data.phone)
            setAddress(result.data.address)
            setName(result.data.first_name+" "+result.data.last_name)
            // You can now use result.data to display or process the user data
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const Update = () =>{
    let firstName;
    let lastName;
    const fullName = name; // Example input value
    const firstSpaceIndex = fullName.indexOf(" "); // Find the index of the first space

    if (firstSpaceIndex !== -1) {
        firstName = fullName.slice(0, firstSpaceIndex); // Extract the first name
        lastName = fullName.slice(firstSpaceIndex + 1); // Extract the remaining part as last name

        // console.log("First Name:", firstName); // Output: "Alexander"
        // console.log("Last Name:", lastName);   // Output: "Gabriel John"
    } else {
        // console.log("First Name:", fullName);  // If no spaces, entire name is the first name
        // console.log("Last Name:", "");         // No last name
    }

    axios.put('http://localhost:4000/update', {
      id: id,
      first_name: firstName,
      last_name: lastName,
      email: email, // New email
      phone: phone,
      password: password,    // Optional new password
      address: address
  })
      .then(response => {
          console.log("User updated:", response.data);
      })
      .catch(error => {
          console.error("Error updating user:", error.response.data);
      });
      
    setSaveScreen(false);
  
  }


  return (
    <div className="settings-container10">
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
      {(saveScreen)?<Popsave saveX={Save} GoBack={GoBack} />:null}
      {(cancelScreen)?<Popclearn CloseCancelScreen={CloseCancelScreen}/>:null}
      <div className="settings-container11">
      <Link to="/"> <img
          alt="image"
          src={require("./img/logo-200h.png")}
          className="settings-image10"
        /></Link>
        <div className="settings-container12">
          <span className="settings-text10">OVERVIEW</span>
          <Link to="/dashboard" className="settings-navlink1">
            <div className="settings-container13">
              <img
                alt="image"
                src={require("./img/homep-200h.png")}
                className="settings-image11"
              />
              <span className="settings-text11" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Dashboard</span>
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
              <span className="settings-text14" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Transactions</span>
            </div>
          </Link>
          <div className="settings-container16">
            <img
              alt="image"
              src={require("./img/key-200h.png")}
              className="settings-image14"
            />
            <div className="settings-container17">
              <span className="settings-text15" onMouseEnter={(e) => Colorit(e.currentTarget)}
        onMouseLeave={(e) => unColorit(e.currentTarget)}>Support</span>
              <div className="settings-container18">
                <span className="settings-text16">Contact us</span>
                <span className="settings-text17">FAQs</span>
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
          <div className="settings-container21">
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
            <input type="text" className="settings-textinput1 input"  />
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
          <div className="settings-container28">
            <img
              alt="image"
              src={require("./img/question-200h.png")}
              className="settings-image20"
            />
            <div className="settings-container29" onMouseEnter={(e) => SearchColorit(e.currentTarget)}
        onMouseLeave={(e) => SearchunColorit(e.currentTarget)}>
              <img
                alt="image"
                src={require("./img/search-200h.png")}
                className="settings-image21"
              />
              <span className="settings-text25">Search for anything...</span>
              <input type="text" className="settings-textinput2 input"  onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}/>
            </div>
          </div>
          <Link to="/settings" className="settings-navlink4">
            <img
              alt="image"
              src={require("./img/setting-200h.png")}
              className="settings-image22"
            />
          </Link>
        </div>
        <div className="settings-container30">
          <span className="settings-text26">{data ? `${data.first_name} ${data.last_name}` : "John Doe"}</span>
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
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                    placeholder="John Doe"
                    className="settings-textinput3 input"  onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                  />
                </div>
                <div className="settings-container36">
                  <span className="settings-text30">Email Address</span>
                  <input
                    type="text"
                    onBlur={handleBlur} 
                    placeholder="yourmail@mail.com"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    className="settings-textinput4 input"  onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                  />
                </div>
              </div>
              <div className="settings-container37">
                <div className="settings-container38">
                  <span className="settings-text31">Mobile number</span>
                  <input
                    type="text"
                    placeholder="0423 18..."
                    onBlur={handleBlur} 
                    onChange={(e)=>setPhone(e.target.value)}
                    value={phone}
                    className="settings-textinput5 input"  onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                  />
                </div>
                <div className="settings-container39">
                  <span className="settings-text32">Password</span>
                  <input
                    type="password"
                    placeholder="****"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    onBlur={handleBlur} 
                    className="settings-textinput6 input"  onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                  />
                </div>
              </div>
            </div>
            <div className="settings-container40">
              <div className="settings-container41">
                <span className="settings-text33">Address</span>
                <input
                  type="text"
                  onBlur={handleBlur} 
                  onChange={(e)=>setAddress(e.target.value)}
                  value={address}
                  placeholder="126 Church Hill Road, Melbourne, Victoria, 2816"
                  className="settings-textinput7 input"  onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}
                />
              </div>
              <div className="settings-container42">
                <div className="settings-container43">

                  <div className='bxn'>
                    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'90%'}}>
                      <Slider
                        min={1}
                        max={8}
                        step={1}
                        className='slider'
                        value={sliderValueOX}
                        onChange={handleSliderChangeOX}
                      />
                    </div>
                    <h2 className='belowTxt' style={{marginTop:'10px', marginBottom:'20px'}}>{sliderValueOX} Room{(sliderValueOX>1)?'s':null}</h2>
                  
                    <div style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:'90%'}}>
                      <Slider
                        min={0}
                        max={8}
                        step={1}
                        className='slider'
                        value={sliderValue}
                        onChange={handleSliderChange}
                      />
                    </div>
                    <h2 className='belowTxt' style={{marginTop:'10px', marginBottom:'20px'}}>{sliderValue} Bathroom{(sliderValue>1)?'s':null}</h2>
                  </div>

                 
                  <div className='bxnHouse'>

                      {/* Sprite Location  */}
                    <div className='box2x'>
      

                      <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                        <div className={(H1)?'visibX':'invisib'}><div class={(Heart)?"is-active heart":"isNot-active heart"} ></div></div>
                        <div className={(H2)?'visibX':'invisib'}><div class={(Heart1)?"is-activex heartx":"isNot-activex heartx"}></div></div>
                        <div className={(H3)?'visibX':'invisib'}><div class={(Heart2)?"is-activex2 heartx2":"isNot-activex2 heartx2"}></div></div>
                        <div className={(H4)?'visibX':'invisib'}><div class={(Heart3)?"is-activex3 heartx3":"isNot-activex3 heartx3"}></div></div>
                        <div className={(H5)?'visibX':'invisib'}><div class={(Heart4)?"is-activex4 heartx4":"isNot-activex4 heartx4"}></div></div>
                        <div className={(H6)?'visibX':'invisib'}><div class={(Heart5)?"is-activex5 heartx5":"isNot-activex5 heartx5"}></div></div>
                        <div className={(H7)?'visibX':'invisib'}><div class={(Heart6)?"is-activex6 heartx6":"isNot-activex6 heartx6"}></div></div>
                      </div>

                    </div>
                  </div>
                  <div className='bxn'>
                    <div style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:'90%'}}>
                      <Slider
                        min={0}
                        max={8}
                        step={1}
                        className='slider'
                        value={sliderValueK}
                        onChange={handleSliderChangeK}
                      />
                    </div>
                    <h2 className='belowTxt' style={{marginTop:'10px', marginBottom:'20px'}}>{sliderValueK} Kitchen{(sliderValueK>1)?'s':null}</h2>

                    <div style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:'90%'}}>
                      <Slider
                        min={0}
                        max={8}
                        step={1}
                        className='slider'
                        value={sliderValueO}
                        onChange={handleSliderChangeO}
                      />
                    </div>
                    <h2 className='belowTxt' style={{marginTop:'10px', marginBottom:'20px'}}>{sliderValueO} Other{(sliderValueO>1)?'s':null}</h2>
                  </div>

                </div>
                {/* <div className="settings-container44">
                  <div className="settings-container45">
                    <span className="settings-text34">Bathroom Amount</span>
                    <div className="settings-container46">
                      <span className="settings-text35">1</span>
                    </div>
                  </div>
                  <div className="settings-container47">
                    <span className="settings-text36">Kitchen Amount</span>
                    <div className="settings-container48">
                      <span className="settings-text37">1</span>
                    </div>
                  </div>
                  <div className="settings-container49">
                    <span className="settings-text38">Other Amount</span>
                    <div className="settings-container50">
                      <span className="settings-text39">1</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="settings-container51Set">
            <span className="settings-text40">Membership Details</span>
            <div className="settings-container52">
              <div className="settings-container53">
                <div className="settings-container54">
                  <div className="settings-container55">
                    <span className="settings-text41">Cleaner’s Pass</span>
                  </div>
                </div>
              </div>
              <div className="settings-container56">
                <div className="settings-container57">
                  <span className="settings-text42">Every:</span>
                  {/* <select className="settings-select1">
                    <option value="Week">Week</option>
                    <option value="Fortnight">Fortnight</option>
                    <option value="Month">Month</option>
                  </select> */}
                  <div className="cleanerspass2-select1x" onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}>
                    <button onClick={toggleDropdown} className="dropdown-toggle">
                      <span className="dropdown-left">{selectedOption.left}</span>
                      <span className="dropdown-right"><span>{selectedOption.right}</span>
                        <span className="dropdown-arrow" style={{marginLeft:'10px'}}>
                          {/* ▼ */}
                          <img
                            alt="drop"
                            src={require("./img/down-chevron.png")}
                            style={{width:'10px'}}
                          />
                          {/* down-chevron.png */}
                          </span></span>
                      
                    </button>
                    {isOpen && (
                      <ul className="dropdown-menu">
                        {options.map((option, index) => (
                          <li key={index} onClick={() => selectOption(option)} className="dropdown-item">
                            <span className="dropdown-left">{option.left}</span>
                            <span className="dropdown-right">{option.right}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    </div>
                </div>
                <div className="settings-container58">
                  <span className="settings-text43">on:</span>
                  <select className="settings-select2" onMouseEnter={(e) => handleMouseEnterZ(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeaveZ(e.currentTarget)}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
                <button type="button" className="settings-button1 button" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
                  Reschedule
                </button>
                <button type="button" className="settings-button2 button" onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)} onClick={()=>{CancelScreen()}}>
                  Cancel Membership
                </button>
              </div>
              {/* <div className="settings-container59">
                <div className="settings-container60">
                  <div className="settings-container61">
                    <span className="settings-text44">Cleaning Summary</span>
                    <img
                      alt="image"
                      src={require("./img/down arrow-200h.png")}
                      className="settings-image23"
                    />
                  </div>
                  <span className="settings-text45">Have a discount code?</span>
                </div>
                <span className="settings-text46">
                  <span>
                    Total
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span className="settings-text48">$172.99</span>
                </span>
              </div> */}
              <div className="home-container209Set" ref={SummaryRef}>
                <div className="home-container210x">
                  <div className="home-container211" onClick={()=>setSum(true)} style={{cursor:'pointer', userSelect:'none'}}>
                    <span className="home-text132Set">Cleaning Summary <img src='/img/UPARROW.png' style={{width:'12px', height:'7px', marginLeft:'10px'}} /></span>
                    <span className="home-text133Set">Have a Discount Code?</span>
                  </div>
                  <div className="home-text134Set">
                    <span className="home-text135">Total </span>
                    <span> ${Total}{(intervalValue>0)?
                      <span>{"(-"}
                        {intervalValue}%
                        {")"}
                      </span>
                      :null}
                    </span>
                  </div>
                </div>
              
                <div className="home-container212">
                  <div className="home-container213" onClick={()=>setSum(false)} style={{cursor:'pointer', userSelect:'none'}}>
                    <span className="home-text137Set">Booking Summary <img src='/img/downArrow.png' style={{width:'12px', height:'7px', marginLeft:'10px'}} /></span>
                    <span className="home-text138">Have a Discount Code?</span>
                  </div>
                  <span className="home-text139">
                    <span className="home-text140">Total </span>
                    <span> $134.98</span>
                  </span>
                </div>
                <div className="home-container214Set">
                <img src='/img/home-icon.png' style={{width:'35px', height:'25px', marginRight:'4px'}}/>
                  <div className="home-container215">
                    <li className="home-liSet list-item">
                      <span className="home-text142">{sliderValueO} Bedroom</span>
                      <span className="home-text143">${(sliderValue*20).toFixed(2)}</span>
                    </li>
                    <li className="home-liSet list-item">
                      <span>{sliderValue} Bathroom</span>
                      <span className="home-text145">${(sliderValue*30).toFixed(2)}</span>
                    </li>
                    <li className="home-liSet list-item">
                      <span>{sliderValueK} Kitchen</span>
                      <span className="home-text147">${(sliderValueK*45).toFixed(2)}</span>
                    </li>
                  </div>
                </div>
                <div className="home-container216">
                  <img src='/img/calendar.png'style={{width:'25px', marginRight:'8px'}}/>
                  <div className="home-container217">
                    <span className="home-text148Set">{MyDate}</span>
                    <span className="home-text149Set">
                      {(timeFrame==8)?"8:00 AM - 10:00 AM" : null}
                      {(timeFrame==10)?"10:00 AM - 12:00 PM" : null}
                      {(timeFrame==12)?"12:00 PM - 2:00 PM" : null}
                      {(timeFrame==14)?"2:00 PM - 4:00 PM" : null}
                      {(timeFrame==16)?"4:00 PM - 6:00 PM" : null}
                      {(timeFrame==18)?"6:00 PM - 8:00 PM" : null}
                      </span>
                  </div>
                </div>
                <div className="home-container218">
                <img src='/img/refresh.png' style={{width:'25px', marginRight:'8px'}}/>
                  <div className="home-container219">
                    <span className="home-text150Set">{(CleanType)?"Repeated":"One Time"}</span>
                  </div>
                </div>
                {/* <div className="home-container218">
                <img src='/img/extra.png' style={{width:'25px', marginRight:'8px'}}/>
                  <div className="home-container219">
                    <div className="home-text150Set">{(windows)?"Windows":null}</div>
                    <div className="home-text150Set">{(walls)?"Walls":null}</div>
                    <div className="home-text150Set">{(Cabinets)?"Cabinets":null}</div>
                    <div className="home-text150Set">{(organization)?"Organization":null}</div>
                    <div className="home-text150Set">{(blind)?"Blinds":null}</div>
                    <div className="home-text150Set">{(stovetop)?"Stovetop/oven":null}</div>
                    <div className="home-text150Set">{(fridge)?"Fridge":null}</div>
                    <div className="home-text150Set">{(Dishwasher)?"Dishwasher":null}</div>
                    <div className="home-text150Set">{(garage)?"Garage":null}</div>
                    <div className="home-text150Set">{(microwave)?"Microwave":null}</div>
                    <div className="home-text150Set">{(Laundry)?"Laundry":null}</div>
                    <div className="home-text150Set">{(tiles)?"Tiles/Flooring":null}</div>
                  </div>
                </div> */}
                <div className="home-container220Set">
                  <div className="home-container221">
                    <span className="home-text151Set">Discount Code</span>
                    <span className="home-text152Set">(optional)</span>
                  </div>
                  <div className='buttonHost'>
                    <input type="text" className="home-textinput06Set input" ref={inputTextRef}  onMouseEnter={(e) => handleMouseEnterAXY(e.currentTarget)}  onMouseLeave={(e) => handleMouseLeaveAXY(e.currentTarget)}/>
                    <input type="button" className="home-textinput06xSet input" value="Apply" onClick={handleApplyClick}  onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}  onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)}/>
                  </div>
                  
                </div>
                <div className="home-container222">
                  <div className="home-container223">
                    <span className="home-text153Set">Sub-Total</span>
                    <span className="home-text154Set">${Total}</span>
                  </div>
                  {/* <div className="home-container224">
                    <span className="home-text155">Sales - Tax(5%)</span>
                    <span className="home-text156">${(5/100)*Total}</span>
                  </div> */}
                  <div className="home-container225">
                    <span className="home-text157Set">Discount Code</span>
                    <span className="home-text158Set">-${disPerAmount}</span>
                  </div>
                  <div className="home-container226">
                    <span className="home-text159Set">Total</span>
                    <span className="home-text160Set">${discountNew}</span>
                  </div>
                </div>
                <button onMouseEnter={(e) => handleMouseEnterAX(e.currentTarget)}  onMouseLeave={(e) => handleMouseLeaveAX(e.currentTarget)} type="button" className="home-button13Set button">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Menu/>
      <div className="settings-container68"></div>
    </div>
  )
}

export default Settings
