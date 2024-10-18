
window.addEventListener('DOMContentLoaded', () => {
    const pixelRatio = window.devicePixelRatio || 1;
    const heroSection = document.querySelector('.hero');
    const contentSection = document.querySelector('.content');

    function ajustarImagenes() {
        if (pixelRatio > 1.5) {
            heroSection.style.backgroundImage = "url('1-alta-resolucion.png')";
            contentSection.style.backgroundImage = "url('2-alta-resolucion.png')";
        } else {
            heroSection.style.backgroundImage = "url('1-baja-resolucion.png')";
            contentSection.style.backgroundImage = "url('2-baja-resolucion.png')";
        }
    }

    function ajustarLayoutSegunPantalla() {
        const screenWidth = window.innerWidth;

        if (screenWidth < 768) {
            document.body.style.fontSize = '3vw'; 
        } else {
            document.body.style.fontSize = '1vw'; 
        }
    }

    ajustarImagenes();
    ajustarLayoutSegunPantalla();

    
    window.addEventListener('resize', ajustarLayoutSegunPantalla);
});
 
