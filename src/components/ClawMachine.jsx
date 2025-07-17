import claw from "../assets/sprites/claw.png";
import machine from "../assets/machine3.png";
import Controls from "./Controls"; // ✅ import it
import { useEffect, useState } from "react";

export default function ClawMachine({
  grid,
  clawCol,
  isGrabbing,
  clawDropDepth,
  CELL,
  MAX_ROWS,
  GLASS_WIDTH,
  GLASS_HEIGHT,
  moveLeft,
  moveRight,
  grab,
}) {
  // در داخل کامپوننت ClawMachine
  const [animatedItems, setAnimatedItems] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newStates = {};

      grid.forEach((column) => {
        column.forEach((item) => {
          if (!item) return;
          // ۵۰٪ احتمال برای انیمیشن داشتن یا نداشتن
          newStates[item.id] = Math.random() < 0.5;
        });
      });

      setAnimatedItems(newStates);
    }, 500); // هر ۱.۵ ثانیه به‌روزرسانی

    return () => clearInterval(interval);
  }, [grid]);

  const translateX = clawCol * CELL;

  return (
    <div className="relative w-full h-full">
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
        {/* 🔳 Semi-transparent dark overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-30 z-10" />
        {/* Claw */}
        <div
          className="absolute z-10 z-50"
          style={{
            left: `${translateX}px`,
            top: 0,
            width: CELL,
            height: CELL,
            transform: `translateY(${clawDropDepth}px)`,
            transition: "left 0.3s ease-in-out, transform 0.5s ease",
          }}
        >
          <img src={claw} alt="claw" className="w-full h-full" />
        </div>

        {/* Grid */}
        <div className="absolute bottom-0 left-0 flex items-end w-full z-50">
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
                    className=" flex items-center justify-center"
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full transition-transform duration-300 ease-in-out"
                      style={{
                        transform: animatedItems[item.id]
                          ? "rotate(5deg) translateY(-2px)"
                          : "rotate(0deg) translateY(0)",
                      }}
                    />
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

      {/* ✅ Controls under machine image */}
      <Controls
        moveLeft={moveLeft}
        moveRight={moveRight}
        grab={grab}
        isGrabbing={isGrabbing}
      />
    </div>
  );
}
