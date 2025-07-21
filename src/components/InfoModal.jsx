import bg from "../assets/backgrounds/bg.png";
import GameButton from "./GameButton";

export default function InfoModal({ onClose }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-30 flex items-center justify-center">
      <div
        className="w-[700px] h-[450px] mx-auto bg-no-repeat bg-center bg-contain relative font-pixel text-xl"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Content area */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 text-white flex flex-col items-start px-6"
          style={{ top: "50px", width: "600px", height: "360px" }}
        >
          <h2 className="text-3xl font-bold mb-4 self-center">credits</h2>

          <p className="text-base leading-relaxed mb-6 text-left whitespace-pre-line">
            This is a small game I made for you, Parsa — something simple but I
            had fun making it, and I hope you have fun playing it. It’s probably
            not the most impressive game ever, but I’ve put time and attention
            into every part of it — the layout, the buttons and every thing —
            because it feels nice to make something when it's for you. Thank you
            for always supporting me.
            <br />I Love you so much.
            <br />
            Mina &lt;3
          </p>

          <div className="self-center">
            <GameButton
              label="close"
              width={150}
              height={60}
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
