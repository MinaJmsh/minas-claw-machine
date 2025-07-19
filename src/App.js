import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Game from "./components/Game";
import EndScreen from "./components/EndScreen";
import { AudioProvider } from "./components/AudioProvider"; // 👈 import

function App() {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<Game />} />
          <Route path="/end" element={<EndScreen />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;
