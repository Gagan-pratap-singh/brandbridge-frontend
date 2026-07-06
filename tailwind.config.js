/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B3DF5",
        secondary: "#7C5CFF",
        background: "#F8F9FD",
        card: "#FFFFFF",
        text: "#111827",
        muted: "#6B7280",
      },

      borderRadius: {
        xl: "16px",
        "2xl": "22px",
      },

      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,.05)",
      },
    },
  },
  plugins: [],
};