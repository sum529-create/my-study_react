import axios from "axios";

let BASE_URL = "";

// 만약 현재 실행 환경이 브라우저라면
if (typeof window !== "undefined") {
  // 현재 도메인의 호스트를 가져와서 서버 주소를 결정
  BASE_URL = window.location.protocol + "//" + window.location.host;
} else {
  // Node.js 환경이라면 로컬 개발 환경을 가정하고 설정
  BASE_URL = "http://127.0.0.1:8080";
}

// 실제 서버 주소에 "/proxy"를 추가
BASE_URL += "/proxy";

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
  let url = `${BASE_URL}/api/cultural-event-info/${startIdx}/${endIdx}/`;

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
