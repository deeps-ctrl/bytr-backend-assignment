const request = require("supertest");
const http = require("http");
const {
    app,
    getAllEmployees,
    getEmployeeById,
    addEmployee
} = require("../index")

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getAllEmployees: jest.fn(),
    getEmployeeById: jest.fn(),
    addEmployee: jest.fn()
}));


let server;
beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("API Endpoint", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should retreive all the employees", async () => {
        const mockEmployees = [
            { 'id': 1, 'name': 'John Doe', 'email': 'john.doe@example.com', 'department': 'Engineering' },
            { 'id': 2, 'name': 'Jane Smith', 'email': 'jane.smith@example.com', 'department': 'Marketing' }
        ];
        getAllEmployees.mockResolvedValue(mockEmployees);
        const result = await request(server).get("/employees");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockEmployees);
    });

    it("should retreive the employee details for the given id", async () => {
        const mockEmployee = { 'id': 1, 'name': 'John Doe', 'email': 'john.doe@example.com', 'department': 'Engineering' };
        getEmployeeById.mockResolvedValue(mockEmployee);

        const result = await request(server).get('/employees/details/1');
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockEmployee);
    });

    it("should return undefined for non-existent employee", async () => {
        getEmployeeById.mockResolvedValue(undefined);
        const result = await request(server).get("/employees/details/999");
        expect(result.statusCode).toEqual(404);
    });

    it("should add new employee", async () => {
        const mockEmployee = { 'id': 3, 'name': 'Alice Brown', 'email': 'alice.brown@example.com', 'department': 'Sales' };
        addEmployee.mockResolvedValue(mockEmployee);

        const result = await request(server).post("/employees/new").send({
            'name': 'Alice Brown',
            'email': 'alice.brown@example.com',
            'department': 'Sales'
        });
        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual(mockEmployee);
    })
})