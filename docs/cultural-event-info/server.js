const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.get(
  "/api/4d48766c7573756d31303757415a7157/json/culturalEventInfo/:startIdx/:endIdx/:codeNm?/:title?/:date?",
  async (req, res) => {
    try {
      const { startIdx, endIdx, codeNm, title, date } = req.params;
      let url = `http://openapi.seoul.go.kr:8088/4d48766c7573756d31303757415a7157/json/culturalEventInfo/${startIdx}/${endIdx}/`;

      if (codeNm) url += `${codeNm}/`;
      if (title) url += `${title}/`;
      if (date) url += `${date}/`;

      const response = await axios.get(url);
      res.json(response.data.culturalEventInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
