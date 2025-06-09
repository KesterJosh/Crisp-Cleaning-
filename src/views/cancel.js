import React from "react";
import { Link } from "react-router-dom";
import "./cancel.css";

const Cancel = () => {
  return (
    <div className="cancel-container">
      <h1 className="cancel-title">Payment Cancelled</h1>
      <p className="cancel-message">
        It looks like you cancelled your payment. You can try again anytime.
      </p>
      <Link to="/transaction" className="cancel-button">
        Return to Transactions
      </Link>
    </div>
  );
};

export default Cancel;
