const { getAllProducts, getProductById, addNewProduct } = require("../product");

describe("Product function", () => {
    it("should get all the product", () => {
        const products = getAllProducts();
        expect(products).toEqual([
            { id: 1, name: "Laptop", category: "Electronics" },
            { id: 2, name: "Coffee Maker", category: "Appliances" },
            { id: 3, name: "Headphones", category: "Electronics" },
            { id: 4, name: "Running Shoes", category: "Footwear" },
        ]);
        expect(products).toHaveLength(4);
    });

    it("should get product by id", () => {
        const product = getProductById(1);
        expect(product).toEqual({ id: 1, name: "Laptop", category: "Electronics" });
    });

    it("should return undefined for non existent product", () => {
        const product = getProductById(99);
        expect(product).toBeUndefined();
    });

    it("should add new product", () => {
        const product = {
            name: "Tablet",
            category: "Electronics",
        };
        const newProduct = addNewProduct(product);
        expect(newProduct).toEqual({
            id: 5,
            name: "Tablet",
            category: "Electronics",
        });
    });
});
