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
const express = require('express')
const app = express()
 //middleware
app.use(express.static("public"));

app.get('/', function (req, res) {
  res.send('Hello World')

})
//home
app.get('/home', (req, res) => {
  res.sendFile(__dirname +'/public/home.html')
})

//css
app.get('/estilos.css', (req, res) => {
  res.sendFile(__dirname +'/public/estilos/estilos.css')
})

//registro y login 

app.get('/login_y_registro.html', (req, res) => {
  res.sendFile(__dirname +'/public/login_y_registro.html')
})

//registro y login css

app.get('/loginyregistro.css', (req, res) => {
  res.sendFile(__dirname +'/public/estilos/loginyregistro.css')
})

//registro y login JavaScript

app.get('/log_reg.js', (req, res) => {
  res.sendFile(__dirname +'/public/log_reg.js')
})

 //routes
app.listen(8080,function(){
    console.log("corriendo en el puerto");

});