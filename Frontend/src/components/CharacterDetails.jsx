import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const response = await axios.get(`http://localhost:3000/characters/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    }

    fetchCharacter();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/characters/${id}`);
      // Redirige a la página de personajes después de eliminar
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  const handleFieldUpdate = async (field, value) => {
    try {
      const updatedCharacter = { ...character, [field]: value };
      await axios.put(`http://localhost:3000/characters/${id}`, updatedCharacter);
      setCharacter(updatedCharacter);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  return (
    <div>
      {character ? (
        <div>
          <Link to="/" className="back2">
            🡰 Volver
          </Link>
          <h2 className='title'>Nombre:</h2>
          <input
            type="text"
            value={character.name}
            onChange={(e) => handleFieldUpdate('name', e.target.value)}
            className='inputChange'
          />
          <h2 className='title'>Estado:</h2>
          <input
            type="text"
            value={character.status}
            onChange={(e) => handleFieldUpdate('status', e.target.value)}
            className='inputChange'
          />
          <h2 className='title'>Especie:</h2>
          <input
            type="text"
            value={character.species}
            onChange={(e) => handleFieldUpdate('species', e.target.value)}
            className='inputChange'
          />

          <button onClick={handleDelete} className='eliminate'>Eliminar</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default CharacterDetails;
