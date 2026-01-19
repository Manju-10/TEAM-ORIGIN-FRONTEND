import { useState, useRef } from "react";
import "../styles/register.css";
import { Link } from "react-router-dom";

import logoWhite from "../assets/logo_white.svg";
import profileIcon from "../assets/profile_icon.svg";
import emailIcon from "../assets/email_icon.svg";
import phoneIcon from "../assets/phone_icon.svg";
import lockIcon from "../assets/lock_icon.svg";
import bgImage from "../assets/register_image.jpg";
import axios from "axios";

function Register() {
  const formContainerRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      password: e.target.password.value,
    };
    const response = await axios.post(
      "https://origin-backnd.onrender.com/auth/register",
      user,
    );
    console.log("Server Response:", response);
    if (response.status === 200) {
      alert("Registration Successfull");
    }

    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "*Full name is required";
    if (!form.email.trim()) newErrors.email = "*Email is required";
    if (!form.mobile.trim()) newErrors.mobile = "*Mobile number is required";
    if (!form.password.trim()) newErrors.password = "*Password is required";
    if (!form.confirmPassword.trim())
      newErrors.confirmPassword = "*Confirm your password";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "*Passwords do not match";
    if (!form.agree) newErrors.agree = "*You must agree to the terms";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        const firstError = document.querySelector(".input-wrapper.error");
        const container = formContainerRef.current;

        if (firstError && container) {
          const containerTop = container.getBoundingClientRect().top;
          const errorTop = firstError.getBoundingClientRect().top;

          container.scrollTo({
            top: container.scrollTop + (errorTop - containerTop) - 120,
            behavior: "smooth",
          });
        }
      }, 0);
      return;
    }

    alert("Account created successfully (Demo)");
  };

  return (
    <div className="auth-container">
      {/* LEFT IMAGE */}
      <div
        className="auth-left-reg image-side"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay"></div>

        <div className="brand">
          <img src={logoWhite} alt="ORIGIN logo" className="brand-logo" />
          <h4>Where Style Begins</h4>
          <p>
            Premium quality t-shirts crafted with care for the modern
            individual.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="auth-right-reg form-side" ref={formContainerRef}>
        <div className="auth-form">
          <h1 className="gloock">Welcome</h1>
          <p className="subtitle poppins">Create your account to get started</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* FULL NAME */}
            <div className="input-group">
              <label>Full Name</label>
              <div className={`input-wrapper ${errors.name ? "error" : ""}`}>
                <img src={profileIcon} className="icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <small className="error">{errors.name}</small>
            </div>

            {/* EMAIL */}
            <div className="input-group">
              <label>Email</label>
              <div className={`input-wrapper ${errors.email ? "error" : ""}`}>
                <img src={emailIcon} className="icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <small className="error">{errors.email}</small>
            </div>

            {/* MOBILE */}
            <div className="input-group">
              <label>Mobile Number</label>
              <div className={`input-wrapper ${errors.mobile ? "error" : ""}`}>
                <img src={phoneIcon} className="icon" />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  value={form.mobile}
                  onChange={handleChange}
                />
              </div>
              <small className="error">{errors.mobile}</small>
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label>Create Password</label>
              <div
                className={`input-wrapper ${errors.password ? "error" : ""}`}
              >
                <img src={lockIcon} className="icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <small className="error">{errors.password}</small>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-group">
              <label>Confirm Password</label>
              <div
                className={`input-wrapper ${
                  errors.confirmPassword ? "error" : ""
                }`}
              >
                <img src={lockIcon} className="icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <small className="error">{errors.confirmPassword}</small>
            </div>

            {/* TERMS */}
            <div className="terms inter">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>I agree to{" "}
                <span>Terms of service</span> and <span>Privacy Policy</span>
              </label>
            </div>
            <small className="error">{errors.agree}</small>

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <div className="divider inter">
              <span>or continue with</span>
            </div>

            <button type="button" className="btn-google poppins">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" />
              Sign in with Google
            </button>

            <p className="signup-text inter">
              Already have an account?{" "}
              <Link to="/sign_in" className="signup-link">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
