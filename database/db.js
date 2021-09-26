/*const mysql = require("mysql2");
const connection = mysql.createConnection({
  //Con variables de entorno
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error("El error de conexión es: " + error);
    return;
  }
  console.log("¡Conectado a la Base de Datos!");
});
*/
"use strict";
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });
const sequelize = require("sequelize");
const database = new sequelize.Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,

  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: true,
  }
);
module.exports = database;
