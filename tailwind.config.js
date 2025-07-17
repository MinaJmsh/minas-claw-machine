/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // <- important
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Pixelify Sans"', "monospace"],
      },
    },
    keyframes: {
      jump: {
        "0%": { transform: "translateY(0)" },
        "30%": { transform: "translateY(-20px)" },
        "100%": { transform: "translateY(0)" },
      },
    },
    animation: {
      jump: "jump 0.4s ease",
    },
  },
  plugins: [],
};
