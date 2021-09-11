const { model, DataType } = require("sequelize");
const sequelize = require("../database/db");
const Vaca = require("../models/vaca");
async function getAll(req, res) {
  let vacas = await Vaca.findAll({
    attributes: ["id_vacas", "raza", "edad", "peso", "id_animal"],
  });
  let data = {
    vacas: vacas,
    name: "pagina de vacas",
  };
  res.render("vacas", data);
}

module.exports = { getAll };

/*

  res.render("vacas", {
    vacas: JSON.stringify(vacas, null, 5),*/
