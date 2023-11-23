import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Festivals from "./routes/Culturals";

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
