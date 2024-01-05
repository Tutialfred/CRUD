import React, { useState } from 'react';
import axios from 'axios';
import './createCharacter.css';

function CreateCharacter() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!['alive', 'dead', 'unknown'].includes(status.toLowerCase())) {
        throw new Error('El estado debe ser "alive", "dead" o "unknown"');
      }

      const response = await axios.post('http://localhost:3000/characters', {
        name,
        status,
        species,
      });

      console.log('Personaje creado:', response.data);
      window.location.href = '/'; // Redirige a la página de personajes después de eliminar

      // Puedes realizar alguna acción después de crear el personaje, como actualizar la interfaz o redirigir a otra página
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="create-character-container">
      <a href="/" className="back">
        🡰 Volver
      </a>
      <h2>Crear Personaje</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="form-container">
        <label className="form-label">
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Estado (alive, dead, unknown):
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Especie:
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="form-input"
          />
        </label>
        <button type="submit" className="submit-button">
          Crear Personaje
        </button>
      </form>
    </div>
  );
}

export default CreateCharacter;
