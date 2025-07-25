import { forwardRef, useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./swiper-styles.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../views/login";
import {
  addDays,
  format,
  parseISO,
  startOfDay,
  isBefore,
  isSameDay,
} from "date-fns";
import { Eye, EyeSlashIcon } from "@phosphor-icons/react";
import MelbourneAddressInput from "./MelbourneInput";

const HouseAnimation = ({ cleans }) => {
  // `cleans` prop is received from settings.js but for initial data loading,
  // HouseAnimation will fetch its own most recent clean details internally.

  // States for Booking Details (from your data structure)
  const [frequencyValue, setFrequencyValue] = useState(0); // NEW: 'frequency'
  const [getInsideMethod, setGetInsideMethod] = useState(""); // NEW: 'getinside'
  const [parkingSpot, setParkingSpot] = useState(""); // NEW: 'parkspot'
  const [petType, setPetType] = useState(""); // NEW: 'pet'
  const [specialComments, setSpecialComments] = useState(""); // NEW: 'spComments'
  const [isRegularOneTime, setIsRegularOneTime] = useState(false); // NEW: 'regularOronetime'
  const [completedStatus, setCompletedStatus] = useState(false); // NEW: 'completed'

  // States for selected days (from your data structure)
  const [monSelected, setMonSelected] = useState(0); // NEW: 'mon'
  const [tueSelected, setTueSelected] = useState(0); // NEW: 'tue'
  const [wedSelected, setWedSelected] = useState(0); // NEW: 'wed'
  const [thuSelected, setThuSelected] = useState(0); // NEW: 'thu'
  const [friSelected, setFriSelected] = useState(0); // NEW: 'fri'
  const [satSelected, setSatSelected] = useState(0); // NEW: 'sat'
  const [sunSelected, setSunSelected] = useState(0); // NEW: 'sun'

  // State to hold the entire most recent clean object after fetching
  const [mostRecentCleanData, setMostRecentCleanData] = useState(null);

  // Define sumUp function (assuming it's available in this scope)
  const sumUp = (total) => {
    // Your implementation for sumUp goes here.
    // This function is likely used to update some display of the total price.
  };
  const [notify, setNotify] = useState(false);
  const [login, setLogin] = useState(false);
  const [activeStepSet, setActiveStepSet] = useState("residential"); // or "commercial"
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [Quote, setQuote] = useState(0);
  const [type, setType] = useState(0);
  const [sliderValueO, setSliderValueO] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValueK, setSliderValueK] = useState(0);
  const [sliderValueOX, setSliderValueOX] = useState(0);
  const [windows, setWindows] = useState(0);
  const [walls, setwalls] = useState(0);
  const [wallsSelected, setwallsSelected] = useState(0);
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
  const [CleanType, setCleanType] = useState(false);
  const [intervalValue, setIntervalValue] = useState(15);
  const [GetInside, setGetInside] = useState("I will be home");
  const [Park, setPark] = useState("I will provide parking on site");
  const [totalSliders, setTotalSliders] = useState(null);
  const [Animal, setAnimal] = useState("Dog/Cat");
  const [spComments, setspComments] = useState("");
  const [supports, setSupports] = useState(false);
  const [selectedReg, setSelectedReg] = useState(null);
  const [total, setTotal] = useState(0);
  const commercialSteps = []; // Assuming this is defined elsewhere in your file

  // Use conditional steps based on cleaning type
  const isCommercial = activeStepSet === "commercial"; // Assuming you have logic to set this

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        window.google.accounts.id.initialize({
          client_id:
            "617840144228-0fa899q99cktsq7a8culf9cacamvr0kf.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          {
            theme: "outline",
            size: "large",
          }
        );
      } else {
        console.error("Google Identity Services not ready");
      }
    };

    // Wait until the script is actually loaded
    const interval = setInterval(() => {
      if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        clearInterval(interval);
        initializeGoogleSignIn();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleCredentialResponse = (response) => {
    const credential = response.credential;
    axios
      .post(`https://api-crisp-cleaning.onrender.com/google-auth`, {
        credential,
        clientId:
          "617840144228-0fa899q99cktsq7a8culf9cacamvr0kf.apps.googleusercontent.com",
      })
      .then((response) => {
        if (response.data.success) {
          const { email, firstName, lastName } = response.data.user;
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          alert(response.data.message || "Authentication failed");
        }
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error during Google authentication:", error);
        if (error.response) {
          alert(
            error.response.data.message ||
              "An error occurred during authentication"
          );
        } else {
          alert("Network error or server is down");
        }
        setTimeout(() => {
          alert(null);
        }, 3000);
        setIsSubmitting(false);
      });
  };

  // Calendar and scheduling states
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimeLabel, setSelectedTimeLabel] = useState("");
  const [MyDate, setMyDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [timeFrame, setTimeFrame] = useState(8);
  const [timeframe, settimeFrame] = useState(0);

  // Day selection states for recurring cleans
  const [daySelect1, setDaySelect1] = useState(0); // Monday
  const [daySelect2, setDaySelect2] = useState(0); // Tuesday
  const [daySelect3, setDaySelect3] = useState(0); // Wednesday
  const [daySelect4, setDaySelect4] = useState(0); // Thursday
  const [daySelect5, setDaySelect5] = useState(0); // Friday
  const [daySelect6, setDaySelect6] = useState(0); // Saturday
  const [daySelect7, setDaySelect7] = useState(0); // Sunday

  // User registration states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [referral, setReferral] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Commercial cleaning specific states
  const [businessType, setBusinessType] = useState("");
  const [businessSize, setBusinessSize] = useState("");
  const [cleaningFrequency, setCleaningFrequency] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState([]);
  const [businessHours, setBusinessHours] = useState("");
  const [accessInstructions, setAccessInstructions] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [contractLength, setContractLength] = useState("");
  const [insuranceRequired, setInsuranceRequired] = useState(false);

  // New commercial cleaning specific states
  const [businessName, setBusinessName] = useState("");
  const [typeOfEnvironment, setTypeOfEnvironment] = useState("");
  const [typeOfClean, setTypeOfClean] = useState("");
  const [availabilityDays, setAvailabilityDays] = useState([]);
  const [insuranceDocs, setInsuranceDocs] = useState(false);

  // Loading and error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Track validation state for each step
  const [validations, setValidations] = useState({
    quote: false,
    details: false,
    schedule: false,
    instructions: true,
    signup: false,
    summary: true,
    // Commercial specific validations
    "business-info": false,
    "cleaning-needs": false,
    "frequency-schedule": false,
    "insurance-budget": false,
    "commercial-summary": true,
  });

  // Heart states for room visualization
  const [H1, setH1] = useState(true);
  const [H2, setH2] = useState(false);
  const [H3, setH3] = useState(false);
  const [H4, setH4] = useState(false);
  const [H5, setH5] = useState(false);
  const [H6, setH6] = useState(false);
  const [H7, setH7] = useState(false);
  const [Heart, setHeart] = useState(true);
  const [Heart1, setHeart1] = useState(false);
  const [Heart2, setHeart2] = useState(false);
  const [Heart3, setHeart3] = useState(false);
  const [Heart4, setHeart4] = useState(false);
  const [Heart5, setHeart5] = useState(false);
  const [Heart6, setHeart6] = useState(false);

  const totalSteps = 6;
  const stepIds = [
    "quote",
    "details",
    "schedule",
    "instructions",
    "signup",
    "summary",
  ];

  // Calculate total price
  const calculateTotal = () => {
    return (
      type +
      sliderValueO * 20 +
      sliderValue * 30 +
      sliderValueK * 45 +
      sliderValueOX * 20 +
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
      tiles
    );
  };

  const Total = calculateTotal();

  const calculateEstimatedTime = () => {
    let totalMinutes = 0;

    totalMinutes += sliderValueO * 15;
    totalMinutes += sliderValue * 25;
    totalMinutes += sliderValueK * 30;
    totalMinutes += sliderValueOX * 15;

    const extras = [
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
    ];

    extras.forEach((extra) => {
      if (extra > 0) totalMinutes += 10;
    });

    // Add based on selected clean type
    if (type === 45) totalMinutes += 20; // Regular
    else if (type === 135) totalMinutes += 30; // Deep
    else if (type === 280) totalMinutes += 60; // Vacate

    return totalMinutes;
  };

  const estimatedTime = calculateEstimatedTime();

  // Generate monthly calendar data from current month to end of year
  const generateMonthlyCalendar = () => {
    const months = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    for (let offset = 0; offset < 3; offset++) {
      const baseDate = new Date(currentYear, currentMonth + offset, 1);
      const year = baseDate.getFullYear();
      const month = baseDate.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const monthData = {
        name: format(firstDay, "MMMM yyyy"),
        month,
        year,
        days: [],
      };

      // Fill empty slots for alignment
      for (let i = 0; i < startingDayOfWeek; i++) {
        monthData.days.push(null);
      }

      // Fill in actual days
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isToday = date.toDateString() === today.toDateString();
        const isPast = date < today && !isToday;

        monthData.days.push({
          day,
          date: format(date, "EEEE, MMMM d, yyyy"), // display format
          isoDate: format(date, "yyyy-MM-dd"), // ISO format for comparison
          isToday,
          isPast,
          isSelectable: !isPast,
        });
      }

      months.push(monthData);
    }

    return months;
  };

  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const discountedTotal = isDiscountApplied ? Total * 0.75 : Total;

  // Get available time slots for a specific date
  const getAvailableTimeSlots = (selectedDate) => {
    if (!selectedDate) return [];

    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    const hour = new Date().getHours();
    const isToday = date.toDateString() === new Date().toDateString();

    let availableSlots = [
      { value: 8, label: "8:00 AM - 9:00 AM" },
      { value: 9, label: "09:00 AM - 10:00 AM" },
      { value: 10, label: "10:00 AM - 11:00 AM" },
      { value: 11, label: "11:00 AM - 12:00 PM" },
      { value: 12, label: "12:00 PM - 01:00 PM" },
      { value: 13, label: "01:00 PM - 02:00 PM" },
      { value: 14, label: "02:00 PM - 03:00 PM" },
      { value: 15, label: "03:00 PM - 04:00 PM" },
      { value: 16, label: "04:00 PM - 05:00 PM" },
      { value: 17, label: "05:00 PM - 06:00 PM" },
      { value: 18, label: "06:00 PM - 07:00 PM" },
      { value: 19, label: "07:00 PM - 08:00 PM" },
    ];

    // Filter out past time slots if it's today
    if (isToday) {
      availableSlots = availableSlots.filter((slot) => slot.value > hour + 2);
    }

    // Reduce availability on weekends (example business logic)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      availableSlots = availableSlots.filter(
        (slot) => slot.value >= 10 && slot.value <= 16
      );
    }

    return availableSlots;
  };

  // New commercial handlers
  const handleEnvironmentTypeChange = useCallback((envType, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setTypeOfEnvironment(envType);
  }, []);

  const handleCleanTypeChange = useCallback((cleanType, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setTypeOfClean(cleanType);
  }, []);

  const handleAvailabilityDayToggle = useCallback((day, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAvailabilityDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  }, []);

  // MEMOIZED VALIDATION FUNCTIONS
  const validateQuoteStep = useCallback(() => {
    if (Quote === 0) {
      setSubmitError(
        "Please select a cleaning type (Residential or Commercial)"
      );
      return false;
    }
    setSubmitError("");
    return true;
  }, [Quote]);

  const validateDetailsStep = useCallback(() => {
    const errors = [];
    if (type === 0) {
      errors.push("Please select a cleaning service type");
    }
    if (errors.length > 0) {
      setSubmitError(errors.join(". "));
      return false;
    }
    setSubmitError("");
    return true;
  }, [type, sliderValueO]);

  const validateScheduleStep = useCallback(() => {
    const errors = [];
    if (!selectedDate) {
      errors.push("Please select a date");
    }
    if (!selectedTime) {
      errors.push("Please select a time slot");
    }
    if (errors.length > 0) {
      setSubmitError(errors.join(". "));
      return false;
    }
    setSubmitError("");
    return true;
  }, [selectedDate, selectedTime]);

  const validateInstructionsStep = useCallback(() => {
    // Instructions step is always valid since all fields have default values
    setSubmitError("");
    return true;
  }, []);

  const validateSignupStep = useCallback(() => {
    const errors = [];
    if (!firstName || firstName.trim() === "") {
      if (isCommercial) {
        errors.push("Business name is required");
      } else {
        errors.push("First name is required");
      }
    }
    if (!lastName || lastName.trim() === "") {
      if (isCommercial) {
        errors.push("Contact person is required");
      } else {
        errors.push("Last name is required");
      }
    }
    if (!email || email.trim() === "") {
      errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Please enter a valid email address");
    }
    if (!phone || phone.trim() === "") {
      errors.push("Phone number is required");
    } else if (!/^\d{10,}$/.test(phone.replace(/\D/g, ""))) {
      errors.push("Please enter a valid phone number");
    }
    if (!address || address.trim() === "") {
      errors.push("Address is required");
    }
    if (!acceptTerms) {
      if (isCommercial) {
        errors.push("Please accept the Commercial Service Agreement");
      } else {
        errors.push("Please accept the Terms & Conditions");
      }
    }
    // Only require password for residential flow
    if (!isCommercial && (!password || password.length < 6)) {
      errors.push("Password must be at least 6 characters long");
    }
    if (errors.length > 0) {
      setSubmitError(errors.join(". "));
      return false;
    }
    setSubmitError("");
    return true;
  }, [
    firstName,
    lastName,
    email,
    phone,
    address,
    acceptTerms,
    password,
    isCommercial,
  ]);

  const validateCommercialDetailsStep = useCallback(() => {
    const errors = [];
    if (!businessType) {
      errors.push("Please select your business type");
    }
    if (!businessSize) {
      errors.push("Please specify your business size");
    }
    if (!cleaningFrequency) {
      errors.push("Please select cleaning frequency");
    }
    if (errors.length > 0) {
      setSubmitError(errors.join(". "));
      return false;
    }
    setSubmitError("");
    return true;
  }, [businessType, businessSize, cleaningFrequency]);

  const validateCommercialScheduleStep = useCallback(() => {
    const errors = [];
    if (!selectedDate) {
      errors.push("Please select a preferred start date");
    }
    if (!businessHours) {
      errors.push("Please specify your business hours");
    }
    if (errors.length > 0) {
      setSubmitError(errors.join(". "));
      return false;
    }
    setSubmitError("");
    return true;
  }, [selectedDate, businessHours]);

  const validateCommercialRequirementsStep = useCallback(() => {
    const errors = [];
    if (!budgetRange) {
      errors.push("Please select your budget range");
    }
    if (!contractLength) {
      errors.push("Please specify preferred contract length");
    }
    if (errors.length > 0) {
      setSubmitError(errors.join(". "));
      return false;
    }
    setSubmitError("");
    return true;
  }, [budgetRange, contractLength]);

  // Update the calendar state
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const monthlyCalendar = generateMonthlyCalendar();

  // MEMOIZED UPDATE FUNCTIONS
  const updateScheduleValidation = useCallback(
    (date, time) => {
      let isValid = false;
      if (CleanType) {
        // For recurring service: only need date and time (days are optional)
        isValid = date && time;
      } else {
        // For one-time service: just need date and time
        isValid = date && time;
      }
      setValidations((prev) => ({ ...prev, schedule: isValid }));
      if (isValid) setShowValidationMessage(false);
    },
    [CleanType]
  );

  const updateSignupValidation = useCallback(() => {
    let isValid;
    if (isCommercial) {
      // For commercial flow, don't require password
      isValid =
        firstName && lastName && email && phone && address && acceptTerms;
    } else {
      // For residential flow, require password
      isValid =
        firstName &&
        lastName &&
        email &&
        phone &&
        password &&
        address &&
        acceptTerms;
    }
    setValidations((prev) => ({ ...prev, signup: isValid }));
    if (isValid) setShowValidationMessage(false);
  }, [
    firstName,
    lastName,
    email,
    phone,
    password,
    address,
    acceptTerms,
    isCommercial,
  ]);

  const updateCommercialValidation = useCallback(() => {
    const isValid = businessType && businessSize && cleaningFrequency;
    setValidations((prev) => ({ ...prev, "business-details": isValid }));
    if (isValid) setShowValidationMessage(false);
  }, [businessType, businessSize, cleaningFrequency]);

  const updateCommercialScheduleValidation = useCallback(() => {
    const isValid = selectedDate && businessHours;
    setValidations((prev) => ({ ...prev, "commercial-schedule": isValid }));
    if (isValid) setShowValidationMessage(false);
  }, [selectedDate, businessHours]);

  const updateCommercialRequirementsValidation = useCallback(() => {
    const isValid = budgetRange && contractLength;
    setValidations((prev) => ({ ...prev, "commercial-requirements": isValid }));
    if (isValid) setShowValidationMessage(false);
  }, [budgetRange, contractLength]);

  // MEMOIZED CLICK HANDLERS
  const handleDateSelect = useCallback(
    (date) => {
      setSelectedDate(date);

      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);

      // Format the new date
      setMyDate(
        newDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );

      setSelectedTime("");
      setSelectedTimeLabel("");
      updateScheduleValidation(date, "");
    },
    [updateScheduleValidation]
  );

  const handleTimeSelect = useCallback(
    (time) => {
      setSelectedTime(time);
      setTimeFrame(time);
      const timeSlots = getAvailableTimeSlots(selectedDate);
      const selectedSlot = timeSlots.find((slot) => slot.value == time);
      setSelectedTimeLabel(selectedSlot ? selectedSlot.label : "");
      updateScheduleValidation(selectedDate, time);
    },
    [selectedDate, updateScheduleValidation]
  );

  const toggleDay = useCallback(
    (dayNumber, e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const setters = [
        setDaySelect1,
        setDaySelect2,
        setDaySelect3,
        setDaySelect4,
        setDaySelect5,
        setDaySelect6,
        setDaySelect7,
      ];
      const getters = [
        daySelect1,
        daySelect2,
        daySelect3,
        daySelect4,
        daySelect5,
        daySelect6,
        daySelect7,
      ];
      setters[dayNumber - 1](getters[dayNumber - 1] === 0 ? 1 : 0);
      updateScheduleValidation(selectedDate, selectedTime);
    },
    [
      daySelect1,
      daySelect2,
      daySelect3,
      daySelect4,
      daySelect5,
      daySelect6,
      daySelect7,
      selectedDate,
      selectedTime,
      updateScheduleValidation,
    ]
  );

  const handleQuoteSelection = useCallback((quoteId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setQuote(quoteId);
    setIsCommercial(quoteId === 2);
    setValidations((prev) => ({ ...prev, quote: true }));
    setShowValidationMessage(false);
  }, []);

  // MEMOIZED COUNTER HANDLERS
  const incrementRooms = useCallback(() => {
    if (sliderValueO < 8) {
      const newValue = sliderValueO + 1;
      setSliderValueO(newValue);
      setValidations((prev) => ({
        ...prev,
        details:
          newValue + sliderValue + sliderValueK + sliderValueOX > 0 && type > 0,
      }));
    }
  }, [sliderValueO, sliderValue, sliderValueK, sliderValueOX, type]);

  const decrementRooms = useCallback(() => {
    if (sliderValueO > 0) {
      const newValue = sliderValueO - 1;
      setSliderValueO(newValue);
      setValidations((prev) => ({
        ...prev,
        details:
          newValue + sliderValue + sliderValueK + sliderValueOX > 0 && type > 0,
      }));
    }
  }, [sliderValueO, sliderValue, sliderValueK, sliderValueOX, type]);

  const incrementBathrooms = useCallback(() => {
    if (sliderValue < 8) {
      const newValue = sliderValue + 1;
      setSliderValue(newValue);
      setValidations((prev) => ({
        ...prev,
        details:
          sliderValueO + newValue + sliderValueK + sliderValueOX > 0 &&
          type > 0,
      }));
    }
  }, [sliderValue, sliderValueO, sliderValueK, sliderValueOX, type]);

  const decrementBathrooms = useCallback(() => {
    if (sliderValue > 0) {
      const newValue = sliderValue - 1;
      setSliderValue(newValue);
      setValidations((prev) => ({
        ...prev,
        details:
          sliderValueO + newValue + sliderValueK + sliderValueOX > 0 &&
          type > 0,
      }));
    }
  }, [sliderValue, sliderValueO, sliderValueK, sliderValueOX, type]);

  const incrementKitchens = useCallback(() => {
    if (sliderValueK < 8) {
      const newValue = sliderValueK + 1;
      setSliderValueK(newValue);
      setValidations((prev) => ({
        ...prev,
        details:
          sliderValueO + sliderValue + newValue + sliderValueOX > 0 && type > 0,
      }));
    }
  }, [sliderValueK, sliderValueO, sliderValue, sliderValueOX, type]);

  const decrementKitchens = useCallback(() => {
    if (sliderValueK > 0) {
      const newValue = sliderValueK - 1;
      setSliderValueK(newValue);
      setValidations((prev) => ({
        ...prev,
        details:
          sliderValueO + sliderValue + newValue + sliderValueOX > 0 && type > 0,
      }));
    }
  }, [sliderValueK, sliderValueO, sliderValue, sliderValueOX, type]);

  const incrementOther = useCallback(() => {
    if (sliderValueOX < 8) {
      const newValue = sliderValueOX + 1;
      setSliderValueOX(newValue);
      setValidations((prev) => ({
        ...prev,
        details:
          sliderValueO + sliderValue + sliderValueK + newValue > 0 && type > 0,
      }));
    }
  }, [sliderValueOX, sliderValueO, sliderValue, sliderValueK, type]);

  const decrementOther = useCallback(() => {
    if (sliderValueOX > 0) {
      const newValue = sliderValueOX - 1;
      setSliderValueOX(newValue);
      setValidations((prev) => ({
        ...prev,
        details:
          sliderValueO + sliderValue + sliderValueK + newValue > 0 && type > 0,
      }));
    }
  }, [sliderValueOX, sliderValueO, sliderValue, sliderValueK, type]);

  // MEMOIZED CLEAN TYPE TOGGLE HANDLERS
  const handleRegularCleanToggle = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setCleanType(true);
      setSelectedReg(true);
      setIntervalValue(15);
      setIsDiscountApplied(true);
      updateScheduleValidation(selectedDate, selectedTime);
    },
    [selectedDate, selectedTime, updateScheduleValidation]
  );

  const handleOneTimeCleanToggle = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setCleanType(false);
      setIntervalValue(0);
      setIsDiscountApplied(false); // Add this line to remove the discount
      updateScheduleValidation(selectedDate, selectedTime);
    },
    [selectedDate, selectedTime, updateScheduleValidation]
  );

  // MEMOIZED FREQUENCY HANDLERS
  const handleFrequencySelect = useCallback((value, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIntervalValue(value);
  }, []);

  // MEMOIZED COMMERCIAL HANDLERS
  const handleBusinessTypeChange = useCallback(
    (value) => {
      setBusinessType(value);
      updateCommercialValidation();
    },
    [updateCommercialValidation]
  );

  const handleBusinessSizeChange = useCallback(
    (value) => {
      setBusinessSize(value);
      updateCommercialValidation();
    },
    [updateCommercialValidation]
  );

  const handleCleaningFrequencySelect = useCallback(
    (freq, e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setCleaningFrequency(freq);
      updateCommercialValidation();
    },
    [updateCommercialValidation]
  );

  const handleSpecialRequirementToggle = useCallback((requirement, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSpecialRequirements((prev) => {
      if (prev.includes(requirement)) {
        return prev.filter((r) => r !== requirement);
      } else {
        return [...prev, requirement];
      }
    });
  }, []);

  const handleBusinessHoursChange = useCallback(
    (value) => {
      setBusinessHours(value);
      updateCommercialScheduleValidation();
    },
    [updateCommercialScheduleValidation]
  );

  const handleBudgetRangeSelect = useCallback(
    (budget, e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setBudgetRange(budget);
      updateCommercialRequirementsValidation();
    },
    [updateCommercialRequirementsValidation]
  );

  const handleContractLengthSelect = useCallback(
    (contract, e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setContractLength(contract);
      updateCommercialRequirementsValidation();
    },
    [updateCommercialRequirementsValidation]
  );

  // Handle slider changes with validation
  const handleSliderChangeO = (value) => {
    setSliderValueO(value);
    // Update heart visibility based on room count
    setH1(value >= 1);
    setH2(value >= 2);
    setH3(value >= 3);
    setH4(value >= 4);
    setH5(value >= 5);
    setH6(value >= 6);
    setH7(value >= 7);
    setHeart(value >= 1);
    setHeart1(value >= 2);
    setHeart2(value >= 3);
    setHeart3(value >= 4);
    setHeart4(value >= 5);
    setHeart5(value >= 6);
    setHeart6(value >= 7);
    // Validate details step if a room is selected and a cleaning type is selected
    setValidations((prev) => ({ ...prev, details: value > 0 && type > 0 }));
  };

  const handleSliderChange = (value) => setSliderValue(value);
  const handleSliderChangeK = (value) => setSliderValueK(value);
  const handleSliderChangeOX = (value) => setSliderValueOX(value);

  // API call functions
  const handleSubmitRegistration = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError("");
      const response = await axios.post(
        "https://api-crisp-cleaning.onrender.com/register",
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          password,
          address,
          referral,
        }
      );
      if (response.data.message === "Successful") {
        // Move to summary step after successful registration
        setCurrentStep(5);
        return true;
      } else {
        setSubmitError(response.data.error || response.data);
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.status === 400) {
        setSubmitError("This email has been registered before. Kindly Login");
      } else {
        setSubmitError(
          "Something went wrong! Check your internet connection or try again later"
        );
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitClean = async () => {
    try {
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
        discountNew: discountedTotal, // Assuming no discount for now
      };
      const response = await axios.post(
        "https://api-crisp-cleaning.onrender.com/clean",
        requestData
      );
      alert("Clean record created successfully! Redirecting to checkout");
      return true;
    } catch (error) {
      alert("Error creating clean record.");
      console.error("Clean booking error:", error);
      return false;
    }
  };

  const makePayment = async () => {
    try {
      setIsSubmitting(true);
      // First submit the registration
      const registrationSuccess = await handleSubmitRegistration();
      if (!registrationSuccess) {
        setIsSubmitting(false);
        return;
      }
      // Then create the booking
      const bookingSuccess = await handleSubmitClean();
      if (!bookingSuccess) {
        setIsSubmitting(false);
        return;
      }
      // Finally process payment
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
      // Redirect to Stripe checkout
      if (typeof window !== "undefined" && window.Stripe) {
        const stripe = await window.Stripe(
          "pk_test_51ROhYnH9E7pqq95xLp67muP87yzw3XmN9BdV5ZbF2ZoAQuFJPBDYN0HgbnPfaYiN0Z9scDimOVICuZ7iD5kvBaq900M6capXFd"
        );
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          console.error("Stripe error:", result.error);
          setSubmitError("Payment processing failed. Please try again.");
        }
      } else {
        // Fallback if Stripe is not loaded
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      setSubmitError("Payment processing failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitCommercialQuote = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError("");
      const commercialData = {
        businessName: businessName,
        contactPerson: lastName,
        email,
        phone,
        address,
        businessSize,
        typeOfEnvironment,
        typeOfClean,
        cleaningFrequency,
        availabilityDays,
        insuranceRequired: insuranceDocs,
        budgetRange,
        additionalNotes: spComments,
      };
      const response = await axios.post(
        "https://api-crisp-cleaning.onrender.com/commercial",
        commercialData
      );
      if (response.status === 200 || response.status === 201) {
        alert(
          "Commercial quote request submitted successfully! We'll contact you within 24 hours."
        );
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.error("Commercial quote error:", error);
      setSubmitError("Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    const currentStepId = steps[currentStep].id;
    let isValid = false;
    if (isCommercial) {
      switch (currentStepId) {
        case "quote":
          isValid = validateQuoteStep();
          break;
        case "business-info":
          isValid = businessName && businessSize;
          if (!isValid) {
            setSubmitError(
              "Please enter business name and select business size"
            );
          } else {
            setSubmitError("");
          }
          break;
        case "cleaning-needs":
          isValid = typeOfEnvironment && typeOfClean;
          if (!isValid) {
            setSubmitError("Please select environment type and type of clean");
          } else {
            setSubmitError("");
          }
          break;
        case "frequency-schedule":
          isValid = cleaningFrequency;
          if (!isValid) {
            setSubmitError("Please select cleaning frequency");
          } else {
            setSubmitError("");
          }
          break;
        case "insurance-budget":
          isValid = budgetRange;
          if (!isValid) {
            setSubmitError("Please select your monthly budget");
          } else {
            setSubmitError("");
          }
          break;
        case "signup":
          isValid = validateSignupStep();
          break;
        default:
          isValid = true;
      }
    } else {
      // Existing residential validation logic
      switch (currentStepId) {
        case "quote":
          isValid = validateQuoteStep();
          break;
        case "details":
          isValid = validateDetailsStep();
          break;
        case "schedule":
          isValid = validateScheduleStep();
          break;
        case "instructions":
          isValid = validateInstructionsStep();
          break;
        case "signup":
          isValid = validateSignupStep();
          break;
        default:
          isValid = true;
      }
    }
    if (isValid && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setShowValidationMessage(false);
    } else {
      setShowValidationMessage(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowValidationMessage(false);
    }
  };

  const goToStep = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
      setShowValidationMessage(false);
    }
  };

  const handleMouseEnterSupport = () => setSupports(true);
  const handleMouseLeaveSupport = () => setSupports(false);

  // Get validation message based on current step
  // Call fetchCleans when the component mounts

  // Define commercial steps

  const fetchCleans = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.userId;

    if (!userId) {
      console.log("No userId found in localStorage.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api-crisp-cleaning.onrender.com/user-clean/${userId}`
      );

      if (response.data && response.data.cleanRecords) {
        const cleanList = response.data.cleanRecords;
        console.log(cleanList)
        let fetchedClean = null;

        if (cleanList.length > 0) {
          // Get the last item in the array, assuming it's the "most recent" by position
          fetchedClean = cleanList[cleanList.length - 1];
        }

        setMostRecentCleanData(fetchedClean); // Set the fetched clean object

        if (fetchedClean) {
          // Set Service Type (ensure it's a Number)
          setType(Number(fetchedClean.typeOfClean) || null);

          // Set Slider Values (ensure they're Numbers, default to 0)
          setSliderValue(Number(fetchedClean.bathroom) || 0);
          setSliderValueK(Number(fetchedClean.kitchen) || 0);
          setSliderValueOX(Number(fetchedClean.others) || 0);
          setSliderValueO(Number(fetchedClean.rooms) || 0);

          // Calculate total from fetched slider values and update states
          const totalCalculated =
            (Number(fetchedClean.bathroom) || 0) +
            (Number(fetchedClean.kitchen) || 0) +
            (Number(fetchedClean.others) || 0) +
            (Number(fetchedClean.rooms) || 0);
          setTotalSliders(totalCalculated);
          sumUp(totalCalculated);

          // Set Quote based on the 'total' field from fetched data
          setQuote(Number(fetchedClean.total) || 0);

          // Set Date and Time Frame (using 'date' and 'time' properties from your data)
          if (fetchedClean.date) {
            setMyDate(fetchedClean.date);
          }
          if (fetchedClean.time) {
            // Changed from clean_time to 'time' based on data
            settimeFrame(fetchedClean.time);
          }

          // Set Extra Details (numerical values like 0 or 1 for selection/quantity)
          setwalls(Number(fetchedClean.walls) || 0);
          setWindows(Number(fetchedClean.windows) || 0);
          setCabinets(Number(fetchedClean.cabinets) || 0);
          setorganization(Number(fetchedClean.orginization) || 0);
          setblind(Number(fetchedClean.blinds) || 0);
          setstovetop(Number(fetchedClean.stove) || 0);
          setDishwasher(Number(fetchedClean.dishwasher) || 0); // New extra
          setfridge(Number(fetchedClean.fridge) || 0); // New extra
          setgarage(Number(fetchedClean.garage) || 0); // New extra
          setLaundry(Number(fetchedClean.laundry) || 0); // New extra
          setmicrowave(Number(fetchedClean.microwave) || 0); // New extra
          settiles(Number(fetchedClean.tiles) || 0); // New extra

          // Set other booking details
          setDiscount(Number(fetchedClean.discount) || 0); // New
          setFrequencyValue(Number(fetchedClean.frequency) || 0); // New
          setGetInsideMethod(fetchedClean.getinside || ""); // New
          setParkingSpot(fetchedClean.parkspot || ""); // New
          setPetType(fetchedClean.pet || ""); // New
          setSpecialComments(fetchedClean.spComments || ""); // New
          setIsRegularOneTime(Boolean(fetchedClean.regularOronetime)); // New (boolean conversion)
          setCompletedStatus(Boolean(fetchedClean.completed)); // New (boolean conversion)

          // Set selected days
          setMonSelected(Number(fetchedClean.mon) || 0); // New
          setTueSelected(Number(fetchedClean.tue) || 0); // New
          setWedSelected(Number(fetchedClean.wed) || 0); // New
          setThuSelected(Number(fetchedClean.thu) || 0); // New
          setFriSelected(Number(fetchedClean.fri) || 0); // New
          setSatSelected(Number(fetchedClean.sat) || 0); // New
          setSunSelected(Number(fetchedClean.sun) || 0); // New
        } else {
          // --- Reset all states to their defaults if no fetchedCleanData is found ---
          setMostRecentCleanData(null);
          setType(null); // Unselect any type
          setSliderValue(0);
          setSliderValueK(0);
          setSliderValueO(0); // Matches original default
          setSliderValueOX(0);
          setTotalSliders(0);
          setQuote(0);
          sumUp(0); // Call sumUp with 0 for reset
          setMyDate("");
          settimeFrame("");
          // Reset extras to default (0/unselected)
          setwalls(0);
          setWindows(0);
          setCabinets(0);
          setorganization(0);
          setblind(0);
          setstovetop(0);
          setDishwasher(0);
          setfridge(0);
          setgarage(0);
          setLaundry(0);
          setmicrowave(0);
          settiles(0);
          // Reset other booking details
          setDiscount(0);
          setFrequencyValue(0);
          setGetInsideMethod("");
          setParkingSpot("");
          setPetType("");
          setSpecialComments("");
          setIsRegularOneTime(false);
          setCompletedStatus(false);
          setMonSelected(0);
          setTueSelected(0);
          setWedSelected(0);
          setThuSelected(0);
          setFriSelected(0);
          setSatSelected(0);
          setSunSelected(0);
        }
      } else {
        // --- API response has no cleanRecords, reset all states ---
        console.warn("API response did not contain cleanRecords or was empty.");
        setMostRecentCleanData(null);
        setType(null);
        setSliderValue(0);
        setSliderValueK(0);
        setSliderValueO(0);
        setSliderValueOX(0);
        setTotalSliders(0);
        setQuote(0);
        sumUp(0);
        setMyDate("");
        settimeFrame("");
        setwalls(0);
        setWindows(0);
        setCabinets(0);
        setorganization(0);
        setblind(0);
        setstovetop(0);
        setDishwasher(0);
        setfridge(0);
        setgarage(0);
        setLaundry(0);
        setmicrowave(0);
        settiles(0);
        setDiscount(0);
        setFrequencyValue(0);
        setGetInsideMethod("");
        setParkingSpot("");
        setPetType("");
        setSpecialComments("");
        setIsRegularOneTime(false);
        setCompletedStatus(false);
        setMonSelected(0);
        setTueSelected(0);
        setWedSelected(0);
        setThuSelected(0);
        setFriSelected(0);
        setSatSelected(0);
        setSunSelected(0);
        throw new Error("No clean records found or list is empty.");
      }
    } catch (error) {
      // --- Handle API errors, reset all states ---
      console.error("Error fetching cleans:", error);
      setMostRecentCleanData(null);
      setType(null);
      setSliderValue(0);
      setSliderValueK(0);
      setSliderValueO(0);
      setSliderValueOX(0);
      setTotalSliders(0);
      setQuote(0);
      sumUp(0);
      setMyDate("");
      settimeFrame("");
      setwalls(0);
      setWindows(0);
      setCabinets(0);
      setorganization(0);
      setblind(0);
      setstovetop(0);
      setDishwasher(0);
      setfridge(0);
      setgarage(0);
      setLaundry(0);
      setmicrowave(0);
      settiles(0);
      setDiscount(0);
      setFrequencyValue(0);
      setGetInsideMethod("");
      setParkingSpot("");
      setPetType("");
      setSpecialComments("");
      setIsRegularOneTime(false);
      setCompletedStatus(false);
      setMonSelected(0);
      setTueSelected(0);
      setWedSelected(0);
      setThuSelected(0);
      setFriSelected(0);
      setSatSelected(0);
      setSunSelected(0);
    }
  };
  useEffect(() => {
    fetchCleans();
  }, []); // Empty dependency array means this runs once after the initial render
  const showValidationMessage = false; // Replace with your actual validation state
  const getValidationMessage = () => "Validation Message"; // Replace with your actual validation message logic
  // --- Your existing JSX for cleaning types and extras, which will now use the populated 'type' and extra states ---
  // Ensure your JSX elements for each detail (sliders, checkboxes/toggles for extras,
  // date/time inputs, text areas, etc.) are bound to these state variables.

  // Define residential steps and other logic as per your original file
  const residentialSteps = [
    {
      id: "step1",
      content: (
        <div>
          {/* ... other content */}
          <div
            className={`cleaning-types ${
              showValidationMessage ? "validation-active" : ""
            }`}
          >
            <div
              className={`cleaning-type ${type === 45 ? "selected" : ""}`}
              onClick={(e) => handleTypeSelection(45, e)}
            >
              <div className="cleaning-icon">
                <div className="lottie-placeholder">
                  <img src="/img/broom.png" />
                </div>
                {type === 45 && <div className="selection-indicator"></div>}
              </div>
              <h3>Regular Clean</h3>
            </div>
            <div
              className={`cleaning-type ${type === 135 ? "selected" : ""}`}
              onClick={(e) => handleTypeSelection(135, e)}
            >
              <div className="cleaning-icon">
                <div className="lottie-placeholder">
                  <img src="/img/sponge.png" />
                </div>
                {type === 135 && <div className="selection-indicator"></div>}
              </div>
              <h3>Deep Clean</h3>
            </div>
            <div
              className={`cleaning-type ${type === 280 ? "selected" : ""}`}
              onClick={(e) => handleTypeSelection(280, e)}
            >
              <div className="cleaning-icon">
                <div className="lottie-placeholder">
                  <img src="/img/window.png" />
                </div>
                {type === 280 && <div className="selection-indicator"></div>}
              </div>
              <h3>Vacate Clean</h3>
            </div>
          </div>
          {/* Example for how your 'extras' JSX should read the state and handle clicks.
              Adjust these based on how your UI elements (checkboxes, toggles) are structured. */}
          <div className="counters-container">
            <div className="counter-group">
              <div className="counter-controls">
                <button
                  className="counter-btn"
                  onClick={decrementRooms}
                  disabled={sliderValueO <= 0}
                >
                  -
                </button>
                <span className="counter-value">{sliderValueO}</span>
                <button
                  className="counter-btn"
                  onClick={incrementRooms}
                  disabled={sliderValueO >= 8}
                >
                  +
                </button>
              </div>
              <h3>Room{sliderValueO > 1 ? "s" : ""}</h3>
            </div>
            <div className="counter-group">
              <div className="counter-controls">
                <button
                  className="counter-btn"
                  onClick={decrementBathrooms}
                  disabled={sliderValue <= 0}
                >
                  -
                </button>
                <span className="counter-value">{sliderValue}</span>
                <button
                  className="counter-btn"
                  onClick={incrementBathrooms}
                  disabled={sliderValue >= 8}
                >
                  +
                </button>
              </div>
              <h3>Bathroom{sliderValue > 1 ? "s" : ""}</h3>
            </div>
            <div className="counter-group">
              <div className="counter-controls">
                <button
                  className="counter-btn"
                  onClick={decrementKitchens}
                  disabled={sliderValueK <= 0}
                >
                  -
                </button>
                <span className="counter-value">{sliderValueK}</span>
                <button
                  className="counter-btn"
                  onClick={incrementKitchens}
                  disabled={sliderValueK >= 8}
                >
                  +
                </button>
              </div>
              <h3>Kitchen{sliderValueK > 1 ? "s" : ""}</h3>
            </div>
            <div className="counter-group">
              <div className="counter-controls">
                <button
                  className="counter-btn"
                  onClick={decrementOther}
                  disabled={sliderValueOX <= 0}
                >
                  -
                </button>
                <span className="counter-value">{sliderValueOX}</span>
                <button
                  className="counter-btn"
                  onClick={incrementOther}
                  disabled={sliderValueOX >= 8}
                >
                  +
                </button>
              </div>
              <h3>Other{sliderValueOX > 1 ? "s" : ""}</h3>
            </div>
          </div>
          <div className="extras-section">
            <h3>Add Extra</h3>
            <div className="extras-grid">
              {[
                {
                  name: "Windows",
                  value: windows,
                  setter: setWindows,
                  price: 30,
                },
                { name: "Walls", value: walls, setter: setwalls, price: 40 },
                {
                  name: "Cabinets",
                  value: Cabinets,
                  setter: setCabinets,
                  price: 30,
                },
                {
                  name: "Organisation",
                  value: organization,
                  setter: setorganization,
                  price: 50,
                },
                { name: "Blinds", value: blind, setter: setblind, price: 35 },
                {
                  name: "Stovetop/oven",
                  value: stovetop,
                  setter: setstovetop,
                  price: 30,
                },
                { name: "Fridge", value: fridge, setter: setfridge, price: 35 },
                {
                  name: "Dishwasher",
                  value: Dishwasher,
                  setter: setDishwasher,
                  price: 30,
                },
                { name: "Garage", value: garage, setter: setgarage, price: 40 },
                {
                  name: "Microwave",
                  value: microwave,
                  setter: setmicrowave,
                  price: 5,
                },
                {
                  name: "Laundry",
                  value: Laundry,
                  setter: setLaundry,
                  price: 35,
                },
                { name: "Tiles", value: tiles, setter: settiles, price: 30 },
              ].map((extra, index) => (
                <div
                  key={index}
                  className={`extra-item ${extra.value > 0 ? "selected" : ""}`}
                  onClick={(e) =>
                    handleExtraItemClick(
                      extra.setter,
                      extra.value,
                      extra.price,
                      e
                    )
                  }
                >
                  <div className="extra-icon"></div>
                  <p>{extra.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // ... other steps (bathroom, kitchen sliders, etc. from your original file)
    // Ensure all elements that display the values (sliders, date pickers, time frames)
    // are bound to the state variables like sliderValue, myDate, timeFrame, etc.
  ];
  const steps = isCommercial ? commercialSteps : residentialSteps;

  const navigateS = () => {
    window.location.href = "/dashboard";
  };

  // Ensure handleTypeSelection and other handlers are defined in HouseAnimation's scope
  const handleTypeSelection = (value, e) => {
    setType(value); // Update the type state
    // Add any other logic for type selection here
  };

  // This function is shown in your snippet, but not fully provided.
  // It's crucial for showing validation messages.

  // Other handlers like handleExtraItemClick from your snippet
  // It's crucial that this setter updates the correct state variable.
  const handleExtraItemClick = (setter, value, price, e) => {
    // Implement your logic for extra item clicks here
    // If 'value' is expected to be a number (0 or 1), then it's fine.
    setter(value);
    // console.log("Extra item clicked:", setter, value, price);
  };

  return (
    <>
      <div className="">
        <div className="">
          <div
            className=""
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={` ${index === currentStep ? "active" : ""}`}
              >
                <div className="slide-content2">{step.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseAnimation;
