import React from "react";
import axios from "axios";
import "./cancelBooking.css";

const CancelBookingPopup = ({ cleanId, onClose, onCancelSuccess }) => {
  const handleCancelBooking = async () => {
    try {
      await axios.delete(`https://api-crisp-cleaning.onrender.com/clean/${cleanId}`);
      alert("Booking cancelled successfully.");
      onCancelSuccess(); // Trigger a refresh or state update in Dashboard
      onClose();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel the booking. Please try again.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Cancel Booking</h3>
        <p>Are you sure you want to cancel this booking?</p>
        <div className="popup-actions">
          <button onClick={handleCancelBooking}>Yes, Cancel</button>
          <button onClick={onClose}>No, Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingPopup;
