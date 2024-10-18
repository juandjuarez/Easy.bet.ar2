const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join('C:/Users/Juan Manuel/Desktop/easybet.db'); 

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL,
        telefono TEXT NOT NULL
    )`);
});
module.exports = db;
