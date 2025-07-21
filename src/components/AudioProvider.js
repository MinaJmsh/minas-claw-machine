import { createContext, useContext, useEffect, useRef, useState } from "react";
import musicFile from "../assets/audio/MissingYou.mp3";
// AudioProvider.js
const AudioContext = createContext();

export function useAudio() {
  return useContext(AudioContext);
}

export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio(musicFile));
  const [isPlaying, setIsPlaying] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true); // 🔊 sound effect toggle

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.4;

    if (isPlaying) {
      audio.play().catch((err) => console.log("Autoplay failed:", err));
    } else {
      audio.pause();
    }

    return () => audio.pause();
  }, [isPlaying]);

  const toggleAudio = () => setIsPlaying((prev) => !prev);
  const toggleSfx = () => setSfxEnabled((prev) => !prev); // 🔁

  return (
    <AudioContext.Provider
      value={{ isPlaying, toggleAudio, sfxEnabled, toggleSfx }}
    >
      {children}
    </AudioContext.Provider>
  );
}
