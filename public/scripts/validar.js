//validacion de crear usuario
function validar(event) {
  var usuario, nombre, apellido, pass, edad, email;
  usuario = document.getElementById("usuario").value;
  console.log(usuario);
  nombre = document.getElementById("nombre").value;
  apellido = document.getElementById("apellido").value;
  pass = document.getElementById("pass").value;
  edad = document.getElementById("edad").value;
  email = document.getElementById("email").value;

  if (
    usuario === "" ||
    nombre === "" ||
    apellido === "" ||
    pass === "" ||
    edad === "" ||
    email === ""
  ) {
    alert("el campo  esta vacio");
    event.returnValue = false;
  }
}
