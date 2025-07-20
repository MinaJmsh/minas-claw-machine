import clickSound from "../assets/button.mp3";
import { useAudio } from "../components/AudioProvider"; // 👈 audio toggle context

export default function useButtonSound() {
  const { sfxEnabled } = useAudio(); // 👈 check if enabled

  const play = () => {
    if (!sfxEnabled) return;

    const sound = new Audio(clickSound);
    sound.play().catch((err) => console.warn("Play error:", err));
  };

  return play;
}
