import { useState } from "react";
import rnd0 from "../assets/buttons/rndbtn-0.png";
import rnd1 from "../assets/buttons/rndbtn-1.png";
import rnd2 from "../assets/buttons/rndbtn-2.png";
import usePopSound from "../hooks/usePopSound"; // 🔊

export default function RoundGameButton({
  labelImg, // optional label image
  size = 100, // round button = same width/height
  onClick,
}) {
  const [btnState, setBtnState] = useState(rnd0);
  const playSound = usePopSound(); // 🔊

  const handleClick = () => {
    playSound(); // 🔊
    onClick?.();
  };

  const getLabelClass = () =>
    `absolute inset-0 flex items-center justify-center ${
      btnState === rnd2 ? "translate-y-[-7px]" : "-translate-y-[14px]"
    }`;

  return (
    <div
      className="clickable relative select-none"
      style={{ width: size, height: size }}
      onClick={handleClick} // 🔊
      onMouseEnter={() => setBtnState(rnd1)}
      onMouseLeave={() => setBtnState(rnd0)}
      onMouseDown={() => setBtnState(rnd2)}
      onMouseUp={() => setBtnState(rnd1)}
    >
      <img
        src={btnState}
        alt="round button"
        className="clickable absolute top-0 left-0 w-full h-full"
      />
      {labelImg && (
        <div className={getLabelClass()}>
          <img src={labelImg} alt="label" className="max-w-[50%] max-h-[50%]" />
        </div>
      )}
    </div>
  );
}
