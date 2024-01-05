import React from "react";
import { Routes, Route } from "react-router-dom"
import CreateCharacter from "./components/CreateCharacter";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import axios from "axios";
axios.defaults.baseURL="https://crudbackend-xdgg.onrender.com/"
function App (){
  return ( 
    <div>
      <h1>CRUD</h1>
      <Routes>
        <Route path="/" element={<CharacterList/>}></Route>
        <Route path="/create" element={<CreateCharacter/>}></Route>
        <Route path="/characters/:id" element={<CharacterDetails/>}></Route>
      </Routes>
    </div>  
  )
}

export default App