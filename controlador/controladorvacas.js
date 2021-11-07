const { data } = require("jquery");
const { model, DataType } = require("sequelize");
const sequelize = require("../database/db");
const Vaca = require("../models/vaca");

async function getAll(req, res) {
  let vacas = await Vaca.findAll({
    attributes: ["id_vacas", "raza", "edad", "peso", "id_animal", "id_usuario"],
    where: { id_usuario: req.session.userid },
  });
  let data = {
    vacas: vacas,
    name: "Listado de vacas",
  };
  res.render("vacas", data);
}

async function getOne(req, res) {
  const { id_vacas } = req.params;
  let vacas = await Vaca.findOne({
    where: { id_vacas: id_vacas, id_usuario: req.session.userid },
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
  const id_usuario = req.body.id_usuario;
  const id_animal = req.body.id_animal;
  const raza = req.body.raza;
  const edad = req.body.edad;
  const peso = req.body.peso;
  const jane = await Vaca.create({
    id_usuario: id_usuario,
    id_animal: id_animal,
    raza: raza,
    edad: edad,
    peso: peso,
  });

  res.redirect("/vacas");
}

async function delete_vacas(req, res) {
  // Delete everyone named "Jane"
  const { id_vacas } = req.params;

  await Vaca.destroy({
    where: {
      id_vacas: id_vacas,
      id_usuario: req.session.userid,
    },
  });
  res.redirect("/vacas");
}
//actualizar vacas
async function update_vacas(req, res) {
  const id_usuario = req.body.id_usuario;
  const raza = req.body.raza;
  const edad = req.body.edad;
  const peso = req.body.peso;

  await Vaca.update(
    {
      raza: raza,
      edad: edad,
      peso: peso,
    },
    {
      where: {
        id_vacas: req.params.id_vacas,
      },
    }
  );
  res.redirect("/vacas");
}
async function getEdit(req, res) {
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
  res.render("editar_vacas", {
    vacas,
  });
}

async function getAlljson(req, res) {
  let vacas = await Vaca.findAll({
    attributes: ["id_vacas", "raza", "edad", "peso", "id_animal"],
  });

  res.json(vacas);
}

async function getOnejson(req, res) {
  const { id_vacas } = req.params;
  let vacas = await Vaca.findOne({
    where: { id_vacas: id_vacas },
  });
  res.json(vacas);
}
async function createjson(req, res) {
  let body = req.body;

  let vaca = await Vaca.create({
    id_usuario: id_usuario,
    raza: body.raza,
    edad: body.edad,
    peso: body.peso,
  });
  res.json(vaca);
}

async function delete_vacasjson(req, res) {
  const { id_vacas } = req.params;

  await Vaca.destroy({
    where: {
      id_vacas: id_vacas,
    },
  });
  res.json("vaca eliminada");
}

async function update_vacasjson(req, res) {
  const raza = req.body.raza;
  const edad = req.body.edad;
  const peso = req.body.peso;

  let vaca = await Vaca.update(
    {
      raza: raza,
      edad: edad,
      peso: peso,
    },
    {
      where: {
        id_vacas: req.params.id_vacas,
      },
    }
  );
  res.json(vaca);
}

async function vista_formulario(req, res) {
  res.render(
    "formulario_vacas",

    { id_usuario: req.session.userid }
  );
}
module.exports = {
  vista_formulario,
  getEdit,
  getOne,
  getAll,
  create,
  delete_vacas,
  update_vacas,
  getAlljson,
  getOnejson,
  createjson,
  delete_vacasjson,
  update_vacasjson,
};
