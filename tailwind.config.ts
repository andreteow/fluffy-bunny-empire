
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
				// Clay-inspired colors
				clay: {
					DEFAULT: '#000000', // black
					background: '#FFFFFF', // white background
					green: {
						light: '#8BC34A', // light green
						DEFAULT: '#4CAF50', // medium green
						dark: '#2E7D32', // dark green
					},
					pink: {
						light: '#FFB6C1', // light pink
						DEFAULT: '#FF80AB', // medium pink
						dark: '#C2185B', // dark pink
					},
					blue: {
						light: '#81D4FA', // light blue
						DEFAULT: '#29B6F6', // medium blue
						dark: '#0288D1', // dark blue
					},
					yellow: {
						light: '#FFF59D', // light yellow
						DEFAULT: '#FFEE58', // medium yellow
						dark: '#FBC02D', // dark yellow
					},
					coral: '#FF7F7F', // coral
					teal: '#4DB6AC', // teal
					lavender: '#B39DDB', // lavender
					orange: '#FFB74D', // orange
				},
				// Custom bunny game colors
				bunny: {
					DEFAULT: '#FF80AB', // primary pink (from Clay)
					light: '#F8F9FA', // soft background
					dark: '#C2185B', // darker pink
					pink: '#FFB6C1', // soft pink
					peach: '#FFCCBC', // soft peach
					yellow: '#FFF59D', // soft yellow (from Clay)
					green: '#A5D6A7', // soft green
					blue: '#81D4FA', // soft blue (from Clay)
					gray: '#ECEFF1', // soft gray
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'hop': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-soft': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'hop': 'hop 0.6s ease-in-out',
				'pulse-soft': 'pulse-soft 2s infinite'
			},
			backgroundImage: {
				'clay-gradient': 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)', // Green gradient
				'clay-pink-gradient': 'linear-gradient(135deg, #FF80AB 0%, #FFB6C1 100%)', // Pink gradient
				'clay-blue-gradient': 'linear-gradient(135deg, #29B6F6 0%, #81D4FA 100%)', // Blue gradient
				'clay-yellow-gradient': 'linear-gradient(135deg, #FBC02D 0%, #FFF59D 100%)', // Yellow gradient
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
