import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import styles from "./css/App.module.css";
import Detail from "./routes/Detail";
function App() {
  return (
    <Router>
      <Routes>
        <Route className={styles.body} path="/movie/:id" element={<Detail />} />{" "}
        {/* ':' movie 하단 route값으로 원하는 값 추가가능 */}
        <Route className={styles.body} path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
