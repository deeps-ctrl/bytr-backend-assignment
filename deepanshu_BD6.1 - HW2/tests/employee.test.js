const {
    getAllEmployees,
    getEmployeeById,
    addNewEmployee,
} = require("../employee");

describe("Employee Function", () => {
    it("should get all employees", () => {
        const employees = getAllEmployees();
        expect(employees).toHaveLength(4);
        expect(employees).toEqual([
            { id: 1, name: "John Doe", position: "Software Engineer" },
            { id: 2, name: "Jane Smith", position: "Product Manager" },
            { id: 3, name: "Sam Johnson", position: "Designer" },
            { id: 4, name: "Lisa Brown", position: "DevOps Engineer" },
        ]);
    });

    it("should get employee by id", () => {
        const employee = getEmployeeById(1);
        expect(employee).toEqual({
            id: 1,
            name: "John Doe",
            position: "Software Engineer",
        });
    });

    it("should return undefined for non existent employee", () => {
        const employee = getEmployeeById(99);
        expect(employee).toBeUndefined();
    });

    it("should add new employee", () => {
        const newEmployee = {
            id: 5,
            name: "Abhishek",
            position: "Database Administrator",
        };
        const employee = addNewEmployee(newEmployee);
        expect(employee).toEqual(newEmployee);
    });
});
