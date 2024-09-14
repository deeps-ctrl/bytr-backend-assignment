const { app, getMovies, getMovieById, addMovie } = require("../index");
const http = require("http");

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getMovies: jest.fn(),
    getMovieById: jest.fn(),
    addMovie: jest.fn(),
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Function test", () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });

    test("getMovies should return a list of movies", () => {
        const mockMovies = [
            { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
            { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
        ];
        getMovies.mockReturnValue(mockMovies);

        const result = getMovies();
        expect(result).toEqual(mockMovies);
        expect(getMovies).toHaveBeenCalled();
    });

    test("getMovieById should return movie details", () => {
        const mockMovie = {
            id: 1,
            title: "The Shawshank Redemption",
            director: "Frank Darabont",
        };

        getMovieById.mockReturnValue(mockMovie);
        const result = getMovieById(1);
        expect(result).toEqual(mockMovie);
        expect(getMovieById).toHaveBeenCalledWith(1);
    });

    test("getMovieById should return undefined for non existent movie", () => {
        getMovieById.mockReturnValue(undefined);
        const result = getMovieById(999);
        expect(result).toBeUndefined();
        expect(getMovieById).toHaveBeenCalledWith(999);
    });

    test("addMovie should add new movie", () => {
        const newMovie = {
            id: 1,
            title: "The Shawshank Redemption",
            director: "Frank Darabont",
        };
        addMovie.mockReturnValue(newMovie);
        const result = addMovie(newMovie);
        expect(result).toEqual(newMovie);
        expect(addMovie).toHaveBeenCalledWith(result);
    });
});
