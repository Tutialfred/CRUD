import React from "react";
import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import "./CharacterList.css"

// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import CreateCharacter from "./CreateCharacter";
import UpdateCharacter from "./UpdateCharacter";
import DeleteCharacter from "./DeleteCharacter";

function NavPage(props){
    return(
        <div>
            <p>Siguiente →</p>
            <button onClick={
                () => {props.setPage(props.page + 1) }
            } className="boton2"> {props.page }</button>
        </div>
    )
}

function NavPage2(props){
    return(
        <div>
            <p>← Atras </p>
            <button onClick={
                () => {props.setPage(props.page - 1) }
            } className="boton2"> {props.page -1}</button>
        </div>
    )
}

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

            {/* <li>
                    <Link to="/">Home</Link>
            </li> */}
            


            <li>
                    <Link to="/create">Crear personaje</Link>

            </li>
            

            
            <li>

                <Link to="/actualizar">Actualizar personaje</Link>
            </li>
           
           
            <li>

                <Link to="/eliminar">Eliminar personaje</Link>
            </li>

        </ul>
    </nav>



            </div>























































            <div className="flecha">
            <NavPage2 page={page} setPage={setPage}/>
            <NavPage page={page} setPage={setPage}/>
            </div>




            <div className="cartas-container">

              {
                  characters.map(characters =>{
                      return(
                          <Link to={`/characters/${characters.id}`}key={characters.id} className="carta">
                  <div className="personaje">
                <h2>{characters.name}</h2> 
                <h3>{characters.status}</h3>
                <h3>{characters.species}</h3>
                {/* <img src={characters.image} alt={characters.name} /> */}
              </div>
            </Link>    
            // <div>
            //     <h1>s</h1>
            // </div>
            
            
            
            
            
            )
        })
    }
            </div>
        </div>
    )
}

export default CharacterList