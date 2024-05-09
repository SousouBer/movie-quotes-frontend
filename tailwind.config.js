/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "shade-of-beige": "#DDCCAA",
        "vivid-red": "#E31221",
        "dark-shade-of-blue": "#11101a",
        "shade-of-gray": "#6C757D",
        "blueish-black": "#222030",
        "vibrant-red": "#DC3545",
        "transparent-blue": "#0D6EFD40",
        "medium-dark-green": "#198754",
      },
    },
  },
  plugins: [],
};
