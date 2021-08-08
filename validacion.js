/*validacion de crear usuario
function createUsersValidation(datos) {
  const { nombre, apellido, dni, edad, correo, pass } = datos;

  if (typeof nombre !== "string") {
    throw new error("el nombre no tiene letras");
  }
  if (nombre.length <= 2 && /^[a-z] +$/i.test(nombre)) {
    throw new error("el nombre no tiene letras");
  }
  if (/^[a-z]+$/i.test(nombre)) {
    throw new error("el nombre solo tiene que tener letras");
  }

  **************

  if (typeof apellido !== "string") {
    throw new error("el apellido no tiene letras");
  }
  if (apellido.length <= 3 && /^[a-z] +$/i.test(apellido)) {
    throw new error("el apellido no tiene letras");
  }
  if (/^[a-z]+$/i.test(apellido)) {
    throw new error("el apellido solo tiene que tener letras");
  }

  **************

  if (typeof edad !== "number") {
    throw new error("la edad no tiene letras");
  }
  if (edad < 18) {
    throw new error("la edad menor a 18 es incorrecta");
  }
  if (edad > 130) {
    throw new error("la edad mayor a 130  es incorrecta");
  }

  **************

  if (typeof correo.length >= 20) {
    throw new error("demasiado largo para ser un correo");
  }
  if (edad < 18) {
    throw new error("");
  }
  if (edad > 130) {
    throw new error("la edad mayor a 130  es incorrecta");
  }

  //**************
}

module.exports = {
  validate,
  createUsersValidation,
};
*/
