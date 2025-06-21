import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../views/login.css";
import { Eye, EyeSlash } from "phosphor-react";

const OtpVerification = ({ email, onClose }) => {
  const [step, setStep] = useState("otp"); // 'otp' or 'reset'
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      otp:
        step === "otp"
          ? Yup.string()
              .matches(/^\d{6}$/, "OTP must be 6 digits")
              .required("OTP is required")
          : Yup.string(),
      password:
        step === "reset"
          ? Yup.string()
              .min(6, "Minimum 6 characters")
              .required("Password is required")
          : Yup.string(),
      confirmPassword:
        step === "reset"
          ? Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Confirm password")
          : Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (step === "otp") {
          const res = await axios.post(
            "https://api-crisp-cleaning.onrender.com/api/auth/verify-otp",
            {
              email,
              otp: values.otp,
            }
          );

          if (res.data.success) {
            setOtpVerified(true);
            setStep("reset");
          } else {
            alert(res.data.message || "OTP verification failed.");
          }
        } else {
          const res = await axios.post(
            "https://api-crisp-cleaning.onrender.com/api/auth/reset-password",
            {
              email,
              password: values.password,
            }
          );

          if (res.data.success) {
            alert("Password updated! You can now log in.");
            onClose();
          } else {
            alert(res.data.message || "Password reset failed.");
          }
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred. Please try again.");
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
        <h2 className="login-heading">
          {step === "otp" ? "Verify OTP" : "Reset Password"}
        </h2>
        <p className="login-subheading">
          {step === "otp"
            ? `Enter the 6-digit code sent to ${email}`
            : "Enter your new password"}
        </p>

        <form onSubmit={formik.handleSubmit} className="login-form">
          {step === "otp" && (
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
          )}

          {step === "reset" && (
            <>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...formik.getFieldProps("password")}
                    className={`form-input ${
                      formik.touched.password && formik.errors.password
                        ? "error"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="form-error">{formik.errors.password}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    {...formik.getFieldProps("confirmPassword")}
                    className={`form-input ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "error"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="form-error">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting
              ? step === "otp"
                ? "Verifying..."
                : "Resetting..."
              : step === "otp"
              ? "Verify OTP"
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
