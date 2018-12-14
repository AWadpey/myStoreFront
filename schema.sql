DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon; 
USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(5) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('potty putter tolet golf', 'sports & fitness', 13.55, 315), ('5lb peanut butter', 'food', 10.82, 763), ('fire tv stick 4k', 'electronics', 34.99, 143), ('gopro hero5', 'action cameras', 238.98, 65), ('santa suit', 'costumes', 72.64, 7), ('irobot roomba', 'floor care', 399.00, 42), ('red dead redemption 2', 'video games', 59.88, 231), ('crocs slip on', 'athletic shoes', 34.19, 544);

SELECT * FROM products;

