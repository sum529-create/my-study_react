import axios from "axios";

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const getBaseUrl = () => {
  // 만약 현재 실행 환경이 브라우저이고, 모바일 기기라면
  if (typeof window !== "undefined" && isMobile) {
    // 모바일 기기용 서버 주소를 반환
    return "http://192.168.227.220:8080";
  } else {
    // 그 외의 경우 또는 로컬 개발 환경이라면
    return "http://127.0.0.1:8080";
  }
};

const BASE_URL = getBaseUrl();

// 실제 서버 주소에 "/proxy"를 추가
const FINAL_BASE_URL = BASE_URL + "/proxy";

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
  let url = `${FINAL_BASE_URL}/api/cultural-event-info/${startIdx}/${endIdx}/`;

  if (codeNm) url += `${codeNm}/`;
  if (title) url += `${title}/`;
  if (date) url += `${date}/`;

  try {
    const response = await axios.get(url);
    return response.data.culturalEventInfo;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw new Error(error.message);
  }
};
