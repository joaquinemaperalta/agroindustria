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
