import mysql from "mysql2";
import "dotenv/config";

try {

    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        multipleStatements: true,
    });

    const sqlCommand = `
        CREATE SCHEMA ${process.env.DATABASE_NAME};

        USE ${process.env.DATABASE_NAME};

        CREATE TABLE restaurant (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            street VARCHAR(100) NOT NULL,
            number VARCHAR(15) NOT NULL,
            neighborhood VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            PRIMARY KEY (id)
        );

        CREATE TABLE opening_hours (
            id INT NOT NULL AUTO_INCREMENT,
            day VARCHAR(10) NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            restaurant_id INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (restaurant_id)
                REFERENCES restaurant (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
        );

        CREATE TABLE product (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            value REAL NOT NULL,
            category VARCHAR(20) NOT NULL,
            promotion_description VARCHAR(100),
            promotion_value REAL,
            restaurant_id INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (restaurant_id)
                REFERENCES restaurant (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
        );

        CREATE TABLE promotion_hours (
            id INT NOT NULL AUTO_INCREMENT,
            day VARCHAR(10) NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            product_id INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (product_id)
                REFERENCES product (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
        );
    `;

    con.connect((err) => {

        if (err) {
            con.destroy();
            throw err;
        }

        con.query(sqlCommand, (err, result) => {

            if (err) {
                con.destroy();
                throw err;
            }

            console.log("Database created");
            con.destroy();
        });
    });

} catch(error) {
    console.log(error);
}
