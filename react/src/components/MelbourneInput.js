import { useRef, useState, useEffect } from "react";

export default function MelbourneAddressInput({
  value,
  onChange,
  onValidation,
  className = "form-input",
  placeholder = "Enter your Melbourne address",
}) {
  const inputRef = useRef(null);
  const [isValidMelbourneAddress, setIsValidMelbourneAddress] = useState(true);
  // New state to track if the input field has been interacted with (touched)
  const [isTouched, setIsTouched] = useState(false); 

  const melbournePostcodes = [
    // ... your extensive list of Melbourne postcodes
    "3000", "3001", "3002", "3003", "3004", "3005", "3006", "3008", "3010", "3011", "3012", "3013", "3015", "3016", "3018", "3019", "3020", "3021", "3022", "3023", "3024", "3025", "3026", "3027", "3028", "3029", "3030", "3031", "3032", "3033", "3034", "3036", "3037", "3038", "3039", "3040", "3041", "3042", "3043", "3044", "3045", "3046", "3047", "3048", "3049", "3050", "3051", "3052", "3053", "3054", "3055", "3056", "3057", "3058", "3059", "3060", "3061", "3062", "3063", "3064", "3065", "3066", "3067", "3068", "3070", "3071", "3072", "3073", "3074", "3075", "3076", "3078", "3079", "3081", "3082", "3083", "3084", "3085", "3086", "3087", "3088", "3089", "3090", "3091", "3093", "3094", "3095", "3096", "3097", "3099", "3101", "3102", "3103", "3104", "3105", "3106", "3107", "3108", "3109", "3111", "3112", "3113", "3114", "3115", "3116", "3121", "3122", "3123", "3124", "3125", "3126", "3127", "3128", "3129", "3130", "3131", "3132", "3133", "3134", "3135", "3136", "3137", "3138", "3139", "3140", "3141", "3142", "3143", "3144", "3145", "3146", "3147", "3148", "3149", "3150", "3151", "3152", "3153", "3154", "3155", "3156", "3158", "3159", "3160", "3161", "3162", "3163", "3164", "3165", "3166", "3167", "3168", "3169", "3170", "3171", "3172", "3173", "3174", "3175", "3176", "3177", "3178", "3179", "3180", "3181", "3182", "3183", "3184", "3185", "3186", "3187", "3188", "3189", "3190", "3191", "3192", "3193", "3194", "3195", "3196", "3197", "3198", "3199", "3200", "3201", "3202", "3204", "3205", "3206", "3207",
  ];

  const validateMelbourneAddress = (addressToCheck) => {
    // An empty address is considered invalid for submission,
    // but we'll use `isTouched` to control when to show the error message.
    if (!addressToCheck) return false; 

    const addressLower = addressToCheck.toLowerCase();
    const hasKeyword =
      addressLower.includes("melbourne") || addressLower.includes("vic");
    const hasValidPostcode = melbournePostcodes.some((postcode) =>
      addressToCheck.includes(postcode)
    );

    return hasKeyword || hasValidPostcode;
  };

  // This useEffect primarily handles initial validation or when the 'value'
  // prop changes due to external forces (e.g., form reset from parent).
  useEffect(() => {
    const isValid = validateMelbourneAddress(value);
    setIsValidMelbourneAddress(isValid);
    onValidation?.(isValid);

    // If the value is reset to empty externally, reset touched state too
    if (value === "") {
        setIsTouched(false);
    }
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue); // Notify parent component of the change

    // Mark as touched immediately when user starts typing
    if (!isTouched) {
      setIsTouched(true);
    }

    // Validate immediately on input change for responsive feedback
    const isValid = validateMelbourneAddress(newValue);
    setIsValidMelbourneAddress(isValid);
    onValidation?.(isValid);
  };

  const handleBlur = () => {
    // When the user leaves the field, mark it as touched
    // This is important for showing errors on empty, unfocused fields
    if (!isTouched) {
      setIsTouched(true);
    }
    // Also re-validate on blur, especially if the user entered something
    // and then removed it, or simply blurred an empty field.
    const isValid = validateMelbourneAddress(value);
    setIsValidMelbourneAddress(isValid);
    onValidation?.(isValid);
  };

  // Determine if error feedback (red border and message) should be shown
  // It's true if the address is invalid AND the field has been touched by the user
  const showErrorFeedback = !isValidMelbourneAddress && isTouched;

  return (
    <div className="address-input-container">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur} // Add onBlur event handler
        placeholder={placeholder}
        // Apply 'error' class based on the new showErrorFeedback variable
        className={`${className} ${showErrorFeedback ? "error" : ""}`}
      />
      {/* Display error message only if showErrorFeedback is true */}
      {showErrorFeedback && (
        <div
          className=""
          style={{
            color: "red",
            fontSize: "12px",
            marginTop: "4px",
          }}
        >
          Please enter a valid Melbourne metro area address
        </div>
      )}

      <style jsx>{`
        .address-input-container :global(.form-input.error) {
          border-color: #e74c3c;
          box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
        }
      `}</style>
    </div>
  );
}