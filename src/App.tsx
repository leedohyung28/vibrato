import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Home from "./routes/Home";
import Chart from "./routes/chart/chart";
import Artist from "./routes/artist/artist";
import Album from "./routes/album/album";
import Track from "./routes/track/track";

function App() {
  return (
    <Router>
      <Header />

      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Chart" element={<Chart />} />
          <Route path="/Artist" element={<Artist />} />
          <Route path="/Album" element={<Album />} />
          <Route path="/Track" element={<Track />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
