import axios from "axios";

// 프록시 서버 주소로 수정
// const BASE_URL = "http://127.0.0.1:8080/proxy";
const BASE_URL = "https://f87e-211-207-166-10.ngrok-free.app/proxy";

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
    const response = await axios.get(url, {
      // 여기에 헤더를 추가합니다.
      headers: {
        withCredentials: true,
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": true,
      },
    });
    return response.data.culturalEventInfo;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw new Error(error.message);
  }
};
