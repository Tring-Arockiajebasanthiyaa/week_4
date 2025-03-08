import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import Tringapps from "./images/tringapps-copy-2 (1).png"

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="navbar-container">
        <div className="logo-container">
          <img src={Tringapps} alt="Logo" className="logo-image" />
      
        </div>
        <div className="button-group">
        <button onClick={() => navigate("/auth?type=login")} className="auth-button">
            Login
          </button>
          <button onClick={() => navigate("/auth?type=signup")} className="auth-button">
            Signup
          </button>
        </div>
      </nav>

      <div className="content-container">
        <h1 className="main-heading">Welcome to Our Platform</h1>
        <p className="text-paragraph">
          Some introductory text about your platform. Explain what it does and why users should sign up.
        </p>
        <p className="text-paragraph">
          You can add more paragraphs or sections here to provide more information about your platform.
        </p>
      </div>
    </div>
  );
};

export default Landing;
