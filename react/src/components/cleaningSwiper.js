import React, { forwardRef, useEffect, useState, useCallback } from "react";
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

const CleaningSwiper = forwardRef((props, ref) => {
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
  const [Animal, setAnimal] = useState("Dog/Cat");
  const [spComments, setspComments] = useState("");
  const [supports, setSupports] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [isCommercial, setIsCommercial] = useState(false);
  const [selectedReg, setSelectedReg] = useState(null);
  const [total, setTotal] = useState(0);

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
  const [timeFrame, setTimeFrame] = useState(8);

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

  const handleTypeSelection = useCallback(
    (typeId, e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const previousType = type; // capture current before updating

      setType(typeId);
      setTotal((prevTotal) => prevTotal - previousType + typeId);

      setValidations((prev) => ({
        ...prev,
        details: typeId > 0 && sliderValueO > 0,
      }));

      setShowValidationMessage(false);
    },
    [sliderValueO, type]
  );

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

  // MEMOIZED EXTRA ITEM HANDLER
  const handleExtraItemClick = useCallback(
    (extraSetter, currentValue, price, e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      extraSetter(currentValue === 0 ? price : 0);
    },
    []
  );

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
  const getValidationMessage = () => {
    if (isCommercial) {
      switch (stepIds[currentStep]) {
        case "quote":
          return "Please select a cleaning type to proceed";
        case "business-info":
          return "Please enter business name and select business size";
        case "cleaning-needs":
          return "Please select environment type and type of clean";
        case "frequency-schedule":
          return "Please select cleaning frequency";
        case "insurance-budget":
          return "Please select your monthly budget";
        case "signup":
          return "Please complete all required business contact fields";
        default:
          return "";
      }
    } else {
      // Existing residential validation messages
      switch (stepIds[currentStep]) {
        case "quote":
          return "Please select a cleaning type to proceed";
        case "details":
          return "Please select a cleaning type and ensure you have at least one room";
        case "schedule":
          return CleanType
            ? "Please select a date and a time for recurring service"
            : "Please correct all errors to proceed";
        case "instructions":
          return "Please complete the required fields to proceed";
        case "signup":
          return "Please complete all required fields and accept terms to proceed";
        default:
          return "";
      }
    }
  };

  const disabledDates = React.useMemo(() => {
    const todayStart = startOfDay(new Date());
    const tomorrowStart = addDays(todayStart, 1);

    return [
      format(todayStart, "yyyy-MM-dd"), // ISO format
      format(tomorrowStart, "yyyy-MM-dd"),
    ];
  }, []);
  // Empty dependency array means this only runs once on mount

  // This memo recalculates properties for each day based on disabledDates and current date
  const updatedMonthlyCalendar = React.useMemo(() => {
    if (!monthlyCalendar || monthlyCalendar.length === 0) {
      return [];
    }

    const todayStart = startOfDay(new Date()); // Get today's start for consistent comparison

    return monthlyCalendar.map((month) => ({
      ...month,
      days: month.days.map((dayData) => {
        if (!dayData || !dayData.date) {
          return dayData;
        }

        const currentDayDate = parseISO(dayData.isoDate);

        // Determine if this day is explicitly disabled (today or tomorrow) from our `disabledDates` set
        const isDisabledByExplicitRule = disabledDates.includes(
          dayData.isoDate
        );

        // Determine if this day is strictly in the past (before today's start)
        const isActualPastDay = isBefore(currentDayDate, todayStart);

        return {
          ...dayData,
          // A day is selectable if it was initially selectable, NOT explicitly disabled (today/tomorrow), AND NOT in the past.
          isSelectable:
            dayData.isSelectable &&
            !isDisabledByExplicitRule &&
            !isActualPastDay,
          // A day is marked 'isDisabled' for styling if it's explicitly disabled or in the past.
          isDisabled: isDisabledByExplicitRule || isActualPastDay,
        };
      }),
    }));
  }, [monthlyCalendar, disabledDates]);

  // Define steps array
  const residentialSteps = [
    {
      id: "quote",
      title: "Receive a FREE Quote",
      subtitle: "What type of project? Please provide what type of cleaning.",
      content: (
        <div className="step-content">
          <div
            className={`quote-options ${
              showValidationMessage ? "validation-active" : ""
            }`}
          >
            <div
              className={`quote-option ${Quote === 1 ? "selected" : ""}`}
              onClick={(e) => handleQuoteSelection(1, e)}
            >
              <div className="quote-icon">
                <img
                  src={
                    require("../views/img/house_60156731-200h.png") ||
                    "/placeholder.svg" ||
                    "/placeholder.svg"
                  }
                  alt="House"
                />
                {Quote === 1 && <div className="selection-indicator"></div>}
              </div>
              <h3>Residential Cleaning</h3>
              <p>
                Bring a breath of fresh air and elevate your living spaces with
                our residential cleaning services, designed to bring comfort and
                hygiene to your home
              </p>
            </div>
            <div
              className={`quote-option ${Quote === 2 ? "selected" : ""}`}
              onClick={(e) => handleQuoteSelection(2, e)}
            >
              <div className="quote-icon">
                <img
                  src={
                    require("../views/img/building_60159951-200w.png") ||
                    "/placeholder.svg" ||
                    "/placeholder.svg"
                  }
                  alt="Building"
                />
                {Quote === 2 && <div className="selection-indicator"></div>}
              </div>
              <h3>Commercial Cleaning</h3>
              <p>
                Our commercial cleaning services are tailored to meet the unique
                demands of offices, restaurants, schools, gyms... you name it!
              </p>
            </div>
          </div>
          <div
            className={`validation-message ${
              showValidationMessage ? "visible" : ""
            }`}
          >
            {getValidationMessage()}
          </div>
        </div>
      ),
    },
    {
      id: "details",
      title: "Home Details",
      subtitle: "Tell us about your lovely home.",
      content: (
        <div className="step-content">
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
          <div
            className={`validation-message ${
              showValidationMessage ? "visible" : ""
            }`}
          >
            {getValidationMessage()}
          </div>
        </div>
      ),
    },
    {
      id: "schedule",
      title: "Schedule a Time",
      subtitle: "What time and date works best for you?",
      content: (
        <div className="step-content">
          <div className="monthly-calendar-section">
            <div className="calendar-header">
              <h3>{monthlyCalendar[currentMonthIndex]?.name}</h3>
              <span className="month-btn-group">
                <button
                  className="month-nav-btn"
                  onClick={() =>
                    setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1))
                  }
                  disabled={currentMonthIndex === 0}
                >
                  &#8249;
                </button>
                <button
                  className="month-nav-btn"
                  onClick={() =>
                    setCurrentMonthIndex(
                      Math.min(
                        monthlyCalendar.length - 1,
                        currentMonthIndex + 1
                      )
                    )
                  }
                  disabled={currentMonthIndex === monthlyCalendar.length - 1}
                >
                  &#8250;
                </button>
              </span>
            </div>
            <div className="calendar-weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="weekday-header">
                  {day}
                </div>
              ))}
            </div>
            <div className="monthly-calendar-grid2">
              {updatedMonthlyCalendar[currentMonthIndex]?.days.map(
                (dayData, index) => (
                  <div
                    key={index}
                    className={`calendar-day2 ${!dayData ? "empty" : ""} ${
                      dayData?.isPast ? "past" : ""
                    } ${dayData?.isToday ? "today" : ""} ${
                      selectedDate === dayData?.date ? "selected" : ""
                    } ${dayData?.isSelectable ? "selectable" : ""} ${
                      dayData?.isDisabled ? "disabled-date" : "" // Apply the disabled-date class
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Allow selection ONLY if the day is marked as selectable AND NOT disabled
                      if (dayData?.isSelectable && !dayData?.isDisabled) {
                        handleDateSelect(dayData.date);
                      }
                    }}
                  >
                    {dayData?.day}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="time-selection-section">
            <div className="time-dropdown-container">
              <select
                value={selectedTime}
                onChange={(e) => handleTimeSelect(e.target.value)}
                className="time-dropdown"
                disabled={!selectedDate}
              >
                <option value="">
                  {selectedDate
                    ? "Choose a time slot"
                    : "Please select a date first"}
                </option>
                {getAvailableTimeSlots(selectedDate).map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
              {selectedDate &&
                getAvailableTimeSlots(selectedDate).length === 0 && (
                  <p className="no-slots-message">
                    No available time slots for this date
                  </p>
                )}
            </div>
          </div>
          <div className="schedule-options">
            <div className="clean-type-toggle">
              {notify && (
                <div className="glassmorphism-notification">
                  <div>
                    <div>
                      <h5>Cleaners Pass</h5>
                      <p>
                        Schedule regular cleans with us and instantly save up to
                        15% off per clean! Also gain access to our loyalty and
                        rewards systems to earn up to 25% off per clean, for
                        life!
                      </p>
                      <p>
                        Note: Weekly cleans earn the highest discount. The
                        higher the frequency the higher the discount! Regardless
                        of the frequency, our rewards system will increase your
                        discount
                      </p>
                    </div>
                    <div>
                      <h5>Cancellations</h5>
                      <p>
                        Please note, cancellation fees may apply if you opt out
                        of your cleaner's pass within the first 3 cleans.{" "}
                        <Link to="/faqs" target="_blank">
                          <span className="link">Learn more on our FAQs.</span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="button-with-exclamation">
                <button
                  className={`toggle-btn-one ${CleanType ? "active" : ""}`}
                  onClick={handleRegularCleanToggle}
                >
                  <span
                    onClick={() => setNotify(!notify)}
                    className={`exclamation ${CleanType ? "highlighted" : ""}`}
                  >
                    !
                  </span>
                  Regular Cleans
                  <span className="off">
                    <small>Up to 25% OFF</small>
                  </span>
                </button>
              </div>
              <button
                className={`toggle-btn ${!CleanType ? "active" : ""}`}
                onClick={handleOneTimeCleanToggle}
              >
                One Time Clean
              </button>
            </div>
            {CleanType && (
              <div className="frequency-selector">
                <h4>Every:</h4>
                <div className="frequency-options">
                  <button
                    className={intervalValue === 15 ? "active" : ""}
                    onClick={(e) => handleFrequencySelect(15, e)}
                  >
                    Week
                  </button>
                  <button
                    className={intervalValue === 10 ? "active" : ""}
                    onClick={(e) => handleFrequencySelect(10, e)}
                  >
                    Fortnight
                  </button>
                  <button
                    className={intervalValue === 5 ? "active" : ""}
                    onClick={(e) => handleFrequencySelect(5, e)}
                  >
                    Month
                  </button>
                </div>
                <h4>On Days:</h4>
                <div className="day-selector">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day, index) => (
                      <button
                        key={day}
                        className={`day-btn ${
                          [
                            daySelect1,
                            daySelect2,
                            daySelect3,
                            daySelect4,
                            daySelect5,
                            daySelect6,
                            daySelect7,
                          ][index] === 1
                            ? "selected"
                            : ""
                        }`}
                        onClick={(e) => toggleDay(index + 1, e)}
                      >
                        {day}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          {submitError && (
            <div className="error-message visible">{submitError}</div>
          )}
          <div
            className={`validation-message ${
              showValidationMessage ? "visible" : ""
            }`}
          >
            {getValidationMessage()}
          </div>
        </div>
      ),
    },
    {
      id: "instructions",
      title: "Special Instructions",
      subtitle: "Please enter the further details below",
      content: (
        <div className="step-content">
          <div className="form-group">
            <label className="required-field">
              How will we get inside your home?
            </label>
            <select
              value={GetInside}
              onChange={(e) => {
                setGetInside(e.target.value);
              }}
              className="form-select"
            >
              <option>I will be home</option>
              <option>I will leave a key</option>
              <option>I will provide a lockbox/access code</option>
              <option>Other (please specify)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="required-field">Where will we park?</label>
            <select
              value={Park}
              onChange={(e) => {
                setPark(e.target.value);
              }}
              className="form-select"
            >
              <option>I will provide parking on site</option>
              <option>There is free parking nearby/on the street</option>
              <option>I will provide a lockbox/access code</option>
              <option>Other (please specify)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Do you have pets?</label>
            <select
              value={Animal}
              onChange={(e) => {
                setAnimal(e.target.value);
              }}
              className="form-select"
            >
              <option>Dog/Cat</option>
              <option>No pets</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Have any comments?</label>
            <textarea
              value={spComments}
              onChange={(e) => {
                setspComments(e.target.value);
              }}
              className="form-textarea"
              placeholder="If you have any information you would like to share, please write here..."
            />
          </div>
          <div
            className={`validation-message ${
              showValidationMessage ? "visible" : ""
            }`}
          >
            {getValidationMessage()}
          </div>
        </div>
      ),
    },
    {
      id: "signup",
      title: "Sign Up Details",
      subtitle:
        "Sign up to view your cleaning history, gain exclusive access to member benefits, and spoiled with gifts from our many reward systems!",
      content: (
        <div className="step-content">
          <div className="google-signup">
            <div id="googleSignInButton"></div>
          </div>
          <div className="signup-form">
            <div className="form-row">
              <div className="form-group">
                <label className="required-field">First Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    updateSignupValidation();
                  }}
                />
              </div>
              <div className="form-group">
                <label className="required-field">Last Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    updateSignupValidation();
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="required-field">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    updateSignupValidation();
                  }}
                />
              </div>
              <div className="form-group">
                <label className="required-field">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    updateSignupValidation();
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="required-field">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    updateSignupValidation();
                  }}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeSlashIcon /> : <Eye />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="required-field">Address</label>
              <MelbourneAddressInput
                value={address}
                onChange={setAddress}
                onValidation={updateSignupValidation}
                className="form-input"
                placeholder="House Address"
              />
            </div>
            <div className="form-group">
              <label>Referral Code (Not required)</label>
              <input
                type="text"
                className="form-input"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
              />
            </div>
            <div className="terms-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    updateSignupValidation();
                  }}
                />
                I accept the <span className="link">Terms & Conditions</span>
              </label>
              <p>
                Already have an account?{" "}
                <span className="link" onClick={() => setLogin(true)}>
                  Login
                </span>
              </p>
            </div>
            {submitError && (
              <div className="error-message visible">{submitError}</div>
            )}
          </div>
          <div
            className={`validation-message ${
              showValidationMessage ? "visible" : ""
            }`}
          >
            {getValidationMessage()}
          </div>
        </div>
      ),
    },
    {
      id: "summary",
      title: "Booking Summary",
      subtitle: "Review your booking details",
      content: (
        <div className="step-content">
          <div className="summary-content">
            <div className="summary-section">
              <h3>Schedule</h3>
              <div className="summary-item">
                <span>Date</span>
                <span>{MyDate || "Not selected"}</span>
              </div>
              <div className="summary-item">
                <span>Time</span>
                <span>{selectedTimeLabel || "Not selected"}</span>
              </div>
              <div className="summary-item">
                <span>Service Type</span>
                <span>{CleanType ? "Repeated" : "One Time"} Service</span>
              </div>
              <div className="summary-item">
                <span>Address</span>
                <span>{address}</span>
              </div>
            </div>
            <div className="summary-section">
              <h3>Customer Details</h3>
              <div className="summary-item">
                <span>Name</span>
                <span>
                  {firstName} {lastName}
                </span>
              </div>
              <div className="summary-item">
                <span>Email</span>
                <span>{email}</span>
              </div>
              <div className="summary-item">
                <span>Phone</span>
                <span>{phone}</span>
              </div>
            </div>
            <div className="summary-section">
              <h3>Service Details</h3>
              <div className="summary-item">
                <span>{sliderValueO} Bedroom(s)</span>
                <span>${(sliderValueO * 20).toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>{sliderValue} Bathroom(s)</span>
                <span>${(sliderValue * 30).toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>{sliderValueK} Kitchen(s)</span>
                <span>${(sliderValueK * 45).toFixed(2)}</span>
              </div>
              {windows > 0 && (
                <div className="summary-item">
                  <span>Windows</span>
                  <span>${windows.toFixed(2)}</span>
                </div>
              )}
              {walls > 0 && (
                <div className="summary-item">
                  <span>Walls</span>
                  <span>${walls.toFixed(2)}</span>
                </div>
              )}
              {Cabinets > 0 && (
                <div className="summary-item">
                  <span>Cabinets</span>
                  <span>${Cabinets.toFixed(2)}</span>
                </div>
              )}
              {organization > 0 && (
                <div className="summary-item">
                  <span>Organisation</span>
                  <span>${organization.toFixed(2)}</span>
                </div>
              )}
              {blind > 0 && (
                <div className="summary-item">
                  <span>Blinds</span>
                  <span>${blind.toFixed(2)}</span>
                </div>
              )}
              {stovetop > 0 && (
                <div className="summary-item">
                  <span>Stovetop/oven</span>
                  <span>${stovetop.toFixed(2)}</span>
                </div>
              )}
              {fridge > 0 && (
                <div className="summary-item">
                  <span>Fridge</span>
                  <span>${fridge.toFixed(2)}</span>
                </div>
              )}
              {Dishwasher > 0 && (
                <div className="summary-item">
                  <span>Dishwasher</span>
                  <span>${Dishwasher.toFixed(2)}</span>
                </div>
              )}
              {garage > 0 && (
                <div className="summary-item">
                  <span>Garage</span>
                  <span>${garage.toFixed(2)}</span>
                </div>
              )}
              {microwave > 0 && (
                <div className="summary-item">
                  <span>Microwave</span>
                  <span>${microwave.toFixed(2)}</span>
                </div>
              )}
              {Laundry > 0 && (
                <div className="summary-item">
                  <span>Laundry</span>
                  <span>${Laundry.toFixed(2)}</span>
                </div>
              )}
              {tiles > 0 && (
                <div className="summary-item">
                  <span>Tiles</span>
                  <span>${tiles.toFixed(2)}</span>
                </div>
              )}
            </div>
            <div className="summary-total">
              <div className="total-line">
                <span>Total</span>
                <span className="total-number">
                  ${discountedTotal.toFixed(2)}
                  {isDiscountApplied && (
                    <small style={{ marginLeft: "6px", color: "green" }}>
                      (25% off)
                    </small>
                  )}
                </span>
              </div>
            </div>
            <button
              className={`book-now-btn2 ${isSubmitting ? "loading" : ""}`}
              onClick={makePayment}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Book Now & Pay"}
            </button>
            {submitError && (
              <div className="error-message visible">{submitError}</div>
            )}
          </div>
        </div>
      ),
    },
  ];

  // Define commercial steps
  const commercialSteps = [
    {
      id: "quote",
      title: "Receive a FREE Quote",
      subtitle: "What type of project? Please provide what type of cleaning.",
      content: (
        <div className="step-content">
          <div
            className={`quote-options ${
              showValidationMessage ? "validation-active" : ""
            }`}
          >
            <div
              className={`quote-option ${Quote === 1 ? "selected" : ""}`}
              onClick={(e) => handleQuoteSelection(1, e)}
            >
              <div className="quote-icon">
                <img
                  src={
                    require("../views/img/house_60156731-200h.png") ||
                    "/placeholder.svg"
                  }
                  alt="House"
                />
                {Quote === 1 && <div className="selection-indicator"></div>}
              </div>
              <h3>Residential Cleaning</h3>
              <p>
                Bring a breath of fresh air and elevate your living spaces with
                our residential cleaning services, designed to bring comfort and
                hygiene to your home
              </p>
            </div>
            <div
              className={`quote-option ${Quote === 2 ? "selected" : ""}`}
              onClick={(e) => handleQuoteSelection(2, e)}
            >
              <div className="quote-icon">
                <img
                  src={
                    require("../views/img/building_60159951-200w.png") ||
                    "/placeholder.svg"
                  }
                  alt="Building"
                />
                {Quote === 2 && <div className="selection-indicator"></div>}
              </div>
              <h3>Commercial Cleaning</h3>
              <p>
                Our commercial cleaning services are tailored to meet the unique
                demands of offices, restaurants, schools, gyms... you name it!
              </p>
            </div>
          </div>
          <div
            className={`validation-message ${
              showValidationMessage ? "visible" : ""
            }`}
          >
            {getValidationMessage()}
          </div>
        </div>
      ),
    },

    {
      id: "business-info",
      title: "Tell Us About Your Business",
      subtitle: "Let's start with some basic information about your business.",
      content: (
        <div className="step-content">
          <div className="form-group">
            <label className="required-field">Business Name</label>
            <input
              type="text"
              className="form-input"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter your business name"
            />
          </div>
          <div className="form-group">
            <label className="required-field">Business Size</label>
            <select
              value={businessSize}
              onChange={(e) => setBusinessSize(e.target.value)}
              className="form-select"
            >
              <option value="">Select business size</option>
              <option value="small">Small (Under 2,000 sq ft)</option>
              <option value="medium">Medium (2,000 - 10,000 sq ft)</option>
              <option value="large">Large (10,000 - 50,000 sq ft)</option>
              <option value="enterprise">Enterprise (Over 50,000 sq ft)</option>
            </select>
          </div>
          <div
            className={`validation-message ${
              showValidationMessage ? "visible" : ""
            }`}
          >
            {getValidationMessage()}
          </div>
        </div>
      ),
    },

    {
      id: "cleaning-needs",
      title: "What Needs Cleaning",
      subtitle: "Tell us about your cleaning requirements.",
      content: (
        <div className="step-content">
          <div className="form-group">
            <label className="required-field">Type of Environment</label>
            <div className="frequency-options">
              {[
                "Office Building",
                "Retail Store",
                "Restaurant/Food Service",
                "Medical Facility",
                "School/Educational",
                "Gym/Fitness Center",
                "Warehouse/Industrial",
                "Hotel/Hospitality",
                "Other",
              ].map((env) => (
                <button
                  key={env}
                  className={typeOfEnvironment === env ? "active" : ""}
                  onClick={(e) => handleEnvironmentTypeChange(env, e)}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="required-field">Type of Clean</label>
            <div className="frequency-options">
              {[
                "Regular Maintenance",
                "Deep Clean",
                "Post-Construction",
                "Move-in/Move-out",
                "Event Cleanup",
                "Specialized Cleaning",
              ].map((clean) => (
                <button
                  key={clean}
                  className={typeOfClean === clean ? "active" : ""}
                  onClick={(e) => handleCleanTypeChange(clean, e)}
                >
                  {clean}
                </button>
              ))}
            </div>
          </div>
          <div
            className={`validation-message ${
              showValidationMessage ? "visible" : ""
            }`}
          >
            {getValidationMessage()}
          </div>
        </div>
      ),
    },

    {
      id: "frequency-schedule",
      title: "How Often",
      subtitle: "When do you need cleaning services?",
      content: (
        <div className="step-content">
          <div className="form-group">
            <label className="required-field">Frequency</label>
            <div className="frequency-options">
              {[
                "Daily",
                "Weekly",
                "Bi-weekly",
                "Monthly",
                "One-time",
                "Custom",
              ].map((freq) => (
                <button
                  key={freq}
                  className={cleaningFrequency === freq ? "active" : ""}
                  onClick={(e) => handleCleaningFrequencySelect(freq, e)}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Availability (Days of Week)</label>
            <div className="day-selector">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <button
                  key={day}
                  className={`day-btn ${
                    availabilityDays.includes(day) ? "selected" : ""
                  }`}
                  onClick={(e) => handleAvailabilityDayToggle(day, e)}
                >
                  {day.substring(0, 3)}
                </button>
              ))}
            </div>
          </div>
          <div
            className={`validation-message ${
              showValidationMessage ? "visible" : ""
            }`}
          >
            {getValidationMessage()}
          </div>
        </div>
      ),
    },

    {
      id: "insurance-budget",
      title: "Insurance & Budget",
      subtitle: "Let's discuss insurance requirements and your budget.",
      content: (
        <div className="step-content">
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={insuranceDocs}
                onChange={(e) => setInsuranceDocs(e.target.checked)}
              />
              Insurance and bonding documentation required
            </label>
            <p className="form-help-text">
              Check this if you require our team to provide insurance and
              bonding documentation before service begins.
            </p>
          </div>
          <div className="form-group">
            <label className="required-field">Monthly Budget</label>
            <div className="frequency-options">
              {[
                "$500-$1,000",
                "$1,000-$2,500",
                "$2,500-$5,000",
                "$5,000-$10,000",
                "$10,000+",
                "Custom Quote",
              ].map((budget) => (
                <button
                  key={budget}
                  className={budgetRange === budget ? "active" : ""}
                  onClick={(e) => handleBudgetRangeSelect(budget, e)}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>
          <div
            className={`validation-message ${
              showValidationMessage ? "visible" : ""
            }`}
          >
            {getValidationMessage()}
          </div>
        </div>
      ),
    },

    {
      id: "signup",
      title: "Sign Up",
      subtitle:
        "Provide your business contact information for the service agreement.",
      content: (
        <div className="step-content">
          <div className="signup-form">
            <div className="form-group">
              <label className="required-field">Primary Contact</label>
              <input
                type="text"
                className="form-input"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  updateSignupValidation();
                }}
                placeholder="Primary contact person name"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="required-field">Business Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    updateSignupValidation();
                  }}
                  placeholder="business@company.com"
                />
              </div>
              <div className="form-group">
                <label className="required-field">Business Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    updateSignupValidation();
                  }}
                  placeholder="(03) 1234 5678"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="required-field">Business Address</label>
              <MelbourneAddressInput
                value={address}
                onChange={setAddress}
                onValidation={updateSignupValidation}
                className="form-input"
                placeholder="Full business address"
              />
            </div>
            <div className="terms-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    updateSignupValidation();
                  }}
                />
                I accept the{" "}
                <span className="link">Commercial Service Agreement</span>
              </label>
            </div>
            {submitError && (
              <div className="error-message visible">{submitError}</div>
            )}
          </div>
          <div
            className={`validation-message ${
              showValidationMessage ? "visible" : ""
            }`}
          >
            {getValidationMessage()}
          </div>
        </div>
      ),
    },

    {
      id: "commercial-summary",
      title: "Service Agreement Summary",
      subtitle: "Review your commercial cleaning service details",
      content: (
        <div className="step-content">
          <div className="summary-content">
            <div className="summary-section">
              <h3>Business Information</h3>
              <div className="summary-item">
                <span>Business Name</span>
                <span>{businessName}</span>
              </div>
              <div className="summary-item">
                <span>Business Size</span>
                <span>{businessSize}</span>
              </div>
            </div>
            <div className="summary-section">
              <h3>Cleaning Requirements</h3>
              <div className="summary-item">
                <span>Environment Type</span>
                <span>{typeOfEnvironment}</span>
              </div>
              <div className="summary-item">
                <span>Type of Clean</span>
                <span>{typeOfClean}</span>
              </div>
            </div>
            <div className="summary-section">
              <h3>Schedule</h3>
              <div className="summary-item">
                <span>Frequency</span>
                <span>{cleaningFrequency}</span>
              </div>
              <div className="summary-item">
                <span>Available Days</span>
                <span>{availabilityDays.join(", ") || "Not specified"}</span>
              </div>
            </div>
            <div className="summary-section">
              <h3>Requirements & Budget</h3>
              <div className="summary-item">
                <span>Insurance Required</span>
                <span>{insuranceDocs ? "Yes" : "No"}</span>
              </div>
              <div className="summary-item">
                <span>Monthly Budget</span>
                <span>{budgetRange}</span>
              </div>
            </div>
            <div className="summary-section">
              <h3>Contact Information</h3>
              <div className="summary-item">
                <span>Primary Contact</span>
                <span>{lastName}</span>
              </div>
              <div className="summary-item">
                <span>Email</span>
                <span>{email}</span>
              </div>
              <div className="summary-item">
                <span>Phone</span>
                <span>{phone}</span>
              </div>
              <div className="summary-item">
                <span>Address</span>
                <span>{address}</span>
              </div>
            </div>
            <button
              className={`book-now-btn2 ${isSubmitting ? "loading" : ""}`}
              onClick={submitCommercialQuote}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Quote Request"}
            </button>
            {submitError && (
              <div className="error-message visible">{submitError}</div>
            )}
          </div>
        </div>
      ),
    },
  ];

  // Use conditional steps based on cleaning type
  const steps = isCommercial ? commercialSteps : residentialSteps;

  // Update validations when commercial fields change
  useEffect(() => {
    if (isCommercial) {
      setValidations((prev) => ({
        ...prev,
        "business-info": businessName && businessSize,
        "cleaning-needs": typeOfEnvironment && typeOfClean,
        "frequency-schedule": cleaningFrequency,
        "insurance-budget": budgetRange,
      }));
    }
  }, [
    businessName,
    businessSize,
    typeOfEnvironment,
    typeOfClean,
    cleaningFrequency,
    budgetRange,
    isCommercial,
  ]);

  const navigateS = () => {
    window.location.href = "/dashboard";
  };

  return (
    <>
      {login && (
        <Login CloseLogin={() => setLogin(false)} navigateS={navigateS} />
      )}
      <div ref={ref} className="swiper-container">
        <div className="swiper-wrapper">
          <div
            className="swiper-track"
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`swiper-slide ${
                  index === currentStep ? "active" : ""
                }`}
              >
                <div className="slide-content">
                  <div className="slide-header">
                    <h1>{step.title}</h1>
                    <p>{step.subtitle}</p>
                  </div>
                  {step.content}
                </div>
              </div>
            ))}
          </div>
          {/* Progress indicators */}
          <div className="swiper-pagination">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`pagination-dot ${
                  index === currentStep ? "active" : ""
                } ${index > currentStep ? "disabled" : ""}`}
                onClick={() => goToStep(index)}
                disabled={index > currentStep}
              />
            ))}
          </div>
        </div>
        {!isCommercial &&
          currentStep >= 1 &&
          currentStep <= steps.length - 3 && (
            <>
              <p className="check">
                Already have an account?{" "}
                <span className="link" onClick={() => setLogin(true)}>
                  Login
                </span>
              </p>
              <div className="slide-footer">
                <Link to="/contact" target="_blank">
                  <div className="support-section">
                    <img
                      src={
                        require("../views/img/support.png") ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt="Support"
                      className={supports ? "support-active" : ""}
                    />
                    <p
                      onMouseEnter={handleMouseEnterSupport}
                      onMouseLeave={handleMouseLeaveSupport}
                    >
                      Support
                    </p>
                  </div>
                </Link>
                <div>
                  <h5 className="total-text">
                    Total{" "}
                    <span className="total-number">${Total.toFixed(2)}</span>
                  </h5>
                  <small>
                    We estimate your cleaning to take:{" "}
                    <span className="tim">{estimatedTime} minutes</span>
                  </small>
                </div>
                <div
                  className="sum-txt"
                  onClick={() => setCurrentStep(steps.length - 1)}
                >
                  <span>
                    <h5>Booking Summary</h5>
                    <small>have a discount code?</small>
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </div>
            </>
          )}
        {/* Navigation arrows */}
        <button
          className={`swiper-nav swiper-nav-left ${
            currentStep === 0 ? "disabled" : ""
          }`}
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          &#8249;
        </button>
        <button
          className={`swiper-nav swiper-nav-right ${
            currentStep === totalSteps - 1 ||
            !validations[steps[currentStep].id]
              ? "disabled"
              : ""
          }`}
          onClick={nextStep}
          disabled={
            currentStep === totalSteps - 1 ||
            !validations[steps[currentStep].id]
          }
        >
          &#8250;
        </button>
      </div>
    </>
  );
});

export default CleaningSwiper;
