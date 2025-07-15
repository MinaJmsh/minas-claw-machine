export default function Controls({ moveLeft, moveRight, grab, isGrabbing }) {
  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 flex gap-4 z-30"
      style={{ top: "400px" }}
    >
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
  );
}
