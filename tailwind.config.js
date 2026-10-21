/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FBFBF9',
        warm: '#F7F5F0',
        charcoal: '#1F1E1B',
        dark: '#1A1918',
        muted: '#57524A',
        label: '#3D3A35',
        subhead: '#3D3833',
        terracotta: {
          DEFAULT: '#A65B32',
          hover: '#B86B43',
          dark: '#8A4623',
          light: 'rgba(166, 91, 50, 0.08)',
        }
      },
      fontFamily: {
        brand: ['"Cinzel Decorative"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        subtitle: ['"Italiana"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        frame: '0 20px 50px rgba(28, 30, 29, 0.12), 0 2px 6px rgba(28, 30, 29, 0.04)',
        soft: '0 4px 24px rgba(28, 30, 29, 0.06)',
        lift: '0 12px 40px rgba(28, 30, 29, 0.10)',
      }
    },
  },
  plugins: [],
}
