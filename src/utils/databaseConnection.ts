import mysql from "mysql2";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "lista_rango_db",
});

export default pool.promise();
