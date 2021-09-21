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
<<<<<<< HEAD
  { sequelize, modelName: "vacas", timestamps:false }
);

module.exports = Vaca;
=======
  { sequelize, modelName: "vacas" }
);

module.exports = Vaca;
>>>>>>> ee54c46f7480bc369ec4aab82540948e4ba4a9b1
