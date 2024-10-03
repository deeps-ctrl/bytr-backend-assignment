const request = require("supertest");
const http = require("http");

const { app, validateEmployee, validateCompany } = require("../index");

jest.mock("../index.js", () => (
    {
        ...jest.requireActual("../index.js"),
        validateEmployee: jest.fn(),
        validateCompany: jest.fn()
    })
);


let server;
beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("API Endpoints To Add Data", () => {
    it("should add new employee with valid input", async () => {
        const resp = await request(server).post("/api/employees").send({
            'name': 'John Doe',
            'companyId': 1
        });
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            'id': 1,
            'name': 'John Doe',
            'companyId': 1
        });
    });

    it("should return 400 for invalid employee input", async () => {
        const resp = await request(server).post("/api/employees").send({
            'name': 'John Doe'
        });
        expect(resp.statusCode).toEqual(400);
        expect(resp.text).toEqual("Company Id is required and should be a number");
    });

    it("should add new company with valid input", async () => {
        const resp = await request(server).post("/api/companies").send({
            name: 'TechCorp'
        });
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            'id': 1,
            'name': 'TechCorp'
        });
    });

    it("should return 400 for invalid company input", async () => {
        const resp = await request(server).post("/api/companies").send({});
        expect(resp.statusCode).toEqual(400);
        expect(resp.text).toEqual("Company name is required and should be a string");
    });
});

describe("Validate Functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("validateEmployee functions should return null for valid input", () => {
        const mockEmployee = {
            'name': 'John Doe',
            'companyId': 1
        }
        validateEmployee.mockReturnValue(null);
        const resp = validateEmployee(mockEmployee);
        expect(resp).toBeNull();
        expect(validateEmployee).toBeCalledWith(mockEmployee);
    });

    it("should return error message for invalid input for employee ",() => {
        const mockEmployee = {
            name : 'John Doe'
        };
        validateEmployee.mockReturnValue("Company Id is required and should be a number");
        const resp = validateEmployee(mockEmployee);
        expect(resp).toEqual("Company Id is required and should be a number");
        expect(validateEmployee).toBeCalledWith(mockEmployee);
    });

    it("should return null for valid input of company", () => {
        const mockCompany = {
            'name': 'Tech World'
        }
        validateCompany.mockReturnValue(null);
        const resp = validateCompany(mockCompany);
        expect(resp).toBeNull();
        expect(validateCompany).toBeCalledWith(mockCompany);
    });

    it("should return error message for invalid input for company ",() => {
        const mockCompany = {};
        validateCompany.mockReturnValue("Company name is required and should be a string");
        const resp = validateCompany(mockCompany);
        expect(resp).toEqual("Company name is required and should be a string");
        expect(validateCompany).toBeCalledWith(mockCompany);
    });
})


