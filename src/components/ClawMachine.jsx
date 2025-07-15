import claw from "../assets/sprites/claw.png";
import machine from "../assets/machine.png";
import Controls from "./Controls"; // ✅ import it

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
