import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#333333",
        secondary: "#49beaa",
        neutral: "#edf2f4",
        "primary-badge": "#49beaa",
        "secondary-badge": "#fed766",
        "ternary-badge": "#009fb7",
      },
    },
  },
  plugins: [daisyui],
};
