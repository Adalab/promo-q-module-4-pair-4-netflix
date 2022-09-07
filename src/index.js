// Fichero src/index.js

// Importamos los dos módulos de NPM necesarios para trabajar
const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');
const users = require('./data/users.json');
// Creamos el servidor
const server = express();

// Configuramos el servidor
server.use(cors());
server.use(express.json());

// Arrancamos el servidor en el puerto 3000
const port = 4000;
server.listen(port, () => {
  console.log('listening ' + port);
});

//Pedimos todas las peliculas
server.get('/movies', (req, resp) => {
  const genderFilterParam = req.query.gender;
  const sortFilterParam = req.query.sort;
  const filterByGender = movies
    .filter((movie) =>
      genderFilterParam === '' ? true : movie.gender === genderFilterParam
    )
    .sort(sortFunctions(sortFilterParam));
  resp.json({
    sucess: true,
    movies: filterByGender,
  });
});
server.post('/login', (req, resp) => {
  console.log(req.body);
  users.find((user) => {
    if (req.body.password === user.password && req.body.email === user.email) {
      resp.json({
        success: true,
        userId: 'id_de_la_usuaria_encontrada',
      });
    } else {
      resp.json({
        success: false,
        errorMessage: 'Usuaria/o no encontrada/o',
      });
    }
  });
});

function sortFunctions(params) {
  if (params === 'asc') {
    return sortAsc();
  } else {
    return sortDesc();
  }
}

function sortDesc() {
  return (a, b) => {
    if (a.title > b.title) {
      return -1;
    }
    if (a.title < b.title) {
      return 1;
    }
    return 0;
  };
}

function sortAsc() {
  return (a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  };
}

const staticServer = './src/public-react';
server.use(express.static(staticServer));
