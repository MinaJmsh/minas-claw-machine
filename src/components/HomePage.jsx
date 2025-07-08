import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";
import WindowControls from "../components/WindowControls";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="w-[852px] h-[571px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <WindowControls></WindowControls>
      {/* Screen area inside the frame */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ top: "60px", width: "804px", height: "493px" }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full text-white text-center">
          <h1 className="text-xl mb-6">🎮 Mina’s Claw Machine 🎮</h1>
          <button
            onClick={() => navigate("/game")}
            className="bg-pink-600 px-4 py-2 rounded hover:bg-pink-700 transition text-sm"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
