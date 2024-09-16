const request = require("supertest");
const http = require("http");
const {
    app,
    getGames,
    getGameById,
    addGame,
    getDeveloperById,
    addDeveloper
} = require("../index");

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getGames: jest.fn(),
    getGameById: jest.fn(),
    addGame: jest.fn(),
    getDeveloperById: jest.fn(),
    addDeveloper: jest.fn()
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll(done => {
    server.close(done);
});

describe("API Endpoints", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should retrieve all games", async () => {
        const mockGames = [
            { 'id': 1, 'title': 'The Legend of Zelda', 'genre': 'Adventure', 'developer': 'Nintendo' },
            { 'id': 2, 'title': 'Super Mario Bros', 'genre': 'Platformer', 'developer': 'Nintendo' }
        ]

        getGames.mockResolvedValue(mockReviews);

        const result = await request(server).get("/games");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockGames);
    });

    it("should retrieve specific game by id", async () => {
        const mockGame = { 'id': 1, 'title': 'The Legend of Zelda', 'genre': 'Adventure', 'developer': 'Nintendo' };


        getGameById.mockResolvedValue(mockGame);

        const result = await request(server).get("/games/details/1");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockGame);
    });

    it("should add an new game", async () => {
        const mockGame = {
            id: 3,
            'title': 'Half-Life',
            'genre': 'FPS',
            'developer': 'Valve'
        };
        addGame.mockResolvedValue(mockGame);
        const result = await request(server).post("/games/new").send({
            'title': 'Half-Life',
            'genre': 'FPS',
            'developer': 'Valve'
        });
        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual(mockGame);
    });

    it("should retrive a specific developer by id", async () => {
        const mockDeveloper = { 'id': 1, 'name': 'Nintendo', 'country': 'Japan' };
        getDeveloperById.mockResolvedValue(mockDeveloper);

        const result = await request(server).get("/developers/details/1");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockDeveloper);
    });

    it("should add a new developer", async () => {
        const mockDeveloper = { 'id': 3, 'name': 'Epic Games', 'country': 'USA' };

        addDeveloper.mockResolvedValue(mockDeveloper);

        const result = await request(server).post("/developers/new").send({ 'name': 'Epic Games', 'country': 'USA' });
        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual(mockDeveloper);
    });

    it("should return 404 for non-existing game", async () => {
        getGameById.mockResolvedValue(null);
        const result = await request(server).get('/games/details/999');
        expect(result.statusCode).toEqual(404);
    });

    it("should return 404 for non-existing developer", async () => {
        getDeveloperById.mockResolvedValue(null);
        const result = await request(server).get('/developers/details/999');
        expect(result.statusCode).toEqual(404);
    });
})

