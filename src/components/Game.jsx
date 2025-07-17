import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { items as allItems } from "../utils/itemsData";
import minaIdle from "../assets/sprites/mina.png";
import minaHappy from "../assets/sprites/mina-happy.png";
import minaCry from "../assets/sprites/mina-cry.png";
import parsaIdle from "../assets/sprites/parsa.png";
import parsaHappy from "../assets/sprites/parsa-happy.png";
import parsaCry from "../assets/sprites/parsa-sad.png";
import minaBlink from "../assets/sprites/mina-blink.png";
import parsaBlink from "../assets/sprites/parsa-blink.png";
import bg from "../assets/bg.png";
import bgVideo from "../assets/live-bg-2.mp4";
import WindowControls from "./WindowControls";
import ClawMachine from "./ClawMachine";
import gamebg from "../assets/gamebg.png";

// 🧮 Constants
const MAX_ROWS = 3;
const COLS = 7;
const GAME_TIME = 600;
const GLASS_WIDTH = 410;
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
  const [minaBlinking, setMinaBlinking] = useState(false);
  const [parsaBlinking, setParsaBlinking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  // Inside your component function:
  const [minaBreathing, setMinaBreathing] = useState(false);
  const [parsaBreathing, setParsaBreathing] = useState(false);

  useEffect(() => {
    const minaInterval = setInterval(() => {
      setMinaBreathing((b) => !b);
    }, 1000); // every 1 second

    const parsaInterval = setInterval(() => {
      setParsaBreathing((b) => !b);
    }, 1100); // slightly offset for no sync

    return () => {
      clearInterval(minaInterval);
      clearInterval(parsaInterval);
    };
  }, []);

  useEffect(() => {
    if (minaEmotion === "happy") {
      setIsJumping(true);
      const timeout = setTimeout(() => {
        setIsJumping(false);
      }, 300); // jump lasts 200ms

      return () => clearTimeout(timeout);
    }
  }, [minaEmotion]);

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

  // Mina blinking every ~1.5s
  useEffect(() => {
    if (minaEmotion !== "idle") return;

    const blinkInterval = setInterval(() => {
      setMinaBlinking(true);
      setTimeout(() => setMinaBlinking(false), 150); // original blink duration
    }, 1500 + Math.random() * 500); // 1.5s–2s

    return () => clearInterval(blinkInterval);
  }, [minaEmotion]);

  // Parsa blinking every ~1.6s with offset
  useEffect(() => {
    if (minaEmotion !== "idle") return;

    const blinkInterval = setInterval(() => {
      setParsaBlinking(true);
      setTimeout(() => setParsaBlinking(false), 150);
    }, 1600 + Math.random() * 500); // 1.6s–2.1s

    return () => clearInterval(blinkInterval);
  }, [minaEmotion]);

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
      <div
        className="absolute left-1/2 transform -translate-x-1/2 overflow-hidden"
        style={{ top: "53px", width: "804px", height: "490px" }}
      >
        {/* 🎥 Video background */}
        {/* 🎥 Video background */}
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="absolute  left-1/2 transform -translate-x-1/2 w-[804px] h-[480px] flex flex-col items-center z-50">
          {/* HUD */}
          <div
            className="flex justify-between text-2xl px-2 w-full text-white fixed"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            <span>Time: {timeLeft}s</span>
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
          />
          {/* Mina beside machine at bottom right */}
          <div
            className="absolute z-30"
            style={{
              bottom: "0px",
              left: "calc(50% + 230px)",
              transform: isJumping
                ? "translateY(-20px)"
                : `scale(${minaBreathing ? 1.01 : 1}) translateY(0)`,
              transition: "transform 0.5s ease",
            }}
          >
            <img
              src={
                minaEmotion === "happy"
                  ? minaHappy
                  : minaEmotion === "sad"
                  ? minaCry
                  : minaBlinking
                  ? minaBlink
                  : minaIdle
              }
              alt="Mina"
              className="w-32 h-32"
            />
          </div>

          {/* Parsa beside machine at bottom left */}
          <div
            className="absolute z-30"
            style={{
              bottom: "0px",
              right: "calc(50% + 230px)",
              transform: `scaleX(-1) scale(${parsaBreathing ? 1.01 : 1})`,
              transition: "transform 0.5s ease",
            }}
          >
            <img
              src={
                minaEmotion === "happy"
                  ? parsaHappy
                  : minaEmotion === "sad"
                  ? parsaCry
                  : parsaBlinking
                  ? parsaBlink
                  : parsaIdle
              }
              alt="Parsa"
              className="w-32 h-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
