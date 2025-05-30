import React, { useEffect, useRef, useState } from "react";

import "./login.css";
import gsap from "gsap";
import axios from "axios";

const Login = ({ CloseLogin, navigateS }) => {
  useEffect(() => {
    gsap.fromTo(
      ".popschedule-container2Login",
      { y: 50, opacity: 0.7 },
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", { email, password })
      .then((result) => {
        console.log(result.data);
        if (result.data.status === "Success") {
          // Store the user ID in session storage
          sessionStorage.setItem("userId", result.data.userId);

          // Save the whole user object in local storage under a specific key
          localStorage.setItem("user", JSON.stringify(result.data));

          // Navigate to the desired page
          navigateS();
        } else {
          alert(result.data.message || "Login failed");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="popschedule-container1">
      <div className="popschedule-container2Login">
        <img
          onClick={CloseLogin}
          alt="image"
          src={require("./img/closer-800h.png")}
          onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          className="popreward-imageCorrect"
        />
        <span className="popschedule-text1">Login</span>
        <div className="popschedule-line"></div>
        <div className="popschedule-container3Login">
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <p className="home-text120">Email</p>
            <input
              type="email"
              className="home-textinput02Login input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="home-text122x">Password</p>
            <input
              type="password"
              className="home-textinput04x input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="popschedule-button2X button"
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <span className="popschedule-text5">Login</span>
            </button>
          </form>
        </div>
        <span className="popschedule-text3Login" onClick={CloseLogin}>
          Don't have an account? Register
        </span>
      </div>
    </div>
  );
};

export default Login;
