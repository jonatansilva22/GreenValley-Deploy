-- Tabla Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    idUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    correo TEXT,
    contraseña TEXT,
    tipoUsuario TEXT CHECK (tipoUsuario IN ('dueño', 'cliente'))
);

-- Tabla Producto
CREATE TABLE IF NOT EXISTS Producto (
    idProducto INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    descripción TEXT,
    categoría TEXT,
    precioVenta REAL,
    costoArticulo REAL,
    cantidadEnStock INTEGER
);

-- Tabla Pedido
CREATE TABLE IF NOT EXISTS Pedido (
    idPedido INTEGER PRIMARY KEY AUTOINCREMENT,
    idUsuario INTEGER,
    pedidoFechaHora DATETIME,
    ventaFechaHora DATETIME,
    estado TEXT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

-- Tabla Producto_Pedido
CREATE TABLE IF NOT EXISTS Producto_Pedido (
    idProductoPedido INTEGER PRIMARY KEY AUTOINCREMENT,
    idPedido INTEGER,
    idProducto INTEGER,
    cantidadSolicitada INTEGER,
    FOREIGN KEY (idPedido) REFERENCES Pedido(idPedido),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

-- Tabla Articulo_Vendido
CREATE TABLE IF NOT EXISTS Articulo_Vendido (
    idArticulo INTEGER PRIMARY KEY AUTOINCREMENT,
    idProductoPedido INTEGER,
    utilidad REAL,
    porcentajeUtilidad REAL,
    FOREIGN KEY (idProductoPedido) REFERENCES Producto_Pedido(idProductoPedido)
);

-- Insertar datos en la tabla Usuario
INSERT INTO Usuario (nombre, correo, contraseña, tipoUsuario) 
VALUES 
    ('Juan Pérez', 'juan@example.com', 'contraseña123', 'dueño'),
    ('Martín Portela', 'mgportelad@me.com', 'admin', 'dueño'),
    ('María García', 'maria@example.com', 'password456', 'cliente'),
    ('Carlos López', 'carlos@example.com', '123456', 'cliente');

-- Insertar datos en la tabla Producto
INSERT INTO Producto (nombre, descripción, categoría, precioVenta, costoArticulo, cantidadEnStock) 
VALUES 
    ('Bate de softbol', 'Bate de aluminio para softbol', 'Bates', 89.99, 45.00, 10),
    ('Guantes de béisbol', 'Guantes de cuero para béisbol', 'Guantes', 29.99, 15.00, 20),
    ('Mochila para bates', 'Mochila con compartimento para llevar bates', 'Mochilas', 49.99, 25.00, 15);

-- Insertar datos en la tabla Pedido
INSERT INTO Pedido (idUsuario, pedidoFechaHora, ventaFechaHora, estado) 
VALUES 
    (1, '2024-04-30 10:00:00', '2024-04-30 10:30:00', 'completado'),
    (2, '2024-04-29 15:00:00', '2024-04-29 15:45:00', 'completado'),
    (3, '2024-04-28 11:30:00', '2024-04-28 12:00:00', 'pendiente');

-- Insertar datos en la tabla Producto_Pedido
INSERT INTO Producto_Pedido (idPedido, idProducto, cantidadSolicitada) 
VALUES 
    (1, 1, 2),
    (1, 2, 1),
    (2, 3, 3),
    (3, 1, 1),
    (3, 2, 2),
    (3, 3, 1);

-- Insertar datos en la tabla Articulo_Vendido
INSERT INTO Articulo_Vendido (idProductoPedido, utilidad, porcentajeUtilidad) 
VALUES 
    (1, 45.00, 50.01),
    (2, 14.99, 50.01),
    (3, 74.97, 50.01),
    (4, 44.99, 50.01),
    (5, 59.98, 50.01),
    (6, 24.99, 50.01);

