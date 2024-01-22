const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// CORS 설정 추가
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// 프록시 미들웨어 설정
const proxyOptions = {
  target:
    "http://openapi.seoul.go.kr:8088/4d48766c7573756d31303757415a7157/json/culturalEventInfo",
  changeOrigin: true,
  pathRewrite: {
    "^/proxy/api/cultural-event-info": "",
  },
};

// '/proxy/api/cultural-event-info'로 시작하는 모든 요청을 프록시
app.use("/proxy/api/cultural-event-info", createProxyMiddleware(proxyOptions));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`CORS Anywhere server is running on port ${PORT}`);
});
