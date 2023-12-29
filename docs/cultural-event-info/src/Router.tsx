import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Cultural from "./routes/Cultural";
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
      {
        path: "/:culturalIdx",
        element: <Cultural />,
      },
    ],
  },
]);

export default router;
