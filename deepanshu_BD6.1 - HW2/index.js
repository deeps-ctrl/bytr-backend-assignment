const express = require("express");
const {
    getAllEmployees,
    getEmployeeById,
    addNewEmployee,
} = require("./employee");
const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/employees", (req, res) => {
    res.status(200).json(getAllEmployees());
});

app.get("/employees/:id", (req, res) => {
    const id = Number(req.params.id);
    res.status(200).json(getEmployeeById(id));
});

app.post("/employees", (req, res) => {
    const newEmployee = req.body;
    res.status(201).json(addNewEmployee(newEmployee));
});

app.listen(PORT, () =>
    console.log(`Server started listening on port ${PORT}\n`)
);
