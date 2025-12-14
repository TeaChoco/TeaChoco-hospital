//-Path: "TeaChoco-Hospital/client/tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#22c55e',
                    light: '#4ade80',
                    dark: '#15803d',
                },
                accent: {
                    DEFAULT: '#0ea5e9',
                    secondary: '#3b82f6',
                },
                bg: {
                    light: '#ffffff',
                    dark: '#0a0a0f',
                    'card-light': '#f8fafc',
                    'card-dark': '#14141f',
                    'card-hover-light': '#f1f5f9',
                    'card-hover-dark': '#1a1a2e',
                },
                text: {
                    light: '#1e293b',
                    dark: '#f8fafc',
                    'secondary-light': '#475569',
                    'secondary-dark': '#94a3b8',
                    'muted-light': '#64748b',
                    'muted-dark': '#64748b',
                },
                border: {
                    light: '#e2e8f0',
                    dark: '#1e293b',
                },
            },
        },
    },
    plugins: [],
};
