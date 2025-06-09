import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./RegisterPopup.css";
import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
  address: Yup.string().required("Address is required"),
  referral: Yup.string().optional(),
  acceptedTerms: Yup.bool().oneOf([true], "You must accept the terms"),
});

const RegisterPopup = ({
  onClose,
  OpenLogin,
  handleSubmitCommercial,
  setSum,
  layer,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post("https://api-crisp-cleaning.onrender.com/register", {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        address: values.address,
        referral: values.referral,
      });

      if (res.status === 201 && res.data.message === "Successful") {
        alert("Registration successful! Please log in.");
        onClose();
      } else {
        alert(res.data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        alert("This email has been registered before. Kindly Login.");
      } else {
        alert(
          "Something went wrong! Check your internet connection or try again later."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>Register</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            address: "",
            referral: "",
            acceptedTerms: false,
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <Field name="first_name" className="form-input" />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <Field name="last_name" className="form-input" />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Email</label>
                  <Field name="email" type="email" className="form-input" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <Field name="phone" className="form-input" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>

                <span className="pass form-input">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="pass-field"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="pass-btn"
                    tabIndex={-1}
                  >
                    {showPassword ? <Eye /> : <EyeSlash size={18} />}
                  </button>
                </span>
              </div>

              <ErrorMessage name="password" component="div" className="error" />

              <div className="form-group">
                <label>Address</label>
                <Field name="address" className="form-input" />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label>Referral Code (Optional)</label>
                <Field name="referral" className="form-input" />
              </div>

              <div className="flex">
                <Field
                  type="checkbox"
                  name="acceptedTerms"
                  className="checkbox"
                />
                &nbsp;
                <label>
                  I accept the <a href="#">Terms & Conditions</a>
                </label>
              </div>
              <ErrorMessage
                name="acceptedTerms"
                component="div"
                className="error"
              />

              <div className="form-actions">
                <button type="button" className="btn cancel" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPopup;
