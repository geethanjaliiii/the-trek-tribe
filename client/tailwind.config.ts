/** @type {import('tailwindcss').Config} */
// module.exports = {
// 	darkMode: ["class"],
// 	content: [
// 	  "./pages/**/*.{ts,tsx}",
// 	  "./components/**/*.{ts,tsx}",
// 	  "./app/**/*.{ts,tsx}",
// 	  "./src/**/*.{ts,tsx}",
// 	  "*.{js,ts,jsx,tsx,mdx}",
// 	],
// 	theme: {
// 	  container: {
// 		center: true,
// 		padding: "2rem",
// 		screens: {
// 		  "2xl": "1400px",
// 		},
// 	  },
// 	  extend: {
// 		colors: {
// 		  border: "hsl(var(--border))",
// 		  input: "hsl(var(--input))",
// 		  ring: "hsl(var(--ring))",
// 		  background: "hsl(var(--background))",
// 		  foreground: "hsl(var(--foreground))",
// 		  primary: {
// 			DEFAULT: "hsl(var(--primary))",
// 			foreground: "hsl(var(--primary-foreground))",
// 		  },
// 		  secondary: {
// 			DEFAULT: "hsl(var(--secondary))",
// 			foreground: "hsl(var(--secondary-foreground))",
// 		  },
// 		  destructive: {
// 			DEFAULT: "hsl(var(--destructive))",
// 			foreground: "hsl(var(--destructive-foreground))",
// 		  },
// 		  muted: {
// 			DEFAULT: "hsl(var(--muted))",
// 			foreground: "hsl(var(--muted-foreground))",
// 		  },
// 		  accent: {
// 			DEFAULT: "hsl(var(--accent))",
// 			foreground: "hsl(var(--accent-foreground))",
// 		  },
// 		  popover: {
// 			DEFAULT: "hsl(var(--popover))",
// 			foreground: "hsl(var(--popover-foreground))",
// 		  },
// 		  card: {
// 			DEFAULT: "hsl(var(--card))",
// 			foreground: "hsl(var(--card-foreground))",
// 		  },
// 		},
// 		borderRadius: {
// 		  lg: "var(--radius)",
// 		  md: "calc(var(--radius) - 2px)",
// 		  sm: "calc(var(--radius) - 4px)",
// 		},
// 		keyframes: {
// 		  "accordion-down": {
// 			from: { height: 0 },
// 			to: { height: "var(--radix-accordion-content-height)" },
// 		  },
// 		  "accordion-up": {
// 			from: { height: "var(--radix-accordion-content-height)" },
// 			to: { height: 0 },
// 		  },
// 		},
// 		animation: {
// 		  "accordion-down": "accordion-down 0.2s ease-out",
// 		  "accordion-up": "accordion-up 0.2s ease-out",
// 		},
// 	  },
// 	},
// 	plugins: [require("tailwindcss-animate")],
//   }
  
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				olive: {
					light: '#D1D9C4',
					DEFAULT: '#86934E',
					dark: '#54592C'
				},
				earth: {
					light: '#E5DFD3',
					DEFAULT: '#A8977B',
					dark: '#5C5141'
				},
				charcoal: {
					light: '#3E3E3E',
					DEFAULT: '#222222',
					dark: '#111111'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-left': {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-right': {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out forwards',
				'slide-up': 'slide-up 0.5s ease-out forwards',
				'slide-left': 'slide-left 0.5s ease-out forwards',
				'slide-right': 'slide-right 0.5s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
 