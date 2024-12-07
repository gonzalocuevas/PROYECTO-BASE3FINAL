-- Insertar datos en Cliente
INSERT INTO Cliente (nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente) VALUES
('Juan Perez', 'Av. Central 123', '987654321', 'juan.perez@example.com'),
('Maria Lopez', 'Calle Luna 456', '912345678', 'maria.lopez@example.com'),
('Carlos Sanchez', 'Av. Mar 789', '932165498', 'carlos.sanchez@example.com'),
('Ana Torres', 'Calle Sol 101', '923456789', 'ana.torres@example.com'),
('Luis Gomez', 'Av. Norte 202', '976543210', 'luis.gomez@example.com'),
('Carmen Diaz', 'Calle Estrella 303', '965432198', 'carmen.diaz@example.com'),
('Pedro Ruiz', 'Av. Oeste 404', '954321987', 'pedro.ruiz@example.com'),
('Laura Morales', 'Calle Sur 505', '943219876', 'laura.morales@example.com'),
('Diego Hernandez', 'Av. Este 606', '932109875', 'diego.hernandez@example.com'),
('Paula Rios', 'Calle Nueva 707', '921098764', 'paula.rios@example.com');

-- Insertar datos en Línea de Producción
INSERT INTO LineaProduccion (nombre_linea, capacidad_maxima) VALUES
('Línea A', 1000),
('Línea B', 800),
('Línea C', 1200),
('Línea D', 900),
('Línea E', 1100),
('Línea F', 950);

-- Insertar datos en Insumo
INSERT INTO Insumo (nombre_insumo, stock_actual, unidad_medida) VALUES
('Botellas', 5000, 'unidades'),
('Corchos', 2000, 'unidades'),
('Etiquetas', 3000, 'unidades'),
('Cajas', 1000, 'unidades'),
('Palets', 500, 'unidades');

-- Insertar datos en Empleado (Operador)
INSERT INTO Empleado (nombre_empleado, turno, linea_asignada_id, rol) VALUES
('Carlos Peña', 'Mañana', 1, 'Operador'),
('Lucia Romero', 'Tarde', 2, 'Operador'),
('Jose Gonzalez', 'Noche', 3, 'Operador'),
('Sandra Vasquez', 'Mañana', 4, 'Operador'),
('Fernando Castillo', 'Tarde', 5, 'Operador'),
('Laura Soto', 'Noche', 6, 'Operador'),
('Diego Ramirez', 'Mañana', 1, 'Supervisor'),
('Paola Medina', 'Tarde', 2, 'Supervisor'),
('Hector Jimenez', 'Noche', 3, 'Supervisor');

-- Insertar datos en Jefe de Producción
INSERT INTO JefeProduccion (nombre_jefe, linea_asignada_id, experiencia, nivel_responsabilidad) VALUES
('Alberto Flores', 1, 10, 'Alto'),
('Gabriela Vasquez', 2, 8, 'Medio'),
('Manuel Lopez', 3, 12, 'Alto'),
('Elena Martinez', 4, 7, 'Medio'),
('Raul Perez', 5, 5, 'Bajo'),
('Susana Hernandez', 6, 15, 'Alto');

-- Insertar datos en Transporte (Camión)
INSERT INTO Transporte (capacidad_camion, disponibilidad) VALUES
(2000, 'Disponible'),
(1500, 'Disponible'),
(1800, 'En Ruta'),
(2200, 'Disponible'),
(1700, 'En Mantenimiento');

-- Insertar datos en Punto de Entrega
INSERT INTO PuntoEntrega (ubicacion, horario_recepcion, cliente_id, transporte_id) VALUES
('Centro Logístico A', '08:00-17:00', 1, 1),
('Almacén Norte', '09:00-18:00', 2, 2),
('Sucursal Sur', '08:30-17:30', 3, 3),
('Bodega Central', '07:00-15:00', 4, 4),
('Distribuidora Este', '08:00-16:00', 5, 1),
('Almacén Oeste', '10:00-19:00', 6, 2),
('Punto Entrega 1', '09:00-17:00', 7, 3),
('Punto Entrega 2', '10:00-18:00', 8, 4),
('Punto Entrega 3', '08:30-16:30', 9, 5),
('Punto Entrega 4', '09:00-17:00', 10, 1);

-- Insertar datos en Pedido
INSERT INTO Pedido (fecha_pedido, cliente_id, linea_produccion_id, cantidad_total, estado_pedido, transporte_id, variedad_vino) VALUES
('2024-01-01', 1, 1, 100, 'En Proceso', 1, 'Cabernet Sauvignon'),
('2024-01-02', 2, 2, 150, 'Completado', 2, 'Merlot'),
('2024-01-03', 3, 3, 200, 'Pendiente', 3, 'Chardonnay'),
('2024-01-04', 4, 4, 250, 'En Proceso', 4, 'Syrah'),
('2024-01-05', 5, 5, 300, 'Completado', 5, 'Pinot Noir'),
('2024-01-06', 6, 1, 50, 'En Proceso', 1, 'Malbec'),
('2024-01-07', 7, 2, 120, 'Pendiente', 2, 'Cabernet Franc'),
('2024-01-08', 8, 3, 170, 'Completado', 3, 'Sauvignon Blanc'),
('2024-01-09', 9, 4, 220, 'En Proceso', 4, 'Tempranillo'),
('2024-01-10', 10, 5, 270, 'Pendiente', 5, 'Zinfandel');
('2024-12-05', 1, 1, 100, 'Pendiente',1, 'Merlot');

-- Insertar datos en Producción-Insumo
INSERT INTO ProduccionInsumo (linea_produccion_id, insumo_id, cantidad_utilizada) VALUES
(1, 1, 500),
(2, 2, 300),
(3, 3, 400),
(4, 1, 250),
(5, 2, 150),
(6, 3, 350),
(1, 4, 200),
(2, 5, 100),
(3, 1, 450),
(4, 2, 275);