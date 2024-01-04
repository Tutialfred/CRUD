import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './updateCharacter.css';

function UpdateCharacter() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Lógica para obtener los datos del personaje a actualizar, por ejemplo, mediante un ID
    const fetchCharacter = async () => {
      
        const response = await axios.get(`http://localhost:3000/characterown/${id}`);
        const { name, status, species } = response.data;
        setName(name);
        setStatus(status);
        setSpecies(species);
      
    };

    // Llamar a la función para obtener los datos del personaje
    fetchCharacter();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/characters/${id}`, {
        name,
        status,
        species,
      });

      console.log('Personaje actualizado:', response.data);
      // Puedes realizar alguna acción después de actualizar el personaje
    } catch (error) {
      setErrorMessage('Error al actualizar el personaje');
    }
  };

  return (
    <div className="update-character-container">
  <a href="/" className="volver">
    {" "}
    🡰 Volver
  </a>   
      <h2>Actualizar Personaje</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          ID del Personaje:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Estado (alive, dead, unknown):
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </label>
        <br />
        <label>
          Especie:
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Actualizar Personaje</button>
      </form>
    </div>
  );
}

export default UpdateCharacter;
