const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); 

const app = express();
const port = 3000;

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
    const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES ($1, $2, $3)';
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
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
