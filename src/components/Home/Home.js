import { useState, useEffect } from "react";
import "../ImageUpload/ImageUpload.css";
import AddPersonaPage from "../AddPersonaPage/AddPersonaPage";
import "./Home.css";
import { PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addPersona, updatePersona, deletePersona ,clearPersonas} from "../../redux/personaSlice";
import defaultimage from "../../images/dream.jpg";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [showAddPersona, setShowAddPersona] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personas = useSelector((state) => Array.isArray(state.personas) ? state.personas : []);
  const [userInitial, setUserInitial] = useState("");
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const getUserData = () => {
      const googleUser = JSON.parse(localStorage.getItem("googleUser"));
    const localUser = JSON.parse(localStorage.getItem("loggedInUser"));

    let currentUser = googleUser || localUser;
    let userInitial = "G"; // Default to 'G'

    if (currentUser?.name) {
      setUserName(currentUser.name);
      userInitial = currentUser.name.charAt(0).toUpperCase();
    } else if (currentUser?.email) {
      setUserName(currentUser.email);
      const usernamePart = currentUser.email.split('@')[0];
      userInitial = usernamePart.charAt(0).toUpperCase();
    } else {
      setUserName("Guest"); // Default name if no user data
    }

    setUserInitial(userInitial); // Set the userInitial state
  };

    getUserData();

    const handleStorageChange = () => {
      getUserData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "Not available";
  
    const now = new Date();
    const updatedTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - updatedTime) / 1000);
  
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
   
  
    return updatedTime.toLocaleDateString(); // Default date format
  };
  
  const handlePersonaClick = (index) => {
    setSelectedPersona(personas[index]);
    setShowAddPersona(true);
  };

  const handlePersonaAdded = (newPersona) => {
    
    if (!newPersona.id) {
      newPersona.id = Date.now().toString();
      
    }
     
   
    const updatedPersona = { ...newPersona,};
  
    if (personas.some((p) => p.id === updatedPersona.id)) {
      dispatch(updatePersona(updatedPersona));
    } else {
      dispatch(addPersona(updatedPersona));
    }
    
    setShowAddPersona(false);
    setSelectedPersona(null);
    navigate("/home");
  };
  const handleDeletePersona = (personaId) => {
    if (window.confirm("Are you sure you want to delete this persona?")) {
      dispatch(deletePersona(personaId));
      setShowAddPersona(false);
      setSelectedPersona(null);
      setTimeout(() => navigate("/home"), 100);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("googleUser");
    navigate("/", { replace: true });
  };
  
 const handledescript = (res) =>{
  return <span>{res}</span>;
 }
  if (showAddPersona) {
    return (
      <AddPersonaPage
        personas={personas}
        persona={selectedPersona || {}}
        onDeletePersona={handleDeletePersona}
        onClose={() => {
          setShowAddPersona(false);
          setSelectedPersona(null);
          navigate("/");
        }}
        onSubmit={handlePersonaAdded}
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
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <hr className="hrbar" />
        <div className="navbar">
          <h5 className="personname-field">Persona</h5>
          <h5>Strategy Canvas</h5>
          <button className="delbtn" onClick={() => dispatch(clearPersonas())}>Delete All Personas</button>
        </div>
      </div>
      <div className="persona-content align-items-center">
        {personas.map((persona, index) => (
          <div className="persona-card" key={persona.id} onClick={() => handlePersonaClick(index)}>
            <div className="persona-avatar">
              <img src={persona.avatarURL || defaultimage} alt="Avatar" className="avatar-img" />
            </div>
            <div className="persona-details">
              <span className="persona-name">{persona.name || "Persona-Name"}</span>
              <span className="persona-quote">{handledescript(persona.quote)}</span>
              <span className="persona-last-updated">Last Updated: {getTimeAgo(persona.lastUpdated)}</span>
              {console.log("createdAt:", persona.createdAt, "lastUpdated:", persona.lastUpdated)}
            </div>
          </div>
        ))}
        <div className="add-persona-empty bg-light" onClick={() => setShowAddPersona(true)}>
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
