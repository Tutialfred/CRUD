const express = require("express");
const app = express();
const server = 3000;
const axios = require("axios");
app.use(express.json()); // Middleware para parsear JSON

app.listen(server);

//* READ




  // ✅✅✅✅✅✅ 
  // req.param
  app.get("/characters/:id", async (req, res) => {
    try {

      const id = req.params.id
      const response = await axios.get('https://rickandmortyapi.com/api/character');

      if(response.data.results[id]){
        res.json(response.data.results[id]);
      } else {
        res.status(404).json({ error: 'Personaje no encontrado' });
      }
    
    } 
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  });




// Ruta para filtrar por nombre, estado o especie
// req.query
app.get('/characters', async (req, res) => {
  const { name, status, species, id} = req.query;

  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character/');

    let filteredCharacters = response.data.results;

    if (name) {
      filteredCharacters = filteredCharacters.filter(char => char.name.toLowerCase() === name.toLowerCase());
    }

    if (status) {
      filteredCharacters = filteredCharacters.filter(char => char.status.toLowerCase() === status.toLowerCase());
    }

    if (species) {
      filteredCharacters = filteredCharacters.filter(char => char.species.toLowerCase() === species.toLowerCase());
    }
    // if (id) {
    //   filteredCharacters = filteredCharacters.filter(char => char.id == Number(id));
    // }

    if (Object.keys(req.query).length === 0) {
      res.json(filteredCharacters);
    } else if (filteredCharacters.length > 0) {
      res.json(filteredCharacters);
    } else {
      console.log(error)
      res.status(404).json({ error: 'No se encontraron personajes con los criterios especificados' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});









//! CREATE
//! ✅
const characters = [];
let idCounter = 1; // Inicialización del contador de IDs


// CREATE - Crear un nuevo personaje
app.post('/characters', (req, res) => {
  const { name, status, species } = req.body; // Obtener datos del cuerpo de la solicitud

  if (!name || !status || !species) {
    return res.status(400).json({ error: 'Por favor, proporcione todos los campos: name, status, species' });
  }

  // Verificar si el nombre ya existe
  const existingCharacter = characters.find(char => char.name.toLowerCase() === name.toLowerCase());
  if (existingCharacter) {
    return res.status(400).json({ error: 'El nombre del personaje ya existe' });
  }

  const newCharacter = { id: idCounter++, name, status, species }; // Incrementar el contador de IDs
  characters.push(newCharacter);

  console.log(characters)
  res.status(201).json(newCharacter);
});





































//! UPDATE - Actualizar un personaje por ID
//! ✅
app.put('/characters/:id', (req, res) => {
  const { id } = req.params;
  const { name, status, species } = req.body;

  const characterToUpdate = characters.find(char => char.id === parseInt(id));

  if (!characterToUpdate) {
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }

  if (name) {
    const existingCharacter = characters.find(char => char.name.toLowerCase() === name.toLowerCase() && char.id !== parseInt(id));
    if (existingCharacter) {
      return res.status(400).json({ error: 'El nombre del personaje ya existe' });
    }
    characterToUpdate.name = name;
  }

  if (status) {
    characterToUpdate.status = status;
  }

  if (species) {
    characterToUpdate.species = species;
  }

  res.json(characterToUpdate);
  console.log(characters)
});







//! DELETE - Eliminar un personaje por ID
//! ✅
app.delete('/characters/:id', (req, res) => {
  const { id } = req.params;

  const index = characters.findIndex(char => char.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }

  characters.splice(index, 1);
  res.sendStatus(204); // No Content
});










