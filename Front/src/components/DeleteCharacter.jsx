import React, { useState } from 'react';
import axios from 'axios';
import './deleteCharacter.css';

function DeleteCharacter() {
  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:3000/characters/${id}`);

      console.log('Personaje eliminado:', response.status);
      // Puedes realizar alguna acción después de eliminar el personaje, como actualizar la interfaz
    } catch (error) {
      setErrorMessage('Error al eliminar el personaje');
    }
  };

  return (
    <div className="update-character-container">
      <a href="/" className="back">
        {" "}
        🡰 Volver
      </a>
      <h2>Eliminar Personaje</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="form-container">
        <label className="form-label">
          ID del Personaje a Eliminar:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="form-input"
          />
        </label>
        <br />
        <button type="submit" className="submit-button">
          Eliminar Personaje
        </button>
      </form>
    </div>
  );
}

export default DeleteCharacter;
