import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Festivals from "./routes/Festivals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Festivals />,
      },
    ],
  },
]);

export default router;
