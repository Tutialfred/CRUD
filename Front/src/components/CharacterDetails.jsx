import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const response = await axios.get(`http://localhost:3000/characterown/${id+1}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    }

    fetchCharacter();
  }, [id]);

  return (
    <div>
      {character ? (
        <div>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <h2>{character.status}</h2>
          <h2>{character.species}</h2>
          {/* Mostrar otros detalles del personaje */}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default CharacterDetails;
