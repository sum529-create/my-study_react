import axiosInstance from "./axiosInstance";

const BASE_URL = "http://localhost:3004";

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
    const response = await axiosInstance.get(url, {
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
