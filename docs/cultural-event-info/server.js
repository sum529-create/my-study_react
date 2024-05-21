const express = require("express");
const axiosInstance = require('./src/axiosInstance');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3004;

// CORS 설정 추가
app.use(cors());
app.use(express.json());

// API 엔드포인트 설정
app.get("/api/cultural-event-info/:startIdx/:endIdx/:codeNm?/:title?/:date?", async (req, res) => {
  const { startIdx, endIdx, codeNm, title, date } = req.params;
  try {
    // 서울 열린데이터 광장의 API 엔드포인트
    let url = `http://openapi.seoul.go.kr:8088/4d48766c7573756d31303757415a7157/json/culturalEventInfo/${startIdx}/${endIdx}/`;
    if (codeNm) url += `${codeNm}/`;
    if (title) url += `${title}/`;
    if (date) url += `${date}/`;
    
    // 서울 열린데이터 광장의 API에 요청 보내기
    const response = await axiosInstance.get(url);
    
    // CORS 헤더 추가
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // 클라이언트에 응답 전송
    res.json(response.data);
  } catch (error) {
    // 오류 발생 시 500 상태 코드와 오류 메시지 응답
    res.status(500).json({ error: error.message });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
