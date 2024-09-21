const express = require("express");

const {
    getAllGames,
    getGameById,
    getAllGenres,
    getGenreById
} = require("./game")

const app = express();

app.get("/api/games", (req, res) => {
    try {
        const games = getAllGames();
        if (games.length === 0) {
            return res.status(404).json({ error: "Game not found" });
        }
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/games/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const game = getGameById(id);
        if (!game) {
            return res.status(404).json({ error: "Game not found." })
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
});

app.get("/api/genres", (req, res) => {
    try {
        const genres = getAllGenres()
        if (genres.length === 0) {
            return res.status(404).json({ error: "No genres found" });
        }
        res.status(200).json(genres)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/genres/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const genre = getGenreById(id);
        if (!genre) {
            return res.status(404).json({ error: "Genre not found" });
        }
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = { app }