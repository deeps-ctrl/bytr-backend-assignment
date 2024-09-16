const express = require("express");
const app = express();

app.use(express.json());

const games = [
    { 'id': 1, 'title': 'The Legend of Zelda', 'genre': 'Adventure', 'developer': 'Nintendo' },
    { 'id': 2, 'title': 'Super Mario Bros', 'genre': 'Platformer', 'developer': 'Nintendo' }
];

const developers = [
    { 'id': 1, 'name': 'Nintendo', 'country': 'Japan' },
    { 'id': 2, 'name': 'Valve', 'country': 'USA' }
]

async function getGames() {
    return games;
}

async function getGameById(id) {
    return games.find((game) => game.id === id);
}

async function addGame(game) {
    game.id = games.length + 1;
    games.push(game);
    return game;
}

async function getDeveloperById(id) {
    return developers.find((developer) => developer.id === id);
}

async function addDeveloper(developer){
    developer.id = developers.length + 1;
    developers.push(developer);
    return developer;
}

app.get("/games", async (req, res) => {
    res.status(200).json(await getGames());
});

app.get("/games/details/:id", async (req, res) => {
    const id = Number(req.params.id);
    const game = await getGameById(id);
    if (!game) res.status(404).send("No game found.");
    res.status(200).json(game);
});

app.post("/games/new", async (req, res) => {
    const newGame = req.body;
    res.status(201).json(await addGame(newGame));
});

app.get("/developers/details/:id", async (req,res) => {
    const id = Number(req.params.id);
    const developer = await getDeveloperById(id);
    if (!developer) res.status(404).send("No Developer found.");
    res.status(200).json(developer);
});

app.post("/developers/new",async (req,res) => {
    const newDeveloper = req.body;
    res.status(201).json(await addDeveloper(newDeveloper))
});

module.exports = {
    app,
    getGames,
    getGameById,
    addGame,
    getDeveloperById,
    addDeveloper
}

