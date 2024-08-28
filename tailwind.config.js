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
        mainColor: '#FF834D',
        mainColorLight: '#FCFAF7',
        mainTextColor: '#232323',
        mainInputBorderColor: '#E8D9CF',
        subColor: '#F58D42',
        // 추가 theme colors
        primary: '#FF834D',
        secondary: '#FF4D00',
        tertiary: '#EE8B60',
        primaryText: '#1C120D',
        secondaryText: '#9C654D',
        hintText: '#A6A6A6',
        primaryBackground: '#FFFFFF',
        secondaryBackground: '#EDEDED',
        success: '#249689',
        error: '#FF5963',
        warning: '#F9CF58',
        info: '#DBDBDB',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
