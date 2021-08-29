//validacion de crear usuario
function validar(event) {
  var usuario, nombre, apellido, pass, edad, email, contra;
  usuario = document.getElementById("usuario").value;
  console.log(usuario);
  nombre = document.getElementById("nombre").value;
  apellido = document.getElementById("apellido").value;
  pass = document.getElementById("pass").value;
  edad = document.getElementById("edad").value;
  email = document.getElementById("email").value;
  contra = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,15})$/;

  if (
    usuario === "" ||
    nombre === "" ||
    apellido === "" ||
    pass === "" ||
    edad === "" ||
    email === ""
  ) {
    alert("todos los campos tienen que estar completos");
    event.returnValue = false;
  } else if (usuario.length > 120) {
    alert("usuario debe tener menos de 20 caracteres");
    event.returnValue = false;
  } else if (nombre.length > 15) {
    alert("nombre debe tener menos de 15 caracteres");
    event.returnValue = false;
  } else if (apellido.length > 15) {
    alert("apellido debe tener menos de 15 caracteres");
    event.returnValue = false;
  } else if (email.length > 30) {
    alert("el email debe tener menos de 30 caracteres");
    event.returnValue = false;
  } else if (isNaN(edad)) {
    alert("la edad debe ser de caracter numerico");
    event.returnValue = false;
  } else if (pass.length > 15) {
    alert("la contraseña debe tener maximo de 15 caracteres");
    event.returnValue = false;
  } else if (!contra.test(pass)) {
    alert(
      "la contraseña debe contener minimamente un caracter numerico,una mayuscula y una minuscula"
    );
    event.returnValue = false;
  }
}
