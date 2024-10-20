const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicializar la aplicación de Express
const app = express();
const port = process.env.PORT || 3000; // Usar el puerto configurado o el puerto 3000 por defecto

// Configuración de CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Configuración de body-parser para manejar solicitudes con datos en el cuerpo (formulario, JSON)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta principal para verificar si el servidor está corriendo
app.get('/', (req, res) => {
    res.send('EasyBet pre-registro');
});

// Ruta para manejar la recepción de datos del formulario
app.post('/submit', (req, res) => {
    const { nombre, email, telefono } = req.body;

    // Validar los campos requeridos
    if (!nombre || !email || !telefono) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Aquí podrías agregar lógica para manejar los datos recibidos (por ejemplo, enviarlos a un servicio externo)
    
    res.send('¡Registro exitoso!');
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});
