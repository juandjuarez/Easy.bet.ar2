const { Pool } = require('pg');

// Crea una conexión a la base de datos utilizando la variable de entorno
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Usa la variable de entorno para la conexión
    ssl: {
        rejectUnauthorized: false, // Para evitar problemas de certificado en producción
    },
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
