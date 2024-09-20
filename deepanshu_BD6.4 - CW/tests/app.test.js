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
        expect(res.error).toEqual('No books found.')
    })
})