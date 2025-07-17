import { useState, useEffect } from "react";
import minaIdle from "../assets/sprites/mina.png";
import minaHappy from "../assets/sprites/mina-happy.png";
import minaCry from "../assets/sprites/mina-cry.png";
import parsaIdle from "../assets/sprites/parsa.png";
import parsaHappy from "../assets/sprites/parsa-happy.png";
import parsaCry from "../assets/sprites/parsa-sad.png";
import minaBlink from "../assets/sprites/mina-blink.png";
import parsaBlink from "../assets/sprites/parsa-blink.png";

export default function Characters({ minaEmotion }) {
  const [minaBlinking, setMinaBlinking] = useState(false);
  const [parsaBlinking, setParsaBlinking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [minaBreathing, setMinaBreathing] = useState(false);
  const [parsaBreathing, setParsaBreathing] = useState(false);

  // Breathing animation every second, offset for Parsa
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

  // Jump on happy emotion
  useEffect(() => {
    if (minaEmotion === "happy") {
      setIsJumping(true);
      const timeout = setTimeout(() => {
        setIsJumping(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [minaEmotion]);

  // Mina blinking every ~1.5s
  useEffect(() => {
    if (minaEmotion !== "idle") return;

    const blinkInterval = setInterval(() => {
      setMinaBlinking(true);
      setTimeout(() => setMinaBlinking(false), 150);
    }, 1500 + Math.random() * 500);

    return () => clearInterval(blinkInterval);
  }, [minaEmotion]);

  // Parsa blinking every ~1.6s with offset
  useEffect(() => {
    if (minaEmotion !== "idle") return;

    const blinkInterval = setInterval(() => {
      setParsaBlinking(true);
      setTimeout(() => setParsaBlinking(false), 150);
    }, 1600 + Math.random() * 500);

    return () => clearInterval(blinkInterval);
  }, [minaEmotion]);

  return (
    <>
      {/* Mina beside machine at bottom right */}
      <div
        className="absolute z-30"
        style={{
          bottom: "0px",
          left: "calc(50% + 230px)",
          transform: isJumping
            ? "translateY(-20px)"
            : `scale(${minaBreathing ? 1.01 : 1}) translateY(0)`,
          transition: "transform 0.5s ease",
        }}
      >
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
        />
      </div>

      {/* Parsa beside machine at bottom left */}
      <div
        className="absolute z-30"
        style={{
          bottom: "0px",
          right: "calc(50% + 230px)",
          transform: `scaleX(-1) scale(${parsaBreathing ? 1.01 : 1})`,
          transition: "transform 0.5s ease",
        }}
      >
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
          className="w-32 h-32"
        />
      </div>
    </>
  );
}
