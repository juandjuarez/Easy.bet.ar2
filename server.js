const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database'); // Asegúrate de que este archivo contenga la conexión a SQLite

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar el formulario
app.post('/guardar-datos', (req, res) => { // Cambiado a /guardar-datos
    const { nombre, email, telefono } = req.body;

    // Preparar la declaración SQL
    const stmt = db.prepare("INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)");
    stmt.run(nombre, email, telefono, function(err) {
        if (err) {
            console.error('Error al insertar usuario:', err.message);
            return res.status(500).json({ error: 'Error al guardar los datos' });
        }
        res.status(200).json({ message: 'Formulario enviado correctamente' });
    });
    stmt.finalize();
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
