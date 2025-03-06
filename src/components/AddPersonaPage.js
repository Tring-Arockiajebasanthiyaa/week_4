import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddPersonaPage.css";
import "./persona.css";
import ImageUpload from "./ImageUpload";
import "bootstrap/dist/css/bootstrap-grid.min.css";

const AddPersonaPage = ({ onPersonaAdded, persona, onDeletePersona }) => {
  const [name, setName] = useState(persona?.name || "");
  const [quote, setQuote] = useState(persona?.quote || "");
  const [description, setDescription] = useState(persona?.description || "");
  const [attitudes, setAttitudes] = useState(persona?.attitudes || "");
  const [painPoints, setPainPoints] = useState(persona?.painPoints || "");
  const [jobsNeeds, setJobsNeeds] = useState(persona?.jobsNeeds || "");
  const [activities, setActivities] = useState(persona?.activities || "");
  const [avatarURL, setAvatarURL] = useState(persona?.avatarURL || null);
  const quillRef = useRef(null);
  const id = persona?.id || Date.now().toString();


  const handleSubmit = (e) => {
    e.preventDefault();
    onPersonaAdded({
      id,  // Use existing ID if available
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
    if (!persona.id) {
      console.error("Cannot delete: Persona is undefined.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this persona?")) {
      onDeletePersona(persona.id);
    }
  };
  

  const onClose = () => {
    window.location.href = "/"; // Redirect to home page when closing
  };

  const handleImageUploadSuccess = (url) => {
    setAvatarURL(url);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="add-persona-page">
      <div className="header-section">
        <div className="persona-name-section">
          <div className="persona-name-label">Persona Name</div>
          <div className="persona-name-value">{name || "Sample"}</div>
        </div>
        <ImageUpload
          onUploadSuccess={handleImageUploadSuccess}
          initialImage={avatarURL}
          className="justify-content-center"
        />
      </div>

      <div className="form-section">
        <form>
          <div className="name_item">
            <label className="form-label" htmlFor="name">
              Persona Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input_label"
            />
          </div>
          <div className="form-grid">
            <div className="form-item">
              <label className="form-label">Notable Quote</label>
              <ReactQuill value={quote} onChange={setQuote} modules={modules} formats={formats} className="react" theme="snow" />
            </div>
            <div className="form-item">
              <label className="form-label">Description</label>
              <ReactQuill value={description} onChange={setDescription} modules={modules} formats={formats} className="react" />
            </div>
            <div className="form-item">
              <label className="form-label">Attitudes / Motivations</label>
              <ReactQuill value={attitudes} onChange={setAttitudes} modules={modules} formats={formats} className="react" />
            </div>
            <div className="form-item">
              <label className="form-label">Pain Points</label>
              <ReactQuill value={painPoints} onChange={setPainPoints} modules={modules} formats={formats} className="react" />
            </div>
            <div className="form-item">
              <label className="form-label">Jobs / Needs</label>
              <ReactQuill value={jobsNeeds} onChange={setJobsNeeds} modules={modules} formats={formats} className="react" ref={quillRef} />
            </div>
            <div className="form-item">
              <label className="form-label">Activities</label>
              <ReactQuill value={activities} onChange={setActivities} modules={modules} formats={formats} className="react" style={{ cursor: "text" }} ref={quillRef} />
            </div>
          </div>
          <div className="button-section">
          {persona.id && <button type="button" onClick={handleDelete}>DELETE</button>}
          <button type="button" onClick={onClose}>CLOSE</button>
          <button type="submit" onClick={handleSubmit}>{persona.id ? "UPDATE PERSONA" : "ADD PERSONA"}</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonaPage;
