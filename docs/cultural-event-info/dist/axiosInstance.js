"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var axiosInstance = axios_1.default.create({
    baseURL: 'http://localhost:3004', // 기본 URL 설정
    timeout: 10000, // 요청 시간 초과 설정 (10초)
});
exports.default = axiosInstance;
