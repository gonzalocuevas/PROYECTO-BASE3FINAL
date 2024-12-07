-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS BodegaVino;
USE BodegaVino;

-- Tabla Cliente
CREATE TABLE Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(100) NOT NULL,
    direccion_cliente VARCHAR(255),
    telefono_cliente VARCHAR(20),
    correo_cliente VARCHAR(100)
);

-- Tabla Línea de Producción
CREATE TABLE LineaProduccion (
    id_linea INT AUTO_INCREMENT PRIMARY KEY,
    nombre_linea VARCHAR(50) NOT NULL,
    capacidad_maxima INT
);

-- Tabla Transporte (Camión)
CREATE TABLE Transporte (
    id_camion INT AUTO_INCREMENT PRIMARY KEY,
    capacidad_camion INT NOT NULL,
    disponibilidad VARCHAR(20) NOT NULL
);

-- Tabla Pedido
CREATE TABLE Pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    fecha_pedido DATE NOT NULL,
    cliente_id INT,
    linea_produccion_id INT,
    cantidad_total INT NOT NULL,
    estado_pedido VARCHAR(20) NOT NULL,
    transporte_id INT,
    variedad_vino VARCHAR(50) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (linea_produccion_id) REFERENCES LineaProduccion(id_linea),
    FOREIGN KEY (transporte_id) REFERENCES Transporte(id_camion)
);

-- Tabla Insumo
CREATE TABLE Insumo (
    id_insumo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_insumo VARCHAR(100) NOT NULL,
    stock_actual INT NOT NULL,
    unidad_medida VARCHAR(20)
);

-- Tabla Producción-Insumo (relación muchos a muchos entre Línea de Producción e Insumo)
CREATE TABLE ProduccionInsumo (
    id_produccion_insumo INT AUTO_INCREMENT PRIMARY KEY,
    linea_produccion_id INT,
    insumo_id INT,
    cantidad_utilizada INT,
    FOREIGN KEY (linea_produccion_id) REFERENCES LineaProduccion(id_linea),
    FOREIGN KEY (insumo_id) REFERENCES Insumo(id_insumo)
);

-- Tabla Empleado (Operador)
CREATE TABLE Empleado (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre_empleado VARCHAR(100) NOT NULL,
    turno VARCHAR(20),
    linea_asignada_id INT,
    rol VARCHAR(50),
    FOREIGN KEY (linea_asignada_id) REFERENCES LineaProduccion(id_linea)
);

-- Tabla Jefe de Producción
CREATE TABLE JefeProduccion (
    id_jefe INT AUTO_INCREMENT PRIMARY KEY,
    nombre_jefe VARCHAR(100) NOT NULL,
    linea_asignada_id INT UNIQUE,
    experiencia INT,
    nivel_responsabilidad VARCHAR(50),
    FOREIGN KEY (linea_asignada_id) REFERENCES LineaProduccion(id_linea)
);

-- Tabla Punto de Entrega (relacionada con Transporte y Cliente)
CREATE TABLE PuntoEntrega (
    id_punto_entrega INT AUTO_INCREMENT PRIMARY KEY,
    ubicacion VARCHAR(255) NOT NULL,
    horario_recepcion VARCHAR(50),
    cliente_id INT UNIQUE,
    transporte_id INT,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (transporte_id) REFERENCES Transporte(id_camion)
);
