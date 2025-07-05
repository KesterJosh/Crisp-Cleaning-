import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./RouteGuard.css";

const allowedRoutesForOneTimeUsers = [
  "/",
  "/contact",
  "/about",
  "/review",
  "/faqs",
  "/ref",
  "/success",
  "/cancel",
  "/page",
  "/dashboard",
  "/profile",
  "/settings",
  "/settingsroom",
  "/transaction",
  "/referral",
  "/schedule",
  "/cleanerspass",
];

const RouteGuard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isRestrictedUser, setIsRestrictedUser] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const location = useLocation();

  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    const checkUserCleans = async () => {
      if (!userId || hasChecked) return;

      try {
        const res = await axios.get(
          `https://api-crisp-cleaning.onrender.com/user-clean/${userId}`
        );
        const cleans = res.data.cleanRecords || [];

        const hasRegularClean = cleans.some((c) => c.regularOronetime === true);
        setIsRestrictedUser(!hasRegularClean); // ❗️reverse logic
        setHasChecked(true);
      } catch (err) {
        console.error("Error fetching user cleans:", err);
      }
    };

    checkUserCleans();
  }, [userId, hasChecked]);

  useEffect(() => {
    if (!isRestrictedUser) return;

    const currentPath = location.pathname;
    const isAllowed = allowedRoutesForOneTimeUsers.includes(currentPath);

    if (!isAllowed) {
      setShowPopup(true);
      //   setTimeout(() => {
      //     window.location.href = "/dashboard";
      //   }, 500);
    }
  }, [location.pathname, isRestrictedUser]);

  if (!showPopup) return null;

  const redirect = () => {
    window.history.back();
    setShowPopup(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Access Restricted</h3>
        <p>
          This feature is only available for users on regular cleaning plans.
          Upgrade to unlock full access.
        </p>
        <button onClick={redirect}>Okay</button>
      </div>
    </div>
  );
};

export default RouteGuard;
