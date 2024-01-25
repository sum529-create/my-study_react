import { Routes, Route } from "react-router";
import App from "./App";
import Cultural from "./routes/Cultural";
import Culturals from "./routes/Culturals";

const Router = () => (
  <Routes>
    <Route path="/my-study_react/cultural-event-info/*" element={<App />}>
      <Route index element={<Culturals />} />
      <Route path=":culturalIdx" element={<Cultural />} />
    </Route>
  </Routes>
);

export default Router;
