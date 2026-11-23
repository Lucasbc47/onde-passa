require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({"app": "OndePassa", "status": "online"});
})


app.listen(PORT, () => {
    console.log(`Backend do OndePassa no ar. Porta: ${PORT}.`)
})