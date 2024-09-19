const request = require("supertest");
const http = require("http");

const {
    app,
    getAllRecipes,
    getRecipesById,
    addRecipe
} = require("../index");

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getAllRecipes: jest.fn(),
    getRecipesById: jest.fn(),
    addRecipe: jest.fn()
}));

let server;
beforeAll(done => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll(done => {
    server.close(done)
});

describe("API Endpoints", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should return all recipes", async () => {
        const mockRecipes = [
            {
                'id': 1,
                'name': 'Spaghetti Bolognese',
                'cuisine': 'Italian',
                'difficulty': 'Medium'
            },
            {
                'id': 2,
                'name': 'Chicken Tikka Masala',
                'cuisine': 'Indian',
                'difficulty': 'Hard'
            }
        ];

        getAllRecipes.mockResolvedValue(mockRecipes);
        const result = await request(server).get("/recipes")
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockRecipes);
    });

    it("should return recipe details by id", async () => {
        const mockRecipe = {
            'id': 1,
            'name': 'Spaghetti Bolognese',
            'cuisine': 'Italian',
            'difficulty': 'Medium'
        };

        getRecipesById.mockResolvedValue(mockRecipe);
        const result = await request(server).get("/recipes/details/1");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockRecipe);
    });

    it("should return null for non-existent id", async () => {
        getRecipesById.mockResolvedValue(undefined);
        const result = await request(server).get("/recipes/details/999");
        expect(result.statusCode).toEqual(404);
    });

    it("should add new employee", async () => {
        const newRecipe = {
            'id': 3,
            'name': 'Sushi',
            'cuisine': 'Japanese',
            'difficulty': 'Hard'
        };

        addRecipe.mockResolvedValue(newRecipe);

        const result = await request(server).post("/recipes/new").send({
            'name': 'Sushi',
            'cuisine': 'Japanese',
            'difficulty': 'Hard'
        });
        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual(newRecipe);
    })

})