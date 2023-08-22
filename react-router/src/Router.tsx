import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorComponent from "./components/ErrorComponent";
import About from "./screens/About";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import User from "./screens/users/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "users/:userId", // param값이 포함된 url일 경우 ':' 포함
        // * param값을 children으로 별도로 적지않고 users/:userId를 한번에 사용하는 이유
        // -> 사용자가 users만을 별도 주소로 사용하는 일이 없기때문
        // - 사용자가 users url을 입력하게 된다면 404 빈 페이지로 보냄
        element: <User />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
