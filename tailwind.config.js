/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      fontFamily: {
         sans: ["Poppins", "sans-serif"],
      },
      extend: {
         fontSize: {
            "10xl": "10rem",
            "11xl": "11rem",
            "12xl": "12rem",
            "13xl": "13rem",
         },
         animation: {
            "horizontal-scroll": "horizontal-scroll linear 16s infinite ",
            "horizontal-scroll-2": "horizontal-scroll-2 linear 16s infinite ",
            "gradient-x": "gradient-x 15s ease infinite",
            float: "float 6s ease-in-out infinite",
         },
         keyframes: {
            "horizontal-scroll": {
               from: { transform: "translateX(0)" },
               to: { transform: "translateX(-100%)" },
            },
            "horizontal-scroll-2": {
               from: { transform: "translateX(100%)" },
               to: { transform: "translateX(0)" },
            },
            "gradient-x": {
               "0%, 100%": {
                  "background-size": "200% 200%",
                  "background-position": "left center",
               },
               "50%": {
                  "background-size": "200% 200%",
                  "background-position": "right center",
               },
            },
            float: {
               "0%, 100%": { transform: "translateY(0)" },
               "50%": { transform: "translateY(-20px)" },
            },
         },
         colors: {
            stripe: {
               purple: "#635bff",
               "purple-dark": "#5851db",
               "purple-light": "#7a73ff",
               gray: "#425466",
               "gray-light": "#f6f9fc",
               "gray-dark": "#2a2f45",
            },
            verse: {
               blue: "#3A59D1",
               "blue-dark": "#253380",
               "blue-darker": "#1c2761",
               "blue-light": "#5a77de",
               "blue-lighter": "#7dabff",
               "blue-lightest": "#c4d4ff",
            },
         },
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-stripe":
               "linear-gradient(150deg, #635bff 15%, #ff8a00 70%, #40c4ff 94%)",
            "gradient-dark":
               "linear-gradient(150deg, #2a2f45 15%, #1a1f35 70%, #0a0f25 94%)",
            "gradient-verse":
               "linear-gradient(150deg, #3A59D1 15%, #5a77de 50%, #7dabff 94%)",
         },
      },
   },
   plugins: [],
};
