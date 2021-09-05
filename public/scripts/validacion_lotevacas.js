//validacion de cantidad de lotes de vacas
function validar(event) {
  var lote;
  lote = document.getElementById("lote").value;
  console.log(lote);

  if (lote === "") {
    alert("el campo tiene que estar completo");
    event.returnValue = false;
  } else if (lote.length > 10000) {
    alert("el lote no debe ser mayor a 10000");
    event.returnValue = false;
  } else if (lote.length <= 0) {
    alert("el lote no tiene que tener 0 o numeros negativos");
    event.returnValue = false;
  }
}
