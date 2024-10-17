const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql'); // O postgres si prefieres PostgreSQL

const app = express();
const port = 3000;

// Configurar body-parser para manejar formularios
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la base de datos (ejemplo con MySQL)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Usuario de la base de datos
    password: '', // Contraseña de la base de datos
    database: 'easybet_db' // Nombre de tu base de datos
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Ruta para manejar el formulario
app.post('/submit', (req, res) => {
    const { nombre, email, telefono } = req.body;
    const sql = `INSERT INTO usuarios (nombre, email, telefono) VALUES ('${nombre}', '${email}', '${telefono}')`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Datos insertados');
        res.send('Formulario enviado correctamente');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
