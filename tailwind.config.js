/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.ts",
        "./resources/**/*.tsx",
    ],
    theme: {
        extend: {
            colors: {
                lifeTrack: {
                    lightest: "#DFF2EB",
                    light: "#B9E5E8",
                    primary: "#7AB2D3",
                    dark: "#4A628A",
                },
            },
        },
    },
    plugins: [],
};
