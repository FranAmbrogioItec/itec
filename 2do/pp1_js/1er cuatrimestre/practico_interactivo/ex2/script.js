const total = parseInt(prompt("ingrese el total de la cuenta: "))
const servicio = prompt("que tal fue el servicio? (bueno, malo o excelente)")

let porcentajePropina;

if (servicio === "malo") {
    porcentajePropina = 0.10;
} else if (servicio == "bueno") {
    porcentajePropina = 0.15;
} else if (servicio == "excelente") {
    porcentajePropina = 0.20
} 

let propina = total * porcentajePropina
let cuenta_total = total + propina

alert("tenes que pagar: $" + cuenta_total + ". el total es $:" + total + " la propina es de: $" + propina);
