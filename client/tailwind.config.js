module.exports = {
  mode: 'jit',
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        mf: "800px",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          }
        },
        "slide-out": {
          "0%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
          "100%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          }
        },
      },
      animation: {
        "slide-in": "slide-in 0.2s ease-in-out",
        "slide-out": "slide-in 0.2s ease-in-out",
      }
    },
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}