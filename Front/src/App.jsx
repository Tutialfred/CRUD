import React from "react";
import { Routes, Route } from "react-router-dom"
import  Layout  from "./components/Layout"
import CreateCharacter from "./components/CreateCharacter";
import UpdateCharacter from "./components/UpdateCharacter";
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
        <Route path="/characters/:id" element={<CharacterDetails/>}></Route>
        </Routes>
    </div>  
  )
}

export default App