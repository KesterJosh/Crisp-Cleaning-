import React from "react";
import { Link } from "react-router-dom";
import "./success.css";

const Success = () => {
  return (
    <div className="success-container">
      <h1 className="success-title">Payment Successful!</h1>
      <p className="success-message">
        Thank you for your payment. A confirmation email has been sent to your
        inbox.
      </p>
      <Link to="/dashboard" className="success-button">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default Success;
