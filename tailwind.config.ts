const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f8ff",
          100: "#e7f0ff",
          500: "#2c67f2",
          600: "#1f54d6",
          900: "#102a63",
        },
        slate: {
          950: "#0b1220",
        },
      },
    },
  },
  plugins: [],
};

export default config;
