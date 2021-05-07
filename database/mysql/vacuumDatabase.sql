CREATE DATABASE everything;
USE everything;

CREATE TABLE products(
    product_id          INT NOT NULL AUTO_INCREMENT,
    productName         VARCHAR(100) NOT NULL,
    price               INT NOT NULL,
    productInfoShort    VARCHAR(500) NOT NULL,
    productInfoLong     VARCHAR(1000) NOT NULL,
    productImage        VARCHAR(300) NOT NULL,
    PRIMARY KEY         (product_id)
);

CREATE TABLE cartItems(
    shoppingcart_id     INT NOT NULL AUTO_INCREMENT,
    product_id          INT NOT NULL,
    productName         VARCHAR(100) NOT NULL,
    price               INT NOT NULL,
    productInfoShort    VARCHAR(500) NOT NULL,
    productInfoLong     VARCHAR(1000) NOT NULL,
    productImage        VARCHAR(300) NOT NULL,
    PRIMARY KEY         (shoppingcart_id)
);

INSERT INTO products (productName, price, productInfoShort, productInfoLong, productImage) 
VALUES ('Shark NV352', 1799, 'Lift Away Upright Vacuum with Wide Upholstery and Crevice Tools, Lavender', 'Lift-Away: Lift Away the detachable pod and easily clean, above-floor areas like stairs and furniture. Anti-Allergen Complete Seal Technology and a HEPA filter trap dust and allergens inside the vacuum. Powerful, lightweight, and versatile at only 14 lbs. Brushroll shutoff allows you to instantly switch from deep carpet cleaning to gentle bare floor cleaning. Swivel Steering for excellent control to maneuver around furniture. Upholstery Tool, and two lengths of Crevice Tool included for versatile cleaning.', 'static/img/SharkNV352.jpg');


SELECT * FROM products;

USE mysql

CREATE USER 'neremzky' IDENTIFIED BY 'password';
#GRANT SELECT ON products TO 'neremzky';
#GRANT SELECT ON cartitems TO 'neremzky';
GRANT ALL PRIVILEGES ON *.* TO 'neremzky';

