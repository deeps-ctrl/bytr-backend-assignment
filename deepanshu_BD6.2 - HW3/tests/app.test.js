const { app, getProducts, getProductById, addNewProduct } = require("../index");
const http = require("http");

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getProducts: jest.fn(),
    getProductById: jest.fn(),
    addNewProduct: jest.fn(),
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
    test("getProducts should return list of all products", () => {
        const mockProduct = [
            { id: 1, name: "Laptop", category: "Electronics" },
            { id: 2, name: "Coffee Maker", category: "Appliances" },
        ];

        getProducts.mockReturnValue(mockProduct);
        const result = getProducts();
        expect(result).toEqual(mockProduct);
        expect(getProducts).toHaveBeenCalled();
    });

    test("getProductById should return product details", () => {
        const mockProduct = { id: 1, name: "Laptop", category: "Electronics" };

        getProductById.mockReturnValue(mockProduct);
        const result = getProductById(1);
        expect(result).toEqual(mockProduct);
        expect(getProductById).toHaveBeenCalledWith(1);
    });

    test("getProductById should return undefined for non existent product", () => {
        getProductById.mockReturnValue(undefined);
        const result = getProductById(999);
        expect(result).toBeUndefined();
        expect(getProductById).toHaveBeenCalledWith(999);
    });

    test("addNewProduct should add new product", () => {
        const product = {
            id: 5,
            name: "Tablet",
            category: "Electronics",
        };
        addNewProduct.mockReturnValue(product);
        const result = addNewProduct(product);
        expect(result).toEqual(product);
        expect(addNewProduct).toHaveBeenCalledWith(product);
    });
});
