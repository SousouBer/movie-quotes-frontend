/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "shade-of-beige": "#DDCCAA",
        "vivid-red": "#E31221",
        "dark-shade-of-blue": "#11101a",
      },
    },
  },
  plugins: [],
};
