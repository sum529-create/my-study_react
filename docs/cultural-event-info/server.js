// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// CORS 설정 추가
app.use(cors());

app.use(express.json());

app.get(
  "/proxy/api/cultural-event-info/:startIdx/:endIdx/:codeNm?/:title?/:date?",
  async (req, res) => {
    const { startIdx, endIdx, codeNm, title, date } = req.params;
    try {
      let url = `http://openapi.seoul.go.kr:8088/4d48766c7573756d31303757415a7157/json/culturalEventInfo/${startIdx}/${endIdx}/`;
      if (codeNm) url += `${codeNm}/`;
      if (title) url += `${title}/`;
      if (date) url += `${date}/`;
      const response = await axios.get(url);

      // CORS 헤더 추가
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
