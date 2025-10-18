/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapear tus variables CSS a Tailwind
        primary: {
          dark: '#05444C',
          DEFAULT: '#06565F',
          light: '#0A7C8A',
          lighter: '#0EA3B5',
          lightest: '#E8F4F6',
        },
        accent: {
          DEFAULT: '#ffffff',
          light: '#FB923C',
          dark: '#EA580C',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        'inter': ['Inter', 'Segoe UI', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'sm': '0 1px 3px 0 rgba(6, 86, 95, 0.1), 0 1px 2px 0 rgba(6, 86, 95, 0.06)',
        'md': '0 4px 6px -1px rgba(6, 86, 95, 0.1), 0 2px 4px -1px rgba(6, 86, 95, 0.06)',
        'lg': '0 10px 15px -3px rgba(6, 86, 95, 0.1), 0 4px 6px -2px rgba(6, 86, 95, 0.05)',
        'xl': '0 20px 25px -5px rgba(6, 86, 95, 0.1), 0 10px 10px -5px rgba(6, 86, 95, 0.04)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #06565F 0%, #0A7C8A 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ffffff 0%, #FB923C 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #E8F4F6 0%, #FFFFFF 100%)',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translate3d(0, 40px, 0)',
          },
          to: {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}