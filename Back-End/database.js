const sqlite3 = require('sqlite3').verbose();

// Ruta al archivo de la base de datos SQLite
const DB_FILE = '../Database/greenvalley.db';

// Crear una nueva instancia de la base de datos SQLite
const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos SQLite:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos SQLite');
    }
});

module.exports = db;
