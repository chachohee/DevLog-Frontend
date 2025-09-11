/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class', // ← 다크모드 적용 방식 'class'로 변경
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
