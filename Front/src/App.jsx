import React from "react";
import { Routes, Route } from "react-router-dom"
import  Layout  from "./components/Layout"
import CreateCharacter from "./components/CreateCharacter";
import UpdateCharacter from "./components/UpdateCharacter";
import DeleteCharacter from "./components/DeleteCharacter";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";

function App (){
  return ( 
    <div>
      <h1>CRUD</h1>
      <Routes>
        <Route path="/" element={<CharacterList/>}></Route>
        <Route path="/create" element={<CreateCharacter/>}></Route>
        <Route path="/actualizar" element={<UpdateCharacter/>}></Route>
        <Route path="/eliminar" element={<DeleteCharacter/>}></Route>
        <Route path="/characterown" element={<DeleteCharacter/>}></Route>
        <Route path="/characters/:id" element={<CharacterDetails/>}></Route>
        </Routes>
    </div>  
  )
}

export default App