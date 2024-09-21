const request = require("supertest");
const http = require("http");
const { app } = require("../index");
const {
    getAllEmployees,
    getEmployeeById,
    getAllDepartments,
    getDepartmentById
} = require("../employee");

jest.mock("../employee.js", () => ({
    ...jest.requireActual('../employee.js'),
    getAllEmployees: jest.fn(),
    getEmployeeById: jest.fn(),
    getAllDepartments: jest.fn(),
    getDepartmentById: jest.fn()
}))

let server;
beforeAll(done => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll(done => {
    server.close(done)
});

describe("API Error Handling Test",()=> {
    beforeEach(()=> {
        jest.clearAllMocks();
    });

    it("GET /api/employees should return 404 when no employees are found", async () => {
        getAllEmployees.mockReturnValue([]);

        const res = await request(server).get("/api/employees");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("No employees found");
    });

    it("GET /api/employees/:id should return 404 status code when specified id is not found", async() => {
        getEmployeeById.mockReturnValue(undefined);

        const res = await request(server).get("/api/employees/999");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("No employees found");
    });

    it("GET /api/departments should return 404 when no departments are found", async () => {
        getAllDepartments.mockReturnValue([]);

        const res = await request(server).get("/api/departments");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("No departments found");
    });

    it("GET /api/departments/:id should return 404 when specified id is not found", async () => {
        getDepartmentById.mockReturnValue(undefined);

        const res = await request(server).get("/api/departments/999");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("Department not found");
    });
})