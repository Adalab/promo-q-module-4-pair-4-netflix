const express = require('express');
const cors = require('cors');
const server = express();
const movies = require('./data/movies.json');
server.get('/movies', (req, resp) => {
  const id = req.query.id;
  resp.json({ sucess: true, movies });
});

server.use(cors());
server.use(express.json());
const port = 4000;
server.listen(port, () => {
  console.log('listening' + port);
});
