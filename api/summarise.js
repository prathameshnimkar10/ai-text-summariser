const axios = require("axios");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "fakt POST allowed" });
    }

    const { text_to_sum } = req.body;

    if (!text_to_sum || text_to_sum.length < 200 || text_to_sum.length > 100000) {
        return res.status(400).json({
            error: "text length bagh chota motha asel",
        });
    }

    const data = {
        inputs: text_to_sum,
        parameters: {
            max_length: 600,
            min_length: 30
        }
    };

    try {
        const response = await axios.post(
            "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
            data,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return res.status(200).json({ summary: response.data[0]?.summary_text || response.data });
    } catch (error) {
        console.log("error ala re", error.message);
        return res.status(500).json({ error: "summary nahi hou shakli" });
    }
};