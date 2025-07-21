import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bg from "../assets/backgrounds/bg.png";
import bgVideo from "../assets/backgrounds/live-bg-reverse.mp4";
import info from "../assets/icons/info.png";
import setting from "../assets/icons/setting.png";
import GameButton from "./GameButton";
import SquareGameButton from "./SquareGameButton";
import ToggleButton from "./ToggleButton";
import WindowControls from "../components/WindowControls";
import HowToPlayModal from "./HowToPlayModal";
import InfoModal from "./InfoModal";
import Setting from "./SettingModal"; // 👈 import the Setting modal

export default function HomePage() {
  const navigate = useNavigate();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // 👈

  return (
    <div
      className="w-[852px] h-[571px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel text-2xl"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <WindowControls />
      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}
      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
      {showSettings && <Setting onClose={() => setShowSettings(false)} />}

      {/* Screen area inside the frame */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 overflow-hidden"
        style={{ top: "53px", width: "804px", height: "490px" }}
      >
        {/* 🎥 Video background */}
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Content on top */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white text-center">
          <img
            src={require("../assets/backgrounds/title.gif")}
            alt="Mina’s Claw Machine"
            className="mb-6 w-auto h-[100px]" // Adjust height as needed
          />{" "}
          <div className="flex flex-col items-center gap-3">
            <GameButton
              label="start"
              width={200}
              height={60}
              onClick={() => navigate("/game")}
            />
            <GameButton
              label="how to play"
              width={200}
              height={60}
              onClick={() => setShowHowToPlay(true)}
            />

            <GameButton
              label="quit"
              width={200}
              height={60}
              onClick={() => window.electron?.close?.()}
            />
          </div>
          <div className="absolute bottom-2 right-2 z-20">
            <SquareGameButton
              width={60}
              height={60}
              labelImg={info}
              onClick={() => setShowInfo(true)}
            />
          </div>
          <div className="absolute bottom-2 left-2 z-20">
            <SquareGameButton
              width={60}
              height={60}
              labelImg={setting} // 👈 replace with your settings icon
              onClick={() => setShowSettings(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
