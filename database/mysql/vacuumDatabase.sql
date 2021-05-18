CREATE DATABASE IF NOT EXISTS everything;
USE everything;

CREATE TABLE IF NOT EXISTS products(
    product_id          INT NOT NULL AUTO_INCREMENT,
    productName         VARCHAR(100) NOT NULL,
    price               INT NOT NULL,
    productInfoShort    VARCHAR(500) NOT NULL,
    productInfoLong     VARCHAR(1000) NOT NULL,
    productImage        VARCHAR(300) NOT NULL,
    PRIMARY KEY         (product_id)
);

CREATE TABLE IF NOT EXISTS cartItems(
    shoppingcart_id     INT NOT NULL AUTO_INCREMENT,
    product_id          INT NOT NULL,
    productName         VARCHAR(100) NOT NULL,
    price               INT NOT NULL,
    productInfoShort    VARCHAR(500) NOT NULL,
    productInfoLong     VARCHAR(1000) NOT NULL,
    productImage        VARCHAR(300) NOT NULL,
    PRIMARY KEY         (shoppingcart_id)
);

SET GLOBAL auto_increment_increment=5;
SET @@auto_increment_offset=1;

CREATE TABLE IF NOT EXISTS users(
    user_id             INT NOT NULL AUTO_INCREMENT,
    username            VARCHAR(30) NOT NULL,
    firstname           VARCHAR(30) NOT NULL,
    lastname            VARCHAR(30) NOT NULL,
    email               VARCHAR(100) NOT NULL,
    phone               VARCHAR(10) NOT NULL,
    password            VARCHAR(30) NOT NULL,
    PRIMARY KEY         (user_id)
);


CREATE TABLE IF NOT EXISTS googleUsers(
    user_id             INT NOT NULL AUTO_INCREMENT,
    username            VARCHAR(30) NOT NULL,
    firstname           VARCHAR(30) NOT NULL,
    lastname            VARCHAR(30) NOT NULL,
    email               VARCHAR(100) NOT NULL,
    image               VARCHAR(500) NOT NULL,
    PRIMARY KEY         (user_id)
) AUTO_INCREMENT=1000;


CREATE TABLE IF NOT EXISTS orderHistory(
    orderNumber         INT NOT NULL AUTO_INCREMENT,
    dateAndTime         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id             INT NOT NULL,
    product_id          INT NOT NULL,
    productName         VARCHAR(100) NOT NULL,
    price               INT NOT NULL,
    PRIMARY KEY         (orderNumber)
);

DELIMITER //
CREATE PROCEDURE addToOrderHistory(_user_id INT)
BEGIN
    INSERT INTO orderHistory (user_id, product_id, productName, price)
    SELECT _user_id, product_id, productName, price FROM cartItems;
    DELETE FROM cartItems;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE grantAccess(_username VARCHAR(30), _firstname VARCHAR(30), _lastname VARCHAR(30), _email VARCHAR(100), _phone VARCHAR(10), _password VARCHAR(30))
BEGIN
    set @sql = concat("CREATE USER IF NOT EXISTS '",`_username`,"' IDENTIFIED BY '",`_password`,"'");
    PREPARE stmt1 FROM @sql;
    EXECUTE stmt1;
    DEALLOCATE PREPARE stmt1;
    INSERT INTO users (username, firstname, lastname, email, phone, password) VALUES (_username, _firstname, _lastname, _email, _phone, _password);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE grantGoogleAccess(_username VARCHAR(30), _firstname VARCHAR(30), _lastname VARCHAR(30), _email VARCHAR(100), _picture VARCHAR(500))
BEGIN
    set @sql = concat("CREATE USER IF NOT EXISTS '",`_username`,"' IDENTIFIED BY '7tbr23!'");
    PREPARE stmt1 FROM @sql;
    EXECUTE stmt1;
    DEALLOCATE PREPARE stmt1;
    INSERT INTO googleUsers (username, firstname, lastname, email, image)
    SELECT * FROM (SELECT _username, _firstname, _lastname, _email, _picture) AS temp
    WHERE NOT EXISTS (
        SELECT email FROM googleUsers WHERE email = _email
    ) LIMIT 1;
END //
DELIMITER ;


CREATE TABLE IF NOT EXISTS productImages(
    image_id            INT NOT NULL AUTO_INCREMENT,
    product_id          INT NOT NULL,
    productImage        VARCHAR(300) NOT NULL,
    PRIMARY KEY         (image_id)
);


