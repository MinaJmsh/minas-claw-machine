import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { items as allItems } from "../utils/itemsData";
import minaIdle from "../assets/sprites/mina.png";
import minaHappy from "../assets/sprites/mina-happy.png";
import minaCry from "../assets/sprites/mina-cry.png";
import machine from "../assets/machine.png";
import claw from "../assets/sprites/claw.png";
import bg from "../assets/bg.png";
import WindowControls from "./WindowControls";

// 🧮 Constants
const MAX_ROWS = 3;
const COLS = 7;
const GAME_TIME = 600;
const GLASS_WIDTH = 400;
const GLASS_HEIGHT = 265;
const CELL = GLASS_WIDTH / COLS;

function generateGrid() {
  const grid = [];
  for (let c = 0; c < COLS; c++) {
    const count = Math.floor(Math.random() * MAX_ROWS) + 1;
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

  const translateX = clawCol * CELL;
  const targetCol = grid[clawCol];

  const clawDropDepth = isGrabbing
    ? targetCol?.length
      ? (MAX_ROWS - targetCol.length) * CELL +
        (GLASS_HEIGHT - (MAX_ROWS + 1) * CELL) +
        CELL * 0.5
      : GLASS_HEIGHT - CELL
    : 0;

  return (
    <div
      className="w-[852px] h-[571px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <WindowControls />

      <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 w-[804px] h-[480px] flex flex-col items-center">
        {/* HUD */}
        <div className="flex justify-between text-xl px-2 w-full text-white">
          <span>Time: {timeLeft}s</span>
          <span>Score: {score}</span>
        </div>

        {/* Claw machine image */}
        <img
          src={machine}
          alt="machine"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full object-contain pointer-events-none z-20"
        />

        {/* Play area inside the glass of the claw machine */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
          style={{
            top: "65px",
            width: `${GLASS_WIDTH}px`,
            height: `${GLASS_HEIGHT}px`,
          }}
        >
          {/* Claw */}
          <div
            className="absolute z-10 transition-transform duration-500"
            style={{
              left: `${translateX}px`,
              top: 0,
              width: CELL,
              height: CELL,
              transform: `translateY(${clawDropDepth}px)`,
            }}
          >
            <img src={claw} alt="claw" className="w-full h-full" />
          </div>

          {/* Grid */}
          <div className="absolute bottom-0 left-0 flex items-end w-full">
            {grid.map((column, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col items-center"
                style={{ width: `${100 / grid.length}%` }}
              >
                {Array.from({ length: MAX_ROWS }).map((_, rowIndex) => {
                  const item = column[MAX_ROWS - 1 - rowIndex];
                  return item ? (
                    <div
                      key={item.id}
                      className="rounded border border-pink-600 flex items-center justify-center"
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                      }}
                    >
                      <img src={item.img} alt={item.name} className="w-9 h-9" />
                    </div>
                  ) : (
                    <div
                      key={`empty-${rowIndex}`}
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-6 z-50">
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

        {/* Mina beside machine at bottom right */}
        <div
          className="absolute z-30"
          style={{
            bottom: "-12px",
            left: "calc(50% + 210px)",
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
              minaEmotion === "happy" ? "scale-110" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}
