const request = require("supertest");
const http = require("http");

const {
    getAllArticles,
    getArticleById,
    getAllComments,
    getCommentById,
    getUserById
} = require("../article");
const { app } = require("../index");

jest.mock("../article.js", () => ({
    ...jest.requireActual("../article.js"),
    getAllArticles: jest.fn(),
    getArticleById: jest.fn(),
    getAllComments: jest.fn(),
    getCommentById: jest.fn(),
    getUserById: jest.fn()
}));

let server;
beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll(done => {
    server.close(done);
});


describe("API Error Handling Test", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });
   
    it("GET /articles should return 404 when no articles found", async () => {
        getAllArticles.mockReturnValue([]);

        const res = await request(server).get("/articles");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('No articles found');
    });

    it("GET /articles/:id should return 404 for non existent id", async () => {
        getArticleById.mockReturnValue(undefined);

        const res = await request(server).get("/articles/999");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("Article not found");
    });

    it("GET /comments should return 404 when no comment found", async () => {
        getAllComments.mockReturnValue([]);

        const res = await request(server).get("/comments");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('No comments found');
    });

    it("GET /comments/:id should return 404 for non existent id", async () => {
        getCommentById.mockReturnValue(undefined);

        const res = await request(server).get("/comments/999");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("Comment not found");
    });

    it("GET /users/:id should return 404 for non existent id", async () => {
        getUserById.mockReturnValue(undefined);

        const res = await request(server).get("/users/999");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("User not found");
    });
})

