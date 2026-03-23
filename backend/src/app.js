const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use(express.static(path.join(__dirname, "../../frontend")));

const routes = require(".routes/");
app.use(routes);

const port = 3000;
app.listen(port, () =>{
    console.log(`servidor correinte en http://localhost:${port}`)
});

