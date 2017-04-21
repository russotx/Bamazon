CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products(
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(6,2),
    stock_quantity INTEGER(10)
);


