require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta para manejar el formulario
app.post('/submit', async (req, res) => {
    const { nombre, email, telefono } = req.body;

    // Envío a Google Sheets
    const data = {
        range: 'Sheet1!A:C', // Asegúrate de que el rango sea correcto
        majorDimension: 'ROWS',
        values: [[nombre, email, telefono]],
    };

    try {
        const response = await axios.post(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/Sheet1:append?valueInputOption=USER_ENTERED&key=${process.env.API_KEY}`, data);
        console.log('Datos enviados a Google Sheets:', response.data);
        res.status(200).json({ message: 'Formulario enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar datos a Google Sheets:', error);
        res.status(500).json({ error: 'Error al enviar datos a Google Sheets' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
