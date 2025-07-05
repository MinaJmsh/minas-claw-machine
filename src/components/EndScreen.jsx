import { useLocation, useNavigate } from "react-router-dom";

export default function EndScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, highScore } = state || { score: 0, highScore: 0 };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white font-pixel text-center">
      <h1 className="text-4xl mb-4">🎉 Game Over 🎉</h1>
      <p className="text-2xl">Your Score: {score}</p>
      <p className="text-xl text-pink-400 mt-2">High Score: {highScore}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-pink-600 px-6 py-3 rounded hover:bg-pink-700"
      >
        Play Again
      </button>
    </div>
  );
}
