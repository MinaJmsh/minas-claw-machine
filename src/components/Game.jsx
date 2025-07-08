import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { items as allItems } from "../utils/itemsData";
import minaIdle from "../assets/sprites/mina.png";
import minaHappy from "../assets/sprites/mina-happy.png";
import minaCry from "../assets/sprites/mina-cry.png";

import claw from "../assets/sprites/claw.png";
import bg from "../assets/bg.png";
import WindowControls from "./WindowControls";

const CELL = 42;
const GAP = 6;
const MAX_ROWS = 4;
const COLS = 5;
const GAME_TIME = 30;

// Generate 5 columns with 1–4 random items each
function generateGrid() {
  const grid = [];
  for (let c = 0; c < COLS; c++) {
    const count = Math.floor(Math.random() * 4) + 1;
    const column = [];
    for (let i = 0; i < count; i++) {
      const item = allItems[Math.floor(Math.random() * allItems.length)];
      column.push({ ...item, id: `${c}-${i}-${Date.now()}-${Math.random()}` });
    }
    grid.push(column);
  }
  return grid;
}

export default function Game() {
  const navigate = useNavigate();

  const [grid, setGrid] = useState(generateGrid());
  const [clawCol, setClawCol] = useState(0);
  const [score, setScore] = useState(0);
  const [minaEmotion, setMinaEmotion] = useState("idle");
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      const highScore = Math.max(
        score,
        parseInt(localStorage.getItem("highScore") || "0")
      );
      if (score > highScore)
        localStorage.setItem("highScore", score.toString());
      navigate("/end", { state: { score, highScore } });
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, score, navigate]);

  // Movement
  const moveLeft = () =>
    !isGrabbing && setClawCol((c) => (c === 0 ? COLS - 1 : c - 1));
  const moveRight = () =>
    !isGrabbing && setClawCol((c) => (c === COLS - 1 ? 0 : c + 1));

  const grab = () => {
    if (isGrabbing) return;
    setIsGrabbing(true);

    setTimeout(() => {
      if (grid[clawCol].length) {
        const grabbed = grid[clawCol][grid[clawCol].length - 1];
        const newCol = grid[clawCol].slice(0, -1);
        const newGrid = grid.map((col, i) => (i === clawCol ? newCol : col));
        setGrid(newGrid);

        setScore((s) => s + grabbed.value);
        setMinaEmotion(grabbed.value > 0 ? "happy" : "sad");
        setTimeout(() => setMinaEmotion("idle"), 1200);
      }
      setIsGrabbing(false);
    }, 1000);
  };

  const translateX = clawCol * (CELL + GAP);
  const targetCol = grid[clawCol];

  // ✅ Claw drop Y offset so it lands right on top of the topmost item
  const clawDropDepth =
    isGrabbing && targetCol
      ? 48 + (MAX_ROWS - targetCol.length) * (CELL + GAP)
      : 0;

  return (
    <div
      className="w-[852px] h-[571px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <WindowControls></WindowControls>
      {/* Play area inside frame */}
      <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 w-[804px] h-[493px] flex flex-col items-center">
        {/* HUD */}
        <div className="flex justify-between text-sm px-2 w-full text-white">
          <span>Time: {timeLeft}s</span>
          <span>Score: {score}</span>
        </div>

        {/* Center area */}
        <div className="relative w-full flex justify-center mt-4">
          {/* Claw machine */}
          <div
            className="relative bg-gray-900 rounded-lg shadow-lg flex justify-center items-end"
            style={{
              width: COLS * (CELL + GAP) + GAP,
              height: CELL + GAP + MAX_ROWS * (CELL + GAP) + 36, // more height to fix overflow
              padding: 8,
            }}
          >
            {/* Claw */}
            <div
              className="absolute top-0 left-0 transition-transform duration-500 z-10"
              style={{
                transform: `translateX(${translateX}px) translateY(${clawDropDepth}px)`,
                width: CELL,
                height: CELL,
              }}
            >
              <img src={claw} alt="claw" className="w-full h-full" />
            </div>

            {/* Grid */}
            <div
              className="absolute flex gap-[6px] left-1"
              style={{ top: "32px" }}
            >
              {grid.map((column, colIndex) => (
                <div
                  key={colIndex}
                  className="flex flex-col items-center w-[42px]"
                >
                  <div style={{ height: "48px" }} /> {/* claw row space */}
                  <div
                    className="flex flex-col justify-end gap-[6px]"
                    style={{ height: "186px" }}
                  >
                    {Array.from({ length: MAX_ROWS }).map((_, rowIndex) => {
                      const item = column[MAX_ROWS - 1 - rowIndex];
                      return item ? (
                        <div
                          key={item.id}
                          className="w-[42px] h-[42px] bg-gray-800 rounded flex items-center justify-center border border-pink-600"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-9 h-9"
                          />
                        </div>
                      ) : (
                        <div
                          key={`empty-${rowIndex}`}
                          className="w-[42px] h-[42px] bg-gray-900 rounded border border-gray-700"
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mina character beside machine */}
          <div
            className="absolute"
            style={{
              left: `calc(50% + ${((CELL + GAP) * COLS + 8) / 2 + 16}px)`,
              top: "30%",
            }}
          >
            <img
              src={
                minaEmotion === "happy"
                  ? minaHappy
                  : minaEmotion === "sad"
                  ? minaCry
                  : minaIdle
              }
              alt="Mina"
              className={`w-32 h-32 transition-transform ${
                minaEmotion === "happy"
                  ? "scale-110"
                  : minaEmotion === "sad"
                  ? ""
                  : ""
              }`}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={moveLeft}
            disabled={isGrabbing}
            className="bg-pink-600 px-4 py-2 rounded disabled:opacity-40 text-xs"
          >
            Left
          </button>
          <button
            onClick={grab}
            disabled={isGrabbing}
            className="bg-green-600 px-4 py-2 rounded disabled:opacity-40 text-xs"
          >
            Grab
          </button>
          <button
            onClick={moveRight}
            disabled={isGrabbing}
            className="bg-pink-600 px-4 py-2 rounded disabled:opacity-40 text-xs"
          >
            Right
          </button>
        </div>
      </div>
    </div>
  );
}
