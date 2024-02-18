/** @type {import('tailwindcss').Config} */
// import withMT from "@material-tailwind/react/utils/withMT";
import formsPlugin from "@tailwindcss/forms"; // Import the forms plugin separately
import "@tailwindcss/forms";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vue: "#42b883",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [
    formsPlugin, // Use the imported forms plugin here
  ],
};
