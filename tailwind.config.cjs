/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				body: "#f2f7f2",
				secondary: {
					300: "#7480FFFF",
					400: "#4D62E7FF"
				},
				primary: {
					'50': '#f0fdf4',
					'100': '#dcfce7',
					'200': '#bbf7d0',
					'300': '#86efac',
					'400': '#4ade80',
					'450': '#3ccc6f',
					'500': '#22c55e',
					'600': '#16a34a',
					'700': '#15803d',
					'800': '#166534',
					'900': '#14532d',
				},
				dark: {
					5: "#e0e0e0",
					10: "#c7c7c7",
					50: "#8d8d8d",
					100: "#777777",
					200: "#676767",
					300: "#595959",
					400: "#414141",
					500: "#383838",
					600: "#2a2a2a",
					700: "#1f1f1f",
					800: "#151515",
					900: "#090909",
				}
			},
			boxShadow: {
				"card": "0 2px 17px -3px #6c6c6c4f",
				"around": "0 2px 17px -3px #6c6c6c4f",
				"card-deep": "0px 9px 14px 9px rgb(149 149 149 / 5%), -1px 1px 18px -15px rgb(77 179 75 / 45%), 0 14px 20px 0px rgb(226 255 226 / 60%)",
				"card-deep-dark": "0 10px 19px 0px #00000080",
				"xxs": "0 5px 10px rgb(51 66 87 / 5%)",
				"light": "0 1px 10px 0px #e9e9e9c9"
			},
			
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
			},
			
		},
		container:  {
			screens: {sm: "1400px"}
		}
	},
	plugins: [],
}