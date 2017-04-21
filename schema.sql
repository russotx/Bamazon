CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products(
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(6,2),
    stock_quantity INTEGER(10)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('plaid socks','menswear',13.50,300);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Samsung LED TV','electronics',1200.00,20);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Dyson Vacuum','appliances',520.35,9);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Samsung Washing Machine','appliances',1500.24,3);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('v-neck shirts','menswear',8.00,200);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('size 3 diapers','baby',36.20,1000);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('toothpaste','bath and body',4.50,150);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Listerene mouthwash','bath and body',6.75,20);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Google Home','electronics',89.00,56);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('baby wipes','baby',12.30,1200);
