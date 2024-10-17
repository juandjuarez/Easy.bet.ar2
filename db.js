const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Cambia esto si usas otro usuario
    password: 'xxlirione94',  // Tu contraseña de MySQL
    database: 'easybet_preregistro'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;
