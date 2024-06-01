-- C:\Users\Dmers\Code\Spring\PeepMonopoly\src\main\resources\data.sql

-- Boo and I
INSERT INTO users (USERNAME, PASSWORD, ROLE) VALUES ('sara', '$2a$10$eImiTXuWVxfM37uY4JANjQ', 'ROLE_ADMIN'); -- password: loser
INSERT INTO users (USERNAME, PASSWORD, ROLE) VALUES ('peep', '$2a$10$TpOvhxF0h.jFj2UsX4XgFO', 'ROLE_USER'); -- password: meow
INSERT INTO users (USERNAME, PASSWORD, ROLE) VALUES ('drew', '$2a$10$TpOvhxF0h.jFj2UsX4XgFO', 'ROLE_ADMIN'); -- password: w

-- Insert cash cards for new users
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (1001, 420.69, 'sara');
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (1002, 0.00, 'peep');
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (1003, 564.30, 'drew');