const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Asegúrate de que este archivo esté configurado para la conexión a la base de datos

const app = express();
const port = process.env.PORT || 3000; // Usar el puerto de Railway o 3000 como fallback

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
        if (err) throw err; 
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


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
