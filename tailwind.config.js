/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        mulish: ["Mulish", "sans-serif"],
        pacifico: ["Pacifico", "brush script"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "pastel-green": "#6B8E23",
        "leaf-brown": "#A0522D",
        "cherry-red": "#C74B50",
        "light-brown": "#F0EAD6",
      },
      backgroundImage: {
        hero: "url('/assets/images/png/heroImage.png')",
        cta: "url('/assets/images/png/cta.png')",
      },
    },
  },
  plugins: [],
};
