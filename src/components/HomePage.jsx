import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bg from "../assets/bg.png";
import bgVideo from "../assets/live-bg-reverse.mp4";
import play0 from "../assets/buttons/playbtn-0.png";
import play1 from "../assets/buttons/playbtn-1.png";
import play2 from "../assets/buttons/playbtn-2.png";
import quit0 from "../assets/buttons/quitbtn-0.png";
import quit1 from "../assets/buttons/quitbtn-1.png";
import quit2 from "../assets/buttons/quitbtn-2.png";

import WindowControls from "../components/WindowControls";

export default function HomePage() {
  const navigate = useNavigate();

  const [playImg, setPlayImg] = useState(play0);
  const [quitImg, setQuitImg] = useState(quit0);

  const handlePlay = () => navigate("/game");
  const handleQuit = () => window.electron?.close?.();

  return (
    <div
      className="w-[852px] h-[571px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel text-2xl"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <WindowControls></WindowControls>
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
          <div className="flex flex-col items-center ">
            {/* 🎮 Play Button */}
            <img
              src={playImg}
              alt="Play"
              // onClick={handlePlay}
              onMouseEnter={() => setPlayImg(play1)}
              onMouseLeave={() => setPlayImg(play0)}
              onMouseDown={() => setPlayImg(play2)}
              onMouseUp={() => setPlayImg(play1)}
              className="w-[300px] cursor-pointer select-none"
            />

            {/* ❌ Quit Button */}
            <img
              src={quitImg}
              alt="Quit"
              // onClick={handleQuit}
              onMouseEnter={() => setQuitImg(quit1)}
              onMouseLeave={() => setQuitImg(quit0)}
              onMouseDown={() => setQuitImg(quit2)}
              onMouseUp={() => setQuitImg(quit1)}
              className="w-[300px] cursor-pointer select-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
