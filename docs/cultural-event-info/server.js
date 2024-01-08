const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(express.json());

const proxyOptions = {
  target: "http://openapi.seoul.go.kr:8088",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "/", // 프록시로 사용할 API 경로 설정
  },
};

// "/api"로 시작하는 경로에 대해 프록시 미들웨어 생성
app.use(
  "/api/4d48766c7573756d31303757415a7157",
  createProxyMiddleware(proxyOptions)
);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
