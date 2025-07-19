import closeIcon from "../assets/close_icon.png";
import minIcon from "../assets/min_icon.png";

export default function WindowControls() {
  return (
    <div className="absolute top-3 right-3 flex gap-2 z-50 no-drag">
      <button onClick={() => window.electron?.minimize?.()}>
        <img src={minIcon} alt="Minimize" className="w-8 h-8" />
      </button>
      <button onClick={() => window.electron?.close?.()}>
        <img src={closeIcon} alt="Close" className="w-8 h-8" />
      </button>
    </div>
  );
}
