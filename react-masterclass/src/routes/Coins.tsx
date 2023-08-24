import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(p) => p.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(p) => p.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(p) => p.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const testCoins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  // useEffect : 특정한 시기에만 코드를 실행시켜줌(ex. componenet가 시작할 경우? 아님 끝날경우?)
  // ()() 바로 function을 실행 할 수 있음
  // 만약 console을 바로 실행하고 싶을 경우
  // useEffect(() => {(console.log('something!'))()},[])

  const getCoins = async () => {
    // fetch 방법
    // const res2 = await fetch("https://api.coinpaprika.com/v1/coins");
    // const json = await await res2.json();

    // axios 사용 -> json 변환 번거로움 감소
    const res = await axios("https://api.coinpaprika.com/v1/coins");
    setCoins(res.data.slice(0, 100));
    setLoading(false);
  };
  useEffect(() => {
    setLoading(false); // server 내부 에러로 임시 처리
    // getCoins(); // server 내부 에러로 임시로 testCoin값 사용
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinList>
        {loading ? (
          <Loader />
        ) : (
          testCoins.map((e) => (
            <Coin key={e.id}>
              <Link to={`/${e.id}`}> {e.name} &rarr;</Link>
            </Coin>
          ))
        )}
      </CoinList>
    </Container>
  );
}

export default Coins;