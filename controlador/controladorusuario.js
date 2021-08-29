const { model, DataType } = require("sequelize");
const sequelize = require("../database/db");
const Vaca = require("../models/vaca");
async function getAll(req, res) {
  let vacas = await Vaca.findAll({
    attributes: ["id_vacas", "raza", "edad", "peso", "id_animal"],
  });
  console.log("todas las vacas", JSON.stringify(vacas, null, 5));

  res.render("vacas", {
    vacas: JSON.stringify(vacas, null, 5),
    name: "paginas de vaca",
  });
}

module.exports = { getAll };
