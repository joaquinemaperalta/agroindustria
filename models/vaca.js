const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
class Vaca extends Model {}
Vaca.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: "vacas" }
);

module.exports = Vaca;
