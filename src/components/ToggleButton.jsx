import toggleOn from "../assets/buttons/toggle-on.png";
import toggleOff from "../assets/buttons/toggle-off.png";
import useButtonSound from "../hooks/useButtonSound";

export default function ToggleButton({ isOn = true, onToggle }) {
  const playSound = useButtonSound();

  const toggle = () => {
    playSound(); // 🔊 sound effect
    onToggle?.();
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
