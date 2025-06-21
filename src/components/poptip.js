import React, { useState, useEffect } from "react";
import gsap from "gsap";
import "./poptip.css";

const Poptip = ({ CloseTip }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const getTipAmount = () => {
    const builtInAmounts = [500, 2000, 5000, 10000]; // in cents

    if (selectedOption === 4) {
      const custom = parseFloat(customAmount);
      return isNaN(custom) ? 0 : Math.round(custom * 100);
    }

    return builtInAmounts[selectedOption] || 0;
  };

  const handleTip = async () => {
    const amount = getTipAmount();
    const rawComment = document.querySelector(".poptip-textarea").value;
    const comment = rawComment?.trim() || "tip"; // 👈 fallback to "tip" if empty

    if (!amount || isNaN(amount) || amount < 100) {
      alert("Please enter a valid tip (minimum $1).");
      return;
    }

    const response = await fetch("https://api-crisp-cleaning.onrender.com/create-tip-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, comment }),
    });

    const session = await response.json();

    const stripe = await window.Stripe(
      "pk_test_51ROhYnH9E7pqq95xLp67muP87yzw3XmN9BdV5ZbF2ZoAQuFJPBDYN0HgbnPfaYiN0Z9scDimOVICuZ7iD5kvBaq900M6capXFd"
    );
    await stripe.redirectToCheckout({ sessionId: session.id });

    CloseTip(); // make sure it's a function call
  };

  // Handle click on an option
  const handleClick = (option) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    gsap.fromTo(
      ".poptip-container10",
      { y: 50, opacity: 1 },
      { y: 0, opacity: 1, duration: 1 }
    );
  }, []);

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

  return (
    <div className="poptip-container10">
      <div className="poptip-container11">
        <div className="poptip-container12">
          <img
            onClick={CloseTip}
            alt="image"
            src={require("./img/closer-800h.png")}
            className="popreward-imageCorrect"
          />
          <span className="poptip-text1">Leave a Tip For (Cleaners Name)</span>
          <div className="poptip-container13">
            <div className="poptip-container14">
              {["$5", "$20", "$50", "$100", "$--"].map((amount, index) => (
                <div
                  key={index}
                  className={`poptip-container1${index + 5} ${
                    selectedOption === index ? "selected" : ""
                  }`}
                  onClick={() => handleClick(index)}
                >
                  <span
                    className={`poptip-text${index + 2} ${
                      selectedOption === index ? "selectedText" : ""
                    }`}
                  >
                    {amount}
                  </span>
                </div>
              ))}
            </div>
            {/* Show input only when the last option (index 4) is selected */}
            {selectedOption === 4 && (
              <input
                type="number"
                placeholder="Enter custom amount"
                className="poptip-textinput input"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            )}
          </div>
          <textarea
            placeholder="Leave a comment"
            className="poptip-textarea textarea"
          ></textarea>
          <div className="poptip-container20">
            <button
              type="button"
              className="poptip-button button"
              onClick={handleTip}
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <span className="poptip-text7">Leave a Tip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poptip;
