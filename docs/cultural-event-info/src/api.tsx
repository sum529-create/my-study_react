import axios from "axios";

const BASE_URL = "https://sum529-create.github.io/api"; // Express 서버의 주소로 수정
// const BASE_URL = "/api";
// const BASE_URL = "https://crossorigin.me/http://openapi.seoul.go.kr:8088";

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
  let url = `${BASE_URL}/4d48766c7573756d31303757415a7157/json/culturalEventInfo/${startIdx}/${endIdx}/`;

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
