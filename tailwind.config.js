// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{html,ts}", // Incluir todos los archivos de Angular para que Tailwind los procese
    ],
    theme: {
      extend: {
        colors: {
          primary: 'var(--primary-color)', // Usando variable CSS para color primario
          secondary: 'var(--secondary-color)', // Usando variable CSS para color secundario
        },
        fontSize: {
          base: 'var(--font-size)', // Usando variable CSS para tamaño de fuente
        },
      },
    },
    plugins: [],
  }
  