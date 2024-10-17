const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Asegúrate de que este archivo esté configurado para la conexión a la base de datos
const cors = require('cors');

// Inicializar la aplicación
const app = express();
const port = process.env.PORT || 3000; // Usar el puerto de Railway o 3000 como fallback

// Configurar CORS antes de cualquier ruta
app.use(cors());

// Configurar body-parser para manejar datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Verificar la variable de entorno para la conexión
console.log('Conectando a la base de datos en:', process.env.DATABASE_URL);

// Ruta principal
app.get('/', (req, res) => {
    res.send('EasyBet pre-registro');
});

// Ruta para recibir datos del formulario
app.post('/submit', (req, res) => {
    const { nombre, email, telefono } = req.body;

    // Insertar los datos en la base de datos
    const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
    db.query(query, [nombre, email, telefono], (err, result) => {
        if (err) {
            console.error('Error al guardar en la base de datos:', err);
            return res.status(500).send('Error al registrar los datos.');
        }
        console.log('Datos guardados en la base de datos');
        res.send('¡Registro exitoso!');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en: ${process.env.DATABASE_PUBLIC_URL || `http://localhost:${port}`}`);
});

// Aquí comienza el código del lado del cliente para ajustar las imágenes según la densidad de píxeles
// Detectar la densidad de píxeles de la pantalla (DPR)
window.addEventListener('DOMContentLoaded', () => {
    const pixelRatio = window.devicePixelRatio || 1;

    // Cambiar la imagen de fondo según la densidad de píxeles
    const heroSection = document.querySelector('.hero');
    const contentSection = document.querySelector('.content');

    if (pixelRatio > 1) {
        heroSection.style.backgroundImage = "url('fondo-1-alta-resolucion.png')";
        contentSection.style.backgroundImage = "url('fondo-2-alta-resolucion.png')";
    } else {
        heroSection.style.backgroundImage = "url('fondo-1-baja-resolucion.png')";
        contentSection.style.backgroundImage = "url('fondo-2-baja-resolucion.png')";
    }

    // Opcional: Puedes ajustar más estilos basados en la densidad
    console.log(`Densidad de píxeles: ${pixelRatio}`);
});
