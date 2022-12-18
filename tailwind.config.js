module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        base: "url('/images/base.png')",
        base2: "url('/images/bg.png')",
        base3: "url('/images/bgedit.png')",
      },
      colors: {
        'color-100': '#D8D9D7',
        'color-200': '#A5A58D',
        'color-300': '#4257E4',
        'color-400': '#DFE4F2', //base
        'color-500': '#04BF8A', //green
        'color-600': '#F2B705', //yellow
        'color-700': '#D95E32', //red
        'color-800': '#1D64C2', //blue
        'color-900': '#F2F2F2' //nav



      },
    },
  },
  plugins: [require('flowbite/plugin'), require('tailwind-scrollbar'), require('tw-elements/dist/plugin')],
  variants: {
    scrollbar: ['rounded'],
  },
}
