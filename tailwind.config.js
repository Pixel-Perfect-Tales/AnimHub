/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFA31A",
        secondary: "#1B1B1B",
        contrast: "#808080",
        green: "#FFA31A",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "shadow-arrow":
          "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
      },
      keyframes: {
        blinkBackground: {
          "50%": {
            filter: "brightness(.75) blur(128px)",
            transform: "scale(1)",
          },
          "0%, 100%": {
            filter: "brightness(.25)  blur(128px)",
            transform: "scale(.75)",
          },
        },
      },
      animation: {
        blinkBackground: "blinkBackground 5s linear infinite",
      },
    },
  },
  plugins: [],
};
