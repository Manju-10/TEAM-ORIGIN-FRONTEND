import { useState } from "react";
import "../styles/sign_in.css";
import { Link } from "react-router-dom";

import logoWhite from "../assets/logo_white.svg";
import emailIcon from "../assets/email_icon.svg";
import lockIcon from "../assets/lock_icon.svg";
import bgImage from "../assets/sign_in_image.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("*Email or mobile number is required");
      valid = false;
    }

    if (password.trim() === "") {
      setPasswordError("*Password is required");
      valid = false;
    }

    if (valid) {
      alert("Sign in successful (Demo)");
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT */}
      <div className="auth-left">
        <div className="auth-form">
          <h1 className="gloock">Welcome Back</h1>
          <p className="subtitle poppins">Sign in to continue shopping</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* EMAIL */}
            <div className="input-group">
              <label>Email / Mobile</label>

              <div className={`input-wrapper ${emailError ? "error" : ""}`}>
                <img src={emailIcon} alt="email icon" className="icon" />
                <input
                  type="text"
                  placeholder="Enter your email or mobile number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? "error-border" : ""}
                />
              </div>

              <small className="error">{emailError}</small>
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label>Password</label>

              <div className={`input-wrapper ${passwordError ? "error" : ""}`}>
                <img src={lockIcon} alt="lock icon" className="icon" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? "error-border" : ""}
                />
              </div>

              <small className="error">{passwordError}</small>
            </div>

            <div className="options inter">
              <span className="otp">Login with OTP</span>
              <a href="#" className="forgot">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn-primary">
              Sign in →
            </button>

            <div className="divider inter">
              <span>or continue with</span>
            </div>

            <button type="button" className="btn-google poppins">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" />
              Sign in with Google
            </button>

            <p className="signup-text inter">
              Don’t have an account?{" "}
              <Link to="/register" className="signup-link">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div
        className="auth-right"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay"></div>

        <div className="brand">
          <img src={logoWhite} alt="ORIGIN logo" className="brand-logo" />

          <h4>Where Style Begins</h4>
          <p>
            Premium quality t-shirts crafted with care for the modern individual.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
