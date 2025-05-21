/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./content/**/*.md",
  ],
  "theme": {
    "extend": {
      "rendering": {
        'auto': { imageRendering: 'auto' },
        'smooth': { imageRendering: 'smooth' },
        'high-quality': { imageRendering: 'high-quality' },
        'crisp-edges': { imageRendering: 'crisp-edges' },
        'pixelated': { imageRendering: 'pixelated' },
      },
      "colors": {
        "default": {
          "50": "rgba(var(--default-50))",
          "100": "rgba(var(--default-100))",
          "200": "rgba(var(--default-200))",
          "300": "rgba(var(--default-300))",
          "400": "rgba(var(--default-400))",
          "500": "rgba(var(--default-500))",
          "600": "rgba(var(--default-600))",
          "700": "rgba(var(--default-700))",
          "800": "rgba(var(--default-800))",
          "900": "rgba(var(--default-900))",
          "foreground": "rgba(var(--default-foreground))",
          "DEFAULT": "rgba(var(--default-DEFAULT))"
        },
        "primary": {
          "50": "rgba(var(--primary-50))",
          "100": "rgba(var(--primary-100))",
          "200": "rgba(var(--primary-200))",
          "300": "rgba(var(--primary-300))",
          "400": "rgba(var(--primary-400))",
          "500": "rgba(var(--primary-500))",
          "600": "rgba(var(--primary-600))",
          "700": "rgba(var(--primary-700))",
          "800": "rgba(var(--primary-800))",
          "900": "rgba(var(--primary-900))",
          "foreground": "rgba(var(--primary-foreground))",
          "DEFAULT": "rgba(var(--primary-DEFAULT))"
        },
        "secondary": {
          "50": "rgba(var(--secondary-50))",
          "100": "rgba(var(--secondary-100))",
          "200": "rgba(var(--secondary-200))",
          "300": "rgba(var(--secondary-300))",
          "400": "rgba(var(--secondary-400))",
          "500": "rgba(var(--secondary-500))",
          "600": "rgba(var(--secondary-600))",
          "700": "rgba(var(--secondary-700))",
          "800": "rgba(var(--secondary-800))",
          "900": "rgba(var(--secondary-900))",
          "foreground": "rgba(var(--secondary-foreground))",
          "DEFAULT": "rgba(var(--secondary-DEFAULT))"
        },
        "success": {
          "50": "rgba(var(--success-50))",
          "100": "rgba(var(--success-100))",
          "200": "rgba(var(--success-200))",
          "300": "rgba(var(--success-300))",
          "400": "rgba(var(--success-400))",
          "500": "rgba(var(--success-500))",
          "600": "rgba(var(--success-600))",
          "700": "rgba(var(--success-700))",
          "800": "rgba(var(--success-800))",
          "900": "rgba(var(--success-900))",
          "foreground": "rgba(var(--success-foreground))",
          "DEFAULT": "rgba(var(--success-DEFAULT))"
        },
        "warning": {
          "50": "rgba(var(--warning-50))",
          "100": "rgba(var(--warning-100))",
          "200": "rgba(var(--warning-200))",
          "300": "rgba(var(--warning-300))",
          "400": "rgba(var(--warning-400))",
          "500": "rgba(var(--warning-500))",
          "600": "rgba(var(--warning-600))",
          "700": "rgba(var(--warning-700))",
          "800": "rgba(var(--warning-800))",
          "900": "rgba(var(--warning-900))",
          "foreground": "rgba(var(--warning-foreground))",
          "DEFAULT": "rgba(var(--warning-DEFAULT))"
        },
        "danger": {
          "50": "rgba(var(--danger-50))",
          "100": "rgba(var(--danger-100))",
          "200": "rgba(var(--danger-200))",
          "300": "rgba(var(--danger-300))",
          "400": "rgba(var(--danger-400))",
          "500": "rgba(var(--danger-500))",
          "600": "rgba(var(--danger-600))",
          "700": "rgba(var(--danger-700))",
          "800": "rgba(var(--danger-800))",
          "900": "rgba(var(--danger-900))",
          "foreground": "rgba(var(--danger-foreground))",
          "DEFAULT": "rgba(var(--danger-DEFAULT))"
        },
        "background": "rgba(var(--background))",
        "foreground": {
          "50": "rgba(var(--foreground-50))",
          "100": "rgba(var(--foreground-100))",
          "200": "rgba(var(--foreground-200))",
          "300": "rgba(var(--foreground-300))",
          "400": "rgba(var(--foreground-400))",
          "500": "rgba(var(--foreground-500))",
          "600": "rgba(var(--foreground-600))",
          "700": "rgba(var(--foreground-700))",
          "800": "rgba(var(--foreground-800))",
          "900": "rgba(var(--foreground-900))",
          "foreground": "rgba(var(--foreground-foreground))",
          "DEFAULT": "rgba(var(--foreground-DEFAULT))"
        },
        "content1": {
          "DEFAULT": "rgba(var(--content1-DEFAULT))",
          "foreground": "rgba(var(--content1-foreground))"
        },
        "content2": {
          "DEFAULT": "rgba(var(--content2-DEFAULT))",
          "foreground": "rgba(var(--content2-foreground))"
        },
        "content3": {
          "DEFAULT": "rgba(var(--content3-DEFAULT))",
          "foreground": "rgba(var(--content3-foreground))"
        },
        "content4": {
          "DEFAULT": "rgba(var(--content4-DEFAULT))",
          "foreground": "rgba(var(--content4-foreground))"
        },
        "focus": "rgba(var(--focus))",
        "overlay": "rgba(var(--overlay))",
        "divider": "rgba(var(--divider))"
      }
    }
  },
    
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}