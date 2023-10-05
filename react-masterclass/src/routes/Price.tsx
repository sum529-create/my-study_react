import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const InfoArea = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgba(0 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin: 25px 0px;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 5;
      transform: none;
    }
  }
  animation: fadeIn 0.5s ease-in-out;
`;
const InfoItem = styled.div`
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
interface PriceProps {
  USD: {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price: number;
    ath_date: string;
    percent_from_price_ath: number;
  };
}

function Price() {
  const { USD } = useOutletContext<PriceProps>();

  return (
    <>
      <InfoArea>
        <InfoItem>
          <span>15m Ago</span>
          <span
            style={
              USD.percent_change_15m > 0
                ? { color: "#e84118" }
                : { color: "#00a8ff" }
            }
          >
            {USD.percent_change_15m}%
          </span>
        </InfoItem>
        <InfoItem>
          <span>30m Ago</span>
          <span
            style={
              USD.percent_change_30m > 0
                ? { color: "#e84118" }
                : { color: "#00a8ff" }
            }
          >
            {USD.percent_change_30m}%
          </span>
        </InfoItem>
        <InfoItem>
          <span>1h Ago</span>
          <span
            style={
              USD.percent_change_1h > 0
                ? { color: "#e84118" }
                : { color: "#00a8ff" }
            }
          >
            {USD.percent_change_1h}%
          </span>
        </InfoItem>
        <InfoItem>
          <span>6h Ago</span>
          <span
            style={
              USD.percent_change_6h > 0
                ? { color: "#e84118" }
                : { color: "#00a8ff" }
            }
          >
            {USD.percent_change_6h}%
          </span>
        </InfoItem>
        <InfoItem>
          <span>12h Ago</span>
          <span
            style={
              USD.percent_change_12h > 0
                ? { color: "#e84118" }
                : { color: "#00a8ff" }
            }
          >
            {USD.percent_change_12h}%
          </span>
        </InfoItem>
      </InfoArea>
      <InfoArea>
        <InfoItem>
          <span>24h Ago</span>
          <span
            style={
              USD.percent_change_24h > 0
                ? { color: "#e84118" }
                : { color: "#00a8ff" }
            }
          >
            {USD.percent_change_24h}%
          </span>
        </InfoItem>
        <InfoItem>
          <span>7d Ago</span>
          <span
            style={
              USD.percent_change_7d > 0
                ? { color: "#e84118" }
                : { color: "#00a8ff" }
            }
          >
            {USD.percent_change_7d}%
          </span>
        </InfoItem>
        <InfoItem>
          <span>30d Ago</span>
          <span
            style={
              USD.percent_change_30d > 0
                ? { color: "#e84118" }
                : { color: "#00a8ff" }
            }
          >
            {USD.percent_change_30d}%
          </span>
        </InfoItem>
        <InfoItem>
          <span>1y Ago</span>
          <span
            style={
              USD.percent_change_1y > 0
                ? { color: "#e84118" }
                : { color: "#00a8ff" }
            }
          >
            {USD.percent_change_1y}%
          </span>
        </InfoItem>
      </InfoArea>
    </>
  );
}

export default Price;
