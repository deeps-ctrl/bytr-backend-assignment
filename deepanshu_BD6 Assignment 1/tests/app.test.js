const request = require('supertest')
const http = require('http')

const { app } = require('../index')
const { getAllShows, getShowById, addShow } = require('../controllers')

jest.mock('../controllers/index.js', () => ({
    ...jest.requireActual('../controllers/index.js'),
    getAllShows: jest.fn(),
    getShowById: jest.fn(),
    addShow: jest.fn()
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
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('GET /shows should retrieve all the shows', async () => {
        const mockShows = [
            { 'showId': 1, 'title': 'The Lion King', 'theatreId': 1, 'time': '7:00 PM' },
            { 'showId': 2, 'title': 'Hamilton', 'theatreId': 2, 'time': '8:00 PM' },
            { 'showId': 3, 'title': 'Wicked', 'theatreId': 3, 'time': '9:00 PM' },
            { 'showId': 4, 'title': 'Les Misérables', 'theatreId': 1, 'time': '6:00 PM' }
        ]
        getAllShows.mockReturnValue(mockShows)
        const resp = await request(server).get('/shows')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({ shows: mockShows })
        expect(resp.body.shows.length).toBe(4)
    })

    it('GET /shows/:id should return the matching show with the id', async () => {
        const mockShow = { 'showId': 1, 'title': 'The Lion King', 'theatreId': 1, 'time': '7:00 PM' }
        getShowById.mockReturnValue(mockShow)
        const resp = await request(server).get('/shows/1')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({ show: mockShow })
    })

    it('POST /shows add a new show', async () => {
        const mockShow = {
            'showId': 5,
            'title': 'Phantom of the Opera',
            'theatreId': 2,
            'time': '5:00 PM'
        }
        addShow.mockResolvedValue(mockShow)
        const resp = await request(server).post('/shows').send({
            'title': 'Phantom of the Opera',
            'theatreId': 2,
            'time': '5:00 PM'
        })
        expect(resp.statusCode).toBe(201)
        expect(resp.body).toEqual(mockShow)
    })
})

describe('API Endpoints Error Handling Test', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('GET /shows/:id should return 404 for invalid id ', async () => {
        getShowById.mockReturnValue(undefined)
        const resp = await request(server).get('/shows/1999')
        expect(resp.statusCode).toBe(404)
        expect(resp.body.message).toEqual('Invalid ID')
    })

    it('POST /shows should return 400 for invalid input', async () => {
        const newShow = {
            'theatreId': 2,
            'time': '5:00 PM'
        }
        const resp = await request(server).post('/shows').send(newShow)
        expect(resp.statusCode).toBe(400)
        expect(resp.text).toEqual("Title is required and should be string")
    })
})

describe('Controller Function test', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("getAllShows should retreive all reviews", async () => {
        const mockShows = [
            { showId: 1, title: 'The Lion King', theatreId: 1, time: '7:00 PM' },
            { showId: 2, title: 'Hamilton', theatreId: 2, time: '8:00 PM' },
            { showId: 3, title: 'Wicked', theatreId: 3, time: '9:00 PM' },
            { showId: 4, title: 'Les Misérables', theatreId: 1, time: '6:00 PM' },
        ]
        getAllShows.mockReturnValue(mockShows)
        const result = getAllShows()
        expect(result).toEqual(mockShows)
    })

    it("addShow should add new show", async () => {
        const mockShow = {
            'showId': 5,
            'title': 'Phantom of the Opera',
            'theatreId': 2,
            'time': '5:00 PM'
        }
        addShow.mockResolvedValue(mockShow)
        const result = await addShow({
            'title': 'Phantom of the Opera',
            'theatreId': 2,
            'time': '5:00 PM'
        })
        expect(result).toEqual(mockShow)
    })
})