/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'game': 'repeat(10, 20px);'
            },
            gridTemplateRows: {
                'game': 'repeat(10, 20px);'
            },
            gap: {
                'game': 'gap: 1px;'
            }
        },
    },
    plugins: [],
}

