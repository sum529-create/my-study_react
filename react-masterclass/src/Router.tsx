import {createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Coins/>,
      },
      {
        path: "/:coinId",
        element:<Coin/>,
        children: [
          {
            path:"chart",
            element: <Chart/>,
          },
          {
            path:"price",
            element:<Price/>,
          }
        ]
      }
    ]
  }
])


export default router;
