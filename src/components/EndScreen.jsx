import { useLocation, useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";

export default function EndScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, highScore } = state || { score: 0, highScore: 0 };

  return (
    <div
      className="w-[852px] h-[571px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* inner screen */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-white text-center"
        style={{ top: "60px", width: "804px", height: "493px" }}
      >
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
  );
}
