import { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import "./swiper-styles.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../views/login";
import { Eye, EyeSlashIcon } from "@phosphor-icons/react";
import GoogleAuth from "./GoogleAuth";

const HouseAnimation = ({ cleans }) => {
  const [login, setLogin] = useState(false);
  const [activeStepSet, setActiveStepSet] = useState("residential"); // or "commercial"
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

  // Calendar and scheduling states
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimeLabel, setSelectedTimeLabel] = useState("");
  const [MyDate, setMyDate] = useState("");
  const [timeFrame, setTimeFrame] = useState(8);

  useEffect(() => {
    if (cleans) {
      if (cleans.rooms !== undefined) setSliderValueO(cleans.rooms);
      if (cleans.bathroom !== undefined) setSliderValue(cleans.bathroom);
      if (cleans.kitchen !== undefined) setSliderValueK(cleans.kitchen);
      if (cleans.others !== undefined) setSliderValueOX(cleans.others);
      // Add more fields here as needed
    }
  }, [cleans]);

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

  const calculateEstimatedTime = () => {
    let totalMinutes = 0;

    totalMinutes += sliderValueO * 20; // 20 mins per bedroom
    totalMinutes += sliderValue * 30; // 30 mins per bathroom
    totalMinutes += sliderValueK * 25; // 25 mins per kitchen
    totalMinutes += sliderValueOX * 15; // 15 mins per 'other' room

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

    // Add 10 minutes for each extra selected
    extras.forEach((extra) => {
      if (extra > 0) totalMinutes += 10;
    });

    return totalMinutes;
  };

  const estimatedTime = calculateEstimatedTime();

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
    setSliderValueO(cleans.rooms || value);
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
      id: "",
      title: "",
      subtitle: "",
      content: (
        <div className="step-content">
          <div
            className={`cleaning-types ${
              showValidationMessage ? "validation-active" : ""
            }`}
          ></div>

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
        </div>
      ),
    },
  ];

  // Define commercial steps

  // Use conditional steps based on cleaning type
  const steps = isCommercial ? commercialSteps : residentialSteps;

  const navigateS = () => {
    window.location.href = "/dashboard";
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
