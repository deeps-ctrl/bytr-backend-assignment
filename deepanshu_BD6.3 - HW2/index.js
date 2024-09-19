const express = require("express");
const app = express();

app.use(express.json());

const employees = [
    { 'id': 1, 'name': 'John Doe', 'email': 'john.doe@example.com', 'department': 'Engineering' },
    { 'id': 2, 'name': 'Jane Smith', 'email': 'jane.smith@example.com', 'department': 'Marketing' }
]

async function getAllEmployees(){
    return employees;
}

async function getEmployeeById(id){
    return employees.find((employee) => employee.id === id);
}

async function addEmployee(employee){
    employee.id = employees.length + 1;
    employees.push(employee);
    return employee;
}

app.get("/employees",async(req,res) => {
    res.status(200).json(await getAllEmployees())
});

app.get("/employees/details/:id", async(req,res) => {
    const id = Number(req.params.id);
    const employee = await getEmployeeById(id);
    if(!employee) res.status(404).send("No employee found.");
    res.status(200).json(employee);
});

app.post("/employees/new",async(req,res) => {
    const newEmployee = req.body;
    res.status(201).json(await addEmployee(newEmployee))
});

module.exports = {
    app,
    getAllEmployees, 
    getEmployeeById,
    addEmployee
}