import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./screens/About";
import Home from "./screens/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;
