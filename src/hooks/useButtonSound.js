import { useRef } from "react";
import clickSound from "../assets/button.mp3";

export default function useButtonSound() {
  const audioRef = useRef(new Audio(clickSound));

  const play = () => {
    if (!audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current.play().catch((err) => console.warn("Play error:", err));
  };

  return play;
}
