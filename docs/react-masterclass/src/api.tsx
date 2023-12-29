import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = async () => {
  return await axios(`${BASE_URL}/coins`).then((e) => e.data.slice(0, 100));
};

export const fetchCoinInfo = async (coinId: string) => {
  return await axios(BASE_URL + `/coins/${coinId}`).then((e) => e.data);
};

export const fetchCoinTickers = async (coinId: string) => {
  return await axios(`${BASE_URL}/tickers/${coinId}`).then((e) => e.data);
};

export const fetchCoinHistory = async (coinId: string) => {
  return await axios(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((e) => e.data);
};
