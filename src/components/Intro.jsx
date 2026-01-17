import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/intro.css";

import logoBlack from "../assets/logo_black.svg";

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      document.body.classList.add("fade-out");
    }, 5200);

    const redirectTimer = setTimeout(() => {
      navigate("/sign_in"); // SPA navigation
    }, 5800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
      document.body.classList.remove("fade-out");
    };
  }, [navigate]);

  return (
    <div className="intro-container">
      <img src={logoBlack} alt="ORIGIN Logo" className="logo" />
      <p className="tagline">WHERE STYLE BEGINS</p>
      <span className="line"></span>
    </div>
  );
}

export default Intro;
