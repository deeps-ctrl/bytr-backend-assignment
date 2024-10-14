function validateTrade(trade) {
    if (!trade.stockId || typeof trade.stockId !== "number") {
        return "Stock Id is required and should be in number"
    }
    if (!trade.quantity || typeof trade.quantity !== "number") {
        return "Quantity is required and should be in number"
    }
    if (!trade.tradeType || typeof trade.tradeType !== "string") {
        return "Trade type is required and should be in string"
    }
    if (!trade.tradeDate || typeof trade.tradeDate !== "string") {
        return "Trade Date is required and should be in string"
    }
}

module.exports = { validateTrade }