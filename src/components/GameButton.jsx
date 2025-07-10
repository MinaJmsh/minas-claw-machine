import { useState } from "react";
import btn0 from "../assets/buttons/btn-0.png";
import btn1 from "../assets/buttons/btn-1.png";
import btn2 from "../assets/buttons/btn-2.png";

export default function GameButton({
  label,
  width = 200,
  height = 60,
  onClick,
}) {
  const [btnState, setBtnState] = useState(btn0);

  const getLabelClass = () =>
    `absolute inset-0 flex items-center justify-center text-white text-2xl ${
      btnState === btn2 ? "translate-y-[-3px]" : "-translate-y-[10px]"
    }`;

  return (
    <div
      className="clickable relative select-none"
      style={{ width, height }}
      onClick={onClick}
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
