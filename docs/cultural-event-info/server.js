const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const axios = require("axios");

app.use(express.json());

// 프록시 설정
app.use(
  "/my-study_react/cultural-event-info",
  createProxyMiddleware({
    target: "http://openapi.seoul.go.kr:8088", // 실제 API 엔드포인트
    changeOrigin: true,
    pathRewrite: {
      "^/my-study_react/cultural-event-info": "", // API 경로 변경
    },
  })
);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
