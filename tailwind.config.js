/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          'rojo': '#ed1c24',
          'rojo-hover': '#ec533c',
          'danger': '#e3342f',
        },
        backgroundColor: {
          'rojo': '#ed1c24',
          'rojo-hover': '#ec533c',
          
        },
        textColor: {
          'rojo': '#ed1c24',
          'rojo-hover': '#ec533c',
          'danger': '#e3342f',
        },
        screens: {
            "sm-360": '360px',
            "sm-380": '380px',
            "sm-420": '420px',
          sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            "2xl": '1536px',

      },
      boxShadow: {
        'text': '0px 0px 5px rgba(0, 0, 0, 0.5)',  // Personaliza aquí el valor de la sombra
      },
    },
    plugins: [
      // require("@designbycode/tailwindcss-text-shadow"),
    ],
  }
}