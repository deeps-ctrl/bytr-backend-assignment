const express = require("express");

const {
    getAllEmployees,
    getEmployeeById,
    getAllDepartments,
    getDepartmentById
} = require("./employee");

const app = express();

app.use(express.json());

app.get("/api/employees", (req, res) => {
    try {
        const employees = getAllEmployees();
        if (employees.length === 0) {
            return res.status(404).json({ error: "No employees found" });
        }
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
});

app.get("/api/employees/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const employee = getEmployeeById(id);
        if (!employee) {
            return res.status(404).json({ error: "No employees found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/departments", (req,res) => {
    try{
        const departments = getAllDepartments();
        if(departments.length === 0){
            return res.status(404).json({error:"No departments found"});
        }
        res.status(200).json(departments);
    }catch(error){
        res.status(500).json({error:"Internal Server Error"});
    }
});

app.get("/api/departments/:id", (req,res) => {
    try {
        const id = Number(req.params.id);
        const department = getDepartmentById(id);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = { app }