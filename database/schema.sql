CREATE DATABASE IF NOT EXISTS universal_printers;
USE universal_printers;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(140) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    category VARCHAR(80),
    base_price DOUBLE NOT NULL,
    description VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    product_name VARCHAR(140) NOT NULL,
    quantity INT NOT NULL,
    price DOUBLE NOT NULL,
    status VARCHAR(60) NOT NULL,
    file_path VARCHAR(400),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS file_uploads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    original_name VARCHAR(255),
    stored_name VARCHAR(255),
    content_type VARCHAR(120),
    size BIGINT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
