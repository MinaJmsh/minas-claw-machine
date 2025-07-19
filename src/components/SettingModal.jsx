import bg from "../assets/bg.png";
import GameButton from "./GameButton";
import ToggleButton from "./ToggleButton"; // reuse the toggle UI
import { useAudio } from "./AudioProvider"; // 🔊

export default function SettingM({ onClose }) {
  const { isPlaying, toggleAudio, sfxEnabled, toggleSfx } = useAudio();

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-20 flex items-center justify-center">
      <div
        className="w-[500px] h-[300px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel text-2xl"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div
          className="absolute left-1/2 transform -translate-x-1/2 overflow-hidden text-white flex flex-col items-center gap-2 p-1"
          style={{ top: "30px", width: "400px", height: "250px" }}
        >
          <h2 className="text-3xl font-bold self-center">settings</h2>

          {/* 🔊 Toggle for Background Music */}
          <div className="flex items-center justify-between w-72 ">
            <span className="text-left">music</span>
            <ToggleButton isOn={isPlaying} onToggle={toggleAudio} />
          </div>

          {/* 🔔 Toggle for Sound Effects */}
          <div className="flex items-center justify-between w-72 mb-2">
            <span className="text-left">sound effects</span>
            <ToggleButton isOn={sfxEnabled} onToggle={toggleSfx} />
          </div>

          <GameButton label="close" width={150} height={60} onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
