const { Session } = require("express-session");
const { model, DataType } = require("sequelize");
const sequelize = require("../database/db");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

async function session(req, res) {
  let user = await Usuario.findOne({
    where: {
      usuario: req.body.usuario,
      pass: req.body.pass,
    },
  });
  if (user) {
    req.session.userid = user.id_usuario;
    res.redirect("homelogin");
  } else {
    res.send("error");
  }
}
async function login_registro(req, res) {
  res.render("login_y_registro");
}
async function registro(req, res) {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const usuario = req.body.usuario;
  const edad = req.body.edad;
  const correo = req.body.correo;
  const pass = req.body.pass;
  let passwordHash = await bcrypt.hash(pass, BCRYPT_SALT_ROUNDS);

  const usuarios = await Usuario.create({
    usuario: usuario,
    pass: passwordHash,
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    correo: correo,
  });

  if (usuarios) {
    req.session.userid = usuarios.id_usuario;
    res.redirect("homelogin");
  } else {
    res.send("error");
  }
}

module.exports = { session, login_registro, registro };
