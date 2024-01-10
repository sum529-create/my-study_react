const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.get("/api/cultural-event-info/:startIdx/:endIdx", async (req, res) => {
  const { startIdx, endIdx } = req.params;

  try {
    const response = await axios.get(
      `http://openapi.seoul.go.kr:8088/4d48766c7573756d31303757415a7157/json/culturalEventInfo/${startIdx}/${endIdx}/`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
