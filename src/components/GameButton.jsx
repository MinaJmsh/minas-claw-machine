import { useState } from "react";
import btn0 from "../assets/buttons/btn2-0.png";
import btn1 from "../assets/buttons/btn2-1.png";
import btn2 from "../assets/buttons/btn2-2.png";
import useButtonSound from "../hooks/useButtonSound"; // 🔊

export default function GameButton({
  label,
  width = 200,
  height = 60,
  onClick,
}) {
  const [btnState, setBtnState] = useState(btn0);
  const playSound = useButtonSound(); // 🔊

  const handleClick = () => {
    playSound(); // 🔊
    onClick?.();
  };

  const getLabelClass = () =>
    `absolute inset-0 flex items-center justify-center text-white text-2xl ${
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
        alt={label}
        className="clickable absolute top-0 left-0 w-full h-full"
      />
      <div className={getLabelClass()}>{label}</div>
    </div>
  );
}
