// Fichero src/index.js

//BASE DE DATOS
const Database = require('better-sqlite3');
const db = new Database('./src/db/database.db', { verbose: console.log });
const dbUsers = new Database('./src/db/users.db', { verbose: console.log });

// Importamos los dos módulos de NPM necesarios para trabajar
const express = require('express');
const cors = require('cors');
// const movies = require('./data/movies.json');
// const users = require('./data/users.json');
const { query } = require('express');
// Creamos el servidor
const server = express();

// Configuramos el servidor
server.use(cors());
server.use(express.json());

const port = 4000;
server.listen(port, () => {
  console.log('listening ' + port);
});

//Pedimos todas las peliculas
server.get('/movies', (req, resp) => {
  const genderFilterParam = req.query.gender;
  const sortFilterParam = req.query.sort;
  let allMovies;

  if (genderFilterParam == '') {
    const queryBase = db.prepare(`SELECT * FROM movies ORDER BY ASC`);
    allMovies = queryBase.all();
  }
  if (sortFilterParam === 'asc') {
    const filterByGender = db.prepare(`
      SELECT *
      FROM movies
      WHERE gender = ?
      ORDER BY ASC
    `);
    allMovies = filterByGender.all(genderFilterParam);

    if (sortFilterParam === 'desc') {
      const queryBase = db.prepare(`SELECT * FROM movies ORDER BY DESC`);
      allMovies = queryBase.all();
    }

    if (sortFilterParam === 'desc') {
      const filterByGender = db.prepare(`
      SELECT *
      FROM movies
      WHERE gender = ?
      ORDER BY DESC
    `);
      allMovies = filterByGender.all(genderFilterParam);
    }
  }
  resp.json({
    sucess: true,
    movies: allMovies,
  });
});

server.post('/login', (req, resp) => {
  const idEmail = req.body.email;
  const idPassword = req.body.password;
  let allUsers;
  if (req.body.password !== '' && req.body.email !== '') {
    const queryUsers = dbUsers.prepare(
      `SELECT * FROM users 
      WHERE password= ? AND email = ?`
    );
    allUsers = queryUsers.get(idPassword, idEmail);
    if (allUsers === undefined) {
      resp.json({
        success: false,
        errorMessage: 'Usuaria/o no encontrada/o',
      });
    } else {
      resp.json({
        success: true,
        userId: allUsers.id,
        allUsers,
      });
    }
  } else {
    resp.json({
      success: false,
      errorMessage: 'faltan datos',
    });
  }
});

server.post('/sign-up', (req, resp) => {
  const newUser = req.body;
  const queryNewUser = dbUsers.prepare(
    'INSERT INTO users (id, name, email, password) VALUE (?, ?, ?, ?)'
  );
  const resultNewUser = queryNewUser.run(
    newUser.id,
    newUser.name,
    newUser.email,
    newUser.password
  );
  resp.json({ succes: true, userId: newUser.id, resultNewUser });
});
const staticServer = './src/public-react';
server.use(express.static(staticServer));
