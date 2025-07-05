import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white font-pixel text-center">
      <h1 className="text-4xl mb-10">🎮 Mina’s Claw Machine 🎮</h1>
      <button
        onClick={() => navigate("/game")}
        className="bg-pink-600 px-8 py-4 rounded hover:bg-pink-700 transition"
      >
        Start Game
      </button>
    </div>
  );
}
