//validacion de cantidad de lotes de vacas
function validar(event) {
  var lote;
  lote = document.getElementById("lote").value;
  idvaca = document.getElementById("idvaca").value;
  raza = document.getElementById("raza").value;
  edad = document.getElementById("edad").value;
  peso = document.getElementById("peso").value;
  console.log(lote);

  if (lote === "" ||
    idvaca === "" ||
    raza === "" ||
    edad === "" ||
    peso === "" 
  ) {
    alert("el campo tiene que estar completo");
    event.returnValue = false;
  } else if (lote.length > 10000) {
    alert("el lote no debe ser mayor a 10000");
    event.returnValue = false;
  } else if (lote.length <= 1) {
    alert("el lote no tiene que tener 0 o numeros negativos");
    event.returnValue = false;
  } else if (idvaca.length > 10000) {
    alert("El ID de la vaca no debe ser mayor de 10000");
    event.returnValue = false;
  } else if (raza.length > 100) {
    alert("el nombre de la raza no debe ser mayor de 100 caracteres");
    event.returnValue = false;
  } else if (peso.length > 1000000) {
    alert("El peso no debe ser mayor a 1000000");
    event.returnValue = false;
  } else if (edad.length <= 1) {
    alert("la edad no debe tener 0 o numeros negativos ");
    event.returnValue = false;
  
  }
}





