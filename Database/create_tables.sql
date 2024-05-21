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
    estado TEXT CHECK(estado IN ('pendiente', 'vendido','cancelado')), -- Corrección 1 y 2
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

CREATE TABLE IF NOT EXISTS Movimiento (
    idMovimiento INTEGER PRIMARY KEY AUTOINCREMENT,
    idProducto INTEGER,
    tipo TEXT CHECK(tipo IN ('alta', 'baja')),
    cantidad INTEGER,
    venta INTEGER CHECK(venta IN (0, 1)),
    movFechaHora DATETIME,
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

CREATE TRIGGER IF NOT EXISTS trigger_producto_update
AFTER UPDATE OF cantidadEnStock ON Producto
FOR EACH ROW
BEGIN
    -- Comparar la cantidad antigua con la nueva
    -- Si la cantidad nueva es mayor que la antigua, es un movimiento de "alta"
    -- Si la cantidad nueva es menor que la antigua, es un movimiento de "baja"
    -- Calcular la diferencia entre las cantidades

    -- Movimiento de "alta"
    INSERT INTO Movimiento (idProducto, tipo, cantidad, movFechaHora, venta)
    SELECT NEW.idProducto, 'alta', NEW.cantidadEnStock - OLD.cantidadEnStock, datetime('now'), 0
    WHERE NEW.cantidadEnStock > OLD.cantidadEnStock;

    -- Movimiento de "baja"
    INSERT INTO Movimiento (idProducto, tipo, cantidad, movFechaHora, venta)
    SELECT NEW.idProducto, 'baja', OLD.cantidadEnStock - NEW.cantidadEnStock, datetime('now'), 0
    WHERE NEW.cantidadEnStock < OLD.cantidadEnStock;
END;

CREATE TRIGGER IF NOT EXISTS trigger_pedido_vendido
AFTER UPDATE OF estado ON Pedido
FOR EACH ROW
WHEN NEW.estado = 'vendido'
BEGIN
    -- Insertar registros en la tabla Articulo_Vendido
    INSERT INTO Articulo_Vendido (idProductoPedido, utilidad, porcentajeUtilidad)
    SELECT pp.idProductoPedido, 
           (p.precioVenta - p.costoArticulo) * pp.cantidadSolicitada AS utilidad,
           ((p.precioVenta - p.costoArticulo) / p.costoArticulo) * 100 AS porcentajeUtilidad
    FROM Producto_Pedido pp
    JOIN Producto p ON pp.idProducto = p.idProducto
    WHERE pp.idPedido = NEW.idPedido;

    -- Insertar registros en la tabla Movimiento para cada artículo vendido
    INSERT INTO Movimiento (idProducto, tipo, cantidad, movFechaHora, venta)
    SELECT pp.idProducto, 'baja', pp.cantidadSolicitada, datetime('now'), 1
    FROM Producto_Pedido pp
    WHERE pp.idPedido = NEW.idPedido;
    
    -- Actualizar la cantidad en stock de los productos vendidos
    UPDATE Producto
    SET cantidadEnStock = cantidadEnStock - (
        SELECT SUM(pp.cantidadSolicitada)
        FROM Producto_Pedido pp
        WHERE pp.idProducto = Producto.idProducto
          AND pp.idPedido = NEW.idPedido
    )
    WHERE idProducto IN (
        SELECT idProducto
        FROM Producto_Pedido
        WHERE idPedido = NEW.idPedido
    );
END;

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

