import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { items as allItems } from "../utils/itemsData";
import mina from "../assets/sprites/mina.png";
import claw from "../assets/sprites/claw.png";
import bg from "../assets/bg.png";

const ROWS = 2;
const COLS = 4;
const GAME_TIME = 10;

// build 2 × 4 grid
function generateGrid() {
  const grid = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
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
  const [minaEmotion, setMinaEmotion] = useState("idle");
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [isGrabbing, setIsGrabbing] = useState(false);

  /* ---------------- Timer ---------------- */
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
    const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, score, navigate]);

  /* ---------------- Controls ---------------- */
  const moveLeft = () =>
    !isGrabbing && setClawCol((c) => (c === 0 ? COLS - 1 : c - 1));
  const moveRight = () =>
    !isGrabbing && setClawCol((c) => (c === COLS - 1 ? 0 : c + 1));

  const grab = () => {
    if (isGrabbing) return;
    setIsGrabbing(true);

    setTimeout(() => {
      let grabbed = null;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (grid[r][clawCol]) {
          grabbed = grid[r][clawCol];
          const g2 = grid.map((row) => [...row]);
          g2[r][clawCol] = null;
          setGrid(g2);
          break;
        }
      }

      if (grabbed) {
        setScore((s) => s + grabbed.value);
        setMinaEmotion(grabbed.value > 0 ? "happy" : "sad");
        setTimeout(() => setMinaEmotion("idle"), 1200);
      }
      setIsGrabbing(false);
    }, 1000);
  };

  /* ---------------- JSX ---------------- */
  return (
    <div
      className="w-[852px] h-[571px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* play‑field area inside frame */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ top: "60px", width: "804px", height: "493px" }}
      >
        {/* top HUD */}
        <div className="flex justify-between text-white text-sm px-4">
          <span>Time: {timeLeft}s</span>
          <span>Score: {score}</span>
        </div>

        {/* Mina */}
        <div className="mx-auto mt-2 w-20 h-20">
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

        {/* Claw + grid */}
        <div className="mx-auto mt-4 relative w-[320px] h-[240px] bg-gray-900 rounded-lg">
          {/* claw */}
          <div
            className="absolute top-0 left-0 transition-transform duration-500"
            style={{
              transform: `translateX(${clawCol * 80}px) translateY(${
                isGrabbing ? 100 : 0
              }px)`,
              width: 64,
              height: 64,
            }}
          >
            <img src={claw} alt="claw" className="w-full h-full" />
          </div>

          {/* items */}
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

        {/* buttons */}
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
