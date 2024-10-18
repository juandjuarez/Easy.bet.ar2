const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); 

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

// Ruta para manejar la recepción de datos del formulario y guardarlos en SQLite
app.post('/submit', (req, res) => {
    const { nombre, email, telefono } = req.body;

    // Validar los campos requeridos
    if (!nombre || !email || !telefono) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Usar db.serialize para asegurar que las operaciones se ejecuten en orden
    db.serialize(() => {
        const stmt = db.prepare("INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)");
        stmt.run(nombre, email, telefono, function(err) {
            if (err) {
                console.error('Error al insertar usuario:', err);
                return res.status(500).send('Error al guardar los datos.');
            }
            res.send('¡Registro exitoso!');
        });
        stmt.finalize(); // Finalizar la declaración
    });
});
const config = require('./config'); // Asegúrate de usar './' para rutas relativas
// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});

