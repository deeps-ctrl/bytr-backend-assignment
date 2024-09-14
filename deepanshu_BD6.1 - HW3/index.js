const express = require("express");
const { getAllProducts, getProductById, addNewProduct } = require("./product");
const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/products", (req, res) => {
  res.status(200).json(getAllProducts());
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  res.status(200).json(getProductById(id));
});

app.post("/products", (req, res) => {
  res.status(201).json(addNewProduct(req.body));
});

app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`));
