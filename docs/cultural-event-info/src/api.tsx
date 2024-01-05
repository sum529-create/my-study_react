// import axios from "axios";

// const BASE_URL = `http://openapi.seoul.go.kr:8088/`;
// const BASE_KEY = `4d48766c7573756d31303757415a7157`;

// export const fetchCulturalInfo = async (
//   startIdx: number,
//   endIdx: number,
//   options: {
//     codeNm?: string;
//     title?: string;
//     date?: string;
//   } = {}
// ) => {
//   const { codeNm, title, date } = options;
//   let url = `${
//     BASE_URL + BASE_KEY
//   }/json/culturalEventInfo/${startIdx}/${endIdx}/`;

//   if (codeNm) url += `${codeNm}/`;
//   if (title) url += `${title}/`;
//   if (date) url += `${date}/`;

//   return await axios(url).then((e) => e.data.culturalEventInfo);
// };
import axios from "axios";

const BASE_URL = `http://localhost:3002`;

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
  let url = `${BASE_URL}/api/culturalEventInfo/${startIdx}/${endIdx}/`;

  if (codeNm) url += `${codeNm}/`;
  if (title) url += `${title}/`;
  if (date) url += `${date}/`;

  return await axios.get(url).then((response) => response.data);
};
