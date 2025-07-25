import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { items as allItems } from "../utils/itemsData";
import bg from "../assets/backgrounds/bg.png";
import bgVideo from "../assets/backgrounds/live-bg-2.mp4";
import WindowControls from "./WindowControls";
import ClawMachine from "./ClawMachine";
import Characters from "./Characters";
import useScoreSound from "../hooks/useScoreSound"; // 🔊
import useLoseSound from "../hooks/useLoseSound"; // 🔊
import useOverSound from "../hooks/useOverSound"; // 🔊

// 🧮 Constants
const MAX_ROWS = 3;
const COLS = 6;
const GAME_TIME = 30;
const GLASS_WIDTH = 370;
const GLASS_HEIGHT = 300;
const CELL = GLASS_WIDTH / COLS;

function generateGrid() {
  let grid = [];
  let totalItems = 0;

  //at least 15 items
  while (totalItems < 15) {
    grid = [];
    totalItems = 0;

    for (let c = 0; c < COLS; c++) {
      const count = Math.floor(Math.random() * MAX_ROWS) + 1;
      const column = [];

      for (let i = 0; i < count; i++) {
        const item = allItems[Math.floor(Math.random() * allItems.length)];
        column.push({
          ...item,
          id: `${c}-${i}-${Date.now()}-${Math.random()}`,
        });
      }

      totalItems += column.length;
      grid.push(column);
    }
  }

  return grid;
}

// High score access wrappers
const getHighScore = () => {
  const stored =
    window.electron?.getHighScore?.() ?? localStorage.getItem("highScore");
  const parsed = parseInt(stored, 10);
  return isNaN(parsed) ? -Infinity : parsed;
};

const setHighScore = (score) => {
  if (window.electron?.setHighScore) {
    window.electron.setHighScore(score);
  } else {
    localStorage.setItem("highScore", score.toString());
  }
};

export default function Game() {
  const navigate = useNavigate();
  const [grid, setGrid] = useState(generateGrid());
  const [clawCol, setClawCol] = useState(0);
  const [score, setScore] = useState(0);
  const [minaEmotion, setMinaEmotion] = useState("idle");
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [scoreMessage, setScoreMessage] = useState("");
  const playScoreSound = useScoreSound(); // 🔊
  const playLoseSound = useLoseSound(); // 🔊
  const playOverSound = useOverSound(); // 🔊

  useEffect(() => {
    if (timeLeft <= 0) {
      const currentHighScore = getHighScore();
      if (score > currentHighScore || currentHighScore === -Infinity) {
        setHighScore(score);
      }
      playOverSound();
      navigate("/end", { state: { score } }); // High score will be fetched on EndScreen
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, score, navigate]);

  useEffect(() => {
    if (isGridEmpty(grid)) {
      setTimeout(() => {
        const currentHighScore = getHighScore();
        if (score > currentHighScore || currentHighScore === -Infinity) {
          setHighScore(score);
        }
        navigate("/end", { state: { score } });
      }, 2000); // زمان هماهنگ با انیمیشن بالا رفتن claw
    }
  }, [grid, score, navigate]);

  const isGridEmpty = (grid) => {
    return grid.every((col) => col.length === 0);
  };

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
        if (grabbed.value > 0) {
          playScoreSound();
        } else {
          playLoseSound();
        }

        // تنظیم پیام نمره
        setScoreMessage(
          grabbed.value > 0
            ? `You scored ${grabbed.value} points!`
            : `You lost ${Math.abs(grabbed.value)} points!`
        );

        // پاک کردن پیام بعد از ۲ ثانیه
        setTimeout(() => setScoreMessage(""), 2000);

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

        <div className="absolute  left-1/2 transform -translate-x-1/2 w-[804px] h-[490px] flex flex-col items-center z-50">
          {/* HUD */}
          <div
            className="flex justify-between text-2xl px-2 w-full text-white fixed"
            style={{
              textShadow: "2px 2px 2px rgba(0, 0, 0)",
            }}
          >
            <span
              className={`transition-all duration-200 ${
                timeLeft <= 5 ? "text-pink-400 animate-blink" : ""
              }`}
            >
              Time: {timeLeft}s
            </span>
            <span>Score: {score}</span>
          </div>

          {/* Claw machine image */}
          <ClawMachine
            grid={grid}
            clawCol={clawCol}
            isGrabbing={isGrabbing}
            clawDropDepth={clawDropDepth}
            CELL={CELL}
            MAX_ROWS={MAX_ROWS}
            GLASS_WIDTH={GLASS_WIDTH}
            GLASS_HEIGHT={GLASS_HEIGHT}
            moveLeft={moveLeft}
            moveRight={moveRight}
            grab={grab}
            scoreMessage={scoreMessage}
          />

          {/* Use Characters component here */}
          <Characters minaEmotion={minaEmotion} />
        </div>
      </div>
    </div>
  );
}
