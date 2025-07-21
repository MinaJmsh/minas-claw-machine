import bg from "../assets/backgrounds/bg.png";
import GameButton from "./GameButton";

export default function HowToPlayModal({ onClose }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-20 flex items-center justify-center">
      <div
        className="w-[500px] h-[300px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel text-2xl"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Screen area inside the frame */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 overflow-hidden text-white flex flex-col items-center"
          style={{ top: "40px", width: "400px", height: "250px" }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">How to Play</h2>
          <p className="text-lg text-center leading-relaxed mb-5">
            Use the claw to collect Mina’s favorite items. Avoid the ones she
            dislikes. Points depend on how much she likes or dislikes each item!
          </p>
          <GameButton label="close" width={150} height={60} onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
