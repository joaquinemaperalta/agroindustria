const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
class Usuario extends Model {}
Usuario.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    usuario: DataTypes.STRING,
    pass: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    correo: DataTypes.STRING,
  },
  { sequelize, modelName: "usuario", tableName: "usuario", timestamps: false }
);

module.exports = Usuario;
