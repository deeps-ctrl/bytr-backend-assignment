const express = require("express");
const { getMovies, getMovieById, addMovie } = require("./movie");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/movies", (req, res) => {
  res.status(200).json(getMovies());
});

app.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.status(200).json(getMovieById(id));
});

app.post("/movies", (req, res) => {
  const movie = addMovie(req.body);
  res.status(201).json(movie);
});

app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`));

module.exports = app;
