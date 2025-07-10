import { useState } from "react";
import toggleOn from "../assets/buttons/toggle-on.png";
import toggleOff from "../assets/buttons/toggle-off.png";

export default function ToggleButton({ onToggle }) {
  const [isOn, setIsOn] = useState(true);

  const toggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle?.(newState);
    console.log("Sound toggled:", newState);
  };

  return (
    <div className="clickable select-none w-[63px] h-[50px]" onClick={toggle}>
      <img
        src={isOn ? toggleOn : toggleOff}
        alt="toggle"
        className="w-full h-full"
      />
    </div>
  );
}
