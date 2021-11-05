async function pedirRaza() {
  let response_json = await (
    await fetch("http://localhost:8080/api/razas")
  ).json();
  let razas = document.getElementById("razas");
  razas.innerHTML = "";
  console.log(response_json);
  response_json.razas.forEach((element) => {
    console.log(element);
    razas.innerHTML += "<option>" + element.nombre_raza + " </option>";
  });
}
pedirRaza();
