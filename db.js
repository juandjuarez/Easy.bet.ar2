const { Pool } = require('pg');

// Crea una conexión a la base de datos utilizando la variable de entorno
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Usa la variable de entorno para la conexión
    ssl: {
        rejectUnauthorized: false, // Para evitar problemas de certificado en producción
    },
});

// Función para ejecutar consultas con manejo de errores
const query = async (text, params) => {
    try {
        const res = await pool.query(text, params);
        return res; // Devuelve los resultados de la consulta
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error.message);
        throw error; // Lanza el error para manejarlo más adelante
    }
};

// Exporta la función de consulta
module.exports = {
    query,
};