INSERT INTO products (productName, price, productInfoShort, productInfoLong, productImage) 
VALUES 
('Shark NV352', 1799, 'Lift Away Upright Vacuum with Wide Upholstery and Crevice Tools, Lavender', 'Lift-Away: Lift Away the detachable pod and easily clean, above-floor areas like stairs and furniture. Anti-Allergen Complete Seal Technology and a HEPA filter trap dust and allergens inside the vacuum. Powerful, lightweight, and versatile at only 14 lbs. Brushroll shutoff allows you to instantly switch from deep carpet cleaning to gentle bare floor cleaning. Swivel Steering for excellent control to maneuver around furniture. Upholstery Tool, and two lengths of Crevice Tool included for versatile cleaning.', 'static/img/SharkNV352.jpg'),
('Bissell Featherweight', 299, 'Powerful vacuum with three machines in one', 'Lightweight Bagless Vacuum With Crevice Tool, 2033, One Size Fits All, Blue', 'static/img/BissellFeatherweight.jpg'),
('BISSELL Cleanview Swivel Pet', 999, 'Upright Bagless Vacuum Cleaner, Green', 'Powerful pet hair pick up with triple action brush roll + scatter free technology. Remove pet hair with specialized pet tools including pet hair corner tool and pet tool', 'static/img/BISSELLCleanviewSwivelPet.jpg'),
('NEQUARE Cordless Vacuum', 1499, '10 in 1 Vacuum Cleaner with 280W Powerful Suction', '40mins Self-Standing Stick Vacuum for Car Pet Hair Carpet Hard Floor S25Pro', 'static/img/NEQUARECordlessVacuum.jpg'),
('TOPPIN Stick Vacuum Cleaner Cordless', 999, 'Cordless vacuum with detachable battery', 'Tangle-Free 6 in 1 Powerful 12Kpa Suction Stick Vacuum, Lightweight and Large Capacity, Up to 35min Runtime, Ideal for Home Hard Floor Carpet Car Pet', 'static/img/TOPPINStickVacuumCleanerCordless.jpg'),
('Happy-house Handheld Vacuum', 220, 'Hand Vacuum Cordless with High Power', 'Mini Vacuum Cleaner Handheld Rechargeable for Home and Car Cleaning', 'static/img/Happy-houseHandheldVacuum.jpg'),
('Dyson V7 Trigger', 3640, 'Cord-Free Handheld Vacuum Cleaner', 'Powered by Dyson digital motor V7; The most powerful handheld vacuum; Up to 30 minutes of fade free suction; With fade free lithium ion batteries, suction starts strong and stays strong', 'static/img/DysonV7Trigger.jpg'),
('Shark ION Robot Vacuum AV752', 2099, 'Robot vacuum with three brush types', 'Wi-Fi Connected, 120min Runtime, Works with Alexa, Multi-Surface Cleaning, White', 'static/img/SharkIONRobotVacuumAV752.jpg'),
('GOOVI 1600PA', 1729, 'Robotic Vacuum Cleaner with Self-Charging', '360° Smart Sensor Protectio, Multiple Cleaning Modes Vacuum Best for Pet Hairs, Hard Floor & Medium Carpet', 'static/img/GOOVI1600PA.jpg'),
('Coredy R750', 2999, 'Robot Vacuum Cleaner, Compatible with Alexa', 'Mopping System, Boost Intellect, Virtual Boundary Supported, 2000Pa Suction, Super-Thin, Upgraded Robotic Vacuums, Cleans Hard Floor to Carpet', 'static/img/CoredyR750.jpg');


INSERT INTO productImages (product_id, productImage)
VALUES
(1, 'static/img/SharkNV352.jpg'),
(1, 'static/img/SharkNV352_2.jpg'),
(2, 'static/img/BissellFeatherweight.jpg'),
(2, 'static/img/BissellFeatherweight_2.jpg'),
(3, 'static/img/BISSELLCleanviewSwivelPet.jpg'),
(3, 'static/img/BISSELLCleanviewSwivelPet_2.png'),
(4, 'static/img/NEQUARECordlessVacuum.jpg'),
(4, 'static/img/NEQUARECordlessVacuum_2.jpg'),
(5, 'static/img/TOPPINStickVacuumCleanerCordless.jpg'),
(5, 'static/img/TOPPINStickVacuumCleanerCordless_2.jpg'),
(6, 'static/img/Happy-houseHandheldVacuum.jpg'),
(6, 'static/img/Happy-houseHandheldVacuum_2.jpg'),
(7, 'static/img/DysonV7Trigger.jpg'),
(7, 'static/img/DysonV7Trigger_2.jpg'),
(8, 'static/img/SharkIONRobotVacuumAV752.jpg'),
(8, 'static/img/SharkIONRobotVacuumAV752_2.jpg'),
(9, 'static/img/GOOVI1600PA.jpg'),
(9, 'static/img/GOOVI1600PA_2.jpg'),
(10, 'static/img/CoredyR750.jpg'),
(10, 'static/img/CoredyR750_2.jpg');

CREATE USER IF NOT EXISTS 'default' IDENTIFIED BY 'fdsKG39F!ldk0dsLdM3@';
GRANT SELECT ON products TO 'default';
GRANT SELECT ON cartItems TO 'default';
GRANT SELECT ON productImages TO 'default';
GRANT SELECT ON orderHistory TO 'default';
GRANT SELECT ON users TO 'default';
GRANT SELECT ON googleUsers TO 'default';
GRANT INSERT ON orderHistory TO 'default';
GRANT INSERT ON cartItems TO 'default';
GRANT INSERT ON productImages TO 'default';
GRANT INSERT ON users TO 'default';
GRANT INSERT ON googleUsers TO 'default';
GRANT DELETE ON cartItems TO 'default';

#

CREATE USER IF NOT EXISTS 'admin' IDENTIFIED BY 'Admin';
GRANT ALL PRIVILEGES ON *.* TO 'admin';

INSERT INTO users (username, firstname, lastname, email, phone, password)
VALUES
('admin', 'Admin', 'Admin', 'Admin@Admin.com', '12345678', 'Admin')