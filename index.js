const hbs = require("hbs");
const controladorusuario = require("./controlador/controladorusuario");
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

//formulario_Vacas
app.get("/formulario_vacas.html", (req, res) => {
  res.sendFile(__dirname + "/public/formulario_vacas.html");
});

//css de vacas
app.get("/formulario_vacas_estilo.css", (req, res) => {
  res.sendFile(__dirname + "/public/estilos/formulario_vacas_estilos.css");
});

//registro de vacas
app.get("/registro_vacas.html", (req, res) => {
  res.sendFile(__dirname + "/public/registro_vacas.html");
});

// css registro de vacas
app.get("/registro_vacas.css", (req, res) => {
  res.sendFile(__dirname + "/public/estilos/registro_vacas.css");
});

//registro de lote de vacas
app.get("/lote_vacas.html", (req, res) => {
  res.sendFile(__dirname + "/public/lote_vacas.html");
});




//10- registracion
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
//10- registracion vacas
app.post("/formulario_vacas", controladorusuario.create);

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

        //Mensaje simple y poco vistoso
        //res.send('Incorrect Username and/or Password!');
      }
    );
  }
});

//Handlebars: Paginas dinamicas
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/cosas", function (err) {});


app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/edit", function (err) {});

app.get("/vacas", controladorusuario.getAll);
app.get("/holas");

app.get("/perfilvacas/:id_vacas", controladorusuario.getOne);
app.get("/editar_vacas/:id_vacas", controladorusuario.getXd);
app.post("/");

app.get("/holas", function (req, res) {
  res.send("Hello World");
});
//entrada borrar cosas
app.get("/delete/:id_vacas", controladorusuario.delete_vacas);

//entrada actualizar vaca
app.post("/update/:id_vacas", controladorusuario.update_vacas);




//entrada actualizar vacas
//app.get("/update/:id_vacas", controladorusuario.update_vacas);/

//routes
app.listen(8080, function () {
  console.log("corriendo en el puerto");
});

<<<<<<< HEAD
/*//10- registracion
app.post("/formulario_vacas", async (req, res) => {
  const id_animal = req.body.id_animal;
  const raza = req.body.raza;
  const edad = req.body.edad;
  const peso = req.body.peso;

  
  connection.query(
    "INSERT INTO vacas SET?",
    {
      id_animal: id_animal,
      raza: raza,
      edad: edad,
      peso: peso,
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
*/

=======
app.get("/api/vacas/:id_vacas", controladorvacas.getOnejson);
>>>>>>> d169aa3eef9cf00cbc7b6a4e894d05ad3af3e831


<<<<<<< HEAD


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

//routes

=======
app.get("/vacas", controladorvacas.getAll);
app.get("/holas");
app.get("/perfilvacas/:id_vacas", controladorvacas.getOne);

app.delete("/api/vacas/delete/:id_vacas", controladorvacas.delete_vacasjson);
app.put("/api/vacas/:id_vacas", controladorvacas.update_vacasjson);
>>>>>>> d169aa3eef9cf00cbc7b6a4e894d05ad3af3e831
