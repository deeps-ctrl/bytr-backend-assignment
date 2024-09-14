const express = require("express");

const app = express();
app.use(express.json());

const authors = [
    { authorId: 1, name: "George Orwell", book: "1984" },
    { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
    { authorId: 3, name: "Ray Bradbury", book: "Fahrenheit 451" },
];

function getAuthors() {
    return authors;
}

function getAuthorById(id) {
    return authors.find((author) => author.authorId === id);
}

function addAuthor(author) {
    authors.push(author);
    return author;
}

app.get("/authors", (req, res) => {
    res.status(200).json(getAuthors());
});

app.get("/authors/:id", (req, res) => {
    const id = Number(req.params.id);
    res.status(200).json(getAuthorById(id));
});

app.post("/authors", (req, res) => {
    const authorId = req.query.authorId;
    const name = req.query.name;
    const book = req.query.book;
    res.status(201).json(addAuthor({ authorId, name, book }));
});

module.exports = { app, getAuthors, getAuthorById, addAuthor };
