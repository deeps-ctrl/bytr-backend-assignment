const express = require("express");
const app = express();
app.use(express.json());

const movies = [
    { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
    { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
    { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
];

function getMovies() {
    return movies;
}

function getMovieById(id) {
    return movies.find((movie) => movie.id === id);
}

function addMovie(movie) {
    movies.push(movie);
    return movie;
}

app.get("/movies", (req, res) => {
    res.status(200).json(getMovies());
});

app.get("/movies/details/:id", (req, res) => {
    const id = Number(req.params.id);
    res.status(200).json(getMovieById(id));
});

app.post("/movies/new", (req, res) => {
    const movie = req.body;
    res.status(201).json(addMovie(movie));
});

module.exports = { app, getMovies, getMovieById, addMovie };
I