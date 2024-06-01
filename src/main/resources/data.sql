-- Insert users
INSERT INTO users (USERNAME, PASSWORD, ROLE) VALUES ('sara', '$2a$10$DowJ/HY6y5cF2oKYOJh9guvjdgM1Wpa7.kgI8/ojChV4sLQHEO7WC', 'ROLE_ADMIN'); -- password: password
INSERT INTO users (USERNAME, PASSWORD, ROLE) VALUES ('peep', '$2a$10$2E09xzGL9A8.WE/bOnv8L.uFzi/OSuQvBzTzT/4aIflgS7CzhoyEu', 'ROLE_USER'); -- password: erskine
INSERT INTO users (USERNAME, PASSWORD, ROLE) VALUES ('drew', '$2a$10$2TgYP4Um3roEpjvP.xRf1OPPquN0E64Vm98B24snFqU7w0PGu6Cyq', 'ROLE_ADMIN'); -- password: erskine
INSERT INTO users (USERNAME, PASSWORD, ROLE) VALUES ('evilDrew', '$2a$10$2TgYP4Um3roEpjvP.xRf1OPPquN0E64Vm98B24snFqU7w0PGu6Cyq', 'ROLE_USER'); -- password: Luf

-- Insert cash cards for users
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (1001, 694000.00, 'sara');
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (1002, 32.30, 'sara');
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (1003, 32.30, 'drew');
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (1004, 0.00, 'sara');
INSERT INTO cash_card (ID, AMOUNT, OWNER) VALUES (1005, 0.00, 'peep');
