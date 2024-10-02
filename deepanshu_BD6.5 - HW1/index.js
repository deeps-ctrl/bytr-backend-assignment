const express = require("express");
const app = express();

app.use(express.json());

const games = [];
const tournaments = [];

function validateGame(game) {
    if (!game.title && typeof game.title !== "string") {
        return "Title is required and should be in string";
    }
    if (!game.genre && typeof game.genre !== "string") {
        return "Genre is required and should be in string";
    }
    return null;
}

app.post("/api/games", (req, res) => {
    const error = validateGame(req.body);
    if (error)  return res.status(400).send(error);
    const game = { id: games.length + 1, ...req.body };
    games.push(game);
    res.status(201).json(game)
});

function validateTournament(tournament){
    if(!tournament.name && typeof tournament.name !== "string"){
        return "Name is required and should be in string";
    }
    if(!tournament.gameId && typeof tournament.gameId !== "string"){
        return "Game Id is required and should be in string";
    }
    return null;
}

app.post("/api/tournaments", (req, res) => {
    const error = validateTournament(req.body);
    if (error) return res.status(400).send(error);
    const tournament = { id: tournaments.length + 1, ...req.body };
    tournaments.push(tournament);
    res.status(201).json(tournament)
});


module.exports = {
    app, 
    validateGame,
    validateTournament
}

