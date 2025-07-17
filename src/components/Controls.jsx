import SquareGameButton from "./SquareGameButton";
import RoundGameButton from "./RoundGameButton";

import leftArrow from "../assets/leftarrow.png";
import rightArrow from "../assets/rightarrow.png";

export default function Controls({ moveLeft, moveRight, grab, isGrabbing }) {
  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 flex gap-4 z-30"
      style={{ top: "380px" }}
    >
      <SquareGameButton
        onClick={moveLeft}
        labelImg={leftArrow}
        width={64}
        height={64}
      />

      <RoundGameButton onClick={grab} size={70} />

      <SquareGameButton
        onClick={moveRight}
        labelImg={rightArrow}
        width={64}
        height={64}
      />
    </div>
  );
}
