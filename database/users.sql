CREATE TABLE users (
    `userId` BIGINT UNSIGNED AUTO_INCREMENT,
    `username` VARCHAR(60) NOT NULL UNIQUE,
    `nameAndSurname` VARCHAR(60) NOT NULL,
    `email` VARCHAR(60) NOT NULL UNIQUE,
    `phone` INT NOT NULL,
    `address` VARCHAR(60) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT FALSE,
    `isDisable` BOOLEAN DEFAULT FALSE
    PRIMARY KEY (userId)
);


INSERT INTO users (userId, username, nameAndSurname, email, phone, address, password) VALUES
(NULL, "xcross", "Aron Ravena", "aron@gmail.com", 299545869, "Olascoaga 566", "contraultraseg");

INSERT INTO users (userId, username, nameAndSurname, email, phone, address, password) VALUES
(NULL, "kickss7", "Mariano Sebas", "sebass@gmail.com", 299545857, "Av del trabajo 389", "12345123");

INSERT INTO users (userId, username, nameAndSurname, email, phone, address, password) VALUES
(NULL, "huevo", "Marcos Acuña", "markitos@gmail.com", 255124963, "Av. Velez Sarsfield 1393", "30defebrero");

INSERT INTO users (userId, username, nameAndSurname, email, phone, address, password) VALUES
(NULL, "panyvino", "Cristo Rey", "cristo@oficial.com", 241896422, "Av. Virgen Maria 33", "25dediciembre");

INSERT INTO users (userId, username, nameAndSurname, email, phone, address, password) VALUES
(NULL, "ElonMars", "Elon Musk", "spacex@oficial.mars.com", 255555178, "Clifford Avenue 2029", "nomesesucumple");