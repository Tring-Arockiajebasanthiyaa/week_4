import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./LoginUp.css";

const Auth = ({ setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [view, setView] = useState(queryParams.get("type") || "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Check login state on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setIsLoggedIn(true);
      navigate("/home");
    }
  }, [setIsLoggedIn, navigate]);

  const handleAuth = (e) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 8 || (view === "signup" && !name)) {
      alert("Invalid input");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (view === "signup") {
      if (users.some((user) => user.email === email)) {
        alert("User already exists");
        return;
      }
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! Please login.");
      setView("login");
    } else {
      const user = users.find((user) => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        setIsLoggedIn(true);
        setTimeout(() => navigate("/home"), 100); // Ensure navigation after state update
      } else {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{view === "signup" ? "Sign Up" : "Login"}</h2>
      <div className="login">
        <GoogleLogin
          onSuccess={(response) => {
            console.log("Google Login Success", response);
            localStorage.setItem("loggedInUser", JSON.stringify(response));
            setIsLoggedIn(true);
            navigate("/home");
          }}
          onError={() => alert("Google Login Failed")}
        />
      </div>
      <div className="or-divider">or</div>
      <form onSubmit={handleAuth}>
        {view === "signup" && (
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input"/>
        <button type="submit" className="submit">{view === "signup" ? "Sign Up" : "Login"}</button>
      </form>
      <div className="toggle-container">
        <button
          className="toggle-button"
          onClick={() => {
            const newView = view === "login" ? "signup" : "login";
            setView(newView);
            navigate(`/auth?type=${newView}`);
          }}
        >
          {view === "login" ? "Don't have an account? Sign Up First" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
