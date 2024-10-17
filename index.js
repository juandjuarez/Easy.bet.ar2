const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Asegúrate de que este archivo esté configurado correctamente para la base de datos
const cors = require('cors');
const axios = require('axios'); // Importa axios para hacer solicitudes HTTP

// Inicializar la aplicación de Express
const app = express();
const port = process.env.PORT || 3000; // Usar el puerto configurado o el puerto 3000 por defecto

// Configuración de CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Configuración de body-parser para manejar solicitudes con datos en el cuerpo (formulario, JSON)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Verificación de la conexión a la base de datos usando variables de entorno
console.log('Conectando a la base de datos en:', process.env.DATABASE_URL);

// Reemplaza con tu API Key y Sheet ID
const API_KEY = 'AIzaSyAHSMUwPqroN1sA5_2XCcVjEbdxlmw5U48'; 
const SHEET_ID = '1z6iOzhM_YhMG0_bSPvkQX8ouAjgO5yUiIlxO4Zs1Cf8';

// Ruta principal para verificar si el servidor está corriendo
app.get('/', (req, res) => {
    res.send('EasyBet pre-registro');
});

// Ruta para manejar la recepción de datos del formulario y guardarlos en la base de datos
app.post('/submit', async (req, res) => {
    const { nombre, email, telefono } = req.body;

    // Validar los campos requeridos
    if (!nombre || !email || !telefono) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Insertar los datos en la base de datos
    const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
    db.query(query, [nombre, email, telefono], async (err, result) => {
        if (err) {
            console.error('Error al guardar en la base de datos:', err);
            return res.status(500).send('Error al registrar los datos.');
        }
        console.log('Datos guardados en la base de datos');

        // Enviar los datos a Google Sheets
        const data = {
            range: 'Sheet1!A1:C1', // Ajusta según tu hoja
            majorDimension: 'ROWS',
            values: [[nombre, email, telefono]], // Datos a agregar
        };

        try {
            await axios.post(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1:append?valueInputOption=USER_ENTERED&key=${API_KEY}`, data);
            console.log('Datos enviados a Google Sheets');
        } catch (error) {
            console.error('Error al enviar datos a Google Sheets:', error.response ? error.response.data : error.message);
            return res.status(500).send('Error al registrar los datos en Google Sheets.');
        }

        res.send('¡Registro exitoso!');
    });
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor corriendo en: ${process.env.DATABASE_PUBLIC_URL || `http://localhost:${port}`}`);
});


