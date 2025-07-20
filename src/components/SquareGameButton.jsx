import { useState } from "react";
import btn0 from "../assets/buttons/sqrbtn-0.png";
import btn1 from "../assets/buttons/sqrbtn-1.png";
import btn2 from "../assets/buttons/sqrbtn-2.png";
import useButtonSound from "../hooks/useButtonSound"; // 🔊

export default function SquareGameButton({
  labelImg, // image shown on top (e.g., icon or mini-label PNG)
  width = 100, // default size can be square, adjust as needed
  height = 100,
  onClick,
}) {
  const [btnState, setBtnState] = useState(btn0);
  const playSound = useButtonSound(); // 🔊

  const handleClick = () => {
    playSound(); // 🔊
    onClick?.();
  };

  const getLabelClass = () =>
    `absolute inset-0 flex items-center justify-center ${
      btnState === btn2 ? "translate-y-[-7px]" : "-translate-y-[14px]"
    }`;

  return (
    <div
      className="clickable relative select-none"
      style={{ width, height }}
      onClick={handleClick} // 🔊
      onMouseEnter={() => setBtnState(btn1)}
      onMouseLeave={() => setBtnState(btn0)}
      onMouseDown={() => setBtnState(btn2)}
      onMouseUp={() => setBtnState(btn1)}
    >
      <img
        src={btnState}
        alt="button"
        className="clickable absolute top-0 left-0 w-full h-full"
      />
      {labelImg && (
        <div className={getLabelClass()}>
          <img src={labelImg} alt="label" className="max-w-[45%] max-h-[45%]" />
        </div>
      )}
    </div>
  );
}
