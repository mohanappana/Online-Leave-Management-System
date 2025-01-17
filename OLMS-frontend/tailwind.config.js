/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        sm:'700px',
        md:'840px'
      },
      colors: {
        lightCyan: '#ECFFFF',
        darkblue:'#0053bf',
        login:'#b4d0ff',
        inputfield:'#e9edf5',
        hodleft:'#a7ffbb',
        hodcenter:'#b8fde0',
        hodright:'#a9f2ff',
        lightgray:"#e7e7e7",
        teacherleft:'#efa2ff',
        teachercenter:'#a3caff',
        teacherright:'#a9f3ff',
        bpink:'#b666c7',
        inputback:'#e9edf5',
        studentleft:'#e5ffc5',
        studentcenter:'#baf4ef',
        studentright:'#a9f2ff',
        byellow:'#9bae5d',
        tbody:'#f6f9f9',
        

      },
      
    },
  },
  plugins: [],
  safelist: [
    "input:-webkit-autofill", // Ensure it's recognized
  ],
}

