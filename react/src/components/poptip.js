import React,{useState, useEffect} from 'react'
import gsap from 'gsap';
import './poptip.css'

const Poptip = ({CloseTip}) => {

  const [selectedOption, setSelectedOption] = useState(null);

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

  return (
    <div className="poptip-container10">
      <div className="poptip-container11">
        <div className="poptip-container12">
        <img onClick={CloseTip}
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
              selectedOption === index ? 'selected' : ''
            }`}
            onClick={() => handleClick(index)}
          >
            <span className={`poptip-text${index + 2} ${
              selectedOption === index ? 'selectedText' : ''
            }`}>{amount}</span>
          </div>
        ))}
            </div>
            {/* Show input only when the last option (index 4) is selected */}
            {selectedOption === 4 && (
              <input
                type="text"
                placeholder="Custom Amount"
                className="poptip-textinput input"
              />
            )}
          </div>
          <textarea
            placeholder="Leave a comment"
            className="poptip-textarea textarea"
          ></textarea>
          <div className="poptip-container20">
            <button type="button" className="poptip-button button" onClick={CloseTip} onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}>
              <span className="poptip-text7">Leave a Tip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Poptip
