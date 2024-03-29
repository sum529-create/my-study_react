import { createBrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "",
//         element: <Coins />,
//       },
//       {
//         path: "/:coinId",
//         element: <Coin />,
//         children: [
//           {
//             path: "chart",
//             element: <Chart />,
//           },
//           {
//             path: "price",
//             element: <Price />,
//           },
//         ],
//       },
//     ],
//   },
// ]);
const Router = () => (
  <Routes>
    <Route path="/my-study_react/compare-coin" element={<App />}>
      <Route index element={<Coins />} />
      <Route path=":coinId" element={<Coin />}>
        <Route path="chart" element={<Chart />} />
        <Route path="price" element={<Price />} />
      </Route>
    </Route>
  </Routes>
);

export default Router;
