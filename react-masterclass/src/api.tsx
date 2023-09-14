import axios from "axios";

export const fetchCoins = async () => {
  return await axios("https://api.coinpaprika.com/v1/coins").then((e) =>
    e.data.slice(0, 100)
  );
};
