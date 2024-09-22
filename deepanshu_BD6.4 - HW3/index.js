const express = require("express");

const {
    getAllArticles,
    getArticleById,
    getAllComments,
    getCommentById,
    getUserById
} = require("./article")

const app = express();

app.get("/articles", (req, res) => {
    try {
        const articles = getAllArticles();
        if (articles.length === 0) {
            return res.status(404).json({ error: "No articles found" });
        }
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/articles/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const article = getArticleById(id);
        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
});

app.get("/comments", (req, res) => {
    try {
        const comments = getAllComments();
        if (comments.length === 0) {
            return res.status(404).json({ error: "No comments found" });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/comments/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const comment = getCommentById(id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/users/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = getUserById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = { app }

