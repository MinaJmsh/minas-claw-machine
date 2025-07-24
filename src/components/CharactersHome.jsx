// src/components/CharactersHome.jsx
import { useState, useEffect } from "react";
import minaIdle from "../assets/characters/mina.png";
import minaHappy from "../assets/characters/mina-happy.png";
import minaCry from "../assets/characters/mina-cry.png";
import parsaIdle from "../assets/characters/parsa2.png";
import parsaHappy from "../assets/characters/parsa-happy2.png";
import parsaCry from "../assets/characters/parsa-sad2.png";
import minaBlink from "../assets/characters/mina-blink.png";
import parsaBlink from "../assets/characters/parsa-blink2.png";

export default function CharactersHome({ minaEmotion }) {
  const [minaBlinking, setMinaBlinking] = useState(false);
  const [parsaBlinking, setParsaBlinking] = useState(false);
  const [minaBreathing, setMinaBreathing] = useState(false);
  const [parsaBreathing, setParsaBreathing] = useState(false);

  // Breathing effect
  useEffect(() => {
    const minaInterval = setInterval(() => {
      setMinaBreathing((b) => !b);
    }, 1000);
    const parsaInterval = setInterval(() => {
      setParsaBreathing((b) => !b);
    }, 1100);
    return () => {
      clearInterval(minaInterval);
      clearInterval(parsaInterval);
    };
  }, []);

  // Blinking
  useEffect(() => {
    if (minaEmotion !== "idle") return;

    const minaInterval = setInterval(() => {
      setMinaBlinking(true);
      setTimeout(() => setMinaBlinking(false), 150);
    }, 1600 + Math.random() * 500);

    const parsaInterval = setInterval(() => {
      setParsaBlinking(true);
      setTimeout(() => setParsaBlinking(false), 150);
    }, 1800 + Math.random() * 500);

    return () => {
      clearInterval(minaInterval);
      clearInterval(parsaInterval);
    };
  }, [minaEmotion]);
  return (
    <div className="absolute bottom-2 right-2 z-30 flex items-end">
      {/* Mina */}
      <img
        src={
          minaEmotion === "happy"
            ? minaHappy
            : minaEmotion === "sad"
            ? minaCry
            : minaBlinking
            ? minaBlink
            : minaIdle
        }
        alt="Mina"
        className="w-32 h-32"
        style={{
          transform: `scale(${minaBreathing ? 1.01 : 1})`,
          transition: "transform 0.5s ease",
          zIndex: 10,
        }}
      />

      {/* Parsa */}
      <img
        src={
          minaEmotion === "happy"
            ? parsaHappy
            : minaEmotion === "sad"
            ? parsaCry
            : parsaBlinking
            ? parsaBlink
            : parsaIdle
        }
        alt="Parsa"
        className="w-32 h-32 -ml-16 z-50" // 👈 closer / overlapping
        style={{
          transform: `scale(${parsaBreathing ? 1.01 : 1})`,
          transition: "transform 0.5s ease",
        }}
      />
    </div>
  );
}
