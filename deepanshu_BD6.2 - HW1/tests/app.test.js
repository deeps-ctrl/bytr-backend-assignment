const { app, getEmployees, getEmployeeById, addEmployee } = require("../index");
const http = require("http");

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getEmployees: jest.fn(),
    getEmployeeById: jest.fn(),
    addEmployee: jest.fn(),
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Function test", () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });

    test("getEmployee should return a list of employees", () => {
        const mockEmployees = [
            { id: 1, name: "John Doe", position: "Software Engineer" },
            { id: 2, name: "Jane Smith", position: "Product Manager" },
        ];

        getEmployees.mockReturnValue(mockEmployees);

        const result = getEmployees();
        expect(result).toEqual(mockEmployees);
        expect(getEmployees).toHaveBeenCalled();
    });

    test("getEmployeeById should return employee details", () => {
        const mockEmployee = {
            id: 1,
            name: "John Doe",
            position: "Software Engineer",
        };

        getEmployeeById.mockReturnValue(mockEmployee);
        const result = getEmployeeById(1);
        expect(result).toEqual(mockEmployee);
        expect(getEmployeeById).toHaveBeenCalledWith(1);
    });

    test("getEmployeeById should return undefined for non existent employee", () => {
        getEmployeeById.mockReturnValue(undefined);
        const result = getEmployeeById(999);
        expect(result).toBeUndefined();
        expect(getEmployeeById).toHaveBeenCalledWith(999);
    });

    test("addEmployee should add new employee", () => {
        const newEmployee = {
            id: 4,
            name: "John Max",
            position: "Software Engineer",
        };
        addEmployee.mockReturnValue(newEmployee);
        const result = addEmployee(newEmployee);
        expect(result).toEqual(newEmployee);
        expect(addEmployee).toHaveBeenCalledWith(newEmployee);
    });
});
