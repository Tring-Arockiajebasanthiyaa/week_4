import React, { useState, useEffect } from "react";
import "./style.css";
import AddPersonaPage from "./AddPersonaPage";
import { PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addPersona, updatePersona, deletePersona } from "../redux/personaSlice";

const Home = () => {
  const [showAddPersona, setShowAddPersona] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const personas = useSelector((state) => Array.isArray(state.personas) ? state.personas : []);
  

  const dispatch = useDispatch();
  
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
  }, []);


  useEffect(() => {
    console.log("Personas:", personas); // Debugging
  }, [personas]);

  const handlePersonaClick = (index) => {
    setSelectedPersona(index);
    setShowAddPersona(true);
  };
  const handlePersonaAdded = (newPersona) => {
    if (newPersona.id && personas.find((p) => p.id === newPersona.id)) {
      dispatch(updatePersona(newPersona));
    } else {
      dispatch(addPersona(newPersona));
    }
    setShowAddPersona(false);
  };

  const handleDeletePersona = (personaId) => {
    dispatch(deletePersona(personaId));
    setShowAddPersona(false);
  };


  
  

  if (showAddPersona) {
    return (
      <AddPersonaPage
      onPersonaAdded={handlePersonaAdded}
      persona={personas[selectedPersona] || {}}
      onDeletePersona={handleDeletePersona}
    />
    
    );
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
            <button className="logout-button">Add Activity</button>
            <button className="logout-button">Logout</button>
          </div>
        </div>
        <hr className="hrbar" />
        <div className="navbar">
          <h5 className="personname-field">Persona</h5>
          <h5>Strategy Canvas</h5>
        </div>
      </div>
      <div className="persona-content align-items-center">
        {personas.map((persona, index) => (
          <div
            className="persona-card"
            key={persona.id}
            onClick={() => handlePersonaClick(index)}
          >
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
            <PlusCircle color="#C0C0C0" size={60} />
          </span>
          <span className="add-text">Add a Persona</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
