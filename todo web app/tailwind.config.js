/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/*.js'],
  theme: {
    extend: {
    	fontFamily: {
    		sans: ['Ubuntu',
				'fantasy'],
    	}
    },
  },
  plugins: [],
}

