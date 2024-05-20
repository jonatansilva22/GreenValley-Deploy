const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Middleware para permitir solicitudes desde cualquier origen (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Reemplaza con la URL de tu cliente React
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Ruta POST para el inicio de sesión
app.post('/login', (req, res) => {
    const { correo, contraseña } = req.body;

    // Verificar las credenciales del usuario en la base de datos
    db.get('SELECT * FROM Usuario WHERE correo = ? AND contraseña = ?', [correo, contraseña], (err, row) => {
        if (err) {
            console.error('Error al buscar usuario:', err.message);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
            return;
        }

        // Si se encuentra un usuario con las credenciales proporcionadas
        if (row) {
            // Aquí puedes realizar alguna acción, como crear un token de autenticación y enviarlo como respuesta
            res.json({ success: true, mensaje: 'Inicio de sesión exitoso', usuario: row });
        } else {
            // Si las credenciales son incorrectas o el usuario no existe
            res.status(401).json({ success: false, error: 'Credenciales inválidas' });
        }
    });
});

// Ruta GET para obtener los productos
app.get('/inventory', (req, res) => {
    // Consulta SQL para seleccionar los productos
    const sql = `SELECT idProducto, nombre, precioVenta, categoría, cantidadEnStock FROM Producto`;

    // Ejecutar la consulta
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener los productos:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        // Si hay productos, enviarlos como respuesta
        res.json(rows);
    });
});

// Ruta GET para obtener un producto por su ID
app.get('/products/:idProducto', (req, res) => {
    const { idProducto } = req.params;

    // Consulta SQL para seleccionar un producto por su ID
    const sql = `SELECT idProducto, nombre, precioVenta, categoría, cantidadEnStock FROM Producto WHERE idProducto = ?`;

    // Ejecutar la consulta con el ID del producto proporcionado en los parámetros
    db.get(sql, [idProducto], (err, row) => {
        if (err) {
            console.error('Error al obtener el producto:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        // Si el producto se encontró, enviarlo como respuesta
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    });
});

// Ruta DELETE para eliminar un producto por su idProducto
app.delete('/inventory/:idProducto', (req, res) => {
    const idProducto = req.params.idProducto;

    // Realizar la eliminación del producto en la base de datos
    db.run('DELETE FROM Producto WHERE idProducto = ?', [idProducto], (err) => {
        if (err) {
            console.error('Error al eliminar el producto:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        res.json({ message: 'Producto eliminado exitosamente' });
    });
});

app.post('/products', (req, res) => {
    const { nombre, precioVenta, categoría, cantidadEnStock } = req.body;

    // Inserta el nuevo producto en la base de datos
    db.run('INSERT INTO Producto (nombre, precioVenta, categoría, cantidadEnStock) VALUES (?, ?, ?, ?)', [nombre, precioVenta, categoría, cantidadEnStock], (err) => {
        if (err) {
            console.error('Error al agregar el producto:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        // Obtiene el ID del producto insertado
        const idProducto = this.lastID;
        // Devuelve el nuevo producto con el ID
        res.status(201).json({ idProducto, nombre, precioVenta, categoría, cantidadEnStock });
    });
});



app.get('/reports', (req, res) => {
    // Consulta SQL para seleccionar los movimientos
    const sql = `SELECT idMovimiento, idProducto, tipo, cantidad, venta, movFechaHora FROM Movimiento`;

    // Ejecutar la consulta
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener los movimientos:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        // Si hay movimientos, enviarlos como respuesta
        res.json(rows);
    });
});

app.get('/sales', (req, res) => {
    // Consulta SQL para seleccionar los movimientos de venta
    const sql = `SELECT idMovimiento, idProducto, tipo, cantidad, movFechaHora FROM Movimiento WHERE venta = 1`;

    // Ejecutar la consulta
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener las ventas:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        // Si hay ventas, enviarlas como respuesta
        res.json(rows);
    });
});

// Endpoint para actualizar un producto
app.put('/edit/:idProducto', (req, res) => {
    const { idProducto } = req.params;
    const { nombre, precioVenta, categoría, cantidadEnStock } = req.body;

    // Actualiza el producto en la base de datos
    db.run('UPDATE Producto SET nombre = ?, precioVenta = ?, categoría = ?, cantidadEnStock = ? WHERE idProducto = ?', [nombre, precioVenta, categoría, cantidadEnStock, idProducto], function(err) {
        if (err) {
            console.error('Error al actualizar el producto:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        if (this.changes === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        // Devuelve el producto actualizado
        res.status(200).json({ idProducto, nombre, precioVenta, categoría, cantidadEnStock });
    });
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
