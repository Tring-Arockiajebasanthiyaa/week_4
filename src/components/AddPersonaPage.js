import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import "./AddPersonaPage.css";
import { useDispatch } from "react-redux";
import { addPersona, updatePersona } from "../redux/personaSlice";

const AddPersonaPage = ({ personas, persona, onDeletePersona }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [personaData, setPersonaData] = useState({
    id: persona?.id || "",
    name: persona?.name || "",
    quote: persona?.quote || "",
    description: persona?.description || "",
    attitudes: persona?.attitudes || "",
    painPoints: persona?.painPoints || "",
    jobsNeeds: persona?.jobsNeeds || "",
    activities: persona?.activities || "",
    avatarURL: persona?.avatarURL || null,
  });

  useEffect(() => {
    if (persona) {
      setPersonaData(persona);
    }
  }, [persona]);

  const handleChange = (field, value) => {
    setPersonaData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const timestamp = new Date().toISOString(); // Current time
  
    if (personaData.id && personas.some(p => p.id === personaData.id)) {
      dispatch(updatePersona({ ...personaData, lastUpdated: timestamp }));
    } else {
      const newPersona = { 
        ...personaData, 
        id: Date.now().toString(), 
        createdAt: timestamp, 
        lastUpdated: timestamp 
      };
      dispatch(addPersona(newPersona));
    }
    
    console.log("Navigating to home...");
    window.history.back();
  };
  
  
  

  const handleClose = () => {
    console.log("Navigating to home...");
    window.history.back();
    // setTimeout(() => navigate("/home", { replace: true }), 100); // Delay added for smoother navigation
  };
  

  const handleDelete = () => {
    onDeletePersona(personaData.id);
      navigate("/home", { replace: true });
    
  };

  const handleImageUploadSuccess = (url) => {
    setPersonaData((prev) => ({ ...prev, avatarURL: url }));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  
  const formats = [
    "header", "bold", "italic", "underline", "strike",
    "list", "bullet", "blockquote", "code-block",
    "script", "sub", "super",
    "indent", "align",
    "color", "background",
    "link", "image", "video"
  ];
  

  

  return (
    <div className="add-persona-page">
      <ImageUpload onUploadSuccess={handleImageUploadSuccess} initialImage={personaData.avatarURL} className="image" />
      <div className="header-section">
      {/* <ImageUpload onUploadSuccess={handleImageUploadSuccess} initialImage={personaData.avatarURL} className="image" /> */}
        <div className="persona-name-section">
          <span className="persona-name-label">Persona Name</span>
          <span className="persona-name-value">{personaData.name || "Sample"}</span>
        </div>
      </div>
      
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <div className="name_item">
            <label className="form-label">Persona Name</label>
            <input
              type="text"
              value={personaData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="input_label"
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-item">
              <label className="form-label">Notable Quote</label>
              <ReactQuill value={personaData.quote} onChange={(value) => handleChange("quote", value)} modules={modules}  formats={formats} />
            </div>
            <div className="form-item">
              <label className="form-label">Description</label>
              <ReactQuill value={personaData.description} onChange={(value) => handleChange("description", value)} modules={modules}  formats={formats}  />
            </div>
            <div className="form-item">
              <label className="form-label">Attitudes/Motivations</label>
              <ReactQuill value={personaData.attitudes} onChange={(value) => handleChange("attitudes", value)} modules={modules}  formats={formats}  />
            </div>
            <div className="form-item">
              <label className="form-label">Pain Points</label>
              <ReactQuill value={personaData.painPoints} onChange={(value) => handleChange("painPoints", value)} modules={modules}  formats={formats} />
            </div>
            <div className="form-item">
              <label className="form-label">Jobs/Needs</label>
              <ReactQuill value={personaData.jobsNeeds} onChange={(value) => handleChange("jobsNeeds", value)} modules={modules} formats={formats}  />
            </div>
            <div className="form-item">
              <label className="form-label">Activities</label>
              <ReactQuill value={personaData.activities} onChange={(value) => handleChange("activities", value)} modules={modules} formats={formats}  />
            </div>
          </div>

          <div className="button-section">
            {persona && (
              <button type="button" className="delete-button" onClick={handleDelete}>
                DELETE
              </button>
            )}

            <button type="button" className="close-button" onClick={handleClose}>
              CLOSE
            </button>
            <button type="submit" className="update-button">
              {persona?.id ? "UPDATE PERSONA" : "CREATE PERSONA"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonaPage;
