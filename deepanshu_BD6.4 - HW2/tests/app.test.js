const request = require("supertest");
const http = require("http");

const { app } = require("../index")
const {
    getAllGames,
    getGameById,
    getAllGenres,
    getGenreById
} = require("../game");

jest.mock("../game.js", () => ({
    ...jest.requireActual("../game.js"),
    getAllGames: jest.fn(),
    getGameById: jest.fn(),
    getAllGenres: jest.fn(),
    getGenreById: jest.fn()
}));

let server;
beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("API Error Handling Test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("GET /api/games should return 404 when no games are found", async () => {
        getAllGames.mockReturnValue([]);

        const res = await request(server).get("/api/games");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("Game not found");
    });

    it("GET /api/games/:id should return 404 for non existent game id", async () => {
        getGameById.mockReturnValue(undefined);

        const res = await request(server).get("/api/games/999");
        console.log(res.body)
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("Game not found.");
    });

    it("GET /api/genres should return 404 when no genres are found", async () => {
        getAllGenres.mockReturnValue([]);

        const res = await request(server).get("/api/genres");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("No genres found");
    });

    it("GET /api/genres/:id should return 404 for non existent genre id", async () => {
        getGenreById.mockReturnValue(undefined);

        const res = await request(server).get("/api/genres/999");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("Genre not found");
    })
})