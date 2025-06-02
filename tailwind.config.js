const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
   ],
   darkMode: "class",
   theme: {
      extend: {
         colors: {
            primary: {
               DEFAULT: "#1d8348",
               50: "#f1fcf5",
               100: "#defae9",
               200: "#bef4d4",
               300: "#8ce9b2",
               400: "#52d688",
               500: "#2bbc67",
               600: "#1e9b52",
               700: "#1d8348",
               800: "#1a6138",
               900: "#184f31",
               950: "#072c18",
            },
         },
      },
   },
   plugins: [heroui()],
};
