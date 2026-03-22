const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, "../../frontend")));
// rutas
app.get("/inicio", (req, res) =>{
    
    res.sendFile(path.join(__dirname, "../../frontend/inicio.html"));
    
})

app.get("/", (req, res) => {
    res.redirect("/inicio");
})
app.get("/map", (req, res) =>{
    res.sendFile(path.join(__dirname, "../../frontend/map.html"));
})
app.listen(3000, () =>{
    console.log("servidor corriendo");
})