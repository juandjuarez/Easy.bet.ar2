// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
window.addEventListener('DOMContentLoaded', () => {
    const pixelRatio = window.devicePixelRatio || 1;
    const heroSection = document.querySelector('.hero');
    const contentSection = document.querySelector('.content');

    // Función para ajustar las imágenes de fondo según la densidad de píxeles
    function ajustarImagenes() {
        if (pixelRatio > 1.5) {
            // Alta resolución (Retina o pantallas de alta densidad)
            heroSection.style.backgroundImage = "url('fondo-1-alta-resolucion.png')";
            contentSection.style.backgroundImage = "url('fondo-2-alta-resolucion.png')";
        } else {
            // Baja resolución
            heroSection.style.backgroundImage = "url('fondo-1-baja-resolucion.png')";
            contentSection.style.backgroundImage = "url('fondo-2-baja-resolucion.png')";
        }
    }

    // Función para ajustar dinámicamente el tamaño del contenido en pantallas pequeñas
    function ajustarLayoutSegunPantalla() {
        const screenWidth = window.innerWidth;

        if (screenWidth < 768) {
            document.body.style.fontSize = '3vw'; // Ajustar el tamaño del texto para pantallas móviles
        } else {
            document.body.style.fontSize = '1vw'; // Tamaño de texto para pantallas más grandes
        }
    }

    // Llamar a las funciones para ajustar las imágenes y el layout
    ajustarImagenes();
    ajustarLayoutSegunPantalla();

    // Asegurarse de que las imágenes se ajusten si se redimensiona la ventana
    window.addEventListener('resize', ajustarLayoutSegunPantalla);
});
