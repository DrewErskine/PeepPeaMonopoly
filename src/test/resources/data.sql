-- C:\Users\Dmers\Code\Spring\PeepMonopoly\src\test\resources\data.sql

-- Insert users
INSERT INTO users (USERNAME, PASSWORD, ROLE) VALUES ('admin', '$2a$10$wWj0RfWQ6F3qT2BL/2HGfOlDRie8E8ZGgHfNLV5F0k9MOx9mRihyW', 'ROLE_ADMIN'); -- password: admin123
INSERT INTO users (USERNAME, PASSWORD, ROLE) VALUES ('sarah1', '$2a$10$wWj0RfWQ6F3qT2BL/2HGfOlDRie8E8ZGgHfNLV5F0k9MOx9mRihyW', 'ROLE_USER'); -- password: abc123
INSERT INTO users (USERNAME, PASSWORD, ROLE) VALUES ('kumar2', '$2a$10$wWj0RfWQ6F3qT2BL/2HGfOlDRie8E8ZGgHfNLV5F0k9MOx9mRihyW', 'ROLE_USER'); -- password: xyz789

-- Insert cash cards
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (99, 123.45, 'sarah1');
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (100, 1.00, 'sarah1');
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (101, 150.00, 'sarah1');
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (102, 200.00, 'kumar2');
