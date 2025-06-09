import React, { useEffect, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import { Eye, EyeSlashIcon } from "@phosphor-icons/react";

const Login = ({ CloseLogin, navigateS }) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".login-modal",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("https://api-crisp-cleaning.onrender.com/login", values)
        .then((res) => {
          if (res.data.status === "Success") {
            sessionStorage.setItem("userId", res.data.userId);
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("userEmail", JSON.stringify(values.email));
            navigateS();
          } else {
            alert(res.data.message || "Login failed");
          }
        })
        .catch((err) => console.error(err));
    },
  });

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <button className="login-close" onClick={CloseLogin}>
          &times;
        </button>
        <h2 className="login-heading">Welcome Back</h2>
        <p className="login-subheading">Please log in to your account</p>

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

          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
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
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <EyeSlashIcon size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="form-error">{formik.errors.password}</p>
            )}
          </div>

          <button type="submit" className="login-submit">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <span className="register-link" onClick={CloseLogin}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
