/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        mainColor: '#F5EDE8',
        mainColorLight: '#FCFAF7',
        mainTextColor: '#9C6B4A',
        mainInputBorderColor: '#E8D9CF',
        subColor: '#F58D42',
      },
    },
  },
  plugins: [],
};
