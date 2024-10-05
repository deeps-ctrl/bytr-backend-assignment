const request = require("supertest");
const http = require("http");

const { app, validateAuthor, validateArticle } = require("../index");

let server;
beforeAll(done => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll(done => {
    server.close(done);
});

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    validateArticle: jest.fn(),
    validateAuthor: jest.fn()
}));

describe("API Endpoints", () => {
    it("should add new article with valid input", async () => {
        const mockArticle = {
            'title': 'Mastering Node.js',
            'content': 'Node.js is a powerful tool for backend development...'
        };
        const resp = await request(server).post("/articles").send(mockArticle);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            id: 3,
            'title': 'Mastering Node.js',
            'content': 'Node.js is a powerful tool for backend development...'
        });
    });

    it("should return 400 status when invalid input of articles", async () => {
        const mockArticle = {
            'title': 'Mastering Node.js',
        };
        const resp = await request(server).post("/articles").send(mockArticle);
        expect(resp.statusCode).toEqual(400);
        expect(resp.text).toEqual('Content is required and should be in string')
    });

    it("should add a new author with valid input", async () => {
        const mockAuthor = {
            'name': 'Alice Johnson',
            'articleId': 3
        };
        const resp = await request(server).post("/authors").send(mockAuthor);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            'id': 3,
            'name': 'Alice Johnson',
            'articleId': 3
        })
    });

    it("should return 400 for invalid author", async () => {
        const mockAuthor = {
            'name': 'Alice Johnson'
        };
        const resp = await request(server).post("/authors").send(mockAuthor);
        expect(resp.statusCode).toEqual(400);
        expect(resp.text).toEqual("Article Id is required and should be as string")
    })
});

describe("Validate Functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
   
    it("should validate article correctly for valid input", () => {
        const mockArticle = {
            'title': 'Mastering Node.js',
            'content': 'Node.js is a powerful tool for backend development...'
        };
        validateArticle.mockReturnValue(null);
        const error = validateArticle(mockArticle);
        expect(error).toBeNull();
        expect(validateArticle).toBeCalledWith(mockArticle);
    });

    it("should validate article for invalid input", () => {
        const mockArticle = {
            'title': 'Mastering Node.js'
        };
        validateArticle.mockReturnValue("Content is required and should be in string");
        const error = validateArticle(mockArticle);
        expect(error).toEqual("Content is required and should be in string");
        expect(validateArticle).toBeCalledWith(mockArticle);
    });

    it("should validate author for valid input", () => {
        const mockAuthor = {
            'name': 'Alice Johnson',
            'articleId': 3
        };

        validateAuthor.mockReturnValue(null);
        const error = validateAuthor(mockAuthor);
        expect(error).toBeNull();
        expect(validateAuthor).toBeCalledWith(mockAuthor);
    });

    it("should validate author for invalid input", () => {
        const mockAuthor = {
            'name': 'Alice Johnson'
        };
        validateAuthor.mockReturnValue("Article Id is required and should be as string");
        const error = validateAuthor(mockAuthor);
        expect(error).toEqual("Article Id is required and should be as string");
        expect(validateAuthor).toBeCalledWith(mockAuthor);
    });
})