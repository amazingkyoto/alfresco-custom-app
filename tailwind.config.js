/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./application/{views,controllers}/**/*.{html,js,php}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
      mono: ["ui-monospace", "monospace"],
    },
  },
  plugins: [],
  darkMode: "class"
}

