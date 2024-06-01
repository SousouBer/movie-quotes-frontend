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
        "bright-red": "rgba(227, 18, 33, 1)",
        "light-gray": "rgba(206, 212, 218, 1)",
        "custom-purple": "#9747FF66",
        "warm-gray": "#DDCCAA",
        "grayish-purple": "#24222F",
        "grayish-blue": "#181725",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)",
        "blurred-gradient":
          "linear-gradient( 187.16deg, rgba(24, 22, 35, 0.7) 0.07%, rgba(25, 23, 37, 0.7) 51.65%, rgba(13, 11, 20, 0.7) 98.75% )",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat"],
    },
  },
  plugins: [],
};
