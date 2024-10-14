const express = require('express')

const app = express()
app.use(express.json())

const { getAllShows, getShowById, addShow } = require('./controllers')
const { validateShow } = require('./validation')

app.get('/shows', (req, res) => {
    const shows = getAllShows()
    res.status(200).json({ shows })
})

app.get('/shows/:id', (req, res) => {
    const id = Number(req.params.id)
    const show = getShowById(id)
    if (!show) {
        return res.status(404).json({ message: 'Invalid ID' })
    }
    res.status(200).json({ show })
})

app.post('/shows', async (req, res) => {
    const show = req.body
    const error = validateShow(show)
    if (error) {
        return res.status(400).send(error)
    }
    const updateShow = await addShow(show)
    res.status(201).json(updateShow)
})

module.exports = { app }