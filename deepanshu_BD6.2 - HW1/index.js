const express = require("express");
const app = express();

app.use(express.json());

const employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Sam Johnson", position: "Designer" },
];

function getEmployees() {
  return employees;
}

function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

function addEmployee(newEmployee) {
  employees.push(newEmployee);
  return newEmployee;
}

app.get("/employees", (req, res) => {
  res.status(200).json(getEmployees());
});

app.get("/employees/details/:id", (req, res) => {
  const id = Number(req.params.id);
  res.status(200).json(getEmployeeById(id));
});

app.post("/employees/new", (req, res) => {
  const newEmployee = req.body;
  res.status(201).json(addEmployee(newEmployee));
});

module.exports = { app, getEmployees, getEmployeeById, addEmployee };
