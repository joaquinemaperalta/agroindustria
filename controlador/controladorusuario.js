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
async function create(req, res) {
  const id_animal = req.body.id_animal;
  const raza = req.body.raza;
  const edad = req.body.edad;
  const peso = req.body.peso;
  const jane = await Vaca.create(  {
    id_animal: id_animal,
    raza: raza,
    edad: edad,
    peso: peso
  } );
  
  res.redirect('/vacas');
}
async function delete_vacas (req, res) {
// Delete everyone named "Jane"
  const { id_vacas} = req.params;
 
  await Vaca.destroy({

  where: {
    
   id_vacas:id_vacas 
  }
  
  });
res.redirect('/vacas');
}



module.exports = { getAll, create, delete_vacas };
