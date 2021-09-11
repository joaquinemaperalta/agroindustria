const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
class Vaca extends Model {}
Vaca.init(
  {
    id_vacas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    raza: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    peso: DataTypes.INTEGER,
  },
  { sequelize, modelName: "vacas" }
);

module.exports = Vaca;
