import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(p) => p.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
interface IInfoData {
  // interface 명을 지정할 경우 I를 앞에 써주는 경우가 많다
  // interface api 꿀팁★
  /*
    1) api값 chrome 콘솔 list ► 우측 마우스 -> store object as global variable -> temp1에 저장됨
    2) > Object.keys(temp1).join() -> 객체 keys 한줄에 출력 복사
    3) Ctrl(Command) + D : 같은 문자열 ','(comma)를 선택 후 엔터 후 ':'와 ';' 추가
    4) > Object.values(temp1).map(e => typeof e).join(); -> value의 형식 한줄에 출력 복사
    5) 위와 같은 방식으로 Comma 엔터후 잘라내기 Ctrl(Command) + x
    6) 이전 복사 해둔 keys값 전체 드래그 선택 -> Shift+Alt(Option)+i : 선택한 모든 문자열을 기준으로 우측 끝 위치
    6) 각 문자열에 커서가 생겼으면 ':'와 ';' 사이에 커서를 두고 Ctrl(Command) + v 복사

  */

  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<keyof RouteParams>();
  const location = useLocation();
  const state = location.state as RouteState; // react-router-dom v6부터 제네릭 지원 안함
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await axios(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      );
      const priceData = await axios(
        `https://api.coinpaprika.com/v1/tickers/${coinId}`
      );

      setInfo(infoData.data);
      setPriceInfo(priceData.data);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading" : info?.name}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : (
        <>
        <Overview>
          <OverviewItem>
            <span>Rank:</span>
            <span>{info?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Symbol:</span>
            <span>${info?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Open Source:</span>
            <span>{info?.open_source ? "Yes" : "No"}</span>
          </OverviewItem>
        </Overview>
        <Description>{info?.description}</Description>
        <Overview>
          <OverviewItem>
            <span>Total Suply:</span>
            <span>{priceInfo?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Max Supply:</span>
            <span>{priceInfo?.max_supply}</span>
          </OverviewItem>
        </Overview>
        {/* <Switch>
          <Route path={`/${coinId}/price`}>
            <Price />
          </Route>
          <Route path={`/${coinId}/chart`}>
            <Chart />
          </Route>
        </Switch> */}
        <Link to="price">price</Link>
        <Link to="chart">chart</Link>
        <Outlet context={{coinId: coinId}}/>
      </>
      )}
    </Container>
  );
}

export default Coin;
