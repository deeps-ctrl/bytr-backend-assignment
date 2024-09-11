const { getMovies, getMovieById, addMovie } = require("../movie");

describe("Movie functions", () => {
    it("should return all movies", () => {
        const movies = getMovies();
        expect(movies).toHaveLength(4);
        expect(movies).toEqual([
            { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
            { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
            { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
            { id: 4, title: "Pulp Fiction", director: "Quentin Tarantino" },
        ]);
    });

    it("should return a movie by id", () => {
        const movie = getMovieById(1);
        expect(movie).toEqual({ id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" });
    });

    it("should return undefined for a non-existant movie", () => {
        const movie = getMovieById(99);
        expect(movie).toBeUndefined();
    });

    it("should add a new movie", () => {
        const newMovie = { title: "New Movie", director: "New Director" };
        const addedMovie = addMovie(newMovie);
        expect(addedMovie).toEqual({
            id: 5,
            title: "New Movie",
            director: "New Director",
        });
        const movies = getMovies();
        expect(movies).toHaveLength(5);
    })
});
