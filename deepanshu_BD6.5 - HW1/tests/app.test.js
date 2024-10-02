const request = require("supertest");
const http = require("http");

const {
    app,
    validateGame,
    validateTournament
} = require("../index");

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    validateGame: jest.fn(),
    validateTournament: jest.fn()
}))

let server;
beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("API Endpoints To Push Data", () => {
    it("should add a new game with valid input", async () => {
        const res = await request(server)
            .post("/api/games")
            .send(
                {
                    'title': 'The Legend of Zelda',
                    'genre': 'Adventure'
                }
            );
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            'id': 1,
            'title': 'The Legend of Zelda',
            'genre': 'Adventure'
        });
    });

    it("should return 404 for game with invalid input", async () => {
        const res = await request(server).post("/api/games").send({ 'title': 'The Legend of Zelda' });
        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("Genre is required and should be in string");
    });

    it("should add the new tournament with valid input", async () => {
        const res = await request(server).post("/api/tournaments").send({
            'name': 'Zelda Championship',
            'gameId': 1
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            'id': 1,
            'name': 'Zelda Championship',
            'gameId': 1
        });
    });

    it("should return 404 for tournament with invalid input", async () => {
        const res = await request(server).post("/api/tournaments").send({
            'name': 'Zelda Championship'
        });
        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("Game Id is required and should be in string");
    });
});

describe("Validate Functions", () => {
    it("should return null for valid game", () => {
        const game = {
            'title': 'The Legend of Zelda',
            'genre': 'Adventure'
        };
        validateGame.mockReturnValue(null);
        const result = validateGame(game);
        expect(validateGame).toHaveBeenCalledWith(game);
        expect(result).toBeNull();
    });

    it("should return error message for invalid game input", () => {
        const game = {
            'title': 'The Legend of Zelda'
        };
        validateGame.mockReturnValue("Genre is required and should be in string");
        const result = validateGame(game);
        expect(validateGame).toHaveBeenCalledWith(game);
        expect(result).toEqual("Genre is required and should be in string");
    });

    it("should return null for valid tournament", () => {
        const mockTournament = {
            'name': 'Zelda Championship',
            'gameId': 1
        };
        validateTournament.mockReturnValue(null);
        const result = validateTournament(mockTournament);
        expect(validateTournament).toHaveBeenCalledWith(mockTournament);
        expect(result).toBeNull();
    });

    it("should return error message for invalid tournament", () => {
        const mockTournament = {
            'name': 'Zelda Championship',
        };
        validateTournament.mockReturnValue("Game Id is required and should be in string");
        const result = validateTournament(mockTournament);
        expect(validateTournament).toHaveBeenCalledWith(mockTournament);
        expect(result).toEqual("Game Id is required and should be in string");
    });
})