import SquareGameButton from "./SquareGameButton";
import RoundGameButton from "./RoundGameButton";

import leftArrow from "../assets/icons/leftarrow.png";
import rightArrow from "../assets/icons/rightarrow.png";

export default function Controls({ moveLeft, moveRight, grab, isGrabbing }) {
  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 flex gap-4 z-30"
      style={{ top: "408px" }}
    >
      <SquareGameButton
        onClick={moveLeft}
        labelImg={leftArrow}
        width={60}
        height={60}
      />

      <RoundGameButton onClick={grab} size={65} />

      <SquareGameButton
        onClick={moveRight}
        labelImg={rightArrow}
        width={64}
        height={64}
      />
    </div>
  );
}
