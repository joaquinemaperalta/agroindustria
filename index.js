const hbs = require("hbs");
const controladorvacas = require("./controlador/controladorvacas");
const controladorusuario = require("./controlador/controladorusuario");
const controlador_razas = require("./controlador/controlador_razas");
const controladorinicio = require("./controlador/controladorinicio");
const bodyParser = require("body-parser");

//invocamos a expres
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// invocamos a dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });
//4- el directorio public
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));

//5- establecemos el motor  de plantilla ejs
app.set("view engine", "ejs");

//6- invocamos a bcyptjs
const bcrypt = require("bcryptjs");

//7- var. de sesion
const session = require("express-session");
app.use(
  session({
    secret: "nosotros",
    resave: false,
    saveUninitialized: true,
  })
);

//invocamos  l modulo de conexion de la BD
const connection = require("./database/db");
const { route } = require("./routes");
const routes = require("./routes");
const Razas = require("./models/razas");

//ESTABLECIENDOS LASS RUTAS:
//middleware

app.use(express.static("public"));

//home
app.get("/home", controladorinicio.home);

//homelogin
app.get("/homelogin", controladorinicio.home);

//cerrarsesion
app.get("/logout", controladorinicio.logout);

//nosotros
app.get("/nosotros", controladorinicio.aboutus);

app.get("/nosotroslogin", controladorinicio.aboutuss);

//css
app.get("/estilos.css", (req, res) => {
  res.sendFile(__dirname + "/public/estilos/estilos.css");
});

//css de vacas
app.get("/formulario_vacas_estilo.css", (req, res) => {
  res.sendFile(__dirname + "/public/estilos/formulario_vacas_estilos.css");
});

//- registro vacas
app.post("/formulario_vacas", controladorvacas.create);

// css registro de vacas
app.get("/registro_vacas.css", (req, res) => {
  res.sendFile(__dirname + "/public/estilos/registro_vacas.css");
});

//10- registrarse
app.post("/login_y_registro", async (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const usuario = req.body.usuario;
  const edad = req.body.edad;
  const correo = req.body.correo;
  const pass = req.body.pass;
  let passwordHash = await bcrypt.hash(pass, 8);

  connection.query(
    "INSERT INTO usuario SET?",
    {
      nombre: nombre,
      usuario: usuario,
      apellido: apellido,
      edad: edad,
      correo: correo,
      pass: passwordHash,
    },
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send("alta exitosa");
        //res.redirect('/');
      }
    }
  );
});

//11 - Metodo para la autenticacion
app.post("/auth", async (req, res) => {
  const nombre = req.body.usuario;
  const pass = req.body.pass;
  let passwordHash = await bcrypt.hash(pass, 8);
  if (nombre && pass) {
    connection.query(
      "SELECT * FROM usuario WHERE nombre = ?",
      [nombre],
      async (error, results) => {
        if (
          results.length == 0 ||
          !(await bcrypt.compare(pass, results[0].pass))
        ) {
          res.send("usuario y/o password incorectas");
        } else {
          //creamos una var de session y le asignamos true si INICIO SESSION
          res.send("LOGIN CORRECTO");
        }
      }
    );
  }
});

//Handlebars: Paginas dinamicas
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/cosas", function (err) {});

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/edit", function (err) {});

//routes
app.listen(8080, function () {
  console.log("corriendo en el puerto");
});

// ver todas las vacas
app.get("/vacas", controladorvacas.getAll);

//registro de vacas
app.get("/formulario_vacas", controladorvacas.vista_formulario);
//ver el perfil de una vaca
app.get("/perfilvacas/:id_vacas", controladorvacas.getOne);
app.post("/");

//borrar vacas
app.get("/delete/:id_vacas", controladorvacas.delete_vacas);

// actualizar vaca
app.get("/update/:id_vacas", controladorvacas.update_vacas);
app.get("/editar_vacas/:id_vacas", controladorvacas.getEdit);

//api ver todas las vacas
app.get("/api/vacas", controladorvacas.getAlljson);

//api ver una vaca
app.get("/api/vacas/:id_vacas", controladorvacas.getOnejson);

//api crear una vaca
app.post("/api/vacas/create", controladorvacas.createjson);

//api borrar vaca
app.delete("/api/vacas/delete/:id_vacas", controladorvacas.delete_vacasjson);

//api actualizar vacas
app.put("/api/vacas/:id_vacas", controladorvacas.update_vacasjson);

app.get("/vacas", controladorvacas.getAll);

app.get("/perfilvacas/:id_vacas", controladorvacas.getOne);

app.get("/vacas", controladorvacas.getAll);

app.get("/perfilvacas/:id_vacas", controladorvacas.getOne);

app.get("/login_y_registro", controladorusuario.login_registro);

app.post("/registro", controladorusuario.registro);

app.post("/iniciosesion", controladorusuario.session);

app.get("/api/razas", controlador_razas.getAllRazas);

