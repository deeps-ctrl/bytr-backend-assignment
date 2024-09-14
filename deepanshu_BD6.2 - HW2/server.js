const { app } = require("./index");
const PORT = 3000;

app.listen(PORT, () =>
    console.log(`Server Started listening on ${PORT} port.`)
);
