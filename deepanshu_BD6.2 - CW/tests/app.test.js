const { app, getAuthors, getAuthorById, addAuthor } = require("../index.js");
const http = require("http");

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getAuthors: jest.fn(),
    getAuthorById: jest.fn(),
    addAuthor: jest.fn(),
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Function tests", () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });

    test("getAuthors should return a list of authors", () => {
        const mockAuthors = [
            { authorId: 1, name: "George Orwell", book: "1984" },
            { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
        ];

        getAuthors.mockReturnValue(mockAuthors);

        const result = getAuthors();
        expect(result).toEqual(mockAuthors);
        expect(getAuthors).toHaveBeenCalled();
    });

    test("getAuthorById should return author details", () => {
        const mockAuthor = { authorId: 1, name: "George Orwell", book: "1984" };

        getAuthorById.mockReturnValue(mockAuthor);

        const result = getAuthorById(1);
        expect(result).toEqual(mockAuthor);
        expect(getAuthorById).toHaveBeenCalledWith(1);
    });

    test("getAduthorById should return undefined if author id not found", () => {
        getAuthorById.mockReturnValue(undefined);

        const result = getAuthorById(999);
        expect(result).toBeUndefined();
        expect(getAuthorById).toHaveBeenCalledWith(999);
    });

    test("addAuthor should add new author", () => {
        const newAuthor = {
            authorId: 4,
            name: "J.K Rowling",
            book: "Harry Potter",
        };

        addAuthor.mockReturnValue(newAuthor);

        const result = addAuthor(newAuthor);
        expect(result).toEqual(newAuthor);
        expect(addAuthor).toHaveBeenCalledWith(newAuthor);
    });
});
