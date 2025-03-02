import React, { useState } from 'react';
import './style.css';
import AddPersonaPage from './AddPersonaPage';

const Home = () => {
  const [showAddPersona, setShowAddPersona] = useState(false);
  const [personas, setPersonas] = useState([]); // State to store personas

  const handleAddPersonaClick = () => {
    setShowAddPersona(true);
  };

  const handlePersonaAdded = (newPersona) => {
    setPersonas([...personas, newPersona]);
    setShowAddPersona(false);
  };

  if (showAddPersona) {
    return <AddPersonaPage onPersonaAdded={handlePersonaAdded} />;
  }

  return (
    <div className="home-container">
      {/* ... (Header and Tabs from previous code) ... */}

      <div className="persona-content">
        {personas.map((persona, index) => (
          <div className="persona-card" key={index}>
            <div className="persona-image">
              <img src={persona.image} alt={persona.name} />
            </div>
            <div className="persona-details">
              <span className="persona-name">{persona.name}</span>
            </div>
          </div>
        ))}

        <div className="add-persona-empty" onClick={handleAddPersonaClick}>
          <span className="plus-icon">+</span>
          <span className="add-text">Add a Persona</span>
        </div>
      </div>
    </div>
  );
};

export default Home;