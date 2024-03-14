const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());

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
    "http://openapi.seoul.go.kr:8088/6a656f5a4b73756d37324842427267/json/culturalEventInfo",
  changeOrigin: true,
  pathRewrite: {
    "^/proxy/api/cultural-event-info": "",
  },
};

app.use("/proxy/api/cultural-event-info", createProxyMiddleware(proxyOptions));
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`CORS Anywhere server is running on port ${PORT}`);
});
