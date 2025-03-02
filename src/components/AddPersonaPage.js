import React, { useState } from "react";

import "./AddPersonaPage.css";
import ImageUpload from "./ImageUpload";
import "bootstrap/dist/css/bootstrap-grid.min.css";
const AddPersonaPage = ({ onPersonaAdded }) => {
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [description, setDescription] = useState("");
  const [attitudes, setAttitudes] = useState("");
  const [painPoints, setPainPoints] = useState("");
  const [jobsNeeds, setJobsNeeds] = useState("");
  const [activities, setActivities] = useState("");

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
    });
  };



  

  return (
   <div className="container-fluid bg-light"> 
      <div className="position-relative w-100" style={{ height: "240px" }}> 
        <ImageUpload className="position-fixed w-100 h-100 object-cover" /> 
      </div>

      <div className="d-flex align-items-center p-4">
        <label className="font-weight-bold mr-2 mb-0">Persona Name:</label> 
        <input
          type="text"
          className="form-control flex-grow-1 rounded" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="container bg-light">
        <div className="row">
          <div className="col-md-8 mb-3"> 
            <label className="font-weight-semibold">Notable Quote</label>
            <textarea
              className="form-control w-100 rounded" 
              rows="1" 
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>

          <div className="col-md-4 mb-3"> 
            <label className="font-weight-semibold">Description</label>
            <textarea
              className="form-control w-100 rounded"
              rows="6" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="font-weight-semibold">Attitudes / Motivations</label>
            <textarea
              className="form-control w-100 rounded"
              rows="6"
              value={attitudes}
              onChange={(e) => setAttitudes(e.target.value)}
            />
          </div>

          <div className="w-100 d-none d-md-block"></div> 

          <div className="col-md-4 mb-3">
            <label className="font-weight-semibold">Pain Points</label>
            <textarea
              className="form-control w-100 rounded"
              rows="6"
              value={painPoints}
              onChange={(e) => setPainPoints(e.target.value)}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="font-weight-semibold">Jobs / Needs</label>
            <textarea
              className="form-control w-100 rounded"
              rows="6"
              value={jobsNeeds}
              onChange={(e) => setJobsNeeds(e.target.value)}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="font-weight-semibold">Activities</label>
            <textarea
              className="form-control w-100 rounded"
              rows="6"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end p-4">
        <button className="btn btn-danger mr-2">DELETE</button> 
        <button className="btn btn-secondary mr-2">CLOSE</button> 
        <button className="btn btn-primary" onClick={handleSubmit}>UPDATE PERSONA</button> 
      </div>
    </div>
  );
};

export default AddPersonaPage;
