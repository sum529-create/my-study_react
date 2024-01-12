const express = require("express");
const axios = require("axios");

const app = express();
const cors = require("cors");
// 서버 응답 헤더에 CORS 설정 추가
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://sum529-create.github.io"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());
app.use(express.json());

app.get(
  "/api/cultural-event-info/:startIdx/:endIdx/:codeNm?/:title?/:date?",
  async (req, res) => {
    const { startIdx, endIdx, codeNm, title, date } = req.params;
    try {
      let url = `http://openapi.seoul.go.kr:8088/4d48766c7573756d31303757415a7157/json/culturalEventInfo/${startIdx}/${endIdx}/`;
      if (codeNm) url += `${codeNm}/`;
      if (title) url += `${title}/`;
      if (date) url += `${date}/`;
      const response = await axios.get(url);
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
