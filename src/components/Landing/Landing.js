import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import Tringapps from "../../images/tringapps-copy-2 (1).png"

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
  Tringapps is a cutting-edge digital transformation company that specializes in delivering world-class software solutions. 
  With expertise in AI, cloud computing, mobile and web applications, and enterprise solutions, we help businesses achieve 
  their digital goals efficiently.
        </p>
        <p className="text-paragraph">
  At Tringapps, we combine innovation with technology to build high-performance applications for Fortune 500 companies and 
  emerging startups. Our team of experts excels in designing and developing scalable solutions that enhance user experience 
  and business growth.
        </p>
      </div>
    </div>
  );
};

export default Landing;
