const colors = require("tailwindcss/colors");

module.exports = {
    purge: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.tsx",
        "./resources/**/**/*.tsx",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                // cyan: colors.cyan,
                teal: colors.teal,

                gray: colors.gray,
            },
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
                nunito: ["Nunito", "sans-serif"],
            },
        },
    },
    variants: {
        extend: {
            width: ["focus"],
            opacity: ["disabled"],
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
