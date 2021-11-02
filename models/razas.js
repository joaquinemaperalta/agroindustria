const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
class Razas extends Model {}
Razas.init(
  {
    id_razas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre_raza: DataTypes.STRING,
  },
  { sequelize, modelName: "razas", timestamps: false }
);

module.exports = Razas;
