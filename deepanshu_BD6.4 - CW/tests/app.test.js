const request = require("supertest");
const http = require("http");

const {
    getBooks,
    getBookById,
    getReviews,
    getReviewById,
    getUserById
} = require("../book");
const { app } = require("../index");

jest.mock("../book.js",() => ({
    ...jest.requireActual("../book.js"),
    getBooks : jest.fn(),
    getBookById : jest.fn(),
    getReviews:  jest.fn(),
    getReviewById: jest.fn(),
    getUserById : jest.fn()
}))

let server
beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001,done);
});

afterAll((done)=> {
    server.close(done);
})

describe('API Error Handling Test',() => {
    beforeEach(()=> {
        jest.clearAllMocks();
    })

    it("GET /api/books should return 404 if no books found.", async () => {
        getBooks.mockReturnValue([]);
        const res = await request(server).get("/api/books");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('No books found.')
    })

    it("GET /app/books/:id should return 404 if no book found with specified id", async () => {
        getBookById.mockReturnValue(undefined);

        const res = await request(server).get("/api/books/999");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("No book found.");
    })

    it("GET /api/reviews should return 404 if no review found", async () => {
        getReviews.mockReturnValue([]);

        const res = await request(server).get("/api/reviews");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("No reviews found.");
    });

    it("GET /api/reviews/:id should return 404 if no review found with specified id", async () => {
        getReviewById.mockReturnValue(undefined);
        const res = await request(server).get("/api/reviews/999");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("No review found.");
    });

    it("GET /api/users/:id should return 404 if no user found with specified id", async () => {
        getUserById.mockReturnValue(undefined);
        const res = await request(server).get("/api/users/999");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("No user found.");
    });
})