import { useState, useEffect } from "react";
import toggleOn from "../assets/buttons/toggle-on.png";
import toggleOff from "../assets/buttons/toggle-off.png";
import { useAudio } from "./AudioProvider"; // 👈 import audio context

export default function ToggleButton() {
  const { isPlaying, toggleAudio } = useAudio();
  const [isOn, setIsOn] = useState(isPlaying);

  useEffect(() => {
    setIsOn(isPlaying);
  }, [isPlaying]);

  const toggle = () => {
    toggleAudio();
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
