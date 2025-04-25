const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function summariseText(raw_text) {
    let data = JSON.stringify({
        "inputs": raw_text,
        "parameters": {
            "max_length": 600,
            "min_length": 30
        }
    });

    let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
        headers: {
            Authorization: "Bearer " + process.env.ACCESS_TOKEN,
            "Content-Type": "application/json",
        },
        data: data,
    };

    try {
        const response = await axios(config);
        return response.data[0]?.summary_text || response.data;
    }
    catch (error) {
        console.log("error basla", error.message);
        throw new Error("Sampla summarisation, kahitari zhala console check kara");
    }
}

module.exports = summariseText;