"use client"

import { useEffect, useRef, useState } from "react"

export default function MelbourneAddressInput({
  value,
  onChange,
  onValidation,
  className = "form-input",
  placeholder = "Enter your Melbourne address",
}) {
  const inputRef = useRef(null)
  const autocompleteRef = useRef(null)
  const [isValidMelbourneAddress, setIsValidMelbourneAddress] = useState(true)

  // Melbourne metro area bounds
  const melbourneBounds = {
    north: -37.5,
    south: -38.2,
    east: 145.8,
    west: 144.5,
  }

  // Melbourne metro postcodes (major ones)
  const melbournePostcodes = [
    "3000",
    "3001",
    "3002",
    "3003",
    "3004",
    "3005",
    "3006",
    "3008",
    "3010",
    "3011",
    "3012",
    "3013",
    "3015",
    "3016",
    "3018",
    "3019",
    "3020",
    "3021",
    "3022",
    "3023",
    "3024",
    "3025",
    "3026",
    "3027",
    "3028",
    "3029",
    "3030",
    "3031",
    "3032",
    "3033",
    "3034",
    "3036",
    "3037",
    "3038",
    "3039",
    "3040",
    "3041",
    "3042",
    "3043",
    "3044",
    "3045",
    "3046",
    "3047",
    "3048",
    "3049",
    "3050",
    "3051",
    "3052",
    "3053",
    "3054",
    "3055",
    "3056",
    "3057",
    "3058",
    "3059",
    "3060",
    "3061",
    "3062",
    "3063",
    "3064",
    "3065",
    "3066",
    "3067",
    "3068",
    "3070",
    "3071",
    "3072",
    "3073",
    "3074",
    "3075",
    "3076",
    "3078",
    "3079",
    "3081",
    "3082",
    "3083",
    "3084",
    "3085",
    "3086",
    "3087",
    "3088",
    "3089",
    "3090",
    "3091",
    "3093",
    "3094",
    "3095",
    "3096",
    "3097",
    "3099",
    "3101",
    "3102",
    "3103",
    "3104",
    "3105",
    "3106",
    "3107",
    "3108",
    "3109",
    "3111",
    "3112",
    "3113",
    "3114",
    "3115",
    "3116",
    "3121",
    "3122",
    "3123",
    "3124",
    "3125",
    "3126",
    "3127",
    "3128",
    "3129",
    "3130",
    "3131",
    "3132",
    "3133",
    "3134",
    "3135",
    "3136",
    "3137",
    "3138",
    "3139",
    "3140",
    "3141",
    "3142",
    "3143",
    "3144",
    "3145",
    "3146",
    "3147",
    "3148",
    "3149",
    "3150",
    "3151",
    "3152",
    "3153",
    "3154",
    "3155",
    "3156",
    "3158",
    "3159",
    "3160",
    "3161",
    "3162",
    "3163",
    "3164",
    "3165",
    "3166",
    "3167",
    "3168",
    "3169",
    "3170",
    "3171",
    "3172",
    "3173",
    "3174",
    "3175",
    "3176",
    "3177",
    "3178",
    "3179",
    "3180",
    "3181",
    "3182",
    "3183",
    "3184",
    "3185",
    "3186",
    "3187",
    "3188",
    "3189",
    "3190",
    "3191",
    "3192",
    "3193",
    "3194",
    "3195",
    "3196",
    "3197",
    "3198",
    "3199",
    "3200",
    "3201",
    "3202",
    "3204",
    "3205",
    "3206",
    "3207",
  ]

  const validateMelbourneAddress = (address) => {
    if (!address) return true

    const melbourneKeywords = ["melbourne", "vic", "victoria", "australia"]
    const addressLower = address.toLowerCase()
    const hasKeywords = melbourneKeywords.some((keyword) => addressLower.includes(keyword))
    const hasValidPostcode = melbournePostcodes.some((postcode) => address.includes(postcode))

    return hasKeywords || hasValidPostcode
  }

  useEffect(() => {
    const initializeAutocomplete = () => {
      if (!inputRef.current || !window.google?.maps?.places) return

      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["address"],
        componentRestrictions: { country: "AU" },
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(melbourneBounds.south, melbourneBounds.west),
          new window.google.maps.LatLng(melbourneBounds.north, melbourneBounds.east),
        ),
        strictBounds: true,
        fields: ["formatted_address", "geometry", "address_components"],
      })

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace()

        if (place?.formatted_address) {
          const address = place.formatted_address
          const isValid = validateMelbourneAddress(address)
          setIsValidMelbourneAddress(isValid)

          if (isValid) {
            onChange(address)
            onValidation?.()
          }
        }
      })
    }

    if (window.google?.maps?.places) {
      initializeAutocomplete()
    } else {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCf0zZfuG640XXXEY8IVKjQs1GAikerl6M&libraries=places`
      script.async = true
      script.onload = initializeAutocomplete
      document.head.appendChild(script)
    }

    return () => {
      if (autocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [onChange, onValidation])

  const handleInputChange = (e) => {
    const newValue = e.target.value
    onChange(newValue)
    const isValid = validateMelbourneAddress(newValue)
    setIsValidMelbourneAddress(isValid)
  }

  return (
    <div className="address-input-container">
      <input
        ref={inputRef}
        type="text"
        className={`${className} ${!isValidMelbourneAddress ? "error" : ""}`}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {!isValidMelbourneAddress && (
        <div
          className="error-message"
          style={{
            color: "#e74c3c",
            fontSize: "12px",
            marginTop: "4px",
          }}
        >
          Please enter a valid Melbourne metro area address
        </div>
      )}
      <style jsx>{`
        .address-input-container .form-input.error {
          border-color: #e74c3c;
          box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
        }
      `}</style>
    </div>
  )
}
