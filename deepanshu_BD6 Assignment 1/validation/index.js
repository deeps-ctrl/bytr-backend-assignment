function validateShow(show) {
    if (!show.title || typeof show.title !== "string") {
        return "Title is required and should be string"
    }
    if (!show.theatreId || typeof show.theatreId !== "number") {
        return "Theatre id is required and should be number"
    }
    if (!show.time || typeof show.time !== "string") {
        return "Time is required and should be string"
    }
    return null
}

module.exports = { validateShow }