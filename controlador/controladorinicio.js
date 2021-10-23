const { model, DataType } = require("sequelize");
const sequelize = require("../database/db");
const Usuario = require("../models/usuario");
const { findOne } = require("../models/usuario");

async function home(req, res) {
  console.log(req.session.userid);

  if (req.session.userid) {
    let user = await Usuario.findOne({
      where: {
        id_usuario: req.session.userid,
      },
    });
    let data = {
      tittle: "usuarios",
      usuario: user.usuario,
    };
    res.render("homelogin", data);
  } else {
    let data = {
      tittle: "usuarios",
    };
    res.render("home", data);
  }
}

module.exports = { home };
