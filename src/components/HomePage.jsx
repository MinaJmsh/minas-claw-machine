import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bg from "../assets/bg.png";
import bgVideo from "../assets/live-bg-reverse.mp4";
import info from "../assets/info.png";
import GameButton from "./GameButton";
import SquareGameButton from "./SquareGameButton";
import ToggleButton from "./ToggleButton";
import WindowControls from "../components/WindowControls";
import HowToPlayModal from "./HowToPlayModal";
import InfoModal from "./InfoModal";

export default function HomePage() {
  const navigate = useNavigate();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className="w-[852px] h-[571px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel text-2xl"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <WindowControls></WindowControls>
      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}
      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}

      {/* Screen area inside the frame */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 overflow-hidden"
        style={{ top: "60px", width: "804px", height: "493px" }}
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
            src={require("../assets/title.gif")}
            alt="Mina’s Claw Machine"
            className="mb-6 w-auto h-[100px]" // Adjust height as needed
          />{" "}
          <div className="flex flex-col items-center gap-3">
            <GameButton
              label="START"
              width={200}
              height={60}
              onClick={() => navigate("/game")}
            />
            <GameButton
              label="HOW TO PLAY"
              width={200}
              height={60}
              onClick={() => setShowHowToPlay(true)}
            />

            <GameButton
              label="QUIT"
              width={200}
              height={60}
              onClick={() => window.electron?.close?.()}
            />
          </div>
          {/* 🔊 Toggle Button in Bottom Left */}
          <div className="absolute bottom-2 left-2 z-20">
            <span>music</span>
            <ToggleButton
            // onToggle={(isOn) => setSoundOn(isOn)}
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
        </div>
      </div>
    </div>
  );
}
