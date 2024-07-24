import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "camp-scene": "url('/camp.svg')",
      },
      fontSize: {
        "responsive-sm": "calc(2rem + 1vw)", // Example for small screen
        "responsive-md": "calc(8.5rem + 1vw)", // Example for medium screen
        "responsive-lg": "calc(8rem + 2vw)", // Example for large screen
        "fit-to-screen": "calc(2rem + 1vw)",
        "fit-to-screen-md": "calc(2.5rem + 1vw)",
      },
      animation: {
        bounce: "bounce 1s ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
export default config;
