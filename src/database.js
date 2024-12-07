import mysql from "mysql2/promise";

// Conexión con la base de datos local en mysql
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "bodegavino",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;