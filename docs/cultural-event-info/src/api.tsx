import axios from "axios";

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const getBaseUrl = () => {
  // 현재 실행 환경이 브라우저이고 모바일 기기라면
  if (typeof window !== "undefined" && isMobile) {
    // 모바일 기기용 서버 주소 반환
    return "http://192.168.227.220:8080";
  } else {
    // 그 외의 경우 또는 로컬 개발 환경이라면
    return "http://127.0.0.1:8080";
  }
};

const BASE_URL = getBaseUrl();

// API 엔드포인트에 대한 상대 경로 사용
const API_ENDPOINT = "/proxy/api/cultural-event-info";

export const fetchCulturalInfo = async (
  startIdx: number,
  endIdx: number,
  options: {
    codeNm?: string;
    title?: string;
    date?: string;
  } = {}
) => {
  const { codeNm, title, date } = options;
  let url = `${BASE_URL}${API_ENDPOINT}/${startIdx}/${endIdx}/`;

  if (codeNm) url += `${codeNm}/`;
  if (title) url += `${title}/`;
  if (date) url += `${date}/`;

  try {
    const response = await axios.get(url);
    return response.data.culturalEventInfo;
  } catch (error: any) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
    throw new Error(error.message);
  }
};
