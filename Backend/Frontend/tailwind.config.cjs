/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      dropShadow: {
        "3xl": "4px 20px 50px #D9E5EF",
        "customshadow":"0 0 21px 6px rgba(87, 84, 83, 0.26)",
        
      },
       boxShadow: {
        'SuccessShadow': '0 0px 28px 0px #4ade80 ,0 8px 10px -6px',
        'FailedShadow': '0 0px 28px 0px #fa5353 ,0 8px 10px -6px',
      },
      colors: {
        lighttext:"#ffffff",
        darktext:"#66b2ff",
        darkbasebg:"#0a1929",
        lightdarkbg:"#001e3c",
        darkbglight:"#132f4c",
        bluebg:"#0072e4",
        darkborder:"#1b446e",
        lightborder:"#5090d3",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translate(0px)" },
          "100%": { transform: "translate(calc(-230px*3))" },
        },
      },
      animation: {
        slide: "slide 14s linear infinite",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Poppins:['Poppins', "sans-serif"]
      },
      backgroundImage: {
        "hero-pattern": "url('/public/background.svg')",
        "payment_back": "url('./public/angryimg.png')",
      },
    },
  },
  plugins: [],
};
