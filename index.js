/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); */
//invocamos a expres
const express = require("express");
const app = express();

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
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//invocamos  l modulo de conexion de la BD
const connection = require("./database/db");

//ESTABLECIENDOS LASS RUTAS:
//middleware

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/login_y_registro", (req, res) => {
  res.sendFile(__dirname + "/public/login_y_registro.html");
});

//home
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});
//nosotros
app.get("/nosotros.html", (req, res) => {
  res.sendFile(__dirname + "/public/nosotros.html");
});

//css
app.get("/estilos.css", (req, res) => {
  res.sendFile(__dirname + "/public/estilos/estilos.css");
});

//10- registracion
app.post("/login_y_registro", async (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const dni = req.body.dni;
  const edad = req.body.edad;
  const correo = req.body.correo;
  const pass = req.body.pass;
  let passwordHash = await bcrypt.hash(pass, 8);

  connection.query(
    "INSERT INTO usuario SET?",
    {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
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
  const nombre = req.body.nombre;
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

        //Mensaje simple y poco vistoso
        //res.send('Incorrect Username and/or Password!');
      }
    );
  }
});
/*
const express = require("express");
const validacion = require("./validacion");

const app = express();

app.use(express.json());

app.post("/login_y_registro", (req, res) => {
  validacion.createUsersValidation(req.body);
  const { nombre, apellido, dni, edad, correo, pass } = req.body;

  res.json({
    status: "ok",
  });
});

app.put("/login_y_registro", (req, res) => {
  const { nombre, apellido, dni, edad, correo, pass } = req.body;

  if (
    typeof nombre === "string" &&
    nombre.length >= 5 &&
    /^[a-z]+$/i.test(nombre)
  ) {
  }

  res.json({
    status: "ok",
  });
});

app.use((error, req, res, next) => {
  res.status(400).json({
    status: "error",
    message: error.message,
  });
});
*/
//routes
app.listen(8080, function () {
  console.log("corriendo en el puerto");
});
