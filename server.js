const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Usuario de la base de datos
    password: '', // Contraseña de la base de datos
    database: 'easybet_db' // Nombre de tu base de datos
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Reemplaza con tu API Key y Sheet ID
const API_KEY = 'TU_API_KEY';
const SHEET_ID = 'TU_SHEET_ID';

// Ruta para manejar el formulario
app.post('/submit', async (req, res) => {
    const { nombre, email, telefono } = req.body;

    // Inserción en la base de datos
    const sql = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
    db.query(sql, [nombre, email, telefono], async (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            return res.status(500).json({ error: 'Error al guardar datos en la base de datos' });
        }
        console.log('Datos insertados en la base de datos');

        // Envío a Google Sheets
        const data = {
            range: 'Sheet1!A1:C1',
            majorDimension: 'ROWS',
            values: [[nombre, email, telefono]],
        };

        try {
            const response = await axios.post(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1:append?valueInputOption=USER_ENTERED&key=${API_KEY}`, data);
            console.log('Datos enviados a Google Sheets:', response.data);
            res.status(200).json({ message: 'Formulario enviado correctamente' });
        } catch (error) {
            console.error('Error al enviar datos a Google Sheets:', error);
            res.status(500).json({ error: 'Error al enviar datos a Google Sheets' });
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

