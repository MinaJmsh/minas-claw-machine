import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { items as allItems } from "../utils/itemsData";
import mina from "../assets/sprites/mina.png";
import claw from "../assets/sprites/claw.png";

const ROWS = 2;
const COLS = 4;
const GAME_TIME = 30; // seconds

// Initialize a 2x4 grid with random items from allItems
function generateGrid() {
  const grid = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      // Pick random item from allItems
      const item = allItems[Math.floor(Math.random() * allItems.length)];
      row.push({ ...item, id: `${r}-${c}` });
    }
    grid.push(row);
  }
  return grid;
}

export default function Game() {
  const navigate = useNavigate();

  const [grid, setGrid] = useState(generateGrid());
  const [clawCol, setClawCol] = useState(0);
  const [score, setScore] = useState(0);
  const [minaEmotion, setMinaEmotion] = useState("idle"); // idle, happy, sad
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      // Save high score and go to end screen
      const highScore = Math.max(
        score,
        parseInt(localStorage.getItem("highScore") || "0")
      );
      if (score > highScore)
        localStorage.setItem("highScore", score.toString());
      navigate("/end", {
        state: { score, highScore: Math.max(score, highScore) },
      });
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, score, navigate]);

  // Move claw left
  const moveLeft = () => {
    if (isGrabbing) return;
    setClawCol((c) => (c === 0 ? COLS - 1 : c - 1));
  };

  // Move claw right
  const moveRight = () => {
    if (isGrabbing) return;
    setClawCol((c) => (c === COLS - 1 ? 0 : c + 1));
  };

  // Grab logic
  const grab = () => {
    if (isGrabbing) return;
    setIsGrabbing(true);

    // Simulate claw going down and back up with timeout
    setTimeout(() => {
      // Check from bottom row up for item in clawCol
      let grabbedItem = null;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (grid[r][clawCol]) {
          grabbedItem = grid[r][clawCol];
          // Remove the grabbed item from grid
          const newGrid = grid.map((row) => [...row]);
          newGrid[r][clawCol] = null;
          setGrid(newGrid);
          break;
        }
      }

      // Update score and mina emotion
      if (grabbedItem) {
        setScore((s) => s + grabbedItem.value);
        setMinaEmotion(grabbedItem.value > 0 ? "happy" : "sad");

        // After 1.2s reset emotion to idle
        setTimeout(() => setMinaEmotion("idle"), 1200);
      }

      setIsGrabbing(false);
    }, 1000); // 1 second grab animation
  };

  return (
    <div className="relative bg-black min-h-screen flex flex-col items-center font-pixel text-white p-4 select-none">
      {/* Timer and Score */}
      <div className="w-full flex justify-between mb-6 px-4 text-xl">
        <div>Time Left: {timeLeft}s</div>
        <div>Score: {score}</div>
      </div>

      {/* Mina character */}
      <div className="mb-6 w-28 h-28">
        <img
          src={mina}
          alt="Mina"
          className={`w-full h-full transition-transform ${
            minaEmotion === "happy"
              ? "scale-110"
              : minaEmotion === "sad"
              ? "grayscale opacity-70"
              : ""
          }`}
        />
      </div>

      {/* Claw + Grid */}
      <div className="relative w-[320px] h-[240px] bg-gray-900 rounded-lg shadow-lg">
        {/* Claw */}
        <div
          className={`absolute top-0 left-0 transition-transform duration-500`}
          style={{
            transform: `translateX(${clawCol * 80}px) translateY(${
              isGrabbing ? 100 : 0
            }px)`,
            width: 64,
            height: 64,
            pointerEvents: "none",
          }}
        >
          <img src={claw} alt="claw" className="w-full h-full" />
        </div>

        {/* Grid items */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 p-4 pt-20">
          {grid.flatMap((row, r) =>
            row.map((item, c) =>
              item ? (
                <div
                  key={item.id}
                  className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center border-2 border-pink-600"
                >
                  <img src={item.img} alt={item.name} className="w-12 h-12" />
                </div>
              ) : (
                <div
                  key={`${r}-${c}`}
                  className="w-16 h-16 bg-gray-900 rounded border border-gray-700"
                />
              )
            )
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-6">
        <button
          onClick={moveLeft}
          disabled={isGrabbing}
          className="bg-pink-600 px-6 py-3 rounded disabled:opacity-50"
        >
          Move Left
        </button>
        <button
          onClick={grab}
          disabled={isGrabbing}
          className="bg-green-600 px-6 py-3 rounded disabled:opacity-50"
        >
          Grab
        </button>
        <button
          onClick={moveRight}
          disabled={isGrabbing}
          className="bg-pink-600 px-6 py-3 rounded disabled:opacity-50"
        >
          Move Right
        </button>
      </div>
    </div>
  );
}
