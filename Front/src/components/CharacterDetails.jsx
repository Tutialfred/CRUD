import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CharacterDetails() {
  const { id } = useParams();
  // const history = useHistory();

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




  // Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/characters/${id}`);
      window.location.href = '/'; // Redirige a la página de personajes después de eliminar

      setCharacter(null); // Elimina el personaje del estado local
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };


  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/characters/${id}`, {
        name: updatedName || character.name, // Usa el valor actual si no se proporciona un valor nuevo
        status: updatedStatus || character.status,
        species: updatedSpecies || character.species,
      });

      const response = await axios.get(`http://localhost:3000/characters/${id}`);
      setCharacter(response.data);

      // Limpia los campos después de la actualización
      setUpdatedName('');
      setUpdatedStatus('');
      setUpdatedSpecies('');
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };





  return (
    <div>
      {character ? (

        <div>
          <a href="/" className="back2">
        🡰 Volver
      </a>
          <h2 className='title'>Nombre:</h2> 
          <h2>{character.name}</h2>
          {/* <img src={character.image} alt={character.name} /> */}
          <h2 className='title'>Estado:</h2> 
          <h2>{character.status}</h2>
          <h2 className='title'>Especie:</h2> 
          <h2>{character.species}</h2>

          <button onClick={handleDelete} className='eliminate'>Eliminar</button>
          {/* <Link to="/actualizar" >Actualizar</Link> */}
          <a href="/actualizar"><button className='update' >Actualizar</button></a>

        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default CharacterDetails;
