-- Eliminamos la base de datos si ya existe
DROP DATABASE IF EXISTS db_knives_store;

-- Ahora creamos la base de datos
CREATE DATABASE IF NOT EXISTS db_knives_store;

-- Seleccionamos la Base de Datos Creada
USE db_knives_store;

-- Procedemos a crear las tablas
-- Tabla: users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT,
    identification VARCHAR(20) UNIQUE,
    `name` VARCHAR(50) NOT NULL,
    surname1 VARCHAR(40) NOT NULL,
    surname2 VARCHAR(40),
    email VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address VARCHAR(150),
    `password` VARCHAR(200) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Columna para marca de tiempo de creación
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Columna para marca de tiempo de actualización
    representative BOOLEAN DEFAULT FALSE,  -- Valor por defecto FALSE para representative
    `active` BOOLEAN DEFAULT TRUE,  -- Valor por defecto TRUE para active
    CONSTRAINT pk_id_u PRIMARY KEY (id)
);


-- Inserto cuatro (4) registros de ejemplo
INSERT INTO users (identification, name, surname1, surname2, email, phone, address, password)
VALUES
('ID001', 'John', 'Doe', 'Smith', 'john.doe@example.com', '1234567890', '123 Main St', 'hashingbcrypt123'),
('ID002', 'Jane', 'Doe', 'Johnson', 'jane.doe@example.com', '0987654321', '456 Elm St', 'hashingbcrypt123d456'),
('ID003', 'Jim', 'Beam', NULL, 'jim.beam@example.com', '1122334455', '789 Maple St', 'hashingbcrypt123789'),
('ID004', 'Jack', 'Daniels', 'Williams', 'jack.daniels@example.com', '5566778899', '101 Oak St', 'hashingbcrypt123012');

-- Comenzamos a Crear las tablas de nuestros productos
-- Navajas Automaticas
CREATE TABLE automatic_knives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    brand VARCHAR(50) NOT NULL,
    photo_url VARCHAR(50),
    color VARCHAR(20),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Columna para marca de tiempo de creación
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Columna para marca de tiempo de actualización
);

-- Creamos los Inserts
INSERT INTO automatic_knives (price, code, brand, photo_url, color) VALUES 
(299.99, 'AKN10001', 'Benchmade', 'https://i.imgur.com/PlGd1ut.jpeg', 'Black'),
(189.50, 'AKN10002', 'Microtech', 'https://i.imgur.com/MiHEZtK.jpeg', 'Green'),
(159.00, 'AKN10003', 'Kershaw', 'https://i.imgur.com/Ve78X6x.jpeg', 'Black'),
(210.75, 'AKN10004', 'ProTech', 'https://i.imgur.com/wuo7QDS.jpeg', 'Black'),
(255.00, 'AKN10005', 'Gerber', 'https://i.imgur.com/u6mHYCN.jpeg', 'Desert'),
(99.99, 'AKN10006', 'Boker', 'https://i.imgur.com/kMDWN9F.jpeg', 'Carbon'),
(179.99, 'AKN10007', 'SOG', 'https://i.imgur.com/xnVIuLQ.jpeg', 'White'),
(275.49, 'AKN10008', 'Spyderco', 'https://i.imgur.com/uqXlVu9.jpeg', 'Purple');

-- Navajas Asistidas
CREATE TABLE assisted_knives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    brand VARCHAR(50) NOT NULL,
    photo_url VARCHAR(50),
    color VARCHAR(20),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Columna para marca de tiempo de creación
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Columna para marca de tiempo de actualización
);

-- Creamos los Inserts
INSERT INTO assisted_knives (price, code, brand, photo_url, color) VALUES
(99.99, 'AK1001', 'Kershaw', 'https://i.imgur.com/BdfI2GH.jpeg', 'Black'),
(89.50, 'AK1002', 'SOG', 'https://i.imgur.com/1JpEeJg.jpeg', 'Desert'),
(79.75, 'AK1003', 'Gerber', 'https://i.imgur.com/XYtAzI7.jpeg', 'Carbon'),
(120.00, 'AK1004', 'Benchmade', 'https://i.imgur.com/XInPsDR.jpeg', 'Orange'),
(45.30, 'AK1005', 'CRKT', 'https://i.imgur.com/iTBbgLH.jpeg', 'Blue'),
(110.50, 'AK1006', 'Spyderco', 'https://i.imgur.com/hsHnu83.jpeg', 'Black'),
(60.25, 'AK1007', 'Kershaw', 'https://i.imgur.com/zRMQRx5.png', 'Purple'),
(105.00, 'AK1008', 'Buck', 'https://i.imgur.com/puAlPWl.jpeg', 'Carbon Black'),
(94.99, 'AK1009', 'Cold Steel', 'https://i.imgur.com/m7SxeUy.jpeg', 'Brown'),
(79.95, 'AK1010', 'SOG', 'https://i.imgur.com/iTWBMhU.jpeg', 'Black');

-- Navajas de Hoja Fija
CREATE TABLE fixed_blade_knives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    brand VARCHAR(50) NOT NULL,
    photo_url VARCHAR(50),
    color VARCHAR(20),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Columna para marca de tiempo de creación
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Columna para marca de tiempo de actualización
);

-- Creamos los Inserts
INSERT INTO fixed_blade_knives (price, code, brand, photo_url, color) VALUES
(150.00, 'FBK1001', 'Gerber', 'https://i.imgur.com/UOtQHzW.jpeg', 'Brown'),
(130.75, 'FBK1002', 'Ka-Bar', 'https://i.imgur.com/eAyylEp.jpeg', 'Green'),
(175.50, 'FBK1003', 'ESEE', 'https://i.imgur.com/t1XTpKs.jpeg', 'Brown'),
(220.00, 'FBK1004', 'Benchmade', 'https://i.imgur.com/VQlBxLC.jpeg', 'Black'),
(89.99, 'FBK1005', 'Cold Steel', 'https://i.imgur.com/PQoanQM.jpeg', 'Wooden Tan'),
(160.25, 'FBK1006', 'Spyderco', 'https://i.imgur.com/IcXhJbR.jpeg', 'Wooden'),
(115.75, 'FBK1007', 'Buck', 'https://i.imgur.com/GxNH6zQ.jpeg', 'Green');
