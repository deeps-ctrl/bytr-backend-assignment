const express = require('express')

const app = express()
app.use(express.json())

const { getAllShows, getShowById, addShow } = require('./controllers')
const { validateShow } = require('./validation')

app.get('/shows', (req, res) => {
    try {
        const shows = getAllShows()
        res.status(200).json({ shows })
    } catch (error) {
        res.status(500).json({ message: `Error ${error.message}` })
    }
})

app.get('/shows/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const show = getShowById(id)
        if (!show) {
            return res.status(404).json({ message: 'Invalid ID' })
        }
        res.status(200).json({ show })
    } catch (error) {
        res.status(500).json({ message: `Error ${error.message}` })
    }
})

app.post('/shows', async (req, res) => {
    try {
        const show = req.body
        const error = validateShow(show)
        if (error) {
            return res.status(400).send(error)
        }
        const updateShow = await addShow(show)
        res.status(201).json(updateShow)
    } catch (error) {
        res.status(500).json({ message: `Error ${error.message}` })
    }
})

module.exports = { app }