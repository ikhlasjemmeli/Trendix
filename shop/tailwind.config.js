/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // Inclut tous les fichiers HTML et TypeScript dans le répertoire src
   "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        'msm': '320px', 
       
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('flowbite/plugin')
  ],
}


