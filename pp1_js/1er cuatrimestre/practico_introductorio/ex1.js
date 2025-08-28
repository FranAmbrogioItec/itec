let nombre = "Juan Perez";
let edad = 17;
let tieneDNI = true;
let tieneAutorizacion = false;

console.log("Nombre:", nombre);
console.log("Edad:", edad);
console.log("Tiene DNI:", tieneDNI);
console.log("Tiene autorización:", tieneAutorizacion);

if ((edad >= 18 || tieneAutorizacion) && tieneDNI) {
    console.log("Puede inscribirse");
} else {
    console.log("No puede inscribirse");
}
