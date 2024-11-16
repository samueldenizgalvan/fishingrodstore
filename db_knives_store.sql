-- Eliminamos la base de datos si ya existe
DROP DATABASE IF EXISTS db_knives_store;

-- Creamos la base de datos
CREATE DATABASE IF NOT EXISTS db_knives_store;

-- Seleccionamos la base de datos
USE db_knives_store;

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
    sexo VARCHAR(8),
    filename VARCHAR(50),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` BOOLEAN DEFAULT TRUE,
    CONSTRAINT pk_id_u PRIMARY KEY (id)
);

-- Inserciones se realizarán desde el backend o el frontend de la aplicación en funcionamiento

-- Tabla: roles
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(20) UNIQUE NOT NULL,
    description VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_id_r PRIMARY KEY (id)
);

-- Insertamos un rol que será el de administrador
INSERT INTO roles (name, description) VALUES 
('admin', 'Administrator role'),
('user', 'User role');

-- Tabla: user_roles
CREATE TABLE user_roles (
    user_id BIGINT,
    role_id BIGINT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Tabla de productos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    brand VARCHAR(50) NOT NULL,
    photo_url VARCHAR(50),
    color VARCHAR(20),
    category ENUM('Automatic Knife', 'Assisted Knife', 'Fixed Blade Knife') NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Creamos un índice en el campo category
CREATE INDEX idx_category ON products (category);

-- Insertamos productos
INSERT INTO products (price, code, brand, photo_url, color, category) VALUES 
(299.99, 'AKN10001', 'Benchmade', 'https://i.imgur.com/PlGd1ut.jpeg', 'Black', 'Automatic Knife'),
(189.50, 'AKN10002', 'Microtech', 'https://i.imgur.com/MiHEZtK.jpeg', 'Green', 'Automatic Knife'),
(159.00, 'AKN10003', 'Kershaw', 'https://i.imgur.com/Ve78X6x.jpeg', 'Black', 'Automatic Knife'),
(210.75, 'AKN10004', 'ProTech', 'https://i.imgur.com/wuo7QDS.jpeg', 'Black', 'Automatic Knife'),
(255.00, 'AKN10005', 'Gerber', 'https://i.imgur.com/u6mHYCN.jpeg', 'Desert', 'Automatic Knife'),
(99.99, 'AKN10006', 'Boker', 'https://i.imgur.com/kMDWN9F.jpeg', 'Carbon', 'Automatic Knife'),
(179.99, 'AKN10007', 'SOG', 'https://i.imgur.com/xnVIuLQ.jpeg', 'White', 'Automatic Knife'),
(275.49, 'AKN10008', 'Spyderco', 'https://i.imgur.com/uqXlVu9.jpeg', 'Purple', 'Automatic Knife'),
(99.99, 'ASK1001', 'Kershaw', 'https://i.imgur.com/BdfI2GH.jpeg', 'Black', 'Assisted Knife'),
(89.50, 'ASK1002', 'SOG', 'https://i.imgur.com/1JpEeJg.jpeg', 'Desert', 'Assisted Knife'),
(79.75, 'ASK1003', 'Gerber', 'https://i.imgur.com/XYtAzI7.jpeg', 'Carbon', 'Assisted Knife'),
(120.00, 'ASK1004', 'Benchmade', 'https://i.imgur.com/XInPsDR.jpeg', 'Orange', 'Assisted Knife'),
(45.30, 'ASK1005', 'CRKT', 'https://i.imgur.com/iTBbgLH.jpeg', 'Blue', 'Assisted Knife'),
(110.50, 'ASK1006', 'Spyderco', 'https://i.imgur.com/hsHnu83.jpeg', 'Black', 'Assisted Knife'),
(60.25, 'ASK1007', 'Kershaw', 'https://i.imgur.com/zRMQRx5.png', 'Purple', 'Assisted Knife'),
(105.00, 'ASK1008', 'Buck', 'https://i.imgur.com/puAlPWl.jpeg', 'Carbon Black', 'Assisted Knife'),
(94.99, 'ASK1009', 'Cold Steel', 'https://i.imgur.com/m7SxeUy.jpeg', 'Brown', 'Assisted Knife'),
(79.95, 'ASK1010', 'SOG', 'https://i.imgur.com/iTWBMhU.jpeg', 'Black', 'Assisted Knife'),
(150.00, 'FBK1001', 'Gerber', 'https://i.imgur.com/UOtQHzW.jpeg', 'Brown', 'Fixed Blade Knife'),
(130.75, 'FBK1002', 'Ka-Bar', 'https://i.imgur.com/eAyylEp.jpeg', 'Green', 'Fixed Blade Knife'),
(175.50, 'FBK1003', 'ESEE', 'https://i.imgur.com/t1XTpKs.jpeg', 'Brown', 'Fixed Blade Knife'),
(220.00, 'FBK1004', 'Benchmade', 'https://i.imgur.com/VQlBxLC.jpeg', 'Black', 'Fixed Blade Knife'),
(89.99, 'FBK1005', 'Cold Steel', 'https://i.imgur.com/PQoanQM.jpeg', 'Wooden Tan', 'Fixed Blade Knife'),
(160.25, 'FBK1006', 'Spyderco', 'https://i.imgur.com/IcXhJbR.jpeg', 'Wooden', 'Fixed Blade Knife'),
(115.75, 'FBK1007', 'Buck', 'https://i.imgur.com/GxNH6zQ.jpeg', 'Green', 'Fixed Blade Knife');

-- Tabla de cesta de compra (shopping_cart)
CREATE TABLE shopping_cart (
    user_id BIGINT,
    product_id INT,
    quantity INT NOT NULL DEFAULT 1,  -- Cantidad de cada producto
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(id),
    PRIMARY KEY (user_id, product_id)
);