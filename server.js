const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar el formulario
app.post('/', (req, res) => { // Cambiado a la ruta raíz
    const { nombre, email, telefono } = req.body;

    // Aquí podrías agregar lógica para manejar los datos recibidos (por ejemplo, enviarlos a un servicio externo)
    
    res.status(200).json({ message: 'Formulario enviado correctamente' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
