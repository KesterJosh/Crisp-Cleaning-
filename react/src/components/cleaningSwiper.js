import { useEffect, useState } from "react";
import axios from "axios";
import "./swiper-styles.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../views/login";
import { Eye, EyeSlashIcon } from "@phosphor-icons/react";
import GoogleAuth from "./GoogleAuth";

const CleaningSwiper = () => {
  const [login, setLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [Quote, setQuote] = useState(0);
  const [type, setType] = useState(0);
  const [sliderValueO, setSliderValueO] = useState(1);
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
  const [CleanType, setCleanType] = useState(true);
  const [intervalValue, setIntervalValue] = useState(15);
  const [GetInside, setGetInside] = useState("I will be home");
  const [Park, setPark] = useState("I will provide parking on site");
  const [Animal, setAnimal] = useState("Dog/Cat");
  const [spComments, setspComments] = useState("");
  const [supports, setSupports] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [isCommercial, setIsCommercial] = useState(false);

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
          { theme: "outline", size: "large" }
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
      .post(`http://localhost:4000/google-auth`, {
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
    "business-details": false,
    "commercial-schedule": false,
    "commercial-requirements": false,
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
      sliderValueO * 20 +
      sliderValue * 30 +
      sliderValueK * 45 +
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

  // Generate monthly calendar data from current month to end of year
  const generateMonthlyCalendar = () => {
    const months = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    for (let month = currentMonth; month <= 11; month++) {
      const firstDay = new Date(currentYear, month, 1);
      const lastDay = new Date(currentYear, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const monthData = {
        name: firstDay.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        month: month,
        year: currentYear,
        days: [],
      };

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        monthData.days.push(null);
      }

      // Add all days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, month, day);
        const isToday = date.toDateString() === today.toDateString();
        const isPast = date < today && !isToday;

        monthData.days.push({
          day,
          date: date.toISOString().split("T")[0],
          isToday,
          isPast,
          isSelectable: !isPast,
        });
      }

      months.push(monthData);
    }

    return months;
  };

  // Get available time slots for a specific date
  const getAvailableTimeSlots = (selectedDate) => {
    if (!selectedDate) return [];

    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    const hour = new Date().getHours();
    const isToday = date.toDateString() === new Date().toDateString();

    let availableSlots = [
      { value: 8, label: "8:00 AM - 10:00 AM" },
      { value: 10, label: "10:00 AM - 12:00 PM" },
      { value: 12, label: "12:00 PM - 2:00 PM" },
      { value: 14, label: "2:00 PM - 4:00 PM" },
      { value: 16, label: "4:00 PM - 6:00 PM" },
      { value: 18, label: "6:00 PM - 8:00 PM" },
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

  // Form validation functions
  const validateQuoteStep = () => {
    if (Quote === 0) {
      setSubmitError(
        "Please select a cleaning type (Residential or Commercial)"
      );
      return false;
    }
    setSubmitError("");
    return true;
  };

  const validateDetailsStep = () => {
    const errors = [];

    if (type === 0) {
      errors.push("Please select a cleaning service type");
    }

    if (sliderValueO === 0) {
      errors.push("Please select at least one room");
    }

    if (errors.length > 0) {
      setSubmitError(errors.join(". "));
      return false;
    }

    setSubmitError("");
    return true;
  };

  const validateScheduleStep = () => {
    const errors = [];

    if (!selectedDate) {
      errors.push("Please select a date");
    }

    if (!selectedTime) {
      errors.push("Please select a time slot");
    }

    if (CleanType) {
      const selectedDays = [
        daySelect1,
        daySelect2,
        daySelect3,
        daySelect4,
        daySelect5,
        daySelect6,
        daySelect7,
      ];
      if (!selectedDays.some((day) => day === 1)) {
        errors.push("Please select at least one day for recurring service");
      }
    }

    if (errors.length > 0) {
      setSubmitError(errors.join(". "));
      return false;
    }

    setSubmitError("");
    return true;
  };

  const validateInstructionsStep = () => {
    // Instructions step is always valid since all fields have default values
    setSubmitError("");
    return true;
  };

  const validateSignupStep = () => {
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
  };

  const validateCommercialDetailsStep = () => {
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
  };

  const validateCommercialScheduleStep = () => {
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
  };

  const validateCommercialRequirementsStep = () => {
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
  };

  // Update the calendar state
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const monthlyCalendar = generateMonthlyCalendar();

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setMyDate(
      new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );

    // Update schedule validation
    updateScheduleValidation(date, selectedTime);
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setTimeFrame(time);

    // Find and store the time label for display
    const timeSlots = getAvailableTimeSlots(selectedDate);
    const selectedSlot = timeSlots.find((slot) => slot.value == time);
    setSelectedTimeLabel(selectedSlot ? selectedSlot.label : "");

    // Update schedule validation
    updateScheduleValidation(selectedDate, time);
  };

  // Update schedule validation helper
  const updateScheduleValidation = (date, time) => {
    let isValid = false;

    if (CleanType) {
      // For recurring service: need date, time, and at least one day selected
      const selectedDays = [
        daySelect1,
        daySelect2,
        daySelect3,
        daySelect4,
        daySelect5,
        daySelect6,
        daySelect7,
      ];
      isValid = date && time && selectedDays.some((day) => day === 1);
    } else {
      // For one-time service: just need date and time
      isValid = date && time;
    }

    setValidations((prev) => ({ ...prev, schedule: isValid }));
    if (isValid) setShowValidationMessage(false);
  };

  // Day selection handlers
  const toggleDay = (dayNumber) => {
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

    // Update validation after day selection
    setTimeout(() => {
      updateScheduleValidation(selectedDate, selectedTime);
    }, 0);
  };

  // Handle quote selection and validate
  const handleQuoteSelection = (quoteId) => {
    setQuote(quoteId);
    setIsCommercial(quoteId === 2); // Commercial is option 2
    setValidations((prev) => ({ ...prev, quote: true }));
    setShowValidationMessage(false);
  };

  // Handle cleaning type selection and validate
  const handleTypeSelection = (typeId) => {
    setType(typeId);
    // Details step is valid if both type and rooms are selected
    setValidations((prev) => ({
      ...prev,
      details: typeId > 0 && sliderValueO > 0,
    }));
    setShowValidationMessage(false);
  };

  // Button handlers for room counts
  const incrementRooms = () => {
    if (sliderValueO < 8) {
      const newValue = sliderValueO + 1;
      handleSliderChangeO(newValue);
    }
  };

  const decrementRooms = () => {
    if (sliderValueO > 1) {
      const newValue = sliderValueO - 1;
      handleSliderChangeO(newValue);
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

  const updateSignupValidation = () => {
    let isValid;

    if (isCommercial) {
      // For commercial flow, don't require password
      isValid = firstName && lastName && email && phone && address;
    } else {
      // For residential flow, require password
      isValid = firstName && lastName && email && phone && password && address;
    }

    setValidations((prev) => ({ ...prev, signup: isValid }));
    if (isValid) setShowValidationMessage(false);
  };

  const updateCommercialValidation = () => {
    const isValid = businessType && businessSize && cleaningFrequency;
    setValidations((prev) => ({ ...prev, "business-details": isValid }));
    if (isValid) setShowValidationMessage(false);
  };

  const updateCommercialScheduleValidation = () => {
    const isValid = selectedDate && businessHours;
    setValidations((prev) => ({ ...prev, "commercial-schedule": isValid }));
    if (isValid) setShowValidationMessage(false);
  };

  const updateCommercialRequirementsValidation = () => {
    const isValid = budgetRange && contractLength;
    setValidations((prev) => ({ ...prev, "commercial-requirements": isValid }));
    if (isValid) setShowValidationMessage(false);
  };

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

      console.log("Registration response:", response);

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
        discountNew: Total, // Assuming no discount for now
      };

      console.log("Clean booking data:", requestData);

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
          "pk_live_51Mlo58BQeeo3mqOtmcqikviKCa8UaoFVRQOoN9MPxoBCHpOnH5PZdUR31kqd9amFDz0mDU2jdhwrTvED8YmHNsCD007BqjAfW3"
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
        businessName: firstName,
        contactPerson: lastName,
        email,
        phone,
        address,
        businessType,
        businessSize,
        cleaningFrequency,
        specialRequirements,
        startDate: MyDate,
        businessHours,
        accessInstructions,
        emergencyContact,
        budgetRange,
        contractLength,
        insuranceRequired,
        additionalNotes: spComments,
        taxId: referral,
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
        case "business-details":
          isValid = validateCommercialDetailsStep();
          break;
        case "commercial-schedule":
          isValid = validateCommercialScheduleStep();
          break;
        case "commercial-requirements":
          isValid = validateCommercialRequirementsStep();
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
      console.log("Moving to step:", currentStep + 1);
    } else {
      setShowValidationMessage(true);
      console.log("Validation failed for step:", currentStepId);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowValidationMessage(false);
      console.log("Moving back to step:", currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
      setShowValidationMessage(false);
      console.log("Jumping to step:", step);
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
        case "business-details":
          return "Please complete business type, size, and cleaning frequency";
        case "commercial-schedule":
          return "Please select a start date and specify business hours";
        case "commercial-requirements":
          return "Please specify budget range and contract length";
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
            ? "Please select a date, time, and at least one day for recurring service"
            : "Please select a date and time to proceed";
        case "instructions":
          return "Please complete the required fields to proceed";
        case "signup":
          return "Please complete all required fields and accept terms to proceed";
        default:
          return "";
      }
    }
  };

  // Define steps array
  const residentialSteps = [
    {
      id: "quote",
      title: "Receive A Quote",
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
              onClick={() => handleQuoteSelection(1)}
            >
              <div className="quote-icon">
                <img
                  src={require("../views/img/house_60156731-200h.png")}
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
              onClick={() => handleQuoteSelection(2)}
            >
              <div className="quote-icon">
                <img
                  src={require("../views/img/building_60159951-200w.png")}
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
              onClick={() => handleTypeSelection(45)}
            >
              <div className="cleaning-icon">
                <div className="lottie-placeholder">🧹</div>
                {type === 45 && <div className="selection-indicator"></div>}
              </div>
              <h3>Regular Clean</h3>
            </div>

            <div
              className={`cleaning-type ${type === 135 ? "selected" : ""}`}
              onClick={() => handleTypeSelection(135)}
            >
              <div className="cleaning-icon">
                <div className="lottie-placeholder">🧽</div>
                {type === 135 && <div className="selection-indicator"></div>}
              </div>
              <h3>Deep Clean</h3>
            </div>

            <div
              className={`cleaning-type ${type === 280 ? "selected" : ""}`}
              onClick={() => handleTypeSelection(280)}
            >
              <div className="cleaning-icon">
                <div className="lottie-placeholder">🪟</div>
                {type === 280 && <div className="selection-indicator"></div>}
              </div>
              <h3>Vacate Clean</h3>
            </div>
          </div>

          <div className="room-visualization">
            <div className="hearts-container">
              {[H1, H2, H3, H4, H5, H6, H7].map((visible, index) => (
                <div
                  key={index}
                  className={`heart-wrapper ${
                    visible ? "visible" : "invisible"
                  }`}
                >
                  <div
                    className={`heart ${
                      [Heart, Heart1, Heart2, Heart3, Heart4, Heart5, Heart6][
                        index
                      ]
                        ? "active"
                        : ""
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          <div className="counters-container">
            <div className="counter-group">
              <div className="counter-controls">
                <button
                  className="counter-btn"
                  onClick={decrementRooms}
                  disabled={sliderValueO <= 1}
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
                  price: 35,
                },
                { name: "Fridge", value: fridge, setter: setfridge, price: 35 },
                {
                  name: "Dishwasher",
                  value: Dishwasher,
                  setter: setDishwasher,
                  price: 25,
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
                { name: "Tiles", value: tiles, setter: settiles, price: 20 },
              ].map((extra, index) => (
                <div
                  key={index}
                  className={`extra-item ${extra.value > 0 ? "selected" : ""}`}
                  onClick={() =>
                    extra.setter(extra.value === 0 ? extra.price : 0)
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
              {monthlyCalendar[currentMonthIndex]?.days.map(
                (dayData, index) => (
                  <div
                    key={index}
                    className={`calendar-day2 ${!dayData ? "empty" : ""} ${
                      dayData?.isPast ? "past" : ""
                    } ${dayData?.isToday ? "today" : ""} ${
                      selectedDate === dayData?.date ? "selected" : ""
                    } ${dayData?.isSelectable ? "selectable" : ""}`}
                    onClick={() => {
                      if (dayData?.isSelectable) {
                        handleDateSelect(dayData.date);
                        setSelectedTime("");
                        setSelectedTimeLabel("");
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
              <div className="button-with-exclamation">
                <span
                  className={`exclamation ${CleanType ? "highlighted" : ""}`}
                >
                  !
                </span>
                <button
                  className={`toggle-btn-one ${CleanType ? "active" : ""}`}
                  onClick={() => {
                    setCleanType(true);
                    setIntervalValue(15);
                    updateScheduleValidation(selectedDate, selectedTime);
                  }}
                >
                  Regular Clean
                  <span className="off">
                    <small>Up to 25% OFF</small>
                  </span>
                </button>
              </div>

              <button
                className={`toggle-btn ${!CleanType ? "active" : ""}`}
                onClick={() => {
                  setCleanType(false);
                  setIntervalValue(0);
                  updateScheduleValidation(selectedDate, selectedTime);
                }}
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
                    onClick={() => setIntervalValue(15)}
                  >
                    Week
                  </button>
                  <button
                    className={intervalValue === 10 ? "active" : ""}
                    onClick={() => setIntervalValue(10)}
                  >
                    Fortnight
                  </button>
                  <button
                    className={intervalValue === 5 ? "active" : ""}
                    onClick={() => setIntervalValue(5)}
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
                        onClick={() => {
                          toggleDay(index + 1);
                        }}
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
              <input
                type="text"
                className="form-input"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  updateSignupValidation();
                }}
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

            <div className="summary-total">
              <div className="total-line">
                <span>Total</span>
                <span>${Total.toFixed(2)}</span>
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
      title: "Receive A FREE Quote",
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
              onClick={() => handleQuoteSelection(1)}
            >
              <div className="quote-icon">
                <img
                  src={require("../views/img/house_60156731-200h.png")}
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
              onClick={() => handleQuoteSelection(2)}
            >
              <div className="quote-icon">
                <img
                  src={require("../views/img/building_60159951-200w.png")}
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
      id: "business-details",
      title: "Business Details",
      subtitle: "Tell us about your business and cleaning needs.",
      content: (
        <div className="step-content">
          <div className="form-group">
            <label className="required-field">Business Type</label>
            <select
              value={businessType}
              onChange={(e) => {
                setBusinessType(e.target.value);
                updateCommercialValidation();
              }}
              className="form-select"
            >
              <option value="">Select your business type</option>
              <option value="office">Office Building</option>
              <option value="retail">Retail Store</option>
              <option value="restaurant">Restaurant/Food Service</option>
              <option value="medical">Medical Facility</option>
              <option value="school">School/Educational</option>
              <option value="gym">Gym/Fitness Center</option>
              <option value="warehouse">Warehouse/Industrial</option>
              <option value="hotel">Hotel/Hospitality</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="required-field">Business Size</label>
            <select
              value={businessSize}
              onChange={(e) => {
                setBusinessSize(e.target.value);
                updateCommercialValidation();
              }}
              className="form-select"
            >
              <option value="">Select business size</option>
              <option value="small">Small (Under 2,000 sq ft)</option>
              <option value="medium">Medium (2,000 - 10,000 sq ft)</option>
              <option value="large">Large (10,000 - 50,000 sq ft)</option>
              <option value="enterprise">Enterprise (Over 50,000 sq ft)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="required-field">Cleaning Frequency</label>
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
                  onClick={() => {
                    setCleaningFrequency(freq);
                    updateCommercialValidation();
                  }}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Special Requirements</label>
            <div className="extras-grid">
              {[
                "Deep Sanitization",
                "Floor Waxing",
                "Carpet Cleaning",
                "Window Cleaning",
                "Restroom Supplies",
                "Trash Removal",
                "Kitchen Cleaning",
                "Medical Grade Cleaning",
                "Green Cleaning Products",
                "After Hours Service",
              ].map((requirement) => (
                <div
                  key={requirement}
                  className={`extra-item ${
                    specialRequirements.includes(requirement) ? "selected" : ""
                  }`}
                  onClick={() => {
                    if (specialRequirements.includes(requirement)) {
                      setSpecialRequirements(
                        specialRequirements.filter((r) => r !== requirement)
                      );
                    } else {
                      setSpecialRequirements([
                        ...specialRequirements,
                        requirement,
                      ]);
                    }
                  }}
                >
                  <p>{requirement}</p>
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
      id: "commercial-schedule",
      title: "Schedule & Access",
      subtitle: "When and how should we service your business?",
      content: (
        <div className="step-content">
          <div className="monthly-calendar-section">
            <div className="calendar-header">
              <button
                className="month-nav-btn"
                onClick={() =>
                  setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1))
                }
                disabled={currentMonthIndex === 0}
              >
                &#8249;
              </button>
              <h3>{monthlyCalendar[currentMonthIndex]?.name}</h3>
              <button
                className="month-nav-btn"
                onClick={() =>
                  setCurrentMonthIndex(
                    Math.min(monthlyCalendar.length - 1, currentMonthIndex + 1)
                  )
                }
                disabled={currentMonthIndex === monthlyCalendar.length - 1}
              >
                &#8250;
              </button>
            </div>

            <div className="calendar-weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="weekday-header">
                  {day}
                </div>
              ))}
            </div>

            <div className="monthly-calendar-grid2">
              {monthlyCalendar[currentMonthIndex]?.days.map(
                (dayData, index) => (
                  <div
                    key={index}
                    className={`calendar-day2 ${!dayData ? "empty" : ""} ${
                      dayData?.isPast ? "past" : ""
                    } ${dayData?.isToday ? "today" : ""} ${
                      selectedDate === dayData?.date ? "selected" : ""
                    } ${dayData?.isSelectable ? "selectable" : ""}`}
                    onClick={() => {
                      if (dayData?.isSelectable) {
                        handleDateSelect(dayData.date);
                        updateCommercialScheduleValidation();
                      }
                    }}
                  >
                    {dayData?.day}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="required-field">Business Hours</label>
            <select
              value={businessHours}
              onChange={(e) => {
                setBusinessHours(e.target.value);
                updateCommercialScheduleValidation();
              }}
              className="form-select"
            >
              <option value="">Select your business hours</option>
              <option value="24/7">24/7 Operations</option>
              <option value="early-morning">Early Morning (5 AM - 9 AM)</option>
              <option value="business-hours">
                Business Hours (9 AM - 5 PM)
              </option>
              <option value="evening">Evening (5 PM - 10 PM)</option>
              <option value="overnight">Overnight (10 PM - 5 AM)</option>
              <option value="weekends">Weekends Only</option>
              <option value="flexible">Flexible Schedule</option>
            </select>
          </div>

          <div className="form-group">
            <label>Access Instructions</label>
            <textarea
              value={accessInstructions}
              onChange={(e) => setAccessInstructions(e.target.value)}
              className="form-textarea"
              placeholder="How should our team access your facility? Include security codes, key locations, contact persons, etc."
            />
          </div>

          <div className="form-group">
            <label>Emergency Contact</label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="form-input"
              placeholder="Name and phone number for emergencies"
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
      id: "commercial-requirements",
      title: "Contract & Requirements",
      subtitle: "Let's discuss your budget and contract preferences.",
      content: (
        <div className="step-content">
          <div className="form-group">
            <label className="required-field">Monthly Budget Range</label>
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
                  onClick={() => {
                    setBudgetRange(budget);
                    updateCommercialRequirementsValidation();
                  }}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="required-field">Preferred Contract Length</label>
            <div className="frequency-options">
              {[
                "1 Month",
                "3 Months",
                "6 Months",
                "1 Year",
                "2+ Years",
                "Month-to-Month",
              ].map((contract) => (
                <button
                  key={contract}
                  className={contractLength === contract ? "active" : ""}
                  onClick={() => {
                    setContractLength(contract);
                    updateCommercialRequirementsValidation();
                  }}
                >
                  {contract}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={insuranceRequired}
                onChange={(e) => setInsuranceRequired(e.target.checked)}
              />
              Insurance and bonding documentation required
            </label>
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              value={spComments}
              onChange={(e) => setspComments(e.target.value)}
              className="form-textarea"
              placeholder="Any additional requirements, concerns, or special instructions..."
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
      title: "Business Contact Details",
      subtitle:
        "Provide your business contact information for the service agreement.",
      content: (
        <div className="step-content">
          <div className="signup-form">
            <div className="form-row">
              <div className="form-group">
                <label className="required-field">Business Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    updateSignupValidation();
                  }}
                  placeholder="Your business name"
                />
              </div>
              <div className="form-group">
                <label className="required-field">Contact Person</label>
                <input
                  type="text"
                  className="form-input"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    updateSignupValidation();
                  }}
                  placeholder="Primary contact name"
                />
              </div>
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
                />
              </div>
            </div>

            <div className="form-group">
              <label className="required-field">Business Address</label>
              <input
                type="text"
                className="form-input"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  updateSignupValidation();
                }}
                placeholder="Full business address"
              />
            </div>

            <div className="form-group">
              <label>Tax ID / Business License</label>
              <input
                type="text"
                className="form-input"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                placeholder="For invoicing purposes (optional)"
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
                <span>{firstName}</span>
              </div>
              <div className="summary-item">
                <span>Business Type</span>
                <span>{businessType}</span>
              </div>
              <div className="summary-item">
                <span>Business Size</span>
                <span>{businessSize}</span>
              </div>
            </div>

            <div className="summary-section">
              <h3>Service Details</h3>
              <div className="summary-item">
                <span>Cleaning Frequency</span>
                <span>{cleaningFrequency}</span>
              </div>
              <div className="summary-item">
                <span>Start Date</span>
                <span>{MyDate || "To be scheduled"}</span>
              </div>
              <div className="summary-item">
                <span>Service Hours</span>
                <span>{businessHours}</span>
              </div>
              {specialRequirements.length > 0 && (
                <div className="summary-item">
                  <span>Special Requirements</span>
                  <span>{specialRequirements.join(", ")}</span>
                </div>
              )}
            </div>

            <div className="summary-section">
              <h3>Contract Terms</h3>
              <div className="summary-item">
                <span>Budget Range</span>
                <span>{budgetRange}</span>
              </div>
              <div className="summary-item">
                <span>Contract Length</span>
                <span>{contractLength}</span>
              </div>
              <div className="summary-item">
                <span>Insurance Required</span>
                <span>{insuranceRequired ? "Yes" : "No"}</span>
              </div>
            </div>

            <div className="summary-section">
              <h3>Contact Information</h3>
              <div className="summary-item">
                <span>Contact Person</span>
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

  const navigateS = () => {
    window.location.href = "/dashboard";
  };

  return (
    <>
      {login && (
        <Login CloseLogin={() => setLogin(false)} navigateS={navigateS} />
      )}
      <div className="swiper-container">
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

                  <div className="slide-footer">
                    <Link to="/contact" target="_blank">
                      <div className="support-section">
                        <img
                          src={require("../views/img/support.png")}
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

                    <div className="navigation-buttons">
                      {currentStep > 0 && (
                        <button className="nav-btn prev-btn" onClick={prevStep}>
                          Go back
                        </button>
                      )}
                      {currentStep < totalSteps - 1 && (
                        <button
                          className={`nav-btn next-btn ${
                            !validations[steps[currentStep].id]
                              ? "disabled"
                              : ""
                          }`}
                          onClick={nextStep}
                          disabled={!validations[steps[currentStep].id]}
                        >
                          Proceed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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

        {/* Blur overlay for non-active slides */}
        <div
          className="blur-overlay blur-overlay-left"
          style={{ opacity: currentStep > 0 ? 1 : 0 }}
        ></div>
        <div
          className="blur-overlay blur-overlay-right"
          style={{ opacity: currentStep < totalSteps - 1 ? 1 : 0 }}
        ></div>
      </div>
    </>
  );
};

export default CleaningSwiper;
