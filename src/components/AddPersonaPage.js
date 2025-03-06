import React, { useState } from "react";
import "./AddPersonaPage.css";
import "./persona.css";
import ImageUpload from "./ImageUpload";
import "bootstrap/dist/css/bootstrap-grid.min.css";

const AddPersonaPage = ({ onPersonaAdded, persona }) => {
  const [name, setName] = useState(persona?.name || "");
  const [quote, setQuote] = useState(persona?.quote || "");
  const [description, setDescription] = useState(persona?.description || "");
  const [attitudes, setAttitudes] = useState(persona?.attitudes || "");
  const [painPoints, setPainPoints] = useState(persona?.painPoints || "");
  const [jobsNeeds, setJobsNeeds] = useState(persona?.jobsNeeds || "");
  const [activities, setActivities] = useState(persona?.activities || "");
  const [avatarURL, setAvatarURL] = useState(persona?.avatarURL || null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPersonaAdded({
      name,
      quote,
      description,
      attitudes,
      painPoints,
      jobsNeeds,
      activities,
      avatarURL,
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this persona?")) {
      setName("");
      setQuote("");
      setDescription("");
      setAttitudes("");
      setPainPoints("");
      setJobsNeeds("");
      setActivities("");
      setAvatarURL(null);
    }
  };

  const onClose = () => {
    window.location.href = "./";
  };

  const handleImageUploadSuccess = (url) => {
    setAvatarURL(url);
  };

  return (
    <div className="add-persona-page">
      <div className="header-section">
        <div className="persona-name-section">
          <div className="persona-name-label">Persona Name</div>
          <div className="persona-name-value">{name || "Sample"}</div>
        </div>
        <ImageUpload onUploadSuccess={handleImageUploadSuccess} initialImage={avatarURL} className="justify-content-end" />
  
        
      </div>

      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <div className="name_item">
            <label className="form-label" for="name">Persona Name</label>
            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} className="input_label"/>
          </div>
          <div className="form-grid">
            <div className="form-item">
              <label className="form-label">Notable Quote</label>
              <textarea placeholder="Enter a quote that identifies the persona" value={quote} onChange={(e) => setQuote(e.target.value)} />
            </div>
            <div className="form-item">
              <label className="form-label">Description</label>
              <textarea placeholder="Enter a general description/bio about the persona" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-item">
              <label className="form-label">Attitudes / Motivations</label>
              <textarea placeholder="What drives and incentives the persona to reach desired goals?What mindset does the person have?" value={attitudes} onChange={(e) => setAttitudes(e.target.value)} />
            </div>
            <div className="form-item">
              <label className="form-label">Pain Points</label>
              <textarea placeholder="What are the biggeset cahllenges that the persona focus in their job" value={painPoints} onChange={(e) => setPainPoints(e.target.value)} />
            </div>
            <div className="form-item">
              <label className="form-label">Jobs / Needs</label>
              <textarea placeholder="What are teh persona's functional , social and emotional needs to be successful at their jobs" value={jobsNeeds} onChange={(e) => setJobsNeeds(e.target.value)} />
            </div>
            <div className="form-item">
              <label className="form-label">Activities</label>
              <textarea placeholder="What does the person like to do in their free time" value={activities} onChange={(e) => setActivities(e.target.value)} />
            </div>
          </div>
          <div className="button-section">
            <button type="button" className="delete-button" onClick={handleDelete}>DELETE</button>
            <button type="button" className="close-button" onClick={onClose}>CLOSE</button>
            <button type="submit" className="update-button" >UPDATE PERSONA</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonaPage;