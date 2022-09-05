// Fichero src/index.js

// Importamos los dos módulos de NPM necesarios para trabajar
const express = require('express');
const cors = require('cors');

// Creamos el servidor
const server = express();


// Configuramos el servidor
server.use(cors());
server.use(express.json());

// Arrancamos el servidor en el puerto 3000
const port = 4000;
server.listen(port, () => {
  console.log('listening' + port);
});

//Pedimos todas las peliculas
const movies = require('./data/movies.json');
server.get('/movies', (req, resp) => {
  const id = req.query.id;
  resp.json({ sucess: true, movies });
});




