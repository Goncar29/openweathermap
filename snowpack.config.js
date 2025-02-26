module.exports = {
  mount: {
    public: { url: '/', static: true },  // Copia archivos tal cual a la raíz de `build/`
    src: { url: '/dist' }  // Transforma los archivos JS de `src/` y los coloca en `/dist`
  },
  buildOptions: {
    out: 'build', // Asegura que Snowpack genere la salida en `build/`
    baseUrl: './', // Usa rutas relativas para evitar errores en GitHub Pages
    clean: true // Elimina archivos viejos en `build/` antes de generar nuevos
  }
};
