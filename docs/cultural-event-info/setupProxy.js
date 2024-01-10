const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// 프록시 설정
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://openapi.seoul.go.kr:8088", // 실제 API 엔드포인트
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // API 경로 변경
    },
  })
);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
