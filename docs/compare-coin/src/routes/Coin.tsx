import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    text-align: center;
    flex-grow: 1;
    padding-right: -24px;
  }
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
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive === true ? props.theme.accentColor : props.theme.textColor};
  // $isActive -> 스타일 컴포넌트에게 props로 전달되기를 희망 but HTML의 Attributes로 DOM을 조작하기를 희망하는 것으로 이해하여 이러한 에러 발생(Warming)
  a {
    display: block;
  }
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
  const { coinId } = useParams<keyof RouteParams>();
  const location = useLocation();
  const state = location.state as RouteState; // react-router-dom v6부터 제네릭 지원 안함
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await axios(
  //       `https://api.coinpaprika.com/v1/coins/${coinId}`
  //     );
  //     const priceData = await axios(
  //       `https://api.coinpaprika.com/v1/tickers/${coinId}`
  //     );

  //     setInfo(infoData.data);
  //     setPriceInfo(priceData.data);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  // > 값을 구분하기 위한 key값으로 coinId를 중복하여 사용하여야 함 useQuery(coinId, ..)
  //    -> React query가 query를 array로 보고 있어, array형식으로 변환 후 각각 하나의 고유한 id를 만들어 준다.
  // > isLoading이 두 아이템 모두 사용하고 있어 직접 이름을 바꿔줘야 함 ) {isLoading: xxxx ...}
  // > (coinId!)
  //    -> react-router-dom v6버전 이후로 useParams를 사용하게 될 시
  //       "string || undefined"형식으로 자동 설정되어, 이 형식은 'xx'형식의 매개변수에 할당 될수 없다는 에러 발생
  //        ! (Non-null assertion operator)
  //        => 확장 할당 어션셜로 값이 무조건 할당되어 있다고 컴파일러에게 전달하여 값이 없어도 변수를 사용할 수 있도록 하게 함
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      // refetchInterval: 5000, // 5초마다 refetch
    }
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to={"/my-study_react/compare-coin"}>
          <span className="material-symbols-outlined">list</span>
        </Link>
        <Title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab $isActive={chartMatch ? true : false}>
              <Link
                to={
                  location.pathname.includes("chart")
                    ? `/my-study_react/compare-coin/${coinId}`
                    : `/my-study_react/compare-coin/${coinId}/chart`
                }
              >
                Chart
              </Link>
            </Tab>
            <Tab $isActive={priceMatch ? true : false}>
              <Link
                to={
                  location.pathname.includes("price")
                    ? `/my-study_react/compare-coin/${coinId}`
                    : `/my-study_react/compare-coin/${coinId}/price`
                }
              >
                Price
              </Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId: coinId, USD: tickersData?.quotes.USD }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
