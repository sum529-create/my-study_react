import { Routes, Route } from "react-router";
import App from "./App";
import Cultural from "./routes/Cultural";
import Culturals from "./routes/Culturals";

const Router = () => (
  <Routes>
    <Route path="/*" element={<App />}>
      <Route index element={<Culturals />} />
      <Route path=":culturalInfo" element={<Cultural />} />
    </Route>
  </Routes>
);

export default Router;
