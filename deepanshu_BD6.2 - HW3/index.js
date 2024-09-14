const express = require("express");
const app = express();

app.use(express.json());

const products = [
    { id: 1, name: "Laptop", category: "Electronics" },
    { id: 2, name: "Coffee Maker", category: "Appliances" },
    { id: 3, name: "Headphones", category: "Electronics" },
    { id: 4, name: "Running Shoes", category: "Footwear" },
];

function getProducts() {
    return products;
}

function getProductById(id) {
    return products.find((product) => product.id === id);
}

function addNewProduct(product) {
    products.push(product);
    return product;
}

app.get("/products", (req, res) => {
    res.status(200).json(getProducts());
});

app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    res.status(200).json(getProductById(id));
});

app.post("/products/new", (req, res) => {
    const product = {
        id: 5,
        name: "Tablet",
        category: "Electronics",
    };
    res.status(201).json(addNewProduct(product));
});

module.exports = { app, getProducts, getProductById, addNewProduct };
