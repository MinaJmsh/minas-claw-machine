import { useLocation, useNavigate } from "react-router-dom";
import bg from "../assets/backgrounds/bg.png";
import WindowControls from "./WindowControls";
import bgVideo from "../assets/backgrounds/live-bg-reverse.mp4";
import GameButton from "./GameButton"; // افزودن این

export default function EndScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score } = state || { score: 0 };

  // Use electron-store or fallback to localStorage
  const getHighScore = () => {
    const stored =
      window.electron?.getHighScore?.() ?? localStorage.getItem("highScore");
    const parsed = parseInt(stored, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const highScore = getHighScore();

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

        {/* Content centered both horizontally and vertically */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[804px] flex flex-col items-center z-50">
          <h1
            className="text-6xl mb-4"
            style={{
              textShadow: "2px 2px 2px rgba(0, 0, 0)",
            }}
          >
            {" "}
            Game Over{" "}
          </h1>
          <p
            className="text-2xl"
            style={{
              textShadow: "2px 2px 2px rgba(0, 0, 0)",
            }}
          >
            Your Score: {score}
          </p>
          <p
            className="text-pink-400 mt-2 text-2xl"
            style={{
              textShadow: "2px 2px 2px rgba(0, 0, 0)",
            }}
          >
            High Score: {highScore}
          </p>

          <div className="mt-6 flex gap-4">
            <GameButton
              label="play again"
              onClick={() => navigate("/game")}
              width={180}
              height={64}
            />
            <GameButton
              label="go to menu"
              onClick={() => navigate("/")}
              width={180}
              height={64}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
