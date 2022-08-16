module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        base: "url('/images/base.png')",
        base2: "url('/images/bg.png')",
        base3: "url('/images/bgedit.png')",
      },
      colors: {
        "color-100": "#E8EBE4",
        "color-200": "#A5A58D",
        "color-300": "#4257E4",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
