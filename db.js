const { Pool } = require('pg');

// Crea una conexión a la base de datos utilizando la configuración adecuada
const pool = new Pool({
    host: 'postgres.railway.internal', // Host para la conexión
    port: 5432, // Puerto por defecto de PostgreSQL
    user: process.env.PGUSER, // Usuario de la base de datos
    password: process.env.POSTGRES_PASSWORD, // Contraseña de la base de datos
    database: process.env.PGDATABASE, // Nombre de la base de datos
});

// Manejo de la conexión
pool.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos PostgreSQL:', err);
        throw err;
    }
    console.log('Conectado a la base de datos PostgreSQL');
});

// Exporta la función para hacer consultas
module.exports = {
    query: (text, params) => pool.query(text, params),
};

