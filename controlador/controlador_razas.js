const { model, DataType } = require("sequelize");
const sequelize = require("../database/db");
const Razas = require("../models/razas");
async function getAllRazas(req, res) {
  let razas = await Razas.findAll({
    attributes: ["id_raza", "nombre_raza"],
  });
  let data = {
    razas: razas,
  };
  res.json(data);
}

module.exports = { getAllRazas };
