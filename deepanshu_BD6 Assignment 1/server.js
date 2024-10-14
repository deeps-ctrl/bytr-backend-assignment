const { app } = require('./index.js')
const PORT = 3000

app.listen(PORT, () => console.log(`Server started listening on ${PORT} port`))