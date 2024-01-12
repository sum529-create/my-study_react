import axios from "axios";

const BASE_URL = "https://cultural-event-info-00018db00a6d.herokuapp.com/";
// const BASE_URL = "https://sum529-create.github.io/api"; // Express 서버의 주소로 수정
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
  let url = `${BASE_URL}/api/cultural-event-info/${startIdx}/${endIdx}/`;

  if (codeNm) url += `${codeNm}/`;
  if (title) url += `${title}/`;
  if (date) url += `${date}/`;
  // const queryParams = new URLSearchParams();
  // if (codeNm) queryParams.append("codeNm", codeNm);
  // if (title) queryParams.append("title", title);
  // if (date) queryParams.append("date", date);

  // if (queryParams.toString()) {
  //   url += `?${queryParams.toString()}`;
  // }

  try {
    const response = await axios.get(url, { withCredentials: true });
    return response.data.culturalEventInfo;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw new Error(error.message);
  }
};
