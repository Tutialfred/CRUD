const express = require("express");
const app = express();
const server = 3000;
const axios = require("axios");
const cors = require('cors');

app.listen(server);
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Configurar CORS para permitir solicitudes desde el puerto de tu aplicación de React

const characters = [];
let idCounter = 1; // Inicialización del contador de IDs

app.get("/characters/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID no valido. Se requiere un número entero.' });
    }

    const response = await axios.get(`http://localhost:3000/characterown/`);
    const character = response.data?.[id];

    if (character) {
      return res.json(character);
    }

    res.status(404).json({ error: 'Personaje no encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.get("/characters", (req, res) => {
    res.json(characters)
})





//! Crear un nuevo personaje
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
  res.status(200).json(newCharacter);
});



// 


app.get("/characterown", async (req, res) => {
  res.json(characters)
  // res.json(characters)
})






//! Actualizar un personaje por ID

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






//! Eliminar un personaje por ID
app.delete('/characters/:id', (req, res) => {
  const { id } = req.params;

  const index = characters.findIndex(char => char.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }

  characters.splice(index, 1);
  res.sendStatus(204); // No Content
});



console.log("App working on portal 3000");