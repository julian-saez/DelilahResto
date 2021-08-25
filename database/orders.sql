CREATE TABLE `orders` (
    `orderId` BIGINT UNSIGNED AUTO_INCREMENT,
    `payment` INT NOT NULL,
    `description` VARCHAR(60) NOT NULL,
    `state` ENUM('new', 'confirmed', 'preparing', 'sent', 'cancelled', 'delivered'),
    `food_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (orderId),
    FOREIGN KEY (food_id) REFERENCES foods(foodId),
    FOREIGN KEY (user_id) REFERENCES users(userId)
);

-- Some of random values
INSERT INTO orders (orderId, payment, description, state, food_id, user_id) VALUES
(NULL, 1, "2x Chicken Gold ToastBurguer", 1, 2, 2);

INSERT INTO orders (orderId, payment, description, state, food_id, user_id) VALUES
(NULL, 2, "1x Burger Veggie", 1, 1, 3);

INSERT INTO orders (orderId, payment, description, state, food_id, user_id) VALUES
(NULL, 2, "3x Burger Clasic", 1, 4, 2);

INSERT INTO orders (orderId, payment, description, state, food_id, user_id) VALUES
(NULL, 1, "1x Burger Clasic", 1, 5, 1);

INSERT INTO orders (orderId, payment, description, state, food_id, user_id) VALUES
(NULL, 3, "2x Burger Bacon", 1, 3, 2);

INSERT INTO orders (orderId, payment, description, state, food_id, user_id) VALUES
(NULL, 1, "2x Burger Bacon", 1, 4, 4);
    
