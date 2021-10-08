const { data } = require("jquery");
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

async function getOne(req, res) {
  const { id_vacas } = req.params;
  let vacas = await Vaca.findOne({
    where: { id_vacas: id_vacas },
  });
  if (vacas === null) {
    console.log("Not found!");
  } else {
    console.log(vacas instanceof Vaca); // true
    console.log(Vaca.vacas); // 'My Title'
  }
  res.render("perfilvacas", {
    vacas,
  });
}

async function create(req, res) {
  const id_animal = req.body.id_animal;
  const raza = req.body.raza;
  const edad = req.body.edad;
  const peso = req.body.peso;
  const jane = await Vaca.create({
    id_animal: id_animal,
    raza: raza,
    edad: edad,
    peso: peso,
  });

  res.redirect("/vacas", vacas);
}

async function delete_vacas(req, res) {
  // Delete everyone named "Jane"
  const { id_vacas } = req.params;

  await Vaca.destroy({
    where: {
      id_vacas: id_vacas,
    },
  });
  res.redirect("/vacas");
}
//actualizar vacas 
async function update_vacas(req, res) {
  const id_animal = req.body.id_animal;
  const raza = req.body.raza;
  const edad = req.body.edad;
  const peso = req.body.peso;
  
  await Vaca.update({ 

    id_animal: id_animal,
    raza: id_animal,
    edad: id_animal,
    peso: id_animal,
  
  }, {
    where: {
      
      id_vacas: id_vacas.req.body.id_vacas
    }
  })};








module.exports = { getOne, getAll, create, delete_vacas, update_vacas };
