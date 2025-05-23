/** @type {import('tailwindcss').Config} */

export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
      extend: {
        screens: {
          xs: "480px",
        },
        fontFamily: {
          inter: ["Inter var", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
  