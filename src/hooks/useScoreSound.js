import { useRef } from "react";
import clickSound from "../assets/score.mp3";
import { useAudio } from "../components/AudioProvider"; // 👈 import audio context

export default function useScoreSound() {
  const audioRef = useRef(new Audio(clickSound));
  const { sfxEnabled } = useAudio(); // 👈 read from context

  const play = () => {
    if (!sfxEnabled) return; // 🚫 skip if sound effects are disabled

    if (!audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current.play().catch((err) => console.warn("Play error:", err));
  };

  return play;
}
