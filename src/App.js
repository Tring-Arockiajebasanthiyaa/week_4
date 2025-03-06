import React, { useState } from "react";
import "./styles.css";
import Home from "./components/Home";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


const AuthForm = ({ type, onAuth, setView, setIsLoggedIn }) => {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
const [name, setName] = useState("");
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!email.includes("@")) {

      alert("Invalid email format");

      return;

    }

    if (password.length < 8) {

      alert("Password must be at least 8 characters long");

      return;

    }
    if (type === "signup" && name.trim() === "") {
        alert("Please enter your name");
        return;
    }
    setError("");

    onAuth(email, password,name);

  };
  const handleGoogleSuccess = (credentialResponse) => {

        console.log("Google Sign-In Response:", credentialResponse);

    
    console.log("Login successfully!");
    try {

      const decoded = jwtDecode(credentialResponse.credential);

      console.log("Decoded JWT:", decoded);
    const user = {
    name: decoded.name,  
    email: decoded.email 
    };
    localStorage.setItem('googleUser', JSON.stringify(user));
    console.log("User saved to local storage:", user);
      setIsLoggedIn(true);

    } catch (error) {

      alert("Error decoding JWT:", error);

    }

  };
const handleAuth = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    if (setView === "signup") {
      if (users.some((user) => user.email === email)) {
        alert("User already exists");
        return;
      }
  
      
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
  
      alert("Signup successful! Please login.");
      setView("login");
    } else {
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials");
      }
    }
  };
  



  const handleGoogleError = () => {

    alert("Google Login Failed");

  };



  return (

    <div className="auth-container">

      <h2>{type === "signup" ? "Sign Up" : "Login"}</h2>

      {error && <p className="error">{error}</p>}

      <button className="social-button google-button">

      <GoogleLogin onSuccess={handleGoogleSuccess} buttonText="Sign in with Google" onError={handleGoogleError} theme="filled_black" />

      </button>



      <div className="or-divider">or</div>



      <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Enter your name" name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <input

          type="email"

          placeholder="E-mail"

          name="email"

          value={email}

          onChange={(e) => setEmail(e.target.value)}

        />
        
        <input

          type="password"

          placeholder="Password"

          name="password"

          value={password}

          onChange={(e) => setPassword(e.target.value)}

        />

        <button type="submit">{type === "signup" ? "Sign Up" : "Login"}</button>

      </form>



      <div className="toggle-container">

        <button

          className="toggle-button"

          onClick={() => setView(type === "login" ? "signup" : "login")}>
           {type === "login"

            ? "Don't have an account? Create a account"

            : "Already have an account? Login"}

        </button>

      </div>

    </div>

  );

};



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [view, setView] = useState("login");



  const handleAuth = (email, password, name) => {
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
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
  
      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // ✅ Store logged-in user
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials");
      }
    }
  };
  
  return isLoggedIn ? (

    <Home />

  ) : (

    <GoogleOAuthProvider clientId="895663561328-9k197o854e0fg6d36svrfei7fjb1l859.apps.googleusercontent.com">

      <div className="main-container">

        <AuthForm

          type={view}

          onAuth={handleAuth}

          setView={setView}

          setIsLoggedIn={setIsLoggedIn}

        />

      </div>

    </GoogleOAuthProvider>

  );

};



export default App;