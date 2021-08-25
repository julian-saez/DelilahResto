CREATE TABLE `foods` (
    `foodId` BIGINT UNSIGNED AUTO_INCREMENT,
    `food_title` VARCHAR (60) NOT NULL UNIQUE,
    `price` INT NOT NULL,
    PRIMARY KEY(foodId)
);

INSERT INTO foods (foodId, food_title, price) VALUES
(NULL, "Chicken Gold Toast", 530);

INSERT INTO foods (foodId, food_title, price) VALUES
(NULL, "Sandwich Veggie", 720);

INSERT INTO foods (foodId, food_title, price) VALUES
(NULL, "Burger Bacon", 450);

INSERT INTO foods (foodId, food_title, price) VALUES
(NULL, "Burger Clasic", 830);

INSERT INTO foods (foodId, food_title, price) VALUES
(NULL, "Burger Veggie", 1030);

INSERT INTO foods (foodId, food_title, price) VALUES
(NULL, "Sandwich Chicken Little", 500);

