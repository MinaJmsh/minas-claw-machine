/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // <- important
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Pixelify Sans"', "monospace"],
      },
    },
  },
  plugins: [],
};
