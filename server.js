const express = require("express");
const app = express();
const server = 3000;
const axios = require("axios");

app.listen(server);


app.get("/characters", async (req, res) =>{
try {
    const response = await axios.get("https://rickandmortyapi.com/api/character");
    const characters = response.data.results;
    res.json(characters);
} catch (error) {
    res.status(500).json({ error })
}

})

// Dato dinamico 
app.get("/user/:id", (req, res) => {

    res.status(200).send("User number " + req.params.id);
});



// Siempre que llegue al error, ruta no existente
app.use( (req, res) => {
    res.send("This path don't exist")
})