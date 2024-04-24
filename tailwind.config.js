import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#222831",
        secondary: "#31363F",
        neutral: "#EEEEEE",
      },
    },
  },
  plugins: [daisyui],
};
