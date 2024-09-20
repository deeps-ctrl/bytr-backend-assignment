const express = require("express");

const { getBooks, getBookById, getReviews, getReviewById, getUserById } = require("./book")


const app = express();
app.use(express.json());


app.get("/api/books", (req, res) => {
    try {
        const books = getBooks();
        if (books.length === 0) {
            return res.status(404).json({ error: 'No books found.' })
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
});

app.get("/api/books/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const book = getBookById(id);
        if (!book) res.status(404).json({ error: "No book found." })
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
});

app.get("/api/reviews", (req, res) => {
    try {
        const reviews = getReviews();
        if (reviews.length === 0) {
            res.status(404).json({ error: 'No reviews found.' })
        }
        return res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
});

app.get("/api/reviews/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const review = getReviewById(id);
        if (!review) res.status(404).json({ error: "No review found." })
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
});

app.get("/api/users/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = getUserById(id);
        if (!user) res.status(404).json({ error: "No user found." })
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
});

module.exports = { app }