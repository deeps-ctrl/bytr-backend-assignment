const express = require('express')

const { getAllStocks, getStockByTicker, addNewTrade } = require('./controllers')
const { validateTrade } = require('./validation')

const app = express()
app.use(express.json())


app.get('/stocks', (req, res) => {
    try {
        const stocks = getAllStocks()
        if (stocks.length === 0) {
            return res.status(404).json({ message: "No stocks found" })
        }
        res.status(200).json({ stocks })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

app.get('/stocks/:ticker', (req, res) => {
    try {
        const ticker = req.params.ticker
        const stock = getStockByTicker(ticker)
        if (!stock) {
            return res.status(404).json({ message: "No stock found" })
        }
        res.status(200).json({ stock })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

app.post('/trades/new', async (req, res) => {
    try {
        const trade = req.body
        const error = validateTrade(trade)
        if (error) {
            return res.status(400).send(error)
        }
        const newTrade = await addNewTrade(trade)
        res.status(201).json({ trade: newTrade })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

module.exports = { app }