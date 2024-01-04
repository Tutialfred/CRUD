const { Router } = require("express");
const router = Router();
// const server = 3000;
// const axios = require("axios");
const  {getAllCharacters} = require("./controllers/index") 
console.log("Working here routes");


router.get("/characters", getAllCharacters);






// Dato dinamico 
router.get("/user/:id", (req, res) => {

    res.status(200).send("User number " + req.params.id);
});





// Siempre que llegue al error, ruta no existente
router.use( (req, res) => {
    res.send("This path don't exist")
})

module.exports = router