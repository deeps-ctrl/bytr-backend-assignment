const express = require("express");

const app = express();
app.use(express.json());

const employees = [];
const companies = [];

function validateEmployee(employee) {
    if (!employee.name || typeof employee.name !== "string") {
        return "Employee name is required and should be a string";
    }
    if (!employee.companyId || typeof employee.companyId !== "number") {
        return "Company Id is required and should be a number";
    }
    return null;
}

app.post("/api/employees", (req, res) => {
    const error = validateEmployee(req.body);
    if (error) res.status(400).send(error);
    const employee = { id: employees.length + 1, ...req.body };
    employees.push(employee);
    res.status(201).json(employee);
});

function validateCompany(company) {
    if (!company.name || typeof company.name !== "string") {
        return "Company name is required and should be a string";
    }
    return null;
}

app.post("/api/companies", (req, res) => {
    const error = validateCompany(req.body);
    if (error) res.status(400).send(error);
    const company = { id: companies.length + 1, name: 'TechCorp' };
    companies.push(company);
    res.status(201).json(company);
});

module.exports = { app, validateEmployee, validateCompany };

