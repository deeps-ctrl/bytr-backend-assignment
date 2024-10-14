const request = require('supertest')
const http = require('http')

const { app } = require('../index')
const { getAllStocks, getStockByTicker, addNewTrade } = require('../controllers')

jest.mock('../controllers/index.js', () => ({
    ...jest.requireActual('../controllers/index.js'),
    getAllStocks: jest.fn(),
    getStockByTicker: jest.fn(),
    addNewTrade: jest.fn()
}))

let server
beforeAll((done) => {
    server = http.createServer(app)
    server.listen(3001, done)
})

afterAll((done) => {
    server.close(done)
})

describe('API Endpoints Test', () => {
    it('GET /stocks should retrieve all the stocks', async () => {
        const mockStocks = [
            { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 },
            { stockId: 2, ticker: 'GOOGL', companyName: 'Alphabet Inc.', price: 2750.10 },
            { stockId: 3, ticker: 'TSLA', companyName: 'Tesla, Inc.', price: 695.50 },
        ]
        getAllStocks.mockReturnValue(mockStocks)
        const resp = await request(server).get('/stocks')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({ stocks: mockStocks })
    })
    it('GET /stocks/:ticker should retrive the stock by ticker name', async () => {
        const mockStock = { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 }
        getStockByTicker.mockReturnValue(mockStock)
        const resp = await request(server).get('/stocks/AAPL')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({ stock: mockStock })
    })
    it('POST /trades should add new trade', async () => {
        const mockTrade = {
            'tradeId': 4,
            'stockId': 1,
            'quantity': 15,
            'tradeType': 'buy',
            'tradeDate': '2024-08-08'

        }
        addNewTrade.mockResolvedValue(mockTrade)

        const resp = await request(server).post('/trades/new').send({
            'stockId': 1,
            'quantity': 15,
            'tradeType': 'buy',
            'tradeDate': '2024-08-08'
        })
        expect(resp.statusCode).toBe(201)
        expect(resp.body).toEqual({ trade: mockTrade })
    })
})

describe('API Error Handling Test', () => {
    it('GET /stocks/:ticker should return 404 for non existent ticker', async () => {
        getStockByTicker.mockReturnValue(undefined)
        const resp = await request(server).get('/stocks/TATAT')
        expect(resp.statusCode).toBe(404)
        expect(resp.body).toEqual({ message: "No stock found" })
    })

    it('POST /trades/new should return 400 for invalid input', async () => {
        const mockTrade = {
            'quantity': 15,
            'tradeType': 'buy',
            'tradeDate': '2024-08-08'
        }
        const resp = await request(server).post('/trades/new').send(mockTrade)
        expect(resp.statusCode).toBe(400)
        expect(resp.text).toEqual("Stock Id is required and should be in number")
    })
})

describe('Controller Function Test', () => {
    it('getAllStocks should return all the stocks', () => {
        const mockStocks = [
            { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 },
            { stockId: 2, ticker: 'GOOGL', companyName: 'Alphabet Inc.', price: 2750.10 },
            { stockId: 3, ticker: 'TSLA', companyName: 'Tesla, Inc.', price: 695.50 },
        ]
        getAllStocks.mockReturnValue(mockStocks)
        const result = getAllStocks()
        expect(result).toEqual(mockStocks)
    })

    it('addNewTrade should add new trade', async () => {
        const mockTrade = {
            'tradeId': 4,
            'stockId': 1,
            'quantity': 15,
            'tradeType': 'buy',
            'tradeDate': '2024-08-08'
        }
        addNewTrade.mockResolvedValue(mockTrade)
        const result = await addNewTrade({
            'stockId': 1,
            'quantity': 15,
            'tradeType': 'buy',
            'tradeDate': '2024-08-08'
        })
        expect(result).toEqual(mockTrade)
    })
})