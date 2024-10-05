const express = require("express");

const app = express();
app.use(express.json());

const articles = [
    {
        'id': 1,
        'title': 'Understanding JavaScript',
        'content': 'JavaScript is a versatile language used for both frontend and backend development.'
    },
    {
        'id': 2,
        'title': 'Introduction to React',
        'content': 'React is a popular JavaScript library for building user interfaces.'
    }
];

const authors = [
    {
        'id': 1,
        'name': 'John Doe',
        'articleId': 1
    },
    {
        'id': 2,
        'name': 'Jane Smith',
        'articleId': 2
    }
];

function validateArticle(article) {
    if (!article.title || typeof article.title !== "string") {
        return 'Title is required and should be in a string';
    }
    if (!article.content || typeof article.content !== "string") {
        return "Content is required and should be in string";
    }
    return null;
}

app.post("/articles", (req, res) => {
    const error = validateArticle(req.body);
    if (error) return res.status(400).send(error);
    const newArticle = { id: articles.length + 1, ...req.body };
    articles.push(newArticle);
    res.status(201).json(newArticle);
});

function validateAuthor(author) {
    if (!author.name || typeof author.name !== "string") {
        return "Name is required and should be as a string";
    }
    if (!author.articleId || typeof author.articleId !== "number") {
        return "Article Id is required and should be as string";
    }
    return null
}

app.post("/authors", (req, res) => {
    const error = validateAuthor(req.body);
    if (error) return res.status(400).send(error);
    const newAuthor = { id: authors.length + 1, ...req.body };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

module.exports = { app, validateArticle, validateAuthor };