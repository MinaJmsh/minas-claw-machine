import { useLocation, useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";
import WindowControls from "./WindowControls";
import bgVideo from "../assets/live-bg-2.mp4";

export default function EndScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, highScore } = state || { score: 0, highScore: 0 };

  return (
    <div
      className="w-[852px] h-[571px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <WindowControls />
      <div
        className="absolute left-1/2 transform -translate-x-1/2 overflow-hidden"
        style={{ top: "53px", width: "804px", height: "490px" }}
      >
        {/* 🎥 Video background */}
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="absolute  left-1/2 transform -translate-x-1/2 w-[804px] h-[480px] flex flex-col items-center z-50">
          <h1 className="text-xl mb-4">🎉 Game Over 🎉</h1>
          <p className="text-lg">Your Score: {score}</p>
          <p className="text-pink-400 mt-2 text-sm">High Score: {highScore}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-pink-600 px-4 py-2 rounded hover:bg-pink-700 text-sm"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
