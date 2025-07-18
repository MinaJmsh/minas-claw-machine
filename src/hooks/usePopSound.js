import { useRef } from "react";
import clickSound from "../assets/pop.mp3";

export default function usePopSound() {
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
