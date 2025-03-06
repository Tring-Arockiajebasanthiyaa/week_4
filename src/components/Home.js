import React, { useState, useEffect } from "react";
import "./style.css";
import AddPersonaPage from "./AddPersonaPage";
import { PlusCircle } from "lucide-react";
const Home = () => {
  const [showAddPersona, setShowAddPersona] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [userInitial, setUserInitial] = useState("");
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const googleUser = JSON.parse(localStorage.getItem("googleUser"));
    const localUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (googleUser && googleUser.name) { 
      setUserName(googleUser.name);
      setUserInitial(googleUser.name.split(" ").map((word) => word.charAt(0)).join(""));
    } else if (localUser && localUser.name) { 
      setUserName(localUser.name);
      setUserInitial(localUser.name.split(" ").map((word) => word.charAt(0)).join(""));
    }
  },);

  
  const today = new Date();
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const time = today.getTime();
    return `${month}/${date}/${year}/${time}`;
  }
  const [currentDate, setCurrentDate] = useState(getDate());
  const handlePersonaAdded = (newPersona) => {
    if (selectedPersona !== null) {
      const updatedPersonas = [...personas];
      updatedPersonas[selectedPersona] = newPersona;
      setPersonas(updatedPersonas);
    } else {
      setPersonas([...personas, newPersona]);
    }
    setShowAddPersona(false);
    setSelectedPersona(null);
  };

  const handlePersonaClick = (index) => {
    setSelectedPersona(index);
    setShowAddPersona(true);
  };

  const handleLogout = () => {
    //localStorage.removeItem("googleUser");
    window.location.href = "/";
  };

  if (showAddPersona) {
    return <AddPersonaPage onPersonaAdded={handlePersonaAdded} persona={personas[selectedPersona]} />;
  }

  return (
    <div className="home-container">
      <div className="header-field">
      <div className="container">
        <div className="user-details">
        <h1 className="initial">{userInitial}</h1>
        <h2 className="name-field">{userName}</h2>
        </div>
        <div className="btn"> 
        <button className="logout-button" >
         Add Activity
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        </div>
      </div>
      <hr className="hrbar"/>
      <div className="navbar">
        <h5 className="personname-field">Persona</h5>
        <h5>Strategy Canvas</h5>
      </div>
      </div>
      <div className="persona-content align-items-center">
        {personas.map((persona, index) => (
          <div className="persona-card" key={index} onClick={() => handlePersonaClick(index)}>
            <div className="persona-avatar">
              {persona.avatarURL ? (
                <img src={persona.avatarURL} alt="Avatar" className="avatar-img" />
              ) : (
                <span className="avatar-placeholder">No Image</span>
              )}
            </div>
            <div className="persona-details">
              <span className="persona-name">{persona.name || "Unnamed"}</span>
              
            </div>
            <span className="current_date">{currentDate}</span>
          </div>
        ))}
        <div
          className="add-persona-empty bg-light"
          onClick={() => {
            setShowAddPersona(true);
            setSelectedPersona(null);
          }}
        >
            <span className="plus-icon">
            <PlusCircle color="#C0C0C0"  size={60} />
            </span>
          <span className="add-text">Add a Persona</span>
        </div>
      </div>
    </div>
  );
};

export default Home;