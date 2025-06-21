import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../views/login.css";
import OtpVerification from "./OtpVerification";

const ResetPassword = ({ onClose }) => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post(
          "https://api-crisp-cleaning.onrender.com/api/auth/request-otp",
          {
            email: values.email,
          }
        );

        if (res.data.success) {
          alert("OTP sent to your email!");
          setSubmittedEmail(values.email); // Save email
          setShowOtpForm(true); // Show OTP form
        } else {
          alert(res.data.message || "Failed to send OTP");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while sending OTP.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {showOtpForm ? (
        <OtpVerification email={submittedEmail} onClose={onClose} />
      ) : (
        <div className="login-overlay2">
          <div className="login-modal">
            <button className="login-close" onClick={onClose}>
              &times;
            </button>
            <h2 className="login-heading">Reset your password</h2>
            <p className="login-subheading">Please input your email address</p>

            <form onSubmit={formik.handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className={`form-input ${
                    formik.touched.email && formik.errors.email ? "error" : ""
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="form-error">{formik.errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                className="login-submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Sending..." : "Request OTP"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
