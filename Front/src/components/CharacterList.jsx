import React from "react";
import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import "./CharacterList.css"



function CharacterList(){


    // UseState
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1)



    useEffect(() => {
        async function getApi() {
          try {
            const response = await fetch("http://localhost:3000/characterown");
            const data = await response.json();
            setCharacters(data);
          } catch (error) {
            console.error('Error fetching characters:', error);
          }
        }
        getApi();
      }, [page]);

    return(   
        <div>
            <div>
            <nav>
        <ul>
            <li>
                 <Link to="/create">Crear personaje</Link>
            </li>
            
            <li>
                <Link to="/actualizar">Actualizar personaje</Link>
            </li>


        </ul>
    </nav>
            </div>


            <div className="cartas-container">

              {
                  characters.map(character =>{
                      return(
                          <Link to={`/characters/${character.id}`}key={character.id} className="carta">
                  <div className="personaje">
                <h2>Nombre</h2> 
                <h3>{character.name}</h3> 
                <h2>Estado</h2> 
                <h3>{character.status}</h3>
                <h2>Especie</h2> 
                <h3>{character.species}</h3>
              </div>
            </Link>    
            )
        })
    }
            </div>
        </div>
    )
}

export default CharacterList