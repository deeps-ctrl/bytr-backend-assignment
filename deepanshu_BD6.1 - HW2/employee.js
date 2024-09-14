const employees = [
    { id: 1, name: "John Doe", position: "Software Engineer" },
    { id: 2, name: "Jane Smith", position: "Product Manager" },
    { id: 3, name: "Sam Johnson", position: "Designer" },
    { id: 4, name: "Lisa Brown", position: "DevOps Engineer" },
];

function getAllEmployees() {
    return employees;
}

function getEmployeeById(id) {
    return employees.find((employee) => employee.id === id);
}

function addNewEmployee(newEmployee) {
    employees.push(newEmployee);
    return newEmployee;
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addNewEmployee,
};
