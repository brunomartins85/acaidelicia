/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2e0052",
        "primary-container": "#4b0082",
        "on-primary": "#ffffff",
        "on-primary-container": "#ba7ef4",
        secondary: "#8433c4",
        "secondary-container": "#bd6efe",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#450073",
        tertiary: "#705d00",
        "tertiary-container": "#caa900",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#4c3f00",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        background: "#fff7fe",
        "on-background": "#1e1a21",
        surface: "#fff7fe",
        "on-surface": "#1e1a21",
        "surface-variant": "#e9e0ea",
        "on-surface-variant": "#4c4451",
        "surface-container": "#f4ebf5",
        "surface-container-low": "#faf1fb",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#efe5f0",
        outline: "#7d7483",
        "outline-variant": "#cec3d3",
      },
      fontFamily: {
        "body-md": ["Be Vietnam Pro", "sans-serif"],
        "label-lg": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
      },
      spacing: {
        "margin-desktop": "40px",
        "margin-mobile": "20px",
        "gutter": "16px",
      }
    },
  },
  plugins: [],
}