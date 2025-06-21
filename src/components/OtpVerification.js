import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../views/login.css";

const OtpVerification = ({ email, onClose }) => {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d{6}$/, "OTP must be 6 digits")
        .required("OTP is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post(
          "https://api-crisp-cleaning.onrender.com/api/auth/verify-otp",
          { email, otp }
        );
        if (res.data.success) {
          alert("OTP verified! Proceed to reset password.");
          onClose();
        } else {
          alert(res.data.message || "OTP verification failed.");
        }
      } catch (err) {
        console.error(err);
        alert("Error verifying OTP.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login-overlay3">
      <div className="login-modal">
        <button className="login-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="login-heading">Verify OTP</h2>
        <p className="login-subheading">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              id="otp"
              type="text"
              maxLength="6"
              {...formik.getFieldProps("otp")}
              className={`form-input ${
                formik.touched.otp && formik.errors.otp ? "error" : ""
              }`}
            />
            {formik.touched.otp && formik.errors.otp && (
              <p className="form-error">{formik.errors.otp}</p>
            )}
          </div>

          <button
            type="submit"
            className="login-submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
