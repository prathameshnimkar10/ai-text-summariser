const express = require("express");
const bodyParser = require("body-parser");
const summariseText = require("./api/summarise");
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// app.get("/", (req, res) => {
//     res.send("Welcome to my AI-Text Summariser");
// })

app.post("/api/summarise", async (req, res) => {
    const { text_to_sum } = req.body;

    if (!text_to_sum || text_to_sum.length < 200 || text_to_sum.length > 100000) {
        return res.status(400).json({
            error: "Text length bagh chota motha asel",
        });
    }

    try {
        const summary = await summariseText(text_to_sum);
        res.json({ summary });
    }
    catch {
        console.log("error ala re", error.message);
        res.status(500).json({
            error: "summary nahi hou shakli",
        });
    }
});

app.listen(PORT, () => {
    console.log(`server suru zhala 3000 var, link -> http://localhost:${PORT}`);
})