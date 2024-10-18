require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const bodyParser = require('body-parser');
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

// Ruta principal para verificar si el servidor está corriendo
app.get('/', (req, res) => {
    res.send('EasyBet pre-registro');
});

// Ruta para manejar la recepción de datos del formulario y guardarlos en Google Sheets
app.post('/submit', async (req, res) => {
    const { nombre, email, telefono } = req.body;

    // Validar los campos requeridos
    if (!nombre || !email || !telefono) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Enviar los datos a Google Sheets
    const data = {
        range: 'Sheet1!A:C', // Ajusta el rango según tu hoja
        majorDimension: 'ROWS',
        values: [[nombre, email, telefono]], // Datos a agregar
    };

    try {
        const response = await axios.post(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/Sheet1:append?valueInputOption=USER_ENTERED&key=${process.env.API_KEY}`, data);
        console.log('Datos enviados a Google Sheets:', response.data);
    } catch (error) {
        console.error('Error al enviar datos a Google Sheets:', error.response ? error.response.data : error.message);
        return res.status(500).send('Error al registrar los datos en Google Sheets.');
    }

    res.send('¡Registro exitoso!');
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});
